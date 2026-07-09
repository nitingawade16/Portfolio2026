import { m } from "framer-motion";
import {
    Mail, Phone, MapPin, User, ArrowRight
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/CustomIcons";
import { ContactCard } from "@/components/ui/ContactCard";
import InteractiveContactForm from "@/components/ui/InteractiveContactForm";
import { personalInfo } from "@/data/personalInfo";
import { openMail } from "../utils/openMail";

const contactItems = [
    { Icon: User, label: "Name", value: personalInfo.name, href: null, color: "#E040FB" },
    { Icon: Mail, label: "Email", value: personalInfo.email, onClick: () => openMail("Let's work together", ""), color: "#06B6D4" },
    { Icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "#10B981" },
    { Icon: MapPin, label: "Location", value: personalInfo.location, href: null, color: "#F97316" },
];

export default function Contact() {
    return (
        <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80, position: "relative", overflow: "hidden" }}>

            {/* Ambient Aurora Light Blobs & Glowing Particles */}
            <div className="aurora-container">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
                <div className="aurora-blob aurora-blob-3" />

                {/* Tiny glowing stars */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <m.div
                        key={i}
                        className="sparkle-star"
                        animate={{
                            opacity: [0.15, 0.75, 0.15],
                            scale: [0.7, 1.2, 0.7],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.45,
                            ease: "easeInOut",
                        }}
                        style={{
                            top: `${10 + (i * 6.5) % 80}%`,
                            left: `${8 + (i * 7.5) % 84}%`,
                        }}
                    />
                ))}
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

                {/* Premium Header Title */}
                <div style={{ textAlign: "center", marginBottom: 60, position: "relative", zIndex: 10 }}>
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            color: "var(--accent-color)",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            display: "block",
                            marginBottom: 12,
                            fontFamily: "'Space Mono', monospace",
                        }}
                    >
                        Let's Connect
                    </m.span>

                    <m.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontSize: "clamp(2.3rem, 5.5vw, 3.8rem)",
                            fontWeight: 900,
                            lineHeight: 1.15,
                            fontFamily: "'Playfair Display', serif",
                            color: "#ffffff",
                            letterSpacing: "-0.025em",
                            marginBottom: 20,
                        }}
                    >
                        Let's Build Something <br />
                        <span style={{
                            background: "linear-gradient(135deg, #E040FB, #FF4500, #06B6D4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Amazing Together
                        </span>
                    </m.h1>

                    {/* Animated Underline */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                        <m.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: 90,
                                height: 3,
                                background: "linear-gradient(90deg, #E040FB, #FF4500)",
                                borderRadius: 1.5,
                                transformOrigin: "center",
                            }}
                        />
                    </div>

                    <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: "1.05rem",
                            maxWidth: 580,
                            margin: "0 auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Have a project in mind, a freelance inquiry, or just want to say hello? My inbox is always open.
                    </m.p>
                </div>

                <style>{`
                    .contact-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                        gap: 48px;
                        margin-top: 48px;
                    }
                    @media (max-width: 768px) {
                        .contact-grid {
                            grid-template-columns: 1fr;
                            gap: 36px;
                        }
                    }
                `}</style>

                <div className="contact-grid">

                    {/* ── LEFT SIDE: Contact Info Cards & Availability ── */}
                    <m.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: "flex", flexDirection: "column", gap: 32 }}
                    >
                        {/* Contact Information Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                            {contactItems.map((item, idx) => (
                                <ContactCard
                                    key={item.label}
                                    {...item}
                                    index={idx}
                                    showAvailability={item.label === "Email"}
                                />
                            ))}
                        </div>

                        {/* Highlight Availability Card */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="shine-sweep"
                            style={{
                                padding: "32px",
                                borderRadius: "24px",
                                position: "relative",
                                overflow: "hidden",
                                background: "rgba(16, 185, 129, 0.02)",
                                backdropFilter: "blur(24px)",
                                border: "1.5px solid rgba(16, 185, 129, 0.15)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(16, 185, 129, 0.05)",
                            }}
                        >
                            {/* Animated Background Pulse */}
                            <m.div
                                animate={{
                                    opacity: [0.15, 0.35, 0.15],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    position: "absolute",
                                    top: "-50%",
                                    left: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
                                    pointerEvents: "none",
                                    zIndex: 0,
                                }}
                            />

                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        marginBottom: 16,
                                    }}
                                >
                                    {/* Pulse Indicator */}
                                    <div style={{ position: "relative", width: 14, height: 14 }}>
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "50%",
                                                background: "#10B981",
                                                animation: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                                                boxShadow: "0 0 12px #10B981",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 2,
                                                borderRadius: "50%",
                                                background: "#10B981",
                                                boxShadow: "0 0 8px #10B981",
                                            }}
                                        />
                                    </div>

                                    <span
                                        style={{
                                            color: "#10B981",
                                            fontWeight: 800,
                                            fontSize: "0.78rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.12em",
                                        }}
                                    >
                                        Available for Opportunities
                                    </span>
                                </div>
                                <p
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.65,
                                        margin: 0,
                                    }}
                                >
                                    Open to freelance projects, full-time contracts, and interesting collaborations. Let's create something memorable.
                                </p>
                            </div>
                        </m.div>

                        {/* Social Buttons Card */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                padding: "32px",
                                borderRadius: "24px",
                                background: "rgba(255,255,255,0.01)",
                                border: "1.5px solid rgba(255,255,255,0.05)",
                                backdropFilter: "blur(24px)",
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
                                    display: "block",
                                    marginBottom: 20,
                                }}
                            >
                                Connect With Me
                            </span>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                {[
                                    {
                                        Icon: Github,
                                        href: personalInfo.github,
                                        label: "GitHub",
                                        color: "#A78BFA",
                                    },
                                    {
                                        Icon: Linkedin,
                                        href: personalInfo.linkedin,
                                        label: "LinkedIn",
                                        color: "#60A5FA",
                                    },
                                ].map(({ Icon, href, label, color }) =>
                                    href ? (
                                        <m.a
                                            key={label}
                                            href={href}
                                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                            whileHover={{
                                                y: -6,
                                                scale: 1.03,
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="shine-sweep"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 12,
                                                padding: "16px 20px",
                                                borderRadius: "16px",
                                                background: `linear-gradient(135deg, ${color}12, ${color}03)`,
                                                border: "1.5px solid transparent",
                                                backgroundImage: `linear-gradient(rgba(10,10,15, 0.8), rgba(10,10,15, 0.8)), linear-gradient(135deg, ${color}35, ${color}10)`,
                                                backgroundClip: "padding-box, border-box",
                                                backgroundOrigin: "padding-box, border-box",
                                                textDecoration: "none",
                                                color: color,
                                                fontWeight: 800,
                                                fontSize: "0.88rem",
                                                letterSpacing: "0.05em",
                                                textTransform: "uppercase",
                                                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                                                cursor: "pointer",
                                                boxShadow: `0 10px 20px rgba(0,0,0,0.3)`,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = `0 15px 30px ${color}20`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = `0 10px 20px rgba(0,0,0,0.3)`;
                                            }}
                                        >
                                            <Icon size={18} />
                                            {label}
                                        </m.a>
                                    ) : null
                                )}
                            </div>
                        </m.div>

                        {/* Direct Email Link */}
                        <m.button
                            onClick={() => openMail("Let's work together", "")}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                width: "100%",
                            }}
                        >
                            <ArrowRight size={16} />
                            Or email me directly
                        </m.button>
                    </m.div>
 
                    {/* ── RIGHT SIDE: Interactive Contact Form ── */}
                    <m.div
                        id="contact-form"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <InteractiveContactForm email={personalInfo.email} />
                    </m.div>
                </div>
            </div>

            <style>{`
                @keyframes ping {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    70%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </main>
    );
}
