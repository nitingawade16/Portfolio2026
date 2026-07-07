import { useState } from "react";
import { m } from "framer-motion";
import { Monitor, Server, Wrench, Code2, BookOpen, Zap } from "lucide-react";

/**
 * Technology Stack Visualization - Premium feature showing tech adoption
 */
export function TechStackVisualization() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const techStack = {
        "Frontend": {
            color: "var(--accent-blue)",
            icon: <Monitor size={32} />,
            techs: ["React", "Tailwind", "JavaScript", "HTML/CSS"],
        },
        "Backend": {
            color: "var(--accent-emerald)",
            icon: <Server size={32} />,
            techs: ["Node.js", "Express", "MongoDB", "APIs"],
        },
        "Tools": {
            color: "var(--accent-cyan)",
            icon: <Wrench size={32} />,
            techs: ["Git", "VS Code", "Figma", "Vite"],
        },
        "Languages": {
            color: "var(--accent-purple)",
            icon: <Code2 size={32} />,
            techs: ["JavaScript", "Python", "C++", "SQL"],
        },
    };

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="premium-card"
            style={{
                padding: "32px",
                width: "100%"
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <Wrench size={24} color="var(--color-primary-orange)" />
                <div>
                    <h3
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            margin: 0,
                        }}
                    >
                        Technology Stack
                    </h3>
                </div>
            </div>

            {/* Tech Categories Grid */}
            <style>{`
                .tech-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .tech-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                @media (max-width: 768px) {
                    .tech-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                    }
                }
                @media (max-width: 480px) {
                    .tech-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
            <div className="tech-grid">
                {Object.entries(techStack).map(([category, data], idx) => {
                    const isActive = selectedCategory === category;
                    const isAnyActive = selectedCategory !== null;
                    const isDimmed = isAnyActive && !isActive;

                    return (
                        <m.div
                            key={idx}
                            className="tech-card premium-card"
                            onClick={() =>
                                setSelectedCategory(
                                    isActive ? null : category
                                )
                            }
                            whileHover={{ 
                                scale: isActive ? 1.03 : 1.02
                            }}
                            whileTap={{ scale: 0.98 }}
                            animate={{
                                opacity: isDimmed ? 0.65 : 1,
                                scale: isActive ? 1.03 : 1
                            }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                background: isActive
                                    ? `${data.color}18`
                                    : "rgba(255, 255, 255, 0.03)",
                                border: isActive
                                    ? `1.5px solid ${data.color}`
                                    : `1px solid rgba(255, 255, 255, 0.08)`,
                                borderRadius: "16px",
                                padding: "24px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "background 0.22s, border-color 0.22s, box-shadow 0.22s",
                                boxShadow: isActive 
                                    ? `0 12px 32px ${data.color}25`
                                    : `0 4px 16px rgba(0, 0, 0, 0.2)`
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "center", color: data.color, marginBottom: 8 }}>
                                {data.icon}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    color: data.color,
                                    marginBottom: 8,
                                }}
                            >
                                {category}
                            </div>

                            {/* Show tech list on selection */}
                            {isActive && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                        marginTop: 8,
                                        paddingTop: 8,
                                        borderTop: `1px solid ${data.color}20`,
                                    }}
                                >
                                    {data.techs.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}
                                </m.div>
                            )}
                        </m.div>
                    );
                })}
            </div>

            <div
                style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid var(--glass-panel)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    fontSize: "0.85rem",
                }}
            >
                <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                    <BookOpen size={16} color="var(--accent-cyan)" /> Total Tech: <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>16+</span>
                </div>
                <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Zap size={16} color="var(--accent-emerald)" /> Proficient: <span style={{ color: "var(--accent-emerald)", fontWeight: 700 }}>12</span>
                </div>
            </div>
        </m.div>
    );
}
