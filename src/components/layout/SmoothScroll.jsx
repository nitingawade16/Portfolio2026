import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP-powered smooth scrolling with ScrollTrigger and Lenis.
 *
 * MOBILE FIX: Lenis intercepts native touch scroll events which prevents
 * scrolling on real mobile devices (Android Chrome, Samsung Internet,
 * Mobile Safari). Lenis is skipped entirely on touch/coarse-pointer devices
 * and the browser handles scrolling natively. GSAP ScrollTrigger still runs
 * for scroll-driven animations.
 */
export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasReducedMotionClass = document.documentElement.classList.contains("acc-reduced-motion");

        if (prefersReducedMotion || hasReducedMotionClass) {
            document.documentElement.style.scrollBehavior = "smooth";
            return;
        }

        // ── Mobile / touch detection ───────────────────────────────────────
        // Lenis intercepts native touch events and causes pages to not scroll
        // on real mobile devices even when smoothTouch is false.
        // Skip Lenis on any touch-primary (coarse pointer) device.
        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (isTouchDevice) {
            // Still wire up ScrollTrigger so scroll animations work on mobile.
            gsap.config({ force3D: true, nullTargetWarn: false });
            ScrollTrigger.config({
                syncInterval: 0,
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            });
            ScrollTrigger.refresh();
            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }

        // ── Desktop only: Initialize Lenis smooth scroll ───────────────────
        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 0.9,
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        gsap.config({
            force3D: true,
            nullTargetWarn: false,
        });

        lenis.on("scroll", ScrollTrigger.update);

        // Keep a reference to the RAF callback so we can remove it precisely.
        const rafCallback = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.config({
            syncInterval: 0,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        });

        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            gsap.ticker.remove(rafCallback);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return <>{children}</>;
}
