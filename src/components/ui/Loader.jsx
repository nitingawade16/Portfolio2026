import { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence, useAnimation } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────── */
const DURATION_MS = 2000;   // total loader duration
const SEGMENTS = 28;     // progress bar segments
const STATUS_MSGS = [
    "Initializing Components...",
    "Loading Assets...",
    "Optimizing Experience...",
    "Preparing Projects...",
    "Almost Ready...",
    "Welcome.",
];
const TECH_BADGES = ["Python", "Portfolio"];

/* ─── Tiny hook: smooth 0→100 counter ───────────────────────── */
function useCounter(duration) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const start = performance.now();
        let raf;
        const tick = (now) => {
            const elapsed = now - start;
            const raw = Math.min(elapsed / duration, 1);
            // ease-in-out cubic
            const t = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw;
            setCount(Math.floor(t * 100));
            if (raw < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [duration]);
    return count;
}

/* ─── Status message with crossfade ─────────────────────────── */
function StatusText({ progress }) {
    const index = Math.min(
        Math.floor((progress / 100) * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
    );
    return (
        <AnimatePresence mode="wait">
            <m.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", letterSpacing: "0.06em" }}
            >
                {STATUS_MSGS[index]}
            </m.span>
        </AnimatePresence>
    );
}

/* ─── Progress badge ─────────────────────────────────────────── */
const BADGES = ["Updating", "Loading", "Optimized", "Fast", "Ready"];
function ProgressBadge({ progress }) {
    const index = Math.min(Math.floor((progress / 100) * BADGES.length), BADGES.length - 1);
    return (
        <AnimatePresence mode="wait">
            <m.span
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 10px", borderRadius: 50,
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.04em",
                    background: "var(--bg-card)",
                    whiteSpace: "nowrap",
                }}
            >
                ↑ {BADGES[index]}
            </m.span>
        </AnimatePresence>
    );
}

/* ─── Segmented progress bar ─────────────────────────────────── */
function SegmentBar({ progress }) {
    const filled = Math.round((progress / 100) * SEGMENTS);
    return (
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {Array.from({ length: SEGMENTS }).map((_, i) => (
                <m.div
                    key={i}
                    animate={{ backgroundColor: i < filled ? "#0055ff" : "var(--border-primary)" }}
                    transition={{ duration: 0.18 }}
                    style={{
                        flex: 1, height: 3, borderRadius: 2,
                        backgroundColor: i < filled ? "#0055ff" : "var(--border-primary)",
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Main Loader ────────────────────────────────────────────── */
export default function Loader({ onComplete }) {
    const progress = useCounter(DURATION_MS);
    const [exiting, setExiting] = useState(false);
    const [gone, setGone] = useState(false);
    const calledRef = useRef(false);

    // Trigger exit sequence at 100
    useEffect(() => {
        if (progress >= 100 && !calledRef.current) {
            calledRef.current = true;
            setTimeout(() => setExiting(true), 300);
            setTimeout(() => { setGone(true); onComplete?.(); }, 1000);
        }
    }, [progress, onComplete]);

    if (gone) return null;

    return (
        <AnimatePresence>
            {!exiting && (
                <m.div
                    key="loader-bg"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    style={{
                        position: "fixed", inset: 0, zIndex: 99999,
                        background: "#050505",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "20px",
                        /* Subtle vignette */
                        backgroundImage:
                            "radial-gradient(ellipse at center, #0d0d0d 0%, #050505 70%)",
                    }}
                    aria-label="Loading portfolio"
                    role="status"
                >

                    {/* ── Card ── */}
                    <m.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            width: "100%", maxWidth: 461,
                            background: "#0b0b0b",
                            border: "1px solid var(--glass-panel)",
                            borderRadius: 20,
                            padding: "31px 31px 27px",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--bg-card)",
                            position: "relative",
                        }}
                    >
                        {/* ── Card top row ── */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                            {/* Tech badges */}
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {TECH_BADGES.map((badge, i) => (
                                    <m.span
                                        key={badge}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                        style={{
                                            padding: "3px 10px", borderRadius: 50,
                                            border: "1px solid var(--border-secondary)",
                                            color: "rgba(255,255,255,0.6)",
                                            fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.03em",
                                            background: "var(--bg-card)",
                                        }}
                                    >
                                        {badge}
                                    </m.span>
                                ))}
                            </div>

                            {/* Three-dot menu (static) */}
                            <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
                                {[0, 1, 2].map((i) => (
                                    <div key={i} style={{
                                        width: 4, height: 4, borderRadius: "50%",
                                        background: "rgba(255,255,255,0.25)",
                                    }} />
                                ))}
                            </div>
                        </div>

                        {/* ── Main heading ── */}
                        <m.h1
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            style={{
                                color: "#ffffff",
                                fontSize: "clamp(1.26rem, 3.6vw, 1.71rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                                lineHeight: 1.15,
                                marginBottom: 20,
                            }}
                        >
                            Preparing Portfolio
                        </m.h1>

                        {/* ── Divider — animates left to right ── */}
                        <div style={{
                            height: 1, background: "rgba(255,255,255,0.07)",
                            borderRadius: 1, overflow: "hidden", marginBottom: 22,
                        }}>
                            <m.div
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 0.7, ease: "easeInOut" }}
                                style={{ height: "100%", background: "var(--border-hover)", transformOrigin: "left" }}
                            />
                        </div>

                        {/* ── Status message ── */}
                        <div style={{ marginBottom: 28, minHeight: 18 }}>
                            <StatusText progress={progress} />
                        </div>

                        {/* ── Percentage + badge row ── */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                style={{ display: "flex", alignItems: "baseline", gap: 2 }}
                            >
                                <span style={{
                                    fontSize: "clamp(1.76rem, 4.8vw, 2.4rem)",
                                    fontWeight: 800,
                                    background: "linear-gradient(135deg, #0055ff, #00d4ff)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    letterSpacing: "-0.04em",
                                    lineHeight: 1,
                                    fontVariantNumeric: "tabular-nums",
                                }}>
                                    {progress}
                                </span>
                                <span style={{
                                    fontSize: "0.85rem", fontWeight: 500,
                                    color: "rgba(0,212,255,0.55)",
                                    letterSpacing: "0.02em",
                                }}>
                                    %
                                </span>
                            </m.div>

                            <ProgressBadge progress={progress} />
                        </div>

                        {/* ── Segmented progress bar ── */}
                        <SegmentBar progress={progress} />

                        {/* ── Footer meta ── */}
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            marginTop: 20,
                        }}>
                            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.696rem", letterSpacing: "0.08em" }}>
                                NITIN GAWADE
                            </span>
                            <span style={{ color: "var(--glass-panel-hover)", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                                {new Date().getFullYear()}
                            </span>
                        </div>
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
