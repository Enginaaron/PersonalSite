import { profile } from "../data/content";

/* ─── Pixel Art Decorations ───────────────────────────────────────────────── */

const PixelRocket = () => (
    <svg viewBox="0 0 24 40" className="w-12 h-20 float pixel-planet" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nose */}
        <rect x="10" y="0" width="4" height="2" fill="#fb7185" />
        <rect x="8" y="2" width="8" height="2" fill="#fb7185" />
        {/* Body */}
        <rect x="6" y="4" width="12" height="4" fill="#e2e8f0" />
        <rect x="6" y="8" width="12" height="2" fill="#cbd5e1" />
        <rect x="10" y="6" width="4" height="4" fill="#22d3ee" />
        <rect x="6" y="10" width="12" height="6" fill="#e2e8f0" />
        {/* Wings */}
        <rect x="2" y="12" width="4" height="6" fill="#fb7185" />
        <rect x="18" y="12" width="4" height="6" fill="#fb7185" />
        {/* Exhaust */}
        <rect x="8" y="16" width="8" height="2" fill="#94a3b8" />
        {/* Flame */}
        <rect x="10" y="18" width="4" height="2" fill="#fbbf24" />
        <rect x="8" y="20" width="8" height="2" fill="#fb923c" />
        <rect x="10" y="22" width="4" height="2" fill="#fbbf24" />
        <rect x="11" y="24" width="2" height="2" fill="#fbbf24" className="twinkle" />
    </svg>
);

const PixelPlanet = () => (
    <svg viewBox="0 0 32 32" className="w-16 h-16 float float-delay-2 pixel-planet" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="4" width="8" height="2" fill="#c084fc" />
        <rect x="8" y="6" width="16" height="2" fill="#c084fc" />
        <rect x="6" y="8" width="20" height="2" fill="#a855f7" />
        <rect x="4" y="10" width="24" height="2" fill="#a855f7" />
        <rect x="4" y="12" width="24" height="2" fill="#9333ea" />
        {/* Ring */}
        <rect x="0" y="14" width="32" height="2" fill="#e879f9" />
        <rect x="4" y="16" width="24" height="2" fill="#9333ea" />
        <rect x="4" y="18" width="24" height="2" fill="#a855f7" />
        <rect x="6" y="20" width="20" height="2" fill="#a855f7" />
        <rect x="8" y="22" width="16" height="2" fill="#c084fc" />
        <rect x="12" y="24" width="8" height="2" fill="#c084fc" />
    </svg>
);

const PixelStar = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 8 8" className={`w-4 h-4 pixel-planet ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="0" width="2" height="2" fill="#fbbf24" />
        <rect x="0" y="3" width="2" height="2" fill="#fbbf24" />
        <rect x="3" y="3" width="2" height="2" fill="#fde68a" />
        <rect x="6" y="3" width="2" height="2" fill="#fbbf24" />
        <rect x="3" y="6" width="2" height="2" fill="#fbbf24" />
    </svg>
);

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
            {/* Decorative pixel elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-24 left-[10%] opacity-60">
                    <PixelStar className="twinkle twinkle-delay-1" />
                </div>
                <div className="absolute top-32 right-[15%] opacity-40">
                    <PixelStar className="twinkle twinkle-delay-3" />
                </div>
                <div className="absolute bottom-40 left-[8%] opacity-50 hidden md:block">
                    <PixelPlanet />
                </div>
                <div className="absolute top-28 right-[8%] opacity-60 hidden md:block">
                    <PixelRocket />
                </div>
                <div className="absolute bottom-48 right-[20%] opacity-30">
                    <PixelStar className="twinkle twinkle-delay-2" />
                </div>
                <div className="absolute top-48 left-[30%] opacity-20">
                    <PixelStar className="twinkle twinkle-delay-4" />
                </div>
            </div>

            <div className="relative z-10">
                {/* Location tag */}
                <p
                    className="mb-4 text-[10px] tracking-[0.3em] uppercase text-[var(--color-star-faint)]"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    [ {profile.location} ]
                </p>

                {/* Name */}
                <h1
                    className="mb-2 text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {profile.name}
                </h1>

                {/* Blinking cursor tagline */}
                <p className="mb-8 text-sm text-[var(--color-star-dim)]" style={{ fontFamily: "var(--font-body)" }}>
                    {"// "}{profile.title}
                    <span className="inline-block w-2 h-4 ml-1 bg-[var(--color-cyan)] animate-pulse align-middle" />
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="pixel-border-glow bg-[var(--color-nebula)] px-6 py-2.5 text-xs uppercase tracking-widest text-[var(--color-cyan)] hover:bg-[var(--color-cyan)] hover:text-[var(--color-void)] transition-colors"
                        style={{ fontFamily: "var(--font-pixel)" }}
                    >
                        View My Work
                    </a>
                    <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-border bg-[var(--color-nebula)] px-6 py-2.5 text-xs uppercase tracking-widest text-[var(--color-star-dim)] hover:text-[var(--color-magenta)] hover:border-[var(--color-magenta)] transition-colors"
                        style={{ fontFamily: "var(--font-pixel)" }}
                    >
                        Résumé ↗
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                className="absolute bottom-10 text-[var(--color-star-faint)] hover:text-[var(--color-cyan)] transition-colors"
                aria-label="Scroll to about section"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
            </a>
        </section>
    );
}
