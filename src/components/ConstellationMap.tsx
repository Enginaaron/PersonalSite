import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { constellations, type Constellation } from "../data/constellations";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Compute the centroid (avg x, avg y) of a constellation's stars in viewport % */
function centroid(c: Constellation) {
    const n = c.stars.length;
    const cx = c.stars.reduce((s, st) => s + st.x, 0) / n;
    const cy = c.stars.reduce((s, st) => s + st.y, 0) / n;
    return { cx, cy };
}

/** Total edge path length in viewport-%-space (used for stroke-dasharray) */
function edgeLength(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    vw: number,
    vh: number
) {
    const dx = ((x2 - x1) / 100) * vw;
    const dy = ((y2 - y1) / 100) * vh;
    return Math.sqrt(dx * dx + dy * dy);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ConstellationMap() {
    const [hovered, setHovered] = useState<string | null>(null);
    const hoveredRef = useRef<string | null>(null);
    const [pulsing, setPulsing] = useState<string | null>(null);
    const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

    // Track viewport size for accurate edge length calculations
    useEffect(() => {
        const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Precompute centroids
    const centroids = useMemo(
        () => constellations.map((c) => ({ id: c.id, ...centroid(c) })),
        []
    );

    // Global mousemove proximity detection
    useEffect(() => {
        const HIT_RADIUS_PCT = 9; // % of viewport diagonal

        const onMove = (e: MouseEvent) => {
            const mx = (e.clientX / window.innerWidth) * 100;
            const my = (e.clientY / window.innerHeight) * 100;

            let closest: string | null = null;
            let closestDist = Infinity;

            for (const { id, cx, cy } of centroids) {
                const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
                if (dist < HIT_RADIUS_PCT && dist < closestDist) {
                    closest = id;
                    closestDist = dist;
                }
            }

            hoveredRef.current = closest;
            setHovered(closest);
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [centroids]);

    // Navigate to constellation target
    const navigateTo = useCallback(
        (c: Constellation) => {
            const target = document.querySelector(c.targetHref);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
            setPulsing(c.id);
            setTimeout(() => {
                setPulsing(null);
                setHovered(null);
                hoveredRef.current = null;
            }, 700);
        },
        []
    );

    // Global click listener — fires navigation when a constellation is hovered
    useEffect(() => {
        const onClick = () => {
            const id = hoveredRef.current;
            if (!id) return;
            const c = constellations.find((cn) => cn.id === id);
            if (c) navigateTo(c);
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, [navigateTo]);

    return (
        <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none", zIndex: 2 }}
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            {/* SVG filter for star glow */}
            <defs>
                <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="star-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {constellations.map((c) => {
                const isActive = hovered === c.id;
                const isPulsing = pulsing === c.id;
                const { cx, cy } = centroid(c);

                return (
                    <g key={c.id}>

                        {/* ── Connection lines ── */}
                        {c.edges.map((edge, ei) => {
                            const s1 = c.stars[edge.from];
                            const s2 = c.stars[edge.to];
                            const x1 = (s1.x / 100) * dims.w;
                            const y1 = (s1.y / 100) * dims.h;
                            const x2 = (s2.x / 100) * dims.w;
                            const y2 = (s2.y / 100) * dims.h;
                            const len = edgeLength(s1.x, s1.y, s2.x, s2.y, dims.w, dims.h);

                            return (
                                <line
                                    key={`${c.id}-edge-${ei}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    className="constellation-line"
                                    stroke="var(--color-cyan)"
                                    strokeWidth="1"
                                    strokeDasharray={len}
                                    strokeDashoffset={isActive || isPulsing ? 0 : len}
                                    style={{
                                        opacity: isActive || isPulsing ? 0.5 : 0,
                                        transition: `stroke-dashoffset 0.6s ease ${ei * 0.06}s, opacity 0.4s ease`,
                                    }}
                                />
                            );
                        })}

                        {/* ── Stars ── */}
                        {c.stars.map((star, si) => {
                            const sx = (star.x / 100) * dims.w;
                            const sy = (star.y / 100) * dims.h;
                            const r = star.size ?? 2;

                            return (
                                <circle
                                    key={`${c.id}-star-${si}`}
                                    cx={sx}
                                    cy={sy}
                                    r={isActive ? r + 1 : r}
                                    fill={isActive ? "var(--color-cyan)" : "var(--color-star-dim)"}
                                    filter={isActive ? "url(#star-glow-strong)" : undefined}
                                    className={isPulsing ? "constellation-pulse" : ""}
                                    style={{
                                        opacity: isActive || isPulsing ? 1 : 0.35,
                                        transition: "r 0.4s ease, fill 0.4s ease, opacity 0.4s ease",
                                    }}
                                />
                            );
                        })}

                        {/* ── Label ── */}
                        <text
                            x={(((cx + c.labelOffset.x) / 100) * dims.w)}
                            y={(((cy + c.labelOffset.y) / 100) * dims.h)}
                            textAnchor="middle"
                            fill="var(--color-cyan)"
                            fontFamily="var(--font-pixel)"
                            fontSize="10"
                            letterSpacing="0.2em"
                            className="constellation-label"
                            style={{
                                opacity: isActive || isPulsing ? 1 : 0,
                                transition: "opacity 0.4s ease 0.15s",
                                filter: isActive ? "drop-shadow(0 0 6px rgba(34,211,238,0.6))" : "none",
                            }}
                        >
                            {c.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
