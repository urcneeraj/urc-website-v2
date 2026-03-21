"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const trendData = [
  { month: "Jan", coverage: 68, uptime: 90 },
  { month: "Feb", coverage: 72, uptime: 91 },
  { month: "Mar", coverage: 78, uptime: 93 },
  { month: "Apr", coverage: 81, uptime: 94 },
  { month: "May", coverage: 86, uptime: 95 },
  { month: "Jun", coverage: 91, uptime: 97 },
];

const splitData = [
  { name: "Scrub", value: 46, color: "#132A41" },
  { name: "Transit", value: 29, color: "#ef0806" },
  { name: "Dock/Charge", value: 17, color: "#ffed29" },
  { name: "Idle", value: 8, color: "#94a3b8" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AnalyticsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.section
      id="dashboard"
      className="bg-midnight py-[84px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-11 text-center">
          <h2 className="m-0 mb-2.5 text-[2.3rem] leading-[1.12] tracking-[-0.02em] text-slate-100">
            Live Operations Dashboard
          </h2>
          <p className="mx-auto m-0 max-w-[760px] font-mono text-sm font-medium leading-[1.7] text-slate-300">
            Real-time fleet analytics across coverage, uptime, and cleaning-cycle behavior from deployed URC systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 [perspective:1200px]">
          <motion.div
            whileHover={{ rotateX: 3, rotateY: -5, z: 16 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="rounded-[18px] border border-white/15 bg-navy/55 p-5 shadow-[0_14px_38px_rgba(2,6,23,0.35)] backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-300">
              Coverage & Uptime Trend
            </p>
            <div className="h-[280px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                    <XAxis dataKey="month" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(5,26,47,0.95)",
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 12,
                        color: "#f1f5f9",
                      }}
                    />
                    <Line type="monotone" dataKey="coverage" stroke="#ef0806" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="uptime" stroke="#ffed29" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
              )}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ rotateX: 3, rotateY: 5, z: 16 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="rounded-[18px] border border-white/15 bg-navy/55 p-5 shadow-[0_14px_38px_rgba(2,6,23,0.35)] backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-300">
              Cleaning Cycle Distribution
            </p>
            <div className="h-[280px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(5,26,47,0.95)",
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 12,
                        color: "#f1f5f9",
                      }}
                    />
                    <Pie
                      data={splitData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={96}
                      innerRadius={56}
                      paddingAngle={2}
                    >
                      {splitData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
              )}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {splitData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="font-mono text-xs text-slate-300">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
