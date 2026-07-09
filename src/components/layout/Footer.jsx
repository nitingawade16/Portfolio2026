import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Mail, ArrowUp, Code, Heart } from "lucide-react";
import { Instagram, Github, Linkedin } from "@/components/ui/CustomIcons";

import { personalInfo } from "@/data/personalInfo";
import { openMail } from "../../utils/openMail";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Skills", to: "/skills" },
    { label: "Projects", to: "/projects" },
    { label: "Education", to: "/education" },
    { label: "Contact", to: "/contact" },
];

const socialLinks = [
    { Icon: Instagram, href: personalInfo.instagram, label: "Instagram", color: "#E1306C" },
    { Icon: Github, href: personalInfo.github || "#", label: "GitHub", color: "#A78BFA" },
    { Icon: Linkedin, href: personalInfo.linkedin || "#", label: "LinkedIn", color: "#0A66C2" },
    { Icon: Mail, to: "/contact", label: "Email", color: "#06B6D4" },
];

/**
 * Premium Footer Component with:
 * - Glass Morphism Design
 * - Beautiful Social Cards
 * - Quick Links
 * - Animated Background
 * - Theme Toggle
 * - Back to Top Button
 */
export default function Footer() {


    return (
        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
            {/* ── MAIN FOOTER ── */}
            <footer
                className="glass footer-inner"
                style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTop: "1px solid var(--border-glass)",
                    borderLeft: "none",
                    borderRight: "none",
                    padding: "clamp(60px, 10vw, 100px) 24px 40px",
                    background: "rgba(5, 5, 10, 0.5)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    position: "relative",
                }}
                role="contentinfo"
                aria-label="Footer"
            >
                {/* Gradient Line */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                        "linear-gradient(90deg, transparent, var(--glass-panel) 20%, var(--glass-panel) 80%, transparent)",
                }} />

                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                    {/* Main Footer Grid */}
                    <div className="footer-grid" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "clamp(40px, 8vw, 64px)",
                        marginBottom: 60,
                    }}>
                        {/* Brand & Social Section */}
                        <m.section
                            className="footer-brand"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            aria-label="Brand and social links"
                        >
                            <div className="footer-brand-title" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                <m.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.2rem",
                                        fontWeight: 900,
                                        color: "#fff",
                                        boxShadow: "0 8px 24px rgba(0,85,255,0.3)",
                                        cursor: "pointer",
                                    }}
                                    aria-hidden="true"
                                >
                                    N
                                </m.div>
                                <div>
                                    <span style={{
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        fontFamily: "'Outfit', sans-serif",
                                        background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                        Nitin Gawade
                                    </span>
                                </div>
                            </div>

                            <p className="footer-brand-p" style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                maxWidth: 260,
                                marginBottom: 28,
                            }}>
                                Building beautiful, futuristic digital experiences with modern web technologies and creative problem-solving.
                            </p>

                            {/* Social Icon Cards */}
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} role="list">
                                {socialLinks.map(({ Icon, href, to, label, color }) => {
                                    const innerContent = <Icon size={17} aria-hidden="true" />;
                                    const commonStyle = {
                                        width: 40,
                                        height: 40,
                                        borderRadius: "12px",
                                        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                                        border: `1.5px solid ${color}30`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: color,
                                        cursor: "pointer",
                                        textDecoration: "none"
                                    };

                                    return to ? (
                                        <Link
                                            key={label}
                                            to={to}
                                            aria-label={`Visit on ${label}`}
                                            role="listitem"
                                            style={commonStyle}
                                        >
                                            {innerContent}
                                        </Link>
                                    ) : (
                                        <m.a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit on ${label}`}
                                            role="listitem"
                                            whileHover={{
                                                y: -4,
                                                scale: 1.1,
                                                boxShadow: `0 8px 20px ${color}40`,
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                ...commonStyle,
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            {innerContent}
                                        </m.a>
                                    );
                                })}
                            </div>
                        </m.section>

                        {/* Navigation Links */}
                        <m.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            aria-label="Navigation links"
                        >
                             <h3 className="footer-title" style={{
                                color: "var(--text-primary)",
                                fontWeight: 700,
                                marginBottom: 24,
                                fontSize: "0.85rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}>
                                Navigation
                            </h3>
                            <nav className="footer-nav" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 28px" }}>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        style={{ textDecoration: "none" }}
                                        role="menuitem"
                                    >
                                        <m.span
                                            whileHover={{
                                                x: 4,
                                                color: "var(--accent-purple)",
                                            }}
                                            style={{
                                                color: "var(--text-secondary)",
                                                fontSize: "0.9rem",
                                                cursor: "none",
                                                display: "inline-block",
                                                transition: "color 0.3s ease",
                                            }}
                                        >
                                            {link.label}
                                        </m.span>
                                    </Link>
                                ))}
                            </nav>
                        </m.section>

                        {/* Quick Info */}
                        <m.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            aria-label="Quick links"
                        >
                             <h3 className="footer-title" style={{
                                color: "var(--text-primary)",
                                fontWeight: 700,
                                marginBottom: 24,
                                fontSize: "0.85rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}>
                                Quick Links
                            </h3>
                            <div className="footer-quick-links" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                <button
                                    onClick={() => openMail("Portfolio Inquiry", "Hi Nitin,")}
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.9rem",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        transition: "color 0.3s ease",
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                    }}
                                >
                                    <Mail size={14} aria-hidden="true" />
                                    Email Me
                                </button>
                                <m.a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ x: 4 }}
                                    aria-label="Open resume in new window"
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.9rem",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    <Code size={14} aria-hidden="true" />
                                    View Resume
                                </m.a>
                            </div>
                        </m.section>
                    </div>

                    {/* Bottom Bar */}
                    <div className="footer-bottom" style={{
                        borderTop: "1px solid var(--border-glass)",
                        paddingTop: 32,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 20,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <m.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.8rem",
                                margin: 0,
                            }}
                        >
                            © {new Date().getFullYear()} Nitin Gawade. Designed with <Heart size={14} color="#E040FB" style={{ display: "inline-block", verticalAlign: "middle", margin: "0 2px" }} aria-hidden="true" /> and built with React.
                        </m.p>

                        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

                            {/* Back to Top Button */}
                            <m.button
                                onClick={() =>
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                }
                                whileHover={{ y: -2, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Scroll to top of page"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    color: "var(--text-secondary)",
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--glass-panel)",
                                    borderRadius: "8px",
                                    padding: "6px 12px",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    cursor: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <ArrowUp size={14} aria-hidden="true" /> Top
                            </m.button>
                        </div>
                    </div>
                </div>
                <style>{`
                    @media (max-width: 768px) {
                        .footer-inner {
                            padding: 40px 16px 24px !important;
                        }
                        .footer-grid {
                            gap: 24px !important;
                            margin-bottom: 32px !important;
                        }
                        .footer-brand-title {
                            margin-bottom: 12px !important;
                        }
                        .footer-brand-p {
                            margin-bottom: 16px !important;
                        }
                        .footer-title {
                            margin-bottom: 12px !important;
                        }
                        .footer-nav {
                            gap: 8px 16px !important;
                        }
                        .footer-quick-links {
                            gap: 8px !important;
                        }
                        .footer-bottom {
                            padding-top: 20px !important;
                        }
                    }
                `}</style>
            </footer>
        </div>
    );
}
