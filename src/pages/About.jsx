import { useRef, useState } from "react";
import { m } from "framer-motion";
import { Mail, MapPin, BookOpen, Briefcase } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/CustomIcons";
import { personalInfo } from "@/data/personalInfo";
import { TechStackVisualization } from "@/components/ui/TechStackVisualization";

/* ─── Premium Profile Card inside About ──────────────────────── */
function AboutProfileCard() {
    const cardRef = useRef(null);
    const rectRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;
        setMousePosition({
            x: e.clientX - rectRef.current.left,
            y: e.clientY - rectRef.current.top
        });
    };

    return (
        <m.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="premium-card border-glow"
            style={{
                padding: "40px 32px",
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "rgba(14, 14, 22, 0.6)",
                backdropFilter: "blur(14px)",
                border: "1.5px solid rgba(255, 69, 0, 0.15)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Mouse Spotlight Glow */}
            <m.div
                animate={{
                    x: isHovered ? mousePosition.x - 120 : -120,
                    y: isHovered ? mousePosition.y - 120 : -120,
                    opacity: isHovered ? 0.3 : 0,
                }}
                transition={{ duration: 0.15 }}
                style={{
                    position: "absolute",
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255, 69, 0, 0.35) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                }}
            />

            <m.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF4500, rgba(255,255,255,0.4), #06b6d4, #FF4500)",
                    backgroundSize: "200% 200%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    fontFamily: "'Geist', sans-serif",
                    color: "#fff",
                    boxShadow: "0 0 32px rgba(255,69,0,0.3)",
                    margin: "0 auto 24px",
                    animation: "gradient-shift 4s ease infinite",
                    position: "relative",
                    zIndex: 2
                }}
            >
                N
            </m.div>

            <h2 style={{
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: 4,
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.01em",
                position: "relative",
                zIndex: 2
            }}>
                Nitin Gawade
            </h2>

            <p style={{
                color: "var(--color-primary-orange)",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: 24,
                fontFamily: "'Geist', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                position: "relative",
                zIndex: 2
            }}>
                Frontend Developer
            </p>

            {/* Divider */}
            <div style={{
                height: "1px",
                background: "rgba(255,255,255,0.06)",
                width: "100%",
                margin: "0 0 24px 0",
                position: "relative",
                zIndex: 2
            }} />

            {/* Quick Info */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                textAlign: "left",
                marginBottom: "24px",
                position: "relative",
                zIndex: 2
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: "'Geist', sans-serif" }}>
                    <MapPin size={16} style={{ color: "var(--color-primary-orange)" }} />
                    <span>{personalInfo.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: "'Geist', sans-serif" }}>
                    <BookOpen size={16} style={{ color: "var(--color-primary-orange)" }} />
                    <span>BCA Student</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: "'Geist', sans-serif" }}>
                    <Briefcase size={16} style={{ color: "var(--color-primary-orange)" }} />
                    <span>Available for Work</span>
                </div>
            </div>

            {/* Spacer to push badge to bottom */}
            <div style={{ flex: 1 }}></div>

            {/* Status Badge */}
            <div className="premium-tag" style={{
                width: "fit-content",
                margin: "0 auto",
                position: "relative",
                zIndex: 2
            }}>
                <span style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)"
                }} />
                Open to Opportunities
            </div>
        </m.div>
    );
}

/* ─── Premium Contact Card with Spotlight ───────────────────── */
function InteractiveContactCard({ href, to, icon: Icon, title, subtitle, target, rel }) {
    const rectRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;
        setMousePosition({
            x: e.clientX - rectRef.current.left,
            y: e.clientY - rectRef.current.top,
        });
    };

    const innerContent = (
        <>
            <m.div
                animate={{
                    x: isHovered ? mousePosition.x - 100 : -100,
                    y: isHovered ? mousePosition.y - 100 : -100,
                    opacity: isHovered ? 0.25 : 0,
                }}
                transition={{ duration: 0.15 }}
                style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255, 69, 0, 0.3) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="contact-icon" style={{ color: "var(--color-primary-orange)", marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    <Icon size={32} />
                </div>
                <h3 className="contact-title" style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.1rem", marginBottom: 4, fontFamily: "'Geist', sans-serif" }}>
                    {title}
                </h3>
                <p className="contact-subtitle" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0, fontFamily: "'Geist', sans-serif" }}>
                    {subtitle}
                </p>
            </div>
        </>
    );

    const commonStyle = {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "28px 24px",
        textDecoration: "none",
        background: "rgba(14, 14, 22, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        height: "100%"
    };

    if (to) {
        return (
            <Link
                to={to}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                className="contact-card premium-card"
                style={commonStyle}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <m.a
            href={href}
            target={target}
            rel={rel}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="contact-card premium-card"
            style={commonStyle}
        >
            {innerContent}
        </m.a>
    );
}

