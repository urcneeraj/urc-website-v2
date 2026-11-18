export type SocialPlatform = "linkedin" | "youtube";

export const SOCIAL_PROFILES = [
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/urc-robotics" },
  { platform: "youtube", label: "YouTube", href: "https://youtube.com/@urcrobotics" },
] as const;

export function SocialIcon({ platform, className = "h-4 w-4" }: { platform: SocialPlatform; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      {platform === "youtube" ? (
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      ) : (
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.96V9.2h2.97v9.55ZM6.45 7.9a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.85h-2.97V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.47V9.2h2.85v1.3h.04c.4-.76 1.37-1.55 2.82-1.55 3.01 0 3.57 1.98 3.57 4.56v5.24Z" />
      )}
    </svg>
  );
}

export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const colors = tone === "dark"
    ? "border-white/15 bg-white/[0.04] text-slate-200 hover:border-sky-300/50 hover:bg-white/[0.09] hover:text-white focus-visible:outline-sky-300"
    : "border-navy/15 bg-white text-navy hover:border-sky-400/60 hover:bg-sky-50 focus-visible:outline-sky-600";
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_PROFILES.map(({ platform, label, href }) => (
        <a key={platform} href={href} target="_blank" rel="noopener noreferrer" aria-label={`URC Robotics on ${label} (opens in a new tab)`} className={`inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl border px-3.5 py-2 font-sans text-sm font-bold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${colors}`}>
          <SocialIcon platform={platform} className="h-[18px] w-[18px]" />
          <span>{label}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-1 h-3 w-3 opacity-50" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg>
        </a>
      ))}
    </div>
  );
}
