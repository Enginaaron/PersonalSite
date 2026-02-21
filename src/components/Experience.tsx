import { experiences } from "../data/content";

export default function Experience() {
    return (
        <section id="experience" className="section-padding">
            <div className="section-max fade-in">
                <h2
                    className="mb-10 text-lg sm:text-xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {"// "}Experience
                </h2>

                <div className="relative space-y-6 border-l-2 border-[var(--color-grid)] pl-8">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative group">
                            {/* Pixel dot */}
                            <div className="absolute -left-[calc(2rem+5px)] top-4 h-2.5 w-2.5 bg-[var(--color-cyan)] transition-colors group-hover:bg-[var(--color-magenta)]"
                                style={{ imageRendering: "pixelated" }} />

                            <div className="pixel-border bg-[var(--color-nebula)] p-5 transition-all duration-300 hover:border-[var(--color-cyan-glow)] hover:shadow-[4px_4px_0_0_var(--color-cyan-glow),0_0_20px_rgba(34,211,238,0.1)]">
                                <p
                                    className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-star-faint)]"
                                    style={{ fontFamily: "var(--font-pixel)" }}
                                >
                                    {exp.period}
                                </p>
                                <h3
                                    className="text-sm font-bold text-[var(--color-star-white)]"
                                    style={{ fontFamily: "var(--font-pixel)" }}
                                >
                                    {exp.role}
                                </h3>
                                <p className="mb-2 text-xs text-[var(--color-magenta)]">{exp.organization}</p>
                                <p className="text-xs leading-relaxed text-[var(--color-star-dim)]">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
