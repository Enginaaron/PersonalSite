import { profile } from "../data/content";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t-2 border-[var(--color-grid)] px-6 py-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p
                    className="text-[10px] tracking-wider text-[var(--color-star-faint)]"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    © {year} {profile.name}
                </p>
                <p
                    className="text-[10px] tracking-wider text-[var(--color-star-faint)]"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    <span className="text-[var(--color-cyan)]">{">"}</span> REACT
                    <span className="text-[var(--color-star-faint)]"> + </span>
                    <span className="text-[var(--color-magenta)]">TAILWIND</span>
                    <span className="text-[var(--color-star-faint)]"> + </span>
                    <span className="text-[var(--color-amber)]">VITE</span>
                </p>
            </div>
        </footer>
    );
}
