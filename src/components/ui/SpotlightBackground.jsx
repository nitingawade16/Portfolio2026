Simport { useEffect, useRef, useState } from "react";

export default function SpotlightBackground() {
    const spotRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const rafRef = useRef(null);
    const lastUpdateRef = useRef(0);

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const move = (e) => {
            const now = Date.now();
            // Throttle to max 60fps (16.67ms)
            if (now - lastUpdateRef.current < 16) return;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                if (!spotRef.current) return;
                spotRef.current.style.background = `
                    radial-gradient(
                        600px circle at ${e.clientX}px ${e.clientY}px, 
                        rgba(0,182,212,0.05) 0%, 
                        rgba(0,102,255,0.025) 25%, 
                        transparent 65%
                    )
                `;
                lastUpdateRef.current = now;
            });
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => {
            window.removeEventListener("mousemove", move);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile]);

    return (
        <>
            {!isMobile && (
                <div
                    ref={spotRef}
                    style={{
                        position: "fixed",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
            )}
        </>
    );
}
