import { useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, ExternalLink, Rocket, Server, Database, Code, Globe } from "lucide-react";
import { Github } from "@/components/ui/CustomIcons";

function getProjectIcon(iconName, size = 32) {
    if (!iconName) return <Code size={size} />;
    if (typeof iconName !== "string") return iconName;
    const lowerName = iconName.toLowerCase();
    if (lowerName.includes("rocket") || lowerName === "🚀") return <Rocket size={size} />;
    if (lowerName.includes("server") || lowerName === "⚙️" || lowerName === "backend") return <Server size={size} />;
    if (lowerName.includes("database") || lowerName === "db" || lowerName === "mongodb") return <Database size={size} />;
    if (lowerName.includes("code") || lowerName === "web" || lowerName === "html") return <Code size={size} />;
    if (lowerName.includes("globe") || lowerName === "🌐") return <Globe size={size} />;
    return <Code size={size} />;
}

/**
 * Featured Project Section - Premium Spotlight for Hero Project
 */
export function FeaturedProjectSection({ project, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    if (!project) return null;

    return (
        <m.div
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="card"
            style={{
                borderRadius: "28px",
                overflow: "hidden",
                position: "relative",
                background: "var(--bg-card)",
                border: `2px solid transparent`,
                backgroundImage: isHovered
                    ? `linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, ${project.color}50, ${project.color}20)`
                    : `linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
                boxShadow: isHovered
                    ? `0 0 50px ${project.color}40, inset 0 0 30px ${project.color}15`
                    : `0 0 25px ${project.color}20`,
                transition: "all 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                height: "100%",
            }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 420, alignItems: "stretch" }}>
                {/* Left Content */}
                <div
                    style={{
                        padding: "48px 40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    {/* Top Section */}
                    <div>
                        {/* Featured Badge */}
                        <m.div
                            animate={{ y: isHovered ? -2 : 0 }}
                            style={{
                                display: "inline-block",
                                marginBottom: 16,
                                padding: "8px 14px",
                                borderRadius: "50px",
                                background: `${project.color}20`,
                                border: `1px solid ${project.color}40`,
                                color: project.color,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                            }}
                        >
                            ⭐ Featured Project
                        </m.div>

                        {/* Title */}
                        <m.h2
                            animate={{ color: isHovered ? project.color : "var(--text-primary)" }}
                            style={{
                                fontSize: "2rem",
                                fontWeight: 800,
                                marginBottom: 16,
                                fontFamily: "'Outfit', sans-serif",
                                transition: "color 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        >
                            {project.title}
                        </m.h2>

                        {/* Description */}
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.95rem",
                                lineHeight: 1.7,
                                marginBottom: 20,
                            }}
                        >
                            {project.description}
                        </p>

                        {/* Key Stats */}
                        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                            {project.stats?.map((stat, i) => (
                                <div key={i}>
                                    <div style={{ color: project.color, fontSize: "1.4rem", fontWeight: 800 }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600 }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "12px 20px",
                                    borderRadius: "10px",
                                    textDecoration: "none",
                                }}
                            >
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "12px 20px",
                                    borderRadius: "10px",
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--glass-panel)",
                                    color: "var(--text-secondary)",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = "var(--glass-panel)";
                                    e.target.style.color = "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = "var(--bg-card)";
                                    e.target.style.color = "var(--text-secondary)";
                                }}
                            >
                                <Github size={16} /> Source Code
                            </a>
                        )}
                        <m.button
                            whileHover={{ x: 4 }}
                            onClick={onClick}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "12px 20px",
                                borderRadius: "10px",
                                background: `${project.color}15`,
                                border: `1px solid ${project.color}30`,
                                color: project.color,
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            View Full Case Study <ArrowRight size={14} />
                        </m.button>
                    </div>
                </div>

                {/* Right Visual */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${project.color}25, ${project.color}10)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Animated Background */}
                    <m.div
                        animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 8, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: 300,
                            height: 300,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${project.color}40, transparent 70%)`,
                            opacity: 0.4,
                        }}
                    />

                    {/* Animated Icon */}
                    <m.div
                        animate={{
                            scale: isHovered ? 1.3 : 1,
                            rotate: isHovered ? 10 : 0,
                        }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "relative",
                            zIndex: 2,
                            color: project.color,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {getProjectIcon(project.icon, 96)}
                    </m.div>

                    {/* Glow Effect */}
                    <m.div
                        animate={{
                            opacity: isHovered ? 1 : 0.5,
                        }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)`,
                            pointerEvents: "none",
                        }}
                    />
                </div>
            </div>

            {/* Tech Stack Row */}
            <div
                style={{
                    padding: "20px 40px",
                    borderTop: `1px solid ${project.color}20`,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    background: `${project.color}08`,
                }}
            >
                {project.tech?.slice(0, 5).map((tech) => (
                    <span
                        key={tech}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}30`,
                            color: project.color,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {tech}
                    </span>
                ))}
                {project.tech?.length > 5 && (
                    <span
                        style={{
                            padding: "6px 12px",
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            fontWeight: 600,
                        }}
                    >
                        +{project.tech.length - 5} more
                    </span>
                )}
            </div>
        </m.div>
    );
}
