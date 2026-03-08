// ─── Constellation Types ─────────────────────────────────────────────────────

export interface ConstellationStar {
    x: number; // % of viewport width (0–100)
    y: number; // % of viewport height (0–100)
    size?: number; // px radius, default 2
}

export interface ConstellationEdge {
    from: number; // index into stars[]
    to: number;
}

export interface Constellation {
    id: string;
    label: string;
    targetHref: string; // e.g. "#about"
    stars: ConstellationStar[];
    edges: ConstellationEdge[];
    labelOffset: { x: number; y: number }; // % offset from centroid
}

// ─── Constellation Definitions ───────────────────────────────────────────────

export const constellations: Constellation[] = [
    // ── ORIGIN → About ── (upper-left, arrow/compass shape)
    {
        id: "origin",
        label: "ORIGIN",
        targetHref: "#about",
        stars: [
            { x: 12, y: 22 },
            { x: 15, y: 18 },
            { x: 18, y: 15, size: 3 }, // bright tip
            { x: 14, y: 25 },
            { x: 17, y: 28 },
            { x: 20, y: 20 },
            { x: 11, y: 19 },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 0, to: 3 },
            { from: 3, to: 4 },
            { from: 1, to: 5 },
            { from: 6, to: 0 },
        ],
        labelOffset: { x: 0, y: -5 },
    },

    // ── MISSIONS → Experience ── (center-right, zigzag path)
    {
        id: "missions",
        label: "MISSIONS",
        targetHref: "#experience",
        stars: [
            { x: 78, y: 18 },
            { x: 82, y: 22 },
            { x: 79, y: 27, size: 3 },
            { x: 84, y: 31 },
            { x: 81, y: 36 },
            { x: 85, y: 24 },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 1, to: 5 },
        ],
        labelOffset: { x: 0, y: -5 },
    },

    // ── SYSTEMS → Projects ── (upper-right, circuit-board shape)
    {
        id: "systems",
        label: "SYSTEMS",
        targetHref: "#projects",
        stars: [
            { x: 82, y: 55 },
            { x: 86, y: 52 },
            { x: 90, y: 55, size: 3 },
            { x: 86, y: 58 },
            { x: 88, y: 62 },
            { x: 84, y: 63 },
            { x: 91, y: 60 },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 3, to: 4 },
            { from: 3, to: 5 },
            { from: 2, to: 6 },
        ],
        labelOffset: { x: 0, y: -5 },
    },

    // ── MUSEUM → Gallery ── (center-left, frame/diamond shape)
    {
        id: "museum",
        label: "MUSEUM",
        targetHref: "#gallery",
        stars: [
            { x: 10, y: 55, size: 3 },
            { x: 14, y: 50 },
            { x: 18, y: 55 },
            { x: 14, y: 60 },
            { x: 11, y: 52 },
            { x: 17, y: 52 },
            { x: 17, y: 58 },
            { x: 11, y: 58 },
        ],
        edges: [
            { from: 0, to: 4 },
            { from: 4, to: 1 },
            { from: 1, to: 5 },
            { from: 5, to: 2 },
            { from: 2, to: 6 },
            { from: 6, to: 3 },
            { from: 3, to: 7 },
            { from: 7, to: 0 },
        ],
        labelOffset: { x: 0, y: -6 },
    },

    // ── TRANSMISSION → Contact ── (lower-center, antenna/signal shape)
    {
        id: "transmission",
        label: "TRANSMISSION",
        targetHref: "#contact",
        stars: [
            { x: 48, y: 82 },
            { x: 50, y: 78, size: 3 },
            { x: 52, y: 82 },
            { x: 46, y: 76 },
            { x: 54, y: 76 },
            { x: 50, y: 73 },
            { x: 50, y: 86 },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 1, to: 5 },
            { from: 3, to: 5 },
            { from: 4, to: 5 },
            { from: 0, to: 6 },
            { from: 2, to: 6 },
        ],
        labelOffset: { x: 0, y: -7 },
    },
];
