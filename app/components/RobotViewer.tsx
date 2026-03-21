"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, useAnimations, useGLTF } from "@react-three/drei";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Group, LoopRepeat, MathUtils, NoToneMapping, SRGBColorSpace, Vector3 } from "three";

const USE_PLACEHOLDER = false;
const ROBOT_GLB_PATH = "/assets/version4-anyconv.glb";
const CAMERA_POINTS: [number, number, number][] = [
  [0, 1.05, 5.1],
  [1.35, 1, 4.45],
  [-1.25, 1.25, 4.15],
  [0, 1.85, 3.75],
];

const CHAPTERS = [
  {
    title: "Front Profile",
    desc: "Scroll to transition across hero angles while the model stays pinned in focus.",
  },
  {
    title: "Service-Side Details",
    desc: "Reveal operational geometry and body contours with smooth camera choreography.",
  },
  {
    title: "Top Architecture",
    desc: "Show tank, brush, and clearance design from a controlled overhead perspective.",
  },
];

const HOTSPOTS = [
  {
    id: "lidar",
    label: "LiDAR Bay",
    desc: "Front sensing zone for navigation and obstacle handling in live routes.",
    offsetY: -0.15,
  },
  {
    id: "brush",
    label: "Brush Deck",
    desc: "Dual-disc cleaning assembly for consistent pressure and floor coverage.",
    offsetY: 0.08,
  },
  {
    id: "squeegee",
    label: "Squeegee Arc",
    desc: "Rear recovery path tuned for cleaner drying and streak reduction.",
    offsetY: 0.2,
  },
];

function PlaceholderModel() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.2;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetY, Math.min(1, delta * 5));
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, Math.min(1, delta * 5));
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Replace this placeholder mesh with your GLB primitive once exported */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.2, 1, 42]} />
          <meshStandardMaterial color="#132A41" metalness={0.35} roughness={0.38} />
        </mesh>
        <mesh castShadow position={[0, 0.5, 0]}>
          <torusGeometry args={[0.5, 0.08, 16, 80]} />
          <meshStandardMaterial color="#FFED29" emissive="#FFED29" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function GLBModel() {
  return null;
}

function CameraRig({ progress }: { progress: number }) {
  const from = useMemo(() => new Vector3(), []);
  const to = useMemo(() => new Vector3(), []);

  useFrame(({ camera }, delta) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const segmentFloat = clamped * (CAMERA_POINTS.length - 1);
    const segment = Math.min(CAMERA_POINTS.length - 2, Math.floor(segmentFloat));
    const localT = segmentFloat - segment;

    from.set(...CAMERA_POINTS[segment]);
    to.set(...CAMERA_POINTS[segment + 1]);
    from.lerp(to, localT);

    camera.position.x = MathUtils.lerp(camera.position.x, from.x, Math.min(1, delta * 2.8));
    camera.position.y = MathUtils.lerp(camera.position.y, from.y, Math.min(1, delta * 2.8));
    camera.position.z = MathUtils.lerp(camera.position.z, from.z, Math.min(1, delta * 2.8));
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

function GLBModelWithMotion({
  progress,
  hotspotOffset,
}: {
  progress: number;
  hotspotOffset: number;
}) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(ROBOT_GLB_PATH);
  const { actions } = useAnimations(gltf.animations, groupRef);

  useEffect(() => {
    const first = Object.values(actions).find(Boolean);
    if (!first) return;
    first.reset();
    first.setLoop(LoopRepeat, Infinity);
    first.play();
    return () => {
      first.stop();
    };
  }, [actions]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const scrollTurn = (progress - 0.5) * 0.45;
    const targetY = state.pointer.x * 0.22 + scrollTurn + hotspotOffset;
    const targetX = -state.pointer.y * 0.2;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetY, Math.min(1, delta * 5));
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, Math.min(1, delta * 5));
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={gltf.scene} rotation={[0, Math.PI, 0]} position={[0, -1.05, 0]} />
      </group>
    </Float>
  );
}

export default function RobotViewer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState(HOTSPOTS[0].id);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const activeHotspot = HOTSPOTS.find((h) => h.id === activeHotspotId) ?? HOTSPOTS[0];
  const activeChapter = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <section ref={sectionRef} className="relative h-[240vh] bg-midnight" id="robot-viewer">
      <div className="sticky top-[86px] h-[calc(100vh-96px)]">
        <div className="mx-auto h-full max-w-[1240px] px-4 pb-6 md:px-6 lg:px-10">
          <div className="relative h-full overflow-hidden rounded-[22px] border border-sun/30 bg-navy shadow-[0_18px_50px_rgba(19,42,65,0.35)]">
            <Canvas
              camera={{ position: CAMERA_POINTS[0], fov: 32 }}
              shadows
              onCreated={({ gl }) => {
                gl.outputColorSpace = SRGBColorSpace;
                gl.toneMapping = NoToneMapping;
              }}
            >
              <ambientLight intensity={0.42} />
              <directionalLight
                position={[2.2, 2.6, 4.8]}
                intensity={1.05}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <directionalLight position={[-2.4, 1.6, 2.6]} intensity={0.45} color="#ffffff" />

              <Environment preset="studio" />
              <CameraRig progress={progress} />
              {USE_PLACEHOLDER ? (
                <PlaceholderModel />
              ) : (
                <GLBModelWithMotion progress={progress} hotspotOffset={activeHotspot.offsetY} />
              )}

              <ContactShadows
                position={[0, -1.05, 0]}
                opacity={0.35}
                scale={7}
                blur={2}
                far={3}
                resolution={1024}
                color="#000000"
              />
            </Canvas>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_76%,rgba(255,255,255,0.1),transparent_46%)]" />

            <div className="pointer-events-none absolute left-4 top-4 max-w-[560px] md:left-7 md:top-6">
              <h2 className="m-0 text-3xl leading-[1.08] tracking-[-0.03em] text-slate-100 md:text-5xl">
                Interactive 3D Robot View
              </h2>
              <p className="mt-2 max-w-[620px] font-mono text-xs text-slate-300 md:text-sm">
                Scroll to choreograph cinematic camera transitions and inspect core robot systems in one continuous 3D
                experience.
              </p>
            </div>

            <div className="pointer-events-none absolute right-4 top-20 hidden w-[330px] space-y-2 md:block">
              {CHAPTERS.map((chapter, index) => (
                <motion.div
                  key={chapter.title}
                  animate={{ opacity: activeChapter === index ? 1 : 0.45, y: activeChapter === index ? 0 : 6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-xl border border-white/15 bg-slate-900/45 p-3 backdrop-blur-md"
                >
                  <p className="m-0 text-sm font-semibold text-slate-100">{chapter.title}</p>
                  <p className="mt-1 text-xs leading-[1.6] text-slate-300">{chapter.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 md:left-7 md:right-auto md:w-[460px]">
              <div className="pointer-events-auto flex flex-wrap gap-2">
                {HOTSPOTS.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setActiveHotspotId(hotspot.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                      hotspot.id === activeHotspotId
                        ? "border-sun/60 bg-sun text-navy"
                        : "border-white/25 bg-slate-900/45 text-slate-100 hover:border-sun/40 hover:bg-slate-900/70"
                    }`}
                  >
                    {hotspot.label}
                  </button>
                ))}
              </div>

              <div className="pointer-events-none rounded-xl border border-white/15 bg-slate-900/45 p-3 backdrop-blur-md">
                <p className="m-0 text-sm font-semibold text-slate-100">{activeHotspot.label}</p>
                <p className="mt-1 text-xs leading-[1.6] text-slate-300">{activeHotspot.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
