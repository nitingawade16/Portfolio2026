import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        // Only run Lenis in browser
        if (typeof window === 'undefined') return;

        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Optimized RAF loop with proper cleanup
        function raf(time) {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
                rafRef.current = requestAnimationFrame(raf);
            }
        }

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, []);

    return <>{children}</>;
}
