import { useEffect, useState, memo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Code, BookOpen, Cpu, MapPin, Check } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { projects } from "@/data/projects";
import CountUp from "@/components/ui/CountUp";

/* ─── Premium Text Rotator (Blur/Fade Entrance) - SIMPLIFIED ──────────────── */
export function ShiftingRoles({ roles }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [roles]);

    return (
        <span style={{ display: "inline-block", position: "relative", minWidth: "220px", verticalAlign: "top", marginLeft: "0.3em" }}>
            <AnimatePresence mode="wait">
                <m.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        background: "linear-gradient(135deg, #FF4500, #FFFFFF, #06b6d4)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        fontFamily: "'Geist', sans-serif",
                        letterSpacing: "0em"
                    }}
                >
                    {roles[index]}
                </m.span>
            </AnimatePresence>
            <span style={{ opacity: 0, userSelect: "none", pointerEvents: "none", fontWeight: 800 }}>
                {roles[index]}
            </span>
        </span>
    );
}

/* ─── Premium Bento Card - MAXIMUM PERFORMANCE (NO ANIMATIONS) ──────────────────────── */
export const BentoCard = memo(function BentoCard({ children, style = {}, className = "", delay = 0, hoverGlow = "rgba(255, 69, 0, 0.15)", ...props }) {
    return (
        <div
            className={`premium-card ${className}`}
            style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: 1,
                ...style
            }}
            {...props}
        >
            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {children}
            </div>
        </div>
    );
});

/* ─── 3D Tilt Profile Card - SIMPLIFIED ──────────────────────────────────── */
export function InteractiveProfileCard() {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                zIndex: 3,
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            <div
                className="premium-card"
                style={{
                    width: "100%",
                    maxWidth: 340,
                    padding: "40px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 28,
                    background: "rgba(14, 14, 22, 0.8)",
                    border: "1.5px solid rgba(255, 69, 0, 0.15)",
                    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
                    position: "relative",
                    overflow: "hidden"
                }}
            >

                {/* Premium Profile Image */}
                <div style={{
                    width: 150, height: 150, borderRadius: "50%",
                    padding: 4,
                    background: "linear-gradient(135deg, #FF4500, rgba(255,255,255,0.4), #06b6d4, #FF4500)",
                    backgroundSize: "200% 200%",
                    boxShadow: "0 0 32px rgba(255,69,0,0.3)",
                    transform: "translateZ(40px)",
                    animation: "gradient-shift 4s ease infinite",
                    position: "relative",
                    zIndex: 2
                }}>
                    <img
                        src="https://github.com/nitingawade.png"
                        alt="Profile"
                        loading="lazy"
                        style={{
                            width: "100%", height: "100%", borderRadius: "50%",
                            objectFit: "cover", border: "2px solid rgba(255,255,255,0.1)",
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
                        }}
                    />
                </div>

                <div style={{ textAlign: "center", transform: "translateZ(30px)", position: "relative", zIndex: 2 }}>
                    <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", fontFamily: "'Playfair Display', serif", lineHeight: 1.1, marginBottom: 10 }}>
                        {personalInfo.name}
                    </p>
                    <div className="premium-tag" style={{
                        gap: 6
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "glow-pulse 2s ease-in-out infinite" }} />
                        <span>Available for Work</span>
                    </div>
                </div>

                {/* Quick Info Grid */}
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    transform: "translateZ(20px)",
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    position: "relative",
                    zIndex: 2
                }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ color: "#FF4500", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Geist', sans-serif" }}>BCA</p>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.65rem", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</p>
                    </div>
                </div>
            </div>
        </m.div>
    );
}

/* ─── About Card Component ──────────────────────────────── */
export function AboutCard() {
    return (
        <BentoCard
            className="about-card"
            style={{
                gridColumn: "span 7",
                padding: "48px 44px",
                minHeight: 360
            }}
            hoverGlow="rgba(6, 182, 212, 0.12)"
        >
            <div>
                <span className="premium-tag" style={{
                    marginBottom: 20
                }}>
                    Overview
                </span>

                <h2 style={{
                    fontSize: "clamp(2rem, 5vw, 2.75rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 24,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em"
                }}>
                    About Me
                </h2>

                <p style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    maxWidth: 700,
                    marginBottom: 32,
                    fontFamily: "'Geist', sans-serif"
                }}>
                    Hello! I'm <strong>NITIN GAWADE</strong>, a Bachelor of Computer Applications (BCA) student passionate about building modern web applications and continuously learning new technologies. I enjoy developing responsive websites using React, Python, and modern frontend tools while exploring Artificial Intelligence and Machine Learning.
                </p>
            </div>

            <Link to="/about" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                <m.button
                    className="premium-btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Learn More <ArrowRight size={16} />
                </m.button>
            </Link>
        </BentoCard>
    );
}

/* ─── Current Focus Card Component ──────────────────────── */
export function CurrentFocusCard() {
    const focusItems = [
        "Building Full Stack Projects",
        "Improving UI/UX Skills",
        "Exploring Artificial Intelligence"
    ];

    return (
        <BentoCard
            className="current-focus-card"
            style={{
                gridColumn: "span 5",
                padding: "48px 40px",
                minHeight: 360,
                position: "relative",
                overflow: "hidden"
            }}
            hoverGlow="rgba(255, 69, 0, 0.12)"
        >
            {/* Vertical accent line on the right */}
            <div style={{
                position: "absolute",
                right: 0,
                top: "30%",
                width: 4,
                height: "40%",
                background: "linear-gradient(180deg, var(--color-primary-orange) 0%, rgba(255, 69, 0, 0.2) 100%)",
                borderRadius: "4px 0 0 4px",
                zIndex: 2
            }} />

            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <div>
                    <span className="premium-tag" style={{
                        color: "var(--text-primary)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        background: "rgba(255, 255, 255, 0.05)",
                        marginBottom: 24
                    }}>
                        Current Focus
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 1, marginTop: 12 }}>
                    {focusItems.map((item, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16
                            }}
                        >
                            <div style={{
                                width: 24,
                                height: 24,
                                borderRadius: "7px",
                                background: "rgba(255, 69, 0, 0.12)",
                                border: "1px solid rgba(255, 69, 0, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                            }}>
                                <Check size={14} style={{ color: "var(--color-primary-orange)" }} />
                            </div>
                            <span style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                fontFamily: "'Geist', sans-serif"
                            }}>
                                {item}
                            </span>
                        </m.div>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}

/* ─── Info Card Component (Education, Projects, Learning, Location) ──────── */
export function InfoCard({ icon: Icon, label, value, color, delay, to }) {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => to && navigate(to)} 
            style={{ 
                display: "contents",
            }}
        >
            <BentoCard
                className="info-card"
                style={{
                    gridColumn: "span 3",
                    padding: "24px 28px",
                    minHeight: "auto",
                    cursor: to ? "pointer" : "default"
                }}
                delay={delay}
                hoverGlow={`${color}20`}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px",
                        background: `${color}14`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: color,
                        boxShadow: `0 0 16px ${color}08`,
                        flexShrink: 0
                    }}>
                        <Icon size={22} />
                    </div>

                    <div style={{ minWidth: 0 }}>
                        <p style={{
                            color: "var(--text-muted)",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 4,
                            lineHeight: 1
                        }}>
                            {label}
                        </p>
                        <p style={{
                            color: "var(--text-primary)",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            fontFamily: "'Geist', sans-serif",
                            lineHeight: 1.2
                        }}>
                            {value}
                        </p>
                    </div>
                </div>
            </BentoCard>
        </div>
    );
}
