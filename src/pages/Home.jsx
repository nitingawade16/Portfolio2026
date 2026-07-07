import { useEffect, useRef, useState, useCallback, memo } from "react";
import { m, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight, Mail, ChevronDown, Code, BookOpen, Cpu, MapPin, Check
} from "lucide-react";
import { Instagram, Github, Linkedin } from "@/components/ui/CustomIcons";
import { personalInfo } from "@/data/personalInfo";
import CountUp from "@/components/ui/CountUp";

/* ─── Premium Text Rotator (Blur/Fade Entrance) ──────────────── */
function ShiftingRoles({ roles }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [roles]);

    return (
        <span style={{ display: "inline-block", position: "relative", minWidth: "300px", verticalAlign: "top" }}>
            <AnimatePresence mode="wait">
                <m.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                        letterSpacing: "0em",
                        animation: "gradient-shift 4s ease infinite"
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

/* ─── Premium Bento Card with Spotlight - OPTIMIZED ──────────────────────── */
const BentoCard = memo(function BentoCard({ children, style = {}, className = "", delay = 0, hoverGlow = "rgba(255, 69, 0, 0.15)", ...props }) {
    const mouseX = useMotionValue(-240);
    const mouseY = useMotionValue(-240);
    const opacity = useMotionValue(0);
    const rafRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (rafRef.current) return;

        rafRef.current = requestAnimationFrame(() => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left - 120);
            mouseY.set(e.clientY - rect.top - 120);
            rafRef.current = null;
        });
    }, [mouseX, mouseY]);

    const handleMouseEnter = useCallback(() => opacity.set(0.3), [opacity]);
    const handleMouseLeave = useCallback(() => {
        opacity.set(0);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, [opacity]);

    return (
        <m.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`premium-card ${className}`}
            style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...style
            }}
            {...props}
        >
            {/* Spotlight Glow */}
            <m.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    opacity: opacity,
                    position: "absolute",
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${hoverGlow} 0%, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                }}
            />
            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {children}
            </div>
        </m.div>
    );
});

/* ─── 3D Tilt Profile Card ──────────────────────────────────── */
function InteractiveProfileCard() {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spotlight values
    const spotX = useMotionValue(-240);
    const spotY = useMotionValue(-240);
    const spotOpacity = useMotionValue(0);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const box = card.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        mouseX.set((e.clientX - centerX) / (box.width / 2));
        mouseY.set((e.clientY - centerY) / (box.height / 2));

        spotX.set(e.clientX - box.left - 120);
        spotY.set(e.clientY - box.top - 120);
    };

    const handleMouseEnter = () => spotOpacity.set(0.35);

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        spotOpacity.set(0);
    };

    const rotX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), { stiffness: 150, damping: 25 });
    const rotY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), { stiffness: 150, damping: 25 });

    return (
        <m.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80, damping: 20 }}
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                zIndex: 3,
                perspective: 1200,
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            <m.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="premium-card"
                style={{
                    width: 340,
                    rotateX: rotX,
                    rotateY: rotY,
                    transformStyle: "preserve-3d",
                    padding: "40px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 28,
                    background: "rgba(14, 14, 22, 0.6)",
                    backdropFilter: "blur(14px)",
                    border: "1.5px solid rgba(255, 69, 0, 0.15)",
                    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Spotlight lighting effect */}
                <m.div
                    style={{
                        x: spotX,
                        y: spotY,
                        opacity: spotOpacity,
                        position: "absolute",
                        width: 240,
                        height: 240,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255, 69, 0, 0.3) 0%, transparent 70%)",
                        pointerEvents: "none",
                        zIndex: 1,
                        top: 0,
                        left: 0,
                    }}
                />

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
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    transform: "translateZ(20px)",
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    position: "relative",
                    zIndex: 2
                }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ color: "#FF4500", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Geist', sans-serif" }}>
                            <CountUp end={10} suffix="+" />
                        </p>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.65rem", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Projects</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ color: "#FF4500", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Geist', sans-serif" }}>BCA</p>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.65rem", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</p>
                    </div>
                </div>
            </m.div>
        </m.div>
    );
}

