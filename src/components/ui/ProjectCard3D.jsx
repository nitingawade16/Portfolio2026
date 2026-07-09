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



            {/* Image/Visual Section */}
            <div
                style={{
                    height: 160,
                    background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
                }}
            >
                {/* Image with hover scale */}
                {project.image ? (
                    <m.img
                        src={project.image}
                        alt={project.title}
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            inset: 0,
                        }}
                    />
                ) : (
                    <>
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
                            {getProjectIcon(project.icon, 40)}
                        </m.div>
                    </>
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    padding: "16px",
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
                        fontSize: "0.95rem",
                        marginBottom: 6,
                        fontFamily: "'Geist', sans-serif",
                        transition: "color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                        lineHeight: 1.3,
                    }}
                >
                    {project.title}
                </h3>

                {/* Coming soon */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 8
                }}>
                    <span style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase"
                    }}>
                        Coming soon
                    </span>
                </div>
            </div>
        </m.div>
    );
}
