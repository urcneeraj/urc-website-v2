import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const MEDIA_EXTS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".mp4",
  ".webm",
  ".mov",
  ".avi",
]);

const SKIP_DIRS = new Set(["node_modules", ".next", "out", ".git"]);

const TEXT_EXT = new Set([
  ".tsx",
  ".ts",
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".css",
  ".scss",
  ".md",
  ".mdx",
  ".json",
  ".html",
  ".toml",
  ".txt",
  ".yml",
  ".yaml",
]);

function walk(dir, acc = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(p, acc);
    } else acc.push(p);
  }
  return acc;
}

function walkPublicMedia(dir) {
  let out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walkPublicMedia(p));
    else if (MEDIA_EXTS.has(path.extname(ent.name).toLowerCase())) out.push(p);
  }
  return out;
}

function loadSourceHaystack() {
  const files = walk(root).filter((f) => {
    const rel = path.relative(root, f).replace(/\\/g, "/");
    const ext = path.extname(f).toLowerCase();
    if (rel.startsWith("public/")) {
      return ext === ".json" || ext === ".html" || ext === ".xml" || ext === ".webmanifest";
    }
    return TEXT_EXT.has(ext);
  });
  const chunks = [];
  for (const f of files) {
    try {
      chunks.push(fs.readFileSync(f, "utf8"));
    } catch {
      /* binary or unreadable */
    }
  }
  return chunks.join("\n");
}

const publicDir = path.join(root, "public");
const mediaAbs = walkPublicMedia(publicDir);
const haystack = loadSourceHaystack();
const hayLower = haystack.toLowerCase();

function isReferenced(basename) {
  if (haystack.includes(basename)) return true;
  return hayLower.includes(basename.toLowerCase());
}

const unused = [];
const used = [];

for (const abs of mediaAbs) {
  const base = path.basename(abs);
  const rel = path.relative(root, abs).replace(/\\/g, "/");
  if (isReferenced(base)) used.push(rel);
  else unused.push(rel);
}

console.log(`Scanned ${mediaAbs.length} images/videos under public/`);
console.log(`Against source text in repo (excluding public/ and build dirs).\n`);
console.log(`Unused (${unused.length}):\n`);
unused.sort().forEach((u) => console.log(`  ${u}`));
console.log(`\nReferenced (${used.length}):\n`);
used.sort().forEach((u) => console.log(`  ${u}`));
