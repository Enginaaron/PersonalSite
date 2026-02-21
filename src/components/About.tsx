import { profile } from "../data/content";

export default function About() {
    return (
        <section id="about" className="section-padding">
            <div className="section-max fade-in">
                <h2
                    className="mb-8 text-lg sm:text-xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {"// "}About
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 pixel-border bg-[var(--color-nebula)] p-6">
                        <p className="text-sm leading-relaxed text-[var(--color-star-dim)]">
                            {profile.bio}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-xs">
                        <div className="pixel-border bg-[var(--color-nebula)] p-4">
                            <span
                                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-magenta)] mb-1"
                                style={{ fontFamily: "var(--font-pixel)" }}
                            >
                                LOCATION
                            </span>
                            <span className="text-[var(--color-star-dim)]">{profile.location}</span>
                        </div>
                        <div className="pixel-border bg-[var(--color-nebula)] p-4">
                            <span
                                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-magenta)] mb-1"
                                style={{ fontFamily: "var(--font-pixel)" }}
                            >
                                MAIL
                            </span>
                            <a href={`mailto:${profile.email}`} className="text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-colors">
                                {profile.email}
                            </a>
                        </div>
                        <div className="pixel-border bg-[var(--color-nebula)] p-4">
                            <span
                                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-magenta)] mb-1"
                                style={{ fontFamily: "var(--font-pixel)" }}
                            >
                                FILE
                            </span>
                            <a
                                href={profile.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-colors"
                            >
                                resume.pdf ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
