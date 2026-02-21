import { skills } from "../data/content";

const categoryColors: Record<string, string> = {
    "Languages & Frameworks": "var(--color-cyan)",
    "Software & Tools": "var(--color-magenta)",
};

export default function Skills() {
    return (
        <section id="skills" className="section-padding">
            <div className="section-max fade-in">
                <h2
                    className="mb-10 text-lg sm:text-xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {"// "}Skills
                </h2>

                <div className="grid gap-10 md:grid-cols-2">
                    {skills.map((group, i) => {
                        const color = categoryColors[group.category] || "var(--color-cyan)";
                        return (
                            <div key={i}>
                                <h3
                                    className="mb-4 text-[10px] uppercase tracking-[0.2em]"
                                    style={{ fontFamily: "var(--font-pixel)", color }}
                                >
                                    {group.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-xs text-[var(--color-star-dim)] bg-[var(--color-nebula)] transition-all duration-200 cursor-default hover:text-[var(--color-star-white)]"
                                            style={{
                                                fontFamily: "var(--font-pixel)",
                                                fontSize: "10px",
                                                border: `2px solid var(--color-grid)`,
                                                boxShadow: "3px 3px 0 0 var(--color-grid)",
                                            }}
                                            onMouseEnter={(e) => {
                                                const el = e.currentTarget;
                                                el.style.borderColor = color;
                                                el.style.boxShadow = `3px 3px 0 0 ${color}`;
                                                el.style.color = color;
                                            }}
                                            onMouseLeave={(e) => {
                                                const el = e.currentTarget;
                                                el.style.borderColor = "var(--color-grid)";
                                                el.style.boxShadow = "3px 3px 0 0 var(--color-grid)";
                                                el.style.color = "";
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
