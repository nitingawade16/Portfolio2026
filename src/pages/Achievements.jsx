import { m } from "framer-motion";
import { Award, Star, Flag, Zap } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { achievements } from "@/data/education";
import { personalInfo } from "@/data/personalInfo";

const typeColors = {
    hackathon: { bg: "rgba(224,64,251,0.08)", border: "rgba(224,64,251,0.2)", color: "#E040FB" },
    competition: { bg: "rgba(224,64,251,0.08)", border: "rgba(224,64,251,0.2)", color: "#7C4DFF" },
    award: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", color: "#f59e0b" },
    milestone: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", color: "#10b981" },
};

// Maps achievement type → icon component
const typeIconMap = {
    hackathon: Zap,
    competition: Star,
    award: Award,
    milestone: Flag,
};

function TypeIcon({ type, size = 20 }) {
    const Icon = typeIconMap[type] || Award;
    return <Icon size={size} />;
}

export default function Achievements() {
    return (
        <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

                <SectionTitle
                    tag="Milestones"
                    title="My"
                    highlight="Achievements"
                    subtitle="Competitions, hackathons, awards, and milestones that mark my journey."
                    center
                />

                {/* Animated stat counters */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        gap: 20,
                        marginBottom: 80,
                    }}
                >
                    {personalInfo.stats.map((stat, i) => (
                        <div
                            key={i}
                            className="glass"
                            style={{ padding: "24px 20px", borderRadius: 16, textAlign: "center" }}
                        >
                            <div style={{
                                fontSize: "2rem", fontWeight: 800, marginBottom: 8,
                                background: "linear-gradient(135deg, #E040FB, #7C4DFF)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: "#606080", fontSize: "0.8rem" }}>{stat.label}</div>
                        </div>
                    ))}
                </m.div>

                {/* Achievement timeline */}
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    {achievements.map((item, i) => {
                        const colors = typeColors[item.type] || typeColors.milestone;
                        return (
                            <m.div
                                key={item.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    display: "flex",
                                    gap: 24,
                                    marginBottom: i < achievements.length - 1 ? 32 : 0,
                                }}
                            >
                                {/* Icon column */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <m.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        style={{
                                            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                                            background: colors.bg,
                                            border: `1px solid ${colors.border}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: colors.color,
                                            boxShadow: `0 0 20px ${colors.bg}`,
                                        }}
                                    >
                                        <TypeIcon type={item.type} />
                                    </m.div>
                                    {i < achievements.length - 1 && (
                                        <div style={{
                                            width: 1, flex: 1, marginTop: 8,
                                            background: "linear-gradient(to bottom, var(--glass-panel), transparent)",
                                            minHeight: 32,
                                        }} />
                                    )}
                                </div>

                                {/* Content card */}
                                <m.div
                                    whileHover={{ scale: 1.01, y: -4 }}
                                    className="glass animated-border"
                                    style={{
                                        flex: 1, padding: "24px 28px", borderRadius: 20, cursor: "none",
                                        borderLeft: `2px solid ${colors.color}40`,
                                    }}
                                >
                                    <div style={{
                                        display: "flex", justifyContent: "space-between",
                                        alignItems: "flex-start", marginBottom: 8,
                                    }}>
                                        <h3 style={{ color: "#f0f0ff", fontWeight: 700, fontSize: "1rem" }}>
                                            {item.title}
                                        </h3>
                                        <span style={{
                                            background: colors.bg,
                                            border: `1px solid ${colors.border}`,
                                            color: colors.color,
                                            padding: "3px 10px", borderRadius: 50,
                                            fontSize: "0.7rem", fontWeight: 500,
                                            flexShrink: 0, marginLeft: 12,
                                        }}>
                                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                        </span>
                                    </div>
                                    <p style={{ color: "#a0a0c0", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: 12 }}>
                                        {item.description}
                                    </p>
                                    <span style={{ color: "#606080", fontSize: "0.8rem" }}>{item.date}</span>
                                </m.div>
                            </m.div>
                        );
                    })}
                </div>

                {/* Placeholder note */}
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "0px" }}
                    style={{
                        marginTop: 60, textAlign: "center", padding: 24,
                        borderRadius: 16,
                        background: "rgba(224,64,251,0.04)",
                        border: "1px dashed rgba(224,64,251,0.2)",
                    }}
                >
                    <p style={{ color: "#606080", fontSize: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Award size={16} color="var(--color-primary-orange)" /> Real achievements, hackathon wins, and awards will be added here!
                    </p>
                </m.div>
            </div>
        </main>
    );
}
