import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const rocketRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hidden on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;
        let currentAngle = 0;

        let targetAngle = 0;
        let lastMoveTime = Date.now();

        type Particle = { id: number; x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };
        const particles: Particle[] = [];
        let particleId = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMoveTime = Date.now();
        };

        window.addEventListener("mousemove", onMouseMove);

        let rafId: number;
        const loop = () => {
            // Smooth position lerping
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            currentX += dx * 0.25;
            currentY += dy * 0.25;

            const speed = Math.sqrt(dx * dx + dy * dy);
            const isIdle = Date.now() - lastMoveTime > 150;

            // Determine target angle
            if (!isIdle && speed > 0.5) {
                // +90 because our rocket SVG is drawn pointing UP (nose at top)
                targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            } else if (isIdle) {
                targetAngle = 0;
            }

            // Smooth rotation (handling wrap-around -180 to 180)
            let diff = targetAngle - currentAngle;
            diff = ((diff + 180) % 360 + 360) % 360 - 180;
            currentAngle += diff * 0.15;

            if (rocketRef.current) {
                rocketRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentAngle}deg)`;
            }

            // Spawn exhaust particles from the tail
            // Rocket height in SVG is approx 24px visually, tail is around +12px from center pointing down
            if (!isIdle && speed > 1 && Math.random() > 0.2) {
                // Calculate the tail exhaust spawn point based on current rotation
                const rad = currentAngle * (Math.PI / 180);
                // tail offset ~ 16px down local Y axis
                const tailX = currentX - Math.sin(rad) * 16 + (Math.random() * 4 - 2);
                const tailY = currentY + Math.cos(rad) * 16 + (Math.random() * 4 - 2);

                const colors = ["bg-[var(--color-amber)]", "bg-[var(--color-orange, #f97316)]", "bg-[var(--color-magenta)]", "bg-[var(--color-cyan)]"];

                particles.push({
                    id: particleId++,
                    x: tailX,
                    y: tailY,
                    // Add some slight random velocity outward from the tail
                    vx: -Math.sin(rad) * (Math.random() * 2) + (Math.random() * 2 - 1),
                    vy: Math.cos(rad) * (Math.random() * 2) + (Math.random() * 2 - 1),
                    life: 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() < 0.5 ? 4 : 6, // 4px or 6px square pixels
                });
            }

            // Update and draw exhaust particles directly using DOM for performance
            if (particlesRef.current) {
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.life -= Math.random() * 0.05 + 0.02; // fade out speed
                    p.x += p.vx;
                    p.y += p.vy;

                    let el = document.getElementById(`particle-${p.id}`);

                    if (p.life <= 0) {
                        if (el) el.remove();
                        particles.splice(i, 1);
                    } else {
                        if (!el) {
                            el = document.createElement("div");
                            el.id = `particle-${p.id}`;
                            // Pixel square appearance
                            el.className = `absolute pointer-events-none pixel-planet ${p.color}`;
                            el.style.width = `${p.size}px`;
                            el.style.height = `${p.size}px`;

                            // Apply cyan/magenta glow logic occasionally for the theme
                            if (p.color.includes("cyan")) el.classList.add("pixel-border-glow");
                            if (p.color.includes("magenta")) el.classList.add("pixel-border-magenta");

                            particlesRef.current.appendChild(el);
                        }
                        // Center the particle on its x,y
                        el.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0) scale(${p.life})`;
                        el.style.opacity = p.life.toString();
                    }
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* Container for trailing particles */}
            <div ref={particlesRef} />

            {/* The Rocket Cursor */}
            <div
                ref={rocketRef}
                className="absolute w-8 h-8 -ml-4 -mt-4 transition-none"
                style={{ willChange: "transform" }}
            >
                <svg viewBox="0 0 24 32" className="w-full h-full pixel-planet drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Custom pixel rocket oriented UP by default */}
                    {/* Nose */}
                    <rect x="10" y="2" width="4" height="2" fill="var(--color-magenta)" />
                    <rect x="8" y="4" width="8" height="2" fill="var(--color-magenta)" />
                    {/* Body */}
                    <rect x="6" y="6" width="12" height="4" fill="#e2e8f0" />
                    <rect x="6" y="10" width="12" height="2" fill="#cbd5e1" />
                    {/* Window */}
                    <rect x="10" y="8" width="4" height="4" fill="var(--color-cyan)" />
                    <rect x="6" y="12" width="12" height="8" fill="#e2e8f0" />
                    {/* Wings */}
                    <rect x="2" y="14" width="4" height="8" fill="var(--color-magenta)" />
                    <rect x="18" y="14" width="4" height="8" fill="var(--color-magenta)" />
                    {/* Thruster base */}
                    <rect x="8" y="20" width="8" height="2" fill="#94a3b8" />
                </svg>
            </div>
        </div>
    );
}
