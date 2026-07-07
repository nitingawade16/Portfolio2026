import { useState, useRef } from "react";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Premium Contact Information Card with:
 * - Vertical layout for superior typographical hierarchy
 * - Interactive micro-tilt cursor-tracking (CSS variables - GPU accelerated)
 * - Moving spotlight glow reflection
 * - Circular glowing category icon backgrounds
 * - Fast copy-to-clipboard trigger
 */
export function ContactCard({ Icon, label, value, href, color, index }) {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const rectRef = useRef(null);

    // ✅ Use CSS variables instead of state - eliminates 200+ re-renders per second
    const handleMouseMove = (e) => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Set CSS variables directly (no React re-render!)
        e.currentTarget.style.setProperty('--mouse-x', (x * 8).toFixed(2));
        e.currentTarget.style.setProperty('--mouse-y', (y * 8).toFixed(2));
    };

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseLeave = (e) => {
        setIsHovered(false);
        rectRef.current = null;
        // Reset CSS variables
        e.currentTarget.style.setProperty('--mouse-x', '0');
        e.currentTarget.style.setProperty('--mouse-y', '0');
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);

        toast.success(`${label} copied`, {
            duration: 2000,
            position: "bottom-right",
            style: {
                background: "rgba(10,10,15,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: color,
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
            },
            icon: <Check size={16} style={{ color }} />,
        });

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="shine-sweep"
            style={{
                padding: "28px 32px",
                borderRadius: "24px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.012)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid transparent",
                backgroundImage: isHovered
                    ? `linear-gradient(rgba(10,10,15, 0.95), rgba(10,10,15, 0.95)), linear-gradient(135deg, ${color}50, ${color}15)`
                    : `linear-gradient(rgba(10,10,15, 0.85), rgba(10,10,15, 0.85)), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
                boxShadow: isHovered
                    ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${color}15`
                    : `0 10px 30px rgba(0,0,0,0.3)`,
                // ✅ CSS 3D transforms using variables (GPU accelerated, no JS re-renders)
                transform: isHovered
                    ? `perspective(1000px) rotateX(calc(var(--mouse-y, 0) * -1deg)) rotateY(calc(var(--mouse-x, 0) * 1deg)) translateY(-4px)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
                transition: isHovered ? "none" : "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                willChange: isHovered ? "transform" : "auto",
            }}
        >
            {/* Spotlight reflection */}
            <div
                style={{
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                    left: isHovered ? `calc(var(--mouse-x, 0) * 50px + 50%)` : "50%",
                    top: isHovered ? `calc(var(--mouse-y, 0) * 50px + 50%)` : "50%",
                    transform: "translate(-50%, -50%)",
                    transition: isHovered ? "none" : "all 0.5s ease",
                    zIndex: 1,
                }}
            />

            {/* Icon Container */}
            <m.div
                animate={{
                    scale: isHovered ? 1.12 : 1,
                    rotate: isHovered ? 5 : 0,
                }}
                className="animate-float"
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                    border: `1.5px solid ${color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                    boxShadow: isHovered ? `0 0 20px ${color}30` : "none",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                }}
            >
                {/* Pulse wave ring */}
                <div
                    style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        border: `1px solid ${color}20`,
                        opacity: isHovered ? 1 : 0.2,
                        transform: isHovered ? "scale(1.12)" : "scale(1)",
                        transition: "all 0.4s ease",
                    }}
                />
                <Icon size={22} style={{ color }} />
            </m.div>

            {/* Typography Hierarchy (Vertical Breathing Space) */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: "6px",
                    position: "relative",
                    zIndex: 2,
                    minWidth: 0,
                }}
            >
                <span
                    style={{
                        color: "var(--text-secondary)",
                        opacity: 0.55,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    {label}
                </span>

                <div style={{ minWidth: 0 }}>
                    {href ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                color: "#ffffff",
                                fontSize: "1.05rem",
                                fontWeight: 700,
                                textDecoration: "none",
                                display: "block",
                                transition: "color 0.25s ease",
                                wordBreak: "break-word",
                                lineHeight: 1.4,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                        >
                            {value}
                        </a>
                    ) : (
                        <span
                            style={{
                                color: "#ffffff",
                                fontSize: "1.05rem",
                                fontWeight: 700,
                                display: "block",
                                wordBreak: "break-word",
                                lineHeight: 1.4,
                            }}
                        >
                            {value}
                        </span>
                    )}
                </div>
            </div>

            {/* Copy Action Badge */}
            <m.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHovered || copied ? 1 : 0,
                    scale: isHovered || copied ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
                onClick={handleCopy}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCopy(e);
                    }
                }}
                aria-label={`Copy ${label}`}
                style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontSize: "0.68rem",
                    border: copied ? "1px solid rgba(16,185,129,0.3)" : `1px solid ${color}35`,
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    zIndex: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: copied
                        ? `linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))`
                        : `linear-gradient(135deg, ${color}20, ${color}05)`,
                    color: copied ? "var(--accent-emerald)" : color,
                    outline: "none",
                }}
            >
                {copied ? (
                    <>
                        <Check size={11} />
                        Copied!
                    </>
                ) : (
                    "Copy"
                )}
            </m.button>
        </m.div>
    );
}
