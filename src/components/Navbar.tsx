import { useState, useEffect } from "react";
import { navLinks, profile } from "../data/content";

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export default function Navbar() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored) return stored === "dark";
            return true; // default to dark for space theme
        }
        return true;
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");

        // Update body styles for light mode
        if (!dark) {
            document.body.style.backgroundColor = "#e8ecf4";
            document.body.style.color = "#0f172a";
        } else {
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        }
    }, [dark]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[var(--color-void)]/95 backdrop-blur-md border-b-2 border-[var(--color-grid)]"
                    : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
                {/* Logo */}
                <a
                    href="#"
                    className="text-sm tracking-wider text-[var(--color-cyan)] glow-cyan hover:text-[var(--color-magenta)] transition-colors"
                    style={{ fontFamily: "var(--font-pixel)" }}
                >
                    {">"} {profile.name.toUpperCase().replace(" ", "_")}
                </a>

                {/* Desktop Links */}
                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs uppercase tracking-widest text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-colors"
                            style={{ fontFamily: "var(--font-pixel)" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle dark mode"
                        className="p-2 text-[var(--color-star-dim)] hover:text-[var(--color-amber)] transition-colors"
                    >
                        {dark ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={() => setDark(!dark)}
                        aria-label="Toggle dark mode"
                        className="p-2 text-[var(--color-star-dim)] hover:text-[var(--color-amber)] transition-colors"
                    >
                        {dark ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        className="p-2 text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-colors"
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-80 border-b-2 border-[var(--color-grid)]" : "max-h-0"
                    } bg-[var(--color-void)]/95 backdrop-blur-md`}
            >
                <div className="flex flex-col gap-1 px-6 py-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-2 text-xs uppercase tracking-widest text-[var(--color-star-dim)] hover:text-[var(--color-cyan)] transition-colors"
                            style={{ fontFamily: "var(--font-pixel)" }}
                        >
                            [{link.label}]
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
