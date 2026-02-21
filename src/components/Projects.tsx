import { projects } from "../data/content";

export default function Projects() {
    const accentColors = [
        { border: "pixel-border-glow", tag: "var(--color-cyan)", tagBg: "rgba(34,211,238,0.1)" },
        { border: "pixel-border-magenta", tag: "var(--color-magenta)", tagBg: "rgba(232,121,249,0.1)" },
    ];

    return (
        <section id="projects" className="section-padding">
            <div className="section-max fade-in">
                <h2
                    className="mb-10 text-lg sm:text-xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {"// "}Projects
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project, i) => {
                        const accent = accentColors[i % accentColors.length];
                        return (
                            <article
                                key={i}
                                className={`group ${accent.border} bg-[var(--color-nebula)] p-6 transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="mb-3 flex items-start justify-between gap-2">
                                    <div>
                                        <h3
                                            className="text-sm font-bold text-[var(--color-star-white)]"
                                            style={{ fontFamily: "var(--font-pixel)" }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-xs" style={{ color: accent.tag }}>
                                            {project.description}
                                        </p>
                                    </div>
                                    <span
                                        className="shrink-0 text-[10px] text-[var(--color-star-faint)]"
                                        style={{ fontFamily: "var(--font-pixel)" }}
                                    >
                                        {project.period}
                                    </span>
                                </div>

                                <ul className="mb-4 space-y-2">
                                    {project.bullets.map((bullet, j) => (
                                        <li
                                            key={j}
                                            className="flex gap-2 text-xs leading-relaxed text-[var(--color-star-dim)]"
                                        >
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ background: accent.tag }} />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider"
                                            style={{
                                                fontFamily: "var(--font-pixel)",
                                                color: accent.tag,
                                                background: accent.tagBg,
                                                border: `1px solid ${accent.tag}`,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {(project.repoUrl || project.liveUrl) && (
                                    <div className="mt-4 flex gap-4 border-t border-[var(--color-grid)] pt-4">
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-[var(--color-star-faint)] hover:text-[var(--color-cyan)] transition-colors"
                                                style={{ fontFamily: "var(--font-pixel)" }}
                                            >
                                                [GitHub] ↗
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-[var(--color-star-faint)] hover:text-[var(--color-magenta)] transition-colors"
                                                style={{ fontFamily: "var(--font-pixel)" }}
                                            >
                                                [Demo] ↗
                                            </a>
                                        )}
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
