// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
    title: string;
    description: string;
    bullets: string[];
    period: string;
    tags: string[];
    repoUrl?: string;
    liveUrl?: string;
}

export interface Experience {
    role: string;
    organization: string;
    period: string;
    description: string;
}

export interface GalleryImage {
    src: string;
    caption: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const profile = {
    name: "Aaron Dam",
    title: "Software Developer",
    location: "Hamilton, ON, CA",
    email: "aarondam@hotmail.com",
    phone: "+1 (905) 519-8958",
    bio: "An aspiring engineer with a background in approaching STEM subjects creatively. Demonstrated ability to lead collaborative projects, foster relationships with peers, and build polished products under time constraints.",
    resumeUrl: "/AaronDam.pdf",
    socials: {
        github: "https://github.com/aarondam",
        linkedin: "https://linkedin.com/in/aarondam",
    },
};

export const experiences: Experience[] = [
    {
        role: "Organizer & Developer",
        organization: "HammerHacks",
        period: "Aug 2025 – Present",
        description:
            "Leading development of the official 2026 website for Hamilton's largest high school hackathon, coordinating with fellow organizers while integrating user feedback.",
    },
    {
        role: "President & Software Lead",
        organization: "Westmount Robotics Club",
        period: "Nov 2024 – Present",
        description:
            "Founded high-school robotics club and led a team of 10+ students in FTC robotics, managing club operations while tutoring members in Java-based control systems.",
    },
    {
        role: "Director of Operations",
        organization: "Hamilton Code for Change",
        period: "May 2025 – Present",
        description:
            "Leading operations for a non-profit organization focusing on using technology to solve community problems.",
    },
];

export const projects: Project[] = [
    {
        title: "Cafe Cafe",
        description: "2D Cooking Game",
        period: "Jan 2025 – Apr 2025",
        bullets: [
            "Led development of core systems (player movement, object interaction, and order fulfillment) in a fast-paced kitchen simulator using Godot.",
            "Collaborated as a team via GitHub and Slack, establishing agile methodology and mentoring branching and version control to teammates.",
            "Presented live in Shanghai, China to tech employees, researchers, and mentors, receiving praise for technical polish and design originality.",
        ],
        tags: ["Godot", "GDScript", "Game Dev", "Agile"],
    },
    {
        title: "PowerFlare",
        description: "Solar Forecast App",
        period: "Mar 2025",
        bullets: [
            "Engineered API endpoints to deliver high-precision solar irradiance forecasts, leveraging external meteorological datasets for 48-hour predictive windows.",
            "Built a database management system for user authentication and data persistence using Firebase.",
            "Presented live to panel of judges at CNLC 2025, achieved the award \"National Runner-Up\" over 30+ teams.",
        ],
        tags: ["Python", "Firebase", "REST API", "AWS"],
    },
];

// ─── Gallery ──────────────────────────────────────────────────────────────────
// Add your photos to public/gallery/ and register them here.

export const galleryImages: GalleryImage[] = [
    { src: "/gallery/undercity.jpg", caption: "Hack Club's Undercity hackathon at GitHub HQ, San Francisco" },
    { src: "/gallery/hammerhacks.jpg", caption: "Achieving Top 3 at HammerHacks" }
];

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
];
