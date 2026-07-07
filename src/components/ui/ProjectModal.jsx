import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight, Play, Rocket, Server, Database, Code, Globe, Cpu, ClipboardList, CheckCircle, HelpCircle } from "lucide-react";
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

function getTimelineIcon(icon, size = 18) {
    if (!icon) return <ClipboardList size={size} />;
    if (typeof icon !== "string") return icon;
    const lower = icon.toLowerCase();
    if (lower === "📋" || lower.includes("plan") || lower.includes("list")) return <ClipboardList size={size} />;
    if (lower === "⚙️" || lower === "💻" || lower.includes("dev") || lower.includes("code")) return <Code size={size} />;
    if (lower === "✅" || lower.includes("test") || lower.includes("check")) return <CheckCircle size={size} />;
    if (lower === "🚀" || lower.includes("launch") || lower.includes("ship")) return <Rocket size={size} />;
    return <HelpCircle size={size} />;
}

/**
 * Premium Project Modal with Full Case Study, Metrics, Gallery, and Video Preview
 */
export function ProjectModal({ project, onClose }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [showVideo, setShowVideo] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "details", label: "Details" },
        { id: "metrics", label: "Metrics" },
        { id: "gallery", label: "Gallery" },
        { id: "timeline", label: "Timeline" },
    ];

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9000,
                background: "rgba(3,3,10,0.95)",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                overflowY: "auto",
            }}
        >
            <m.div
                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 40, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="card"
                style={{
                    borderRadius: "28px",
                    maxWidth: "900px",
                    width: "100%",
                    overflow: "hidden",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    background: "var(--bg-card)",
                    border: `2px solid ${project.color}30`,
                }}
            >
                {/* Close Button */}
                <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        top: 24,
                        right: 24,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid var(--glass-panel)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 10001,
                    }}
                >
                    <X size={20} />
                </m.button>

                {/* Hero Section */}
                <div
                    style={{
                        height: 300,
                        background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Background Animation */}
                    <m.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: 400,
                            height: 400,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${project.color}30, transparent 70%)`,
                            opacity: 0.3,
                        }}
                    />

                    {/* Icon */}
                    <m.div
                        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            position: "relative",
                            zIndex: 2,
                            color: project.color,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {getProjectIcon(project.icon, 88)}
                    </m.div>

                    {/* Status Badge */}
                    <div
                        style={{
                            position: "absolute",
                            top: 24,
                            left: 24,
                            padding: "8px 14px",
                            borderRadius: "50px",
                            background: `${project.color}20`,
                            border: `1px solid ${project.color}40`,
                            color: project.color,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                        }}
                    >
                        {project.status}
                    </div>
                </div>

                {/* Header Content */}
                <div style={{ padding: "32px", borderBottom: `1px solid ${project.color}20` }}>
                    <h1
                        style={{
                            color: "var(--text-primary)",
                            fontSize: "2rem",
                            fontWeight: 800,
                            marginBottom: 12,
                            fontFamily: "'Outfit', sans-serif",
                        }}
                    >
                        {project.title}
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                        {project.description}
                    </p>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: "flex", borderBottom: "1px solid var(--border-primary)", overflowX: "auto" }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                minWidth: 120,
                                padding: "16px",
                                border: "none",
                                background: activeTab === tab.id ? `${project.color}15` : "transparent",
                                color: activeTab === tab.id ? project.color : "var(--text-secondary)",
                                fontSize: "0.85rem",
                                fontWeight: activeTab === tab.id ? 600 : 500,
                                cursor: "pointer",
                                borderBottom: activeTab === tab.id ? `2px solid ${project.color}` : "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={{ padding: "32px" }}>
                    <AnimatePresence mode="wait">
                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <m.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div style={{ marginBottom: 32 }}>
                                    <h3
                                        style={{
                                            color: "var(--text-primary)",
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            marginBottom: 16,
                                        }}
                                    >
                                        🎯 Project Highlights
                                    </h3>
                                    <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {project.features?.map((feature, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 10,
                                                    color: "var(--text-secondary)",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                <span style={{ color: project.color, marginTop: 2 }}>
                                                    <ChevronRight size={16} />
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h3
                                        style={{
                                            color: "var(--text-primary)",
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            marginBottom: 16,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <Cpu size={20} color={project.color} /> Tech Stack
                                    </h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {project.tech?.map((tech) => (
                                            <span
                                                key={tech}
                                                style={{
                                                    padding: "8px 14px",
                                                    borderRadius: "8px",
                                                    background: `${project.color}15`,
                                                    border: `1px solid ${project.color}30`,
                                                    color: project.color,
                                                    fontSize: "0.8rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {/* Details Tab */}
                        {activeTab === "details" && (
                            <m.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                                    {/* Challenges */}
                                    <div>
                                        <h3 style={{ color: project.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            Challenges
                                        </h3>
                                        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            {project.challenges?.map((challenge, i) => (
                                                <li key={i} style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                                    • {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Solutions */}
                                    <div>
                                        <h3 style={{ color: project.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            Solutions
                                        </h3>
                                        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            {project.solutions?.map((solution, i) => (
                                                <li key={i} style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                                    ✓ {solution}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {/* Metrics Tab */}
                        {activeTab === "metrics" && (
                            <m.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                                    {project.metrics?.map((metric, i) => (
                                        <m.div
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            style={{
                                                padding: "16px",
                                                borderRadius: "12px",
                                                background: `${project.color}10`,
                                                border: `1px solid ${project.color}25`,
                                            }}
                                        >
                                            <div style={{ color: project.color, fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>
                                                {metric.value}
                                            </div>
                                            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: 500 }}>
                                                {metric.label}
                                            </div>
                                        </m.div>
                                    ))}
                                </div>
                            </m.div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === "gallery" && (
                            <m.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                {project.gallery && project.gallery.length > 0 ? (
                                    <div>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 300,
                                                borderRadius: "12px",
                                                background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: 16,
                                                position: "relative",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <m.div key={currentImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                                {project.gallery[currentImageIndex]}
                                            </m.div>
                                        </div>

                                        {/* Gallery Navigation */}
                                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                            {project.gallery.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentImageIndex(i)}
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        background: currentImageIndex === i ? project.color : "var(--border-hover)",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
                                        No gallery images available yet
                                    </p>
                                )}
                            </m.div>
                        )}

                        {/* Timeline Tab */}
                        {activeTab === "timeline" && (
                            <m.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                {project.timeline ? (
                                    <div style={{ position: "relative" }}>
                                        {/* Timeline Line */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: 19,
                                                top: 0,
                                                bottom: 0,
                                                width: "2px",
                                                background: `linear-gradient(180deg, ${project.color}30, transparent)`,
                                            }}
                                        />

                                        {/* Timeline Items */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                            {project.timeline.map((item, i) => (
                                                <m.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    style={{ display: "flex", gap: 16, position: "relative" }}
                                                >
                                                    {/* Dot */}
                                                    <div
                                                        style={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: "50%",
                                                            background: `${project.color}20`,
                                                            border: `2px solid ${project.color}`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0,
                                                            zIndex: 2,
                                                            fontSize: "1.2rem",
                                                        }}
                                                    >
                                                        {getTimelineIcon(item.icon, 18)}
                                                    </div>

                                                    {/* Content */}
                                                    <div style={{ paddingTop: 6 }}>
                                                        <div style={{ color: project.color, fontSize: "0.8rem", fontWeight: 700, marginBottom: 4 }}>
                                                            {item.phase}
                                                        </div>
                                                        <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </m.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
                                        No timeline available
                                    </p>
                                )}
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Action Footer */}
                <div
                    style={{
                        padding: "24px 32px",
                        borderTop: `1px solid ${project.color}20`,
                        display: "flex",
                        gap: 12,
                        flexWrap: "wrap",
                    }}
                >
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 18px",
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
                            <Github size={16} /> View on GitHub
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 18px",
                                borderRadius: "10px",
                                textDecoration: "none",
                            }}
                        >
                            <ExternalLink size={16} /> View Live Demo
                        </a>
                    )}
                </div>
            </m.div>
        </m.div>
    );
}
