import { useEffect } from "react";

/** Adds the `visible` class to `.fade-in` elements when they scroll into view. */
export function useFadeIn() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}
