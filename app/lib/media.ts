const rawMediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim() ?? "";

function normalizeBase(base: string): string {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export function mediaUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const mediaBase = normalizeBase(rawMediaBase);
  if (!mediaBase) return normalizedPath;
  return `${mediaBase}${normalizedPath}`;
}

