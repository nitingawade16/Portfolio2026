import { useState, useEffect, useRef } from "react";

export function useMousePosition(throttle = 16) { // 60 FPS by default (16ms per frame)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const rafId = useRef(null);
    const pendingUpdate = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            // Store the latest mouse position
            pendingUpdate.current = { x: e.clientX, y: e.clientY };

            // Only schedule an update if one isn't already queued
            if (rafId.current === null) {
                rafId.current = requestAnimationFrame(() => {
                    if (pendingUpdate.current) {
                        setPosition(pendingUpdate.current);
                        pendingUpdate.current = null;
                    }
                    rafId.current = null;
                });
            }
        };

        // Use passive listener for better scroll performance
        window.addEventListener("mousemove", handler, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handler);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return position;
}