export default function About() {
    return (
        <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80, position: "relative" }}>
            {/* Ambient Aurora Light Blobs & Glowing Particles */}
            <div className="aurora-container">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
                <div className="aurora-blob aurora-blob-3" />
            </div>

            {/* Global Container */}
            <div style={{
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "24px",
                paddingRight: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "48px",
                position: "relative",
                zIndex: 2
            }}>

                {/* ═══ HEADER ═══ */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "left" }}
                >
                    <h1 style={{
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.05
                    }}>
                        About Me
                    </h1>
                </m.div>

                {/* ═══ ABOUT SECTION (Profile + Text) ═══ */}
                <style>{`
                    @media (min-width: 860px) {
                        .about-grid {
                            grid-template-columns: 340px 1fr !important;
                            gap: 60px !important;
                        }
                    }
                `}</style>
                <div className="about-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "40px",
                    alignItems: "stretch"
                }}>
                    <AboutProfileCard />

                    {/* About Text */}
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                            justifyContent: "flex-start",
                            paddingTop: "12px"
                        }}
                    >
                        <p style={{
                            color: "var(--text-secondary)",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                            maxWidth: "650px",
                            fontWeight: 400,
                            margin: 0,
                            fontFamily: "'Geist', sans-serif"
                        }}>
                            Hello! I'm <strong>Nitin Gawade</strong>, a passionate Frontend Developer currently pursuing my Bachelor of Computer Applications (BCA).
                        </p>
                        <p style={{
                            color: "var(--text-secondary)",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                            maxWidth: "650px",
                            fontWeight: 400,
                            margin: 0,
                            fontFamily: "'Geist', sans-serif"
                        }}>
                            My programming journey began with C++, where I built a strong foundation in logic and problem-solving. Over time, I transitioned into modern web development, specializing in creating clean, responsive, and interactive user interfaces using React, JavaScript, Tailwind CSS, and Node.js.
                        </p>
                        <p style={{
                            color: "var(--text-secondary)",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                            maxWidth: "650px",
                            fontWeight: 400,
                            margin: 0,
                            fontFamily: "'Geist', sans-serif"
                        }}>
                            I continuously expand my frontend skills by exploring modern frameworks, UI/UX principles, performance optimization, and best development practices to build fast, visually appealing, and user-friendly web applications.
                        </p>
                    </m.div>
                </div>

                {/* ═══ TECHNOLOGY STACK ═══ */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ marginTop: "16px" }}
                >
                    <TechStackVisualization />
                </m.div>

                {/* ═══ LET'S CONNECT ═══ */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            fontFamily: "'Playfair Display', serif",
                            letterSpacing: "-0.02em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            margin: 0
                        }}>
                            <Mail size={24} color="var(--color-primary-orange)" /> Let's Connect
                        </h2>
                    </div>

                    <style>{`
                        .contact-grid {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 24px;
                        }
                        @media (max-width: 860px) {
                            .contact-grid {
                                grid-template-columns: repeat(2, 1fr);
                                gap: 16px;
                            }
                        }
                        @media (max-width: 480px) {
                            .contact-grid {
                                grid-template-columns: 1fr;
                                gap: 16px;
                            }
                        }
                    `}</style>
                    <div className="contact-grid">
                        <InteractiveContactCard
                            to="/contact"
                            icon={Mail}
                            title="Email"
                            subtitle={personalInfo.email}
                        />
                        <InteractiveContactCard
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={Github}
                            title="GitHub"
                            subtitle="Visit Profile"
                        />
                        <InteractiveContactCard
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={Linkedin}
                            title="LinkedIn"
                            subtitle="Connect"
                        />
                        <InteractiveContactCard
                            href={personalInfo.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={Instagram}
                            title="Instagram"
                            subtitle="@nitin.gawade.07"
                        />
                    </div>
                </m.div>

            </div>
        </main>
    );
}
