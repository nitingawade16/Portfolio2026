import { useState, useRef } from "react";
import { m, useMotionValue } from "framer-motion";
import { ExternalLink, Star, Eye, Rocket, Server, Database, Code, Globe } from "lucide-react";
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
 * Premium Project Card with dynamic cursor spotlight, top edge brand glow, and clean animations.
 */
export function ProjectCard3D({ project, onClick, index }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rectRef = useRef(null);

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rectRef.current = null;
    };

    return (
        <m.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            style={{
                position: "relative",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 24,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                borderColor: isHovered ? `${project.color}35` : "rgba(255, 255, 255, 0.06)",
                boxShadow: isHovered
                    ? `0 16px 40px rgba(0, 0, 0, 0.5), 0 0 32px ${project.color}12, 0 0 0 1px ${project.color}15`
                    : "0 4px 20px rgba(0, 0, 0, 0.2)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease"
            }}
        >
            <m.div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(
                        260px circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%),
                        ${project.color}12,
                        transparent 70%
                    )`,
                    "--x": mouseX,
                    "--y": mouseY
                }}
            />

            {/* Glowing top boundary line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${project.color}45, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    zIndex: 2
                }}
            />

            {/* Featured Badge */}
            {project.featured && (
                <div
                    style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: "50px",
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}35`,
                        color: project.color,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        zIndex: 10,
                        fontFamily: "'Space Mono', monospace"
                    }}
                >
                    <Star size={11} fill={project.color} style={{ opacity: 0.9 }} /> Featured
                </div>
            )}

            {/* Status Badge */}
            <div
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "6px 12px",
                    borderRadius: "50px",
                    background: project.status === "Completed" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${project.status === "Completed" ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
                    color: project.status === "Completed" ? "#10B981" : "#F59E0B",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    zIndex: 10,
                    fontFamily: "'Space Mono', monospace"
                }}
            >
                {project.status}
            </div>

            {/* Image/Visual Section */}
            <div
                style={{
                    height: 220,
                    background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
                }}
            >
                {/* Visual Glow Layer */}
                <m.div
                    animate={{
                        scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(45deg, ${project.color}15, transparent, ${project.color}08)`,
                        opacity: 0.7,
                    }}
                />

                {/* Main Icon */}
                <m.div
                    animate={{
                        scale: isHovered ? 1.15 : 1,
                        y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                        position: "relative",
                        zIndex: 2,
                        color: project.color,
                        display: "flex",
                        justifyContent: "center",
                        filter: `drop-shadow(0 0 16px ${project.color}35)`
                    }}
                >
                    {getProjectIcon(project.icon, 56)}
                </m.div>
            </div>

            {/* Content */}
            <div
                style={{
                    padding: "24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                {/* Title */}
                <h3
                    style={{
                        color: isHovered ? project.color : "var(--text-primary)",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        marginBottom: 8,
                        fontFamily: "'Geist', sans-serif",
                        transition: "color 0.3s ease",
                    }}
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        marginBottom: 20,
                        flex: 1,
                        fontFamily: "'Geist', sans-serif"
                    }}
                >
                    {project.description.slice(0, 100)}...
                </p>

                {/* Tech Stack Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            style={{
                                fontSize: "0.62rem",
                                padding: "4px 8px",
                                borderRadius: "6px",
                                background: `${project.color}08`,
                                border: `1px solid ${project.color}20`,
                                color: project.color,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span
                            style={{
                                fontSize: "0.62rem",
                                padding: "4px 8px",
                                borderRadius: "6px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "var(--text-muted)",
                                fontWeight: 600,
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                    {project.github && (
                        <m.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                flex: 1,
                                padding: "9px 12px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "var(--text-secondary)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                fontFamily: "'Geist', sans-serif",
                                transition: "border-color 0.2s ease, color 0.2s ease"
                            }}
                            className="project-action-code-btn"
                        >
                            <Github size={13} /> Code
                        </m.a>
                    )}
                    {project.demo && (
                        <m.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                flex: 1,
                                padding: "9px 12px",
                                borderRadius: "10px",
                                background: `${project.color}15`,
                                border: `1px solid ${project.color}25`,
                                color: project.color,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                fontFamily: "'Geist', sans-serif",
                                transition: "background-color 0.2s ease"
                            }}
                        >
                            <ExternalLink size={13} /> Demo
                        </m.a>
                    )}
                    <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClick}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 38,
                            height: 38,
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            transition: "border-color 0.2s ease, color 0.2s ease"
                        }}
                        className="project-action-eye-btn"
                        title="View Details"
                    >
                        <Eye size={15} />
                    </m.button>
                </div>
            </div>

            <style>{`
                .project-action-code-btn:hover {
                    border-color: rgba(255, 255, 255, 0.15) !important;
                    color: var(--text-primary) !important;
                    background: rgba(255, 255, 255, 0.06) !important;
                }
                .project-action-eye-btn:hover {
                    border-color: rgba(255, 255, 255, 0.15) !important;
                    color: var(--text-primary) !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                }
            `}</style>
        </m.div>
    );
}
