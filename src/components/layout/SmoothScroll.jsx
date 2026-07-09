import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP-powered smooth scrolling with ScrollTrigger and Lenis
 * Provides 60fps smooth scroll experience with proper cleanup
 */
export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasReducedMotionClass = document.documentElement.classList.contains("acc-reduced-motion");

        if (prefersReducedMotion || hasReducedMotionClass) {
            // Skip smooth scroll if user prefers reduced motion
            document.documentElement.style.scrollBehavior = "smooth";
            return;
        }

        // Initialize Lenis
        const lenis = new Lenis({
            lerp: 0.08, // Physics-based smoothing for buttery feel
            wheelMultiplier: 0.9,
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });
        
        lenisRef.current = lenis;

        // Configure GSAP
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
        });

        // Sync Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Configure ScrollTrigger
        ScrollTrigger.config({
            syncInterval: 0,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });

        // Refresh ScrollTrigger on page load
        ScrollTrigger.refresh();

        // Cleanup function
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return <>{children}</>;
}
