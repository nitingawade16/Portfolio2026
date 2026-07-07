import { useEffect, useRef, useState } from "react";

/**
 * Canvas-based floating particles background with optimization
 */
export default function Particles({ count = 15, color = "#FF6B35", opacity = 0.3 }) {
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);

        const handleMediaChange = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleMediaChange);
        return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        let animId;
        let isVisible = true;

        // Intersection Observer to pause when not visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        // Unified resize handler
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });

        const actualCount = Math.min(count, 12); // Reduced for performance

        // Create particles
        const particles = Array.from({ length: actualCount }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            r: Math.random() * 1.2 + 0.4,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * opacity + 0.03,
        }));

        const draw = () => {
            if (isVisible) {
                const w = canvas.offsetWidth;
                const h = canvas.offsetHeight;
                ctx.clearRect(0, 0, w, h);

                particles.forEach((p) => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle =
                        color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
                    ctx.fill();

                    p.x += p.dx;
                    p.y += p.dy;

                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    if (p.y < 0) p.y = h;
                    if (p.y > h) p.y = 0;
                });

                animId = requestAnimationFrame(draw);
            }
        };

        draw();

        return () => {
            if (animId) cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, [isMobile, color, opacity, count]);

    return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: isMobile ? "none" : "block" }} />;
}