/* ─── About Card Component ──────────────────────────────── */
function AboutCard() {
    return (
        <BentoCard
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
function CurrentFocusCard() {
    const focusItems = [
        "Building Full Stack Projects",
        "Improving UI/UX Skills",
        "Exploring Artificial Intelligence"
    ];

    return (
        <BentoCard
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
function InfoCard({ icon: Icon, label, value, color, delay }) {
    return (
        <BentoCard
            style={{
                gridColumn: "span 3",
                padding: "24px 28px",
                minHeight: "auto",
                cursor: "pointer"
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
    );
}

/* ─── Main Home Component ──────────────────────────────────── */
export default function Home() {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isContactHovered, setIsContactHovered] = useState(false);

    // Parallax effect on mouse move - Desktop only
    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        const el = heroRef.current;
        if (!el) return;
        let frameId;
        let ticking = false;
        const handler = (e) => {
            if (!ticking) {
                frameId = requestAnimationFrame(() => {
                    const { innerWidth: w, innerHeight: h } = window;
                    const xPct = (e.clientX / w - 0.5) * 8;
                    const yPct = (e.clientY / h - 0.5) * 8;
                    el.querySelectorAll("[data-parallax]").forEach((node) => {
                        const speed = parseFloat(node.dataset.parallax) || 1;
                        node.style.transform = `translate3d(${xPct * speed}px, ${yPct * speed}px, 0)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("mousemove", handler, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handler);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, []);

    const socialLinks = [
        { Icon: Instagram, href: personalInfo.instagram, label: "Instagram", glow: "rgba(225, 48, 108, 0.25)" },
        { Icon: Github, href: personalInfo.github || "#", label: "GitHub", glow: "rgba(6, 182, 212, 0.25)" },
        { Icon: Linkedin, href: personalInfo.linkedin || "#", label: "LinkedIn", glow: "rgba(0, 119, 181, 0.25)" },
        { Icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email", glow: "rgba(255, 69, 0, 0.25)" },
    ];

    return (
        <div style={{ position: "relative" }}>
            {/* Ambient Aurora Light Blobs - SIMPLIFIED FOR PERFORMANCE */}
            <div className="aurora-container">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
            </div>

            {/* ════════════════════════════════════════════════════════════
                1. PREMIUM HERO SECTION
            ════════════════════════════════════════════════════════════ */}
            <section
                id="hero"
                ref={heroRef}
                style={{
                    minHeight: "100vh",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {/* Advanced Animated Backgrounds */}
                <div data-parallax="0.15" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    {/* Grid Pattern - Subtle */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                        maskImage: "radial-gradient(circle at center, black, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 75%)",
                    }} />

                    {/* Aurora Glow - Top Left (Blue/Cyan) - OPTIMIZED */}
                    <div
                        style={{
                            position: "absolute", top: "-20%", left: "-10%",
                            width: 600, height: 600,
                            background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animation: "blob 30s ease-in-out infinite"
                        }}
                    />

                    {/* Aurora Glow - Bottom Right (Purple/Pink) - OPTIMIZED */}
                    <div
                        style={{
                            position: "absolute", bottom: "-15%", right: "-10%",
                            width: 700, height: 700,
                            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animation: "blob 35s ease-in-out infinite reverse"
                        }}
                    />
                </div>

                <style>{`
                    .hero-grid {
                        display: grid;
                        grid-template-columns: 1fr 400px;
                        gap: 60px;
                        align-items: center;
                    }
                    @media (max-width: 1024px) {
                        .hero-grid {
                            grid-template-columns: 1fr;
                            text-align: center;
                            gap: 40px;
                        }
                        .hero-grid .interactive-card-wrapper {
                            display: none;
                        }
                        .hero-content-left {
                            align-items: center;
                        }
                    }
                    @media (max-width: 640px) {
                        .hero-grid {
                            gap: 32px;
                        }
                    }
                `}</style>

                {/* Main Content Container */}
                <div style={{
                    maxWidth: 1400,
                    width: "100%",
                    margin: "0 auto",
                    padding: "100px 24px 120px",
                    position: "relative",
                    zIndex: 2,
                }}>
                    <div className="hero-grid">
                        {/* LEFT COLUMN: Typography & CTAs */}
                        <div className="hero-content-left" style={{ display: "flex", flexDirection: "column", minWidth: 0, maxWidth: 780 }}>

                            {/* Status Badge */}
                            <m.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    background: "var(--bg-card)", border: "1px solid var(--glass-panel)",
                                    padding: "8px 18px", borderRadius: "50px", marginBottom: 32, alignSelf: "flex-start"
                                }}
                            >
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 12px #06b6d4" }} />
                                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>PORTFOLIO 2026</span>
                            </m.div>

                            {/* Huge Bold Heading */}
                            <m.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    fontSize: "clamp(3rem, 10vw, 6.5rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.05,
                                    marginBottom: 20,
                                    color: "var(--text-primary)",
                                    fontFamily: "'Geist', sans-serif",
                                    textAlign: "inherit"
                                }}
                            >
                                NITIN<br />
                                <span className="gradient-text" style={{
                                    background: "linear-gradient(135deg, #0066ff, #06b6d4, #7c3aed)",
                                    backgroundSize: "200% 200%",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    animation: "gradient-shift 4s ease infinite"
                                }}>
                                    GAWADE
                                </span>
                            </m.h1>

                            {/* Animated Subtitle */}
                            <m.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    fontSize: "clamp(1.1rem, 3.5vw, 2rem)",
                                    fontWeight: 700,
                                    marginBottom: 32,
                                    color: "var(--text-primary)",
                                    fontFamily: "'Playfair Display', serif",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1
                                }}
                            >
                                Crafting{" "}
                                <ShiftingRoles roles={["Digital Experiences", "Scalable Interfaces", "Premium Web Apps", "User-Centric Designs"]} />
                            </m.div>

                            {/* Tagline */}
                            <m.p
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                                    lineHeight: 1.8,
                                    maxWidth: 620,
                                    marginBottom: 44,
                                    fontWeight: 400
                                }}
                            >
                                I build exceptional and accessible digital experiences with clean code, seamless interactions, and striking visual aesthetics. BCA student passionate about modern web technologies and AI/ML.
                            </m.p>

                            {/* CTAs */}
                            <m.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 56 }}
                            >
                                <Link to="/projects" style={{ textDecoration: "none" }}>
                                    <m.button
                                        className="premium-btn-primary"
                                        whileTap={{ scale: 0.97 }}
                                        onMouseEnter={() => setIsBtnHovered(true)}
                                        onMouseLeave={() => setIsBtnHovered(false)}
                                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                                    >
                                        <span>View Projects</span>
                                        <m.span animate={{ x: isBtnHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                                            <ArrowRight size={18} />
                                        </m.span>
                                    </m.button>
                                </Link>
                                <Link to="/contact" style={{ textDecoration: "none" }}>
                                    <m.button
                                        className="premium-btn-secondary"
                                        whileTap={{ scale: 0.97 }}
                                        onMouseEnter={() => setIsContactHovered(true)}
                                        onMouseLeave={() => setIsContactHovered(false)}
                                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                                    >
                                        <span>Get in Touch</span>
                                        <m.span animate={{ x: isContactHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                                            <ArrowRight size={18} />
                                        </m.span>
                                    </m.button>
                                </Link>
                            </m.div>

                            {/* Circular Social Icons */}
                            <m.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
                            >
                                {socialLinks.map(({ Icon, href, label, glow }) => (
                                    <m.a
                                        key={label} href={href} target="_blank" rel="noopener noreferrer"
                                        aria-label={label}
                                        className="premium-icon-ring"
                                        whileHover={{ y: -5, scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            position: "relative",
                                            "--ring-glow": glow
                                        }}
                                    >
                                        <m.div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "50%",
                                                background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                                                zIndex: -1,
                                                opacity: 0,
                                            }}
                                            whileHover={{ opacity: 0.8, scale: 1.25 }}
                                        />
                                        <m.div whileHover={{ rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Icon size={20} />
                                        </m.div>
                                    </m.a>
                                ))}
                            </m.div>
                        </div>

                        {/* RIGHT COLUMN: Interactive 3D Card */}
                        <div className="interactive-card-wrapper" style={{ position: "relative", height: 520 }}>
                            <InteractiveProfileCard />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <m.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                        document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: 10, zIndex: 10,
                        color: "var(--text-secondary)", fontSize: "0.7rem", letterSpacing: "0.15em",
                        userSelect: "none",
                        cursor: "pointer"
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 69, 0, 0.2)",
                        background: "rgba(255, 69, 0, 0.04)",
                        boxShadow: "0 0 16px rgba(255, 69, 0, 0.1)",
                        transition: "all 0.3s ease"
                    }}>
                        <ChevronDown size={20} style={{ color: "var(--color-primary-orange)" }} />
                    </div>
                    <span style={{ textTransform: "uppercase", fontWeight: 600, opacity: 0.7 }}>Scroll to Explore</span>
                </m.div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                2. PREMIUM BENTO GRID SECTION
            ════════════════════════════════════════════════════════════ */}
            <section
                id="about-section"
                style={{
                    padding: "80px 24px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Container */}
                <div style={{
                    maxWidth: 1400,
                    width: "95%",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2
                }}>

                    {/* Bento Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gap: "24px"
                    }}>

                        {/* Row 1: About Card (7 cols) + Current Focus (5 cols) */}
                        <AboutCard />
                        <CurrentFocusCard />

                        {/* Row 2: Four equal cards (3 cols each) */}
                        <InfoCard
                            icon={BookOpen}
                            label="Education"
                            value="BCA – Third Year"
                            color="var(--accent-blue)"
                            delay={0}
                        />
                        <InfoCard
                            icon={Code}
                            label="Projects"
                            value="Coming Soon"
                            color="var(--accent-purple)"
                            delay={0.05}
                        />
                        <InfoCard
                            icon={Cpu}
                            label="Learning"
                            value="Python • AI"
                            color="var(--accent-cyan)"
                            delay={0.1}
                        />
                        <InfoCard
                            icon={MapPin}
                            label="Location"
                            value="Tilakwadi, Belgaum"
                            color="var(--accent-emerald)"
                            delay={0.15}
                        />

                        {/* Row 3: Skills Marquee - Full Width */}
                        <m.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.6 }}
                            className="premium-card"
                            style={{
                                gridColumn: "span 12",
                                padding: "18px 32px",
                                willChange: "transform"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    overflow: "hidden",
                                    userSelect: "none",
                                    position: "relative",
                                    width: "100%",
                                    maskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, white 5%, white 95%, transparent)",
                                }}
                            >
                                <style>{`
                                    @keyframes infiniteScroll {
                                        0% {
                                            transform: translateX(0);
                                        }
                                        100% {
                                            transform: translateX(calc(-100% / 2));
                                        }
                                    }
                                    .skills-marquee-infinite {
                                        display: flex;
                                        gap: 28px;
                                        animation: infiniteScroll 60s linear infinite;
                                        white-space: nowrap;
                                        will-change: transform;
                                    }
                                    .skills-marquee-infinite:hover {
                                        animation-play-state: paused;
                                    }
                                    .skill-item {
                                        display: inline-flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: fit-content;
                                        min-height: 52px;
                                        padding: 12px 28px;
                                        background: rgba(23, 23, 23, 0.8);
                                        border: 1px solid var(--glass-bg-light);
                                        border-radius: 9999px;
                                        color: #ffffff;
                                        font-size: 15px;
                                        font-weight: 600;
                                        letter-spacing: 0.2px;
                                        white-space: nowrap;
                                        transition: all 250ms ease;
                                        flex-shrink: 0;
                                        line-height: 1;
                                        text-overflow: unset;
                                        overflow: visible;
                                    }
                                    .skill-item:hover {
                                        background: rgba(40, 40, 40, 0.9);
                                        border-color: var(--glass-panel-hover);
                                        transform: translateY(-2px);
                                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                                    }
                                    @media (max-width: 768px) {
                                        .skill-item {
                                            min-height: 48px;
                                            padding: 10px 22px;
                                            font-size: 14px;
                                        }
                                    }
                                `}</style>

                                <div className="skills-marquee-infinite">
                                    {[
                                        "MySQL",
                                        "Vite",
                                        "Responsive Design",
                                        "UI/UX",
                                        "React",
                                        "JavaScript",
                                        "Python",
                                        "HTML",
                                        "CSS",
                                        "Tailwind CSS",
                                        "GitHub",
                                        "Full Stack Dev",
                                    ].map((skill, idx) => (
                                        <div key={idx} className="skill-item">
                                            {skill}
                                        </div>
                                    ))}
                                </div>

                                {/* Duplicate for truly infinite scroll */}
                                <div className="skills-marquee-infinite" aria-hidden="true">
                                    {[
                                        "MySQL",
                                        "Vite",
                                        "Responsive Design",
                                        "UI/UX",
                                        "React",
                                        "JavaScript",
                                        "Python",
                                        "HTML",
                                        "CSS",
                                        "Tailwind CSS",
                                        "GitHub",
                                        "Full Stack Dev",
                                    ].map((skill, idx) => (
                                        <div key={idx} className="skill-item">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>

                {/* Responsive styles */}
                <style>{`
                    @media (max-width: 1024px) {
                        section {
                            padding: 60px 24px;
                        }
                        .card {
                            grid-column: span 12 !important;
                        }
                    }
                    @media (max-width: 768px) {
                        section {
                            padding: 40px 16px;
                        }
                        .card {
                            grid-column: span 6 !important;
                            padding: 32px 24px !important;
                        }
                        .skills-marquee-infinite {
                            animation-duration: 45s !important;
                        }
                    }
                    @media (max-width: 480px) {
                        section {
                            padding: 32px 16px;
                        }
                        .card {
                            grid-column: span 12 !important;
                            padding: 24px 20px !important;
                            min-height: auto !important;
                        }
                        .skills-marquee-infinite {
                            gap: 16px !important;
                            animation-duration: 40s !important;
                        }
                    }
                `}</style>
            </section>
        </div>
    );
}
