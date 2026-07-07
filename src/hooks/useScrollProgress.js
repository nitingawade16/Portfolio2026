import { useState, useEffect, useRef } from "react";

export function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = docHeight ? (scrollTop / docHeight) * 100 : 0;
            setProgress(newProgress);
        };

        const onScroll = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    update();
                    rafRef.current = null;
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update(); // Initial update

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []);

    return progress;
}
