import { useEffect, useRef, useState, memo } from "react";
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight, Mail, ChevronDown, Code, BookOpen, Cpu, MapPin, Check
} from "lucide-react";
import { Instagram, Github, Linkedin } from "@/components/ui/CustomIcons";
import { personalInfo } from "@/data/personalInfo";
import { projects } from "@/data/projects";
import CountUp from "@/components/ui/CountUp";
import { openMail } from "../utils/openMail";

import {
    ShiftingRoles,
    InteractiveProfileCard,
    AboutCard,
    CurrentFocusCard,
    InfoCard
} from "@/components/sections/HomeSections";

/* ─── Main Home Component ──────────────────────────────────── */
export default function Home() {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isContactHovered, setIsContactHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 400, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const parallaxX = useTransform(smoothX, [-1, 1], [-20, 20]);
    const parallaxY = useTransform(smoothY, [-1, 1], [-20, 20]);

    const socialLinks = [
        { Icon: Instagram, href: personalInfo.instagram, label: "Instagram", glow: "rgba(225, 48, 108, 0.25)" },
        { Icon: Github, href: personalInfo.github || "#", label: "GitHub", glow: "rgba(6, 182, 212, 0.25)" },
        { Icon: Linkedin, href: personalInfo.linkedin || "#", label: "LinkedIn", glow: "rgba(0, 119, 181, 0.25)" },
        { Icon: Mail, onClick: () => openMail("Portfolio Inquiry", "Hi Nitin,"), label: "Email", glow: "rgba(255, 69, 0, 0.25)" },
    ];

    return (
        <div style={{ position: "relative" }}>
            {/* Ambient Aurora Light Blobs - DISABLED FOR PERFORMANCE */}
            {/*
            <div className="aurora-container">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
            </div>
            */}

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
                <m.div style={{ x: parallaxX, y: parallaxY, position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                    {/* Grid Pattern - Subtle */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                        maskImage: "radial-gradient(circle at center, black, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 75%)",
                    }} />

                    {/* Aurora Glow - Top Left (Blue/Cyan) - STATIC */}
                    <div
                        style={{
                            position: "absolute", top: "-20%", left: "-10%",
                            width: 500, height: 500,
                            background: "radial-gradient(circle, rgba(0,102,255,0.04) 0%, transparent 70%)",
                            filter: "blur(70px)"
                        }}
                    />

                    {/* Aurora Glow - Bottom Right (Purple/Pink) - STATIC */}
                    <div
                        style={{
                            position: "absolute", bottom: "-15%", right: "-10%",
                            width: 600, height: 600,
                            background: "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)",
                        }}
                    />
                </m.div>

                <style>{`
                    .hero-container {
                        box-sizing: border-box;
                    }
                    .hero-tagline {
                        word-break: break-word;
                        overflow-wrap: break-word;
                    }
                    .hero-grid {
                        display: grid;
                        grid-template-columns: 1fr 400px;
                        gap: 60px;
                        align-items: center;
                    }
                    @media (max-width: 1024px) {
                        .hero-container {
                            max-width: 100% !important;
                            padding: 80px 16px 80px !important;
                            overflow-x: hidden !important;
                        }
                        .hero-grid {
                            grid-template-columns: 1fr;
                            text-align: center;
                            gap: 40px;
                        }
                        .hero-grid .interactive-card-wrapper {
                            display: none;
                        }
                        .hero-content-left {
                            align-items: center !important;
                            text-align: center !important;
                        }
                        .hero-subtitle {
                            text-align: center !important;
                            width: 100% !important;
                        }
                        .hero-ctas {
                            justify-content: center !important;
                        }
                        .hero-socials {
                            justify-content: center !important;
                        }
                        .hero-tagline {
                            margin-left: auto !important;
                            margin-right: auto !important;
                        }
                    }
                    @media (max-width: 640px) {
                        .hero-grid {
                            gap: 32px;
                        }
                    }
                `}</style>

                {/* Main Content Container */}
                <div
                    className="hero-container"
                    style={{
                        maxWidth: 1400,
                        width: "100%",
                        margin: "0 auto",
                        padding: "100px 24px 120px",
                        position: "relative",
                        zIndex: 2,
                        boxSizing: "border-box"
                    }}
                >
                    <div className="hero-grid">
                        {/* LEFT COLUMN: Typography & CTAs */}
                        <div className="hero-content-left" style={{ display: "flex", flexDirection: "column", minWidth: 0, maxWidth: 780, width: "100%", boxSizing: "border-box" }}>

                            {/* Huge Bold Heading */}
                            <m.h1
                                className="hero-name"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    fontSize: "clamp(3rem, 10vw, 6.5rem)",
                                    fontWeight: 900,
                                    lineHeight: 1.05,
                                    marginBottom: 20,
                                    color: "var(--text-primary)",
                                    textAlign: "inherit"
                                }}
                            >
                                Nitin<br />
                                <span className="gradient-text" style={{
                                    background: "linear-gradient(135deg, #0066ff, #06b6d4, #7c3aed)",
                                    backgroundSize: "200% 200%",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    animation: "gradient-shift 4s ease infinite",
                                    display: "inline-block",
                                    paddingLeft: "0.2em",
                                    marginLeft: "-0.2em",
                                    paddingRight: "0.1em",
                                    marginRight: "-0.1em",
                                    paddingTop: "0.15em",
                                    marginTop: "-0.15em",
                                    paddingBottom: "0.1em",
                                    marginBottom: "-0.1em",
                                    verticalAlign: "bottom"
                                }}>
                                    Gawade
                                </span>
                            </m.h1>

                            {/* Animated Subtitle */}
                            <m.div
                                className="hero-subtitle"
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
                                Crafting
                                <ShiftingRoles roles={["Digital Experiences", "Scalable Interfaces", "Premium Web Apps", "User-Centric Designs"]} />
                            </m.div>

                            {/* Tagline */}
                            <m.p
                                className="hero-tagline"
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
                                className="hero-ctas"
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
                                className="hero-socials"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
                            >
                                {socialLinks.map(({ Icon, href, to, onClick, label, glow }) => {
                                    const innerContent = (
                                        <>
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
                                        </>
                                    );

                                    const commonProps = {
                                        key: label,
                                        "aria-label": label,
                                        className: "premium-icon-ring",
                                        style: {
                                            position: "relative",
                                            "--ring-glow": glow,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            background: "none",
                                            border: "none",
                                            padding: 0
                                        }
                                    };

                                    if (onClick) {
                                        return (
                                            <m.button
                                                {...commonProps}
                                                onClick={onClick}
                                                whileHover={{ y: -5, scale: 1.08 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {innerContent}
                                            </m.button>
                                        );
                                    }

                                    return to ? (
                                        <Link
                                            to={to}
                                            {...commonProps}
                                            style={{ ...commonProps.style, textDecoration: "none" }}
                                        >
                                            {innerContent}
                                        </Link>
                                    ) : (
                                        <m.a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...commonProps}
                                            whileHover={{ y: -5, scale: 1.08 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {innerContent}
                                        </m.a>
                                    );
                                })}
                            </m.div>
                        </div>

                        {/* RIGHT COLUMN: Interactive 3D Card */}
                        <div className="interactive-card-wrapper" style={{ position: "relative", height: 520 }}>
                            <InteractiveProfileCard />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - SIMPLIFIED */}
                <div
                    onClick={() => {
                        document.getElementById("about-section")?.scrollIntoView({ behavior: "auto" });
                    }}
                    style={{
                        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: 10, zIndex: 10,
                        color: "var(--text-secondary)", fontSize: "0.7rem", letterSpacing: "0.15em",
                        userSelect: "none",
                        cursor: "pointer",
                        opacity: 0.7,
                        transition: "opacity 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
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
                </div>
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
                    <div className="bento-grid" style={{
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
                            to="/about"
                        />
                        <InfoCard
                            icon={Code}
                            label="Projects"
                            value={`${projects.length}+ Completed`}
                            color="var(--accent-purple)"
                            delay={0.05}
                            to="/projects"
                        />
                        <InfoCard
                            icon={Cpu}
                            label="Learning"
                            value="Python • AI"
                            color="var(--accent-cyan)"
                            delay={0.1}
                            to="/skills"
                        />
                        <InfoCard
                            icon={MapPin}
                            label="Location"
                            value="Tilakwadi, Belgaum"
                            color="var(--accent-emerald)"
                            delay={0.15}
                            to="/contact"
                        />

                        {/* Row 3: Skills Marquee - Full Width */}
                        <div
                            className="premium-card"
                            style={{
                                gridColumn: "span 12",
                                padding: "18px 32px"
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
                                        animation: infiniteScroll 80s linear infinite;
                                        white-space: nowrap;
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
                        </div>
                    </div>
                </div>

                {/* Responsive styles */}
                <style>{`
                    @media (max-width: 990px) {
                        .bento-grid {
                            grid-template-columns: repeat(2, 1fr) !important;
                            gap: 16px !important;
                        }
                        .bento-grid > * {
                            grid-column: span 2 !important;
                        }
                        .bento-grid > [style*="grid-column: span 3"],
                        .bento-grid > [style*="gridColumn: span 3"] {
                            grid-column: span 1 !important;
                        }
                    }
                    @media (max-width: 768px) {
                        section {
                            padding: 40px 16px;
                        }
                        .premium-card {
                            min-height: auto !important;
                            padding: 32px 24px !important;
                        }
                        .skills-marquee-infinite {
                            animation-duration: 45s !important;
                        }
                    }
                    @media (max-width: 600px) {
                        .bento-grid {
                            grid-template-columns: 1fr !important;
                            gap: 16px !important;
                        }
                        .bento-grid > * {
                            grid-column: 1 / -1 !important;
                        }
                        section {
                            padding: 32px 16px;
                        }
                        .premium-card {
                            padding: 24px 20px !important;
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
