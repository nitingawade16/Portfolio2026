import { useEffect, useRef, useState } from "react";

export default function CountUp({ end, duration = 2000, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const numeric = parseInt(end);
                if (isNaN(numeric)) return;
                let startTime;
                const step = (ts) => {
                    if (!startTime) startTime = ts;
                    const progress = Math.min((ts - startTime) / duration, 1);
                    setCount(Math.floor(progress * numeric));
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    const isNumeric = !isNaN(parseInt(end));

    return (
        <span ref={ref}>
            {isNumeric ? count : end}{suffix}
        </span>
    );
}
