import { useState, useCallback, useEffect } from "react";
import { galleryImages } from "../data/content";

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

/* ─── Pixel camera icon for empty state ───────────────────────────────────── */
const PixelCamera = () => (
    <svg viewBox="0 0 32 24" className="w-16 h-12 pixel-planet mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="4" width="32" height="20" fill="var(--color-stardust)" />
        <rect x="2" y="6" width="28" height="16" fill="var(--color-nebula)" />
        <rect x="10" y="0" width="12" height="6" fill="var(--color-stardust)" />
        {/* Lens */}
        <rect x="12" y="10" width="8" height="2" fill="var(--color-cyan)" />
        <rect x="10" y="12" width="12" height="2" fill="var(--color-cyan)" />
        <rect x="10" y="14" width="12" height="2" fill="var(--color-cyan-glow)" />
        <rect x="12" y="16" width="8" height="2" fill="var(--color-cyan)" />
        {/* Flash */}
        <rect x="4" y="8" width="4" height="2" fill="var(--color-amber)" />
    </svg>
);

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const hasImages = galleryImages.length > 0;

    const prev = useCallback(() => {
        setIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
    }, []);

    const next = useCallback(() => {
        setIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next]);

    return (
        <section id="gallery" className="section-padding">
            <div className="section-max fade-in">
                <h2
                    className="mb-10 text-lg sm:text-xl text-[var(--color-cyan)] glow-cyan"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {"// "}Gallery
                </h2>

                {!hasImages ? (
                    /* ─── Empty State ─────────────────────────────────────────────── */
                    <div className="pixel-border bg-[var(--color-nebula)] p-12 text-center">
                        <PixelCamera />
                        <p
                            className="text-xs text-[var(--color-star-faint)] mb-2"
                            style={{ fontFamily: "var(--font-pixel)" }}
                        >
                            NO PHOTOS YET
                        </p>
                        <p className="text-xs text-[var(--color-star-dim)] max-w-sm mx-auto">
                            Add images to <code className="text-[var(--color-cyan)]">public/gallery/</code> and
                            register them in <code className="text-[var(--color-magenta)]">src/data/content.ts</code>
                        </p>
                    </div>
                ) : (
                    /* ─── Carousel ────────────────────────────────────────────────── */
                    <div className="pixel-border-glow bg-[var(--color-nebula)] p-2 sm:p-3 relative group">
                        {/* Viewport */}
                        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[var(--color-void)]">
                            {galleryImages.map((img, i) => (
                                <img
                                    key={img.src}
                                    src={img.src}
                                    alt={img.caption}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                    style={{ opacity: i === index ? 1 : 0 }}
                                    loading={i === 0 ? "eager" : "lazy"}
                                />
                            ))}

                            {/* Navigation arrows */}
                            {galleryImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prev}
                                        aria-label="Previous photo"
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--color-void)]/70 text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-all opacity-0 group-hover:opacity-100"
                                        style={{ border: "2px solid var(--color-grid)" }}
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={next}
                                        aria-label="Next photo"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--color-void)]/70 text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-all opacity-0 group-hover:opacity-100"
                                        style={{ border: "2px solid var(--color-grid)" }}
                                    >
                                        <ChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Caption + dots */}
                        <div className="mt-3 px-2 pb-1 flex flex-col items-center gap-2">
                            <p className="text-xs text-[var(--color-star-dim)] text-center">
                                {galleryImages[index]?.caption}
                            </p>

                            {galleryImages.length > 1 && (
                                <div className="flex gap-2">
                                    {galleryImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            aria-label={`Go to photo ${i + 1}`}
                                            className="w-2.5 h-2.5 transition-colors"
                                            style={{
                                                background: i === index ? "var(--color-cyan)" : "var(--color-grid)",
                                                boxShadow: i === index ? "0 0 8px rgba(34,211,238,0.4)" : "none",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <p
                                className="text-[10px] text-[var(--color-star-faint)]"
                                style={{ fontFamily: "var(--font-pixel)" }}
                            >
                                [{String(index + 1).padStart(2, "0")}/{String(galleryImages.length).padStart(2, "0")}]
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
