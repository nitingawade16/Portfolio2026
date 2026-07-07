import { useEffect, useRef, useState } from "react";

export default function SpotlightBackground() {
    const spotRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        let rafId;
        const move = (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                if (!spotRef.current) return;
                spotRef.current.style.background = `
                    radial-gradient(
                        600px circle at ${e.clientX}px ${e.clientY}px, 
                        rgba(0,182,212,0.06) 0%, 
                        rgba(0,102,255,0.03) 25%, 
                        transparent 65%
                    )
                `;
            });
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => {
            window.removeEventListener("mousemove", move);
            if (rafId) cancelAnimationFrame(rafId);
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
