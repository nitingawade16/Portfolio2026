import { m } from "framer-motion";

/**
 * Skill Tree - Hierarchical skill visualization
 */
export function SkillTree({ skills, color }) {
    // Sort by level to create hierarchy
    const sorted = [...skills].sort((a, b) => b.level - a.level);
    const beginner = sorted.filter((s) => s.level < 60);
    const intermediate = sorted.filter((s) => s.level >= 60 && s.level < 80);
    const advanced = sorted.filter((s) => s.level >= 80);

    const renderLevel = (title, items, levelColor, delay) => (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            style={{ marginBottom: 40 }}
        >
            <div style={{ marginBottom: 20, textAlign: "center" }}>
                <span
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: levelColor,
                        display: "inline-block",
                        padding: "6px 12px",
                        background: `${levelColor}15`,
                        borderRadius: "50px",
                        border: `1px solid ${levelColor}30`,
                    }}
                >
                    {title}
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 16,
                    alignItems: "stretch",
                }}
            >
                {items.map((skill, i) => (
                    <m.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + i * 0.05 }}
                        style={{
                            padding: "16px 20px",
                            borderRadius: "14px",
                            background: `${levelColor}08`,
                            border: `1px solid ${levelColor}25`,
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            minWidth: "140px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: 6,
                            }}
                        >
                            {skill.name}
                        </div>
                        <div
                            style={{
                                fontSize: "0.75rem",
                                color: levelColor,
                                fontWeight: 700,
                            }}
                        >
                            {skill.level}%
                        </div>
                    </m.div>
                ))}
            </div>
        </m.div>
    );

    return (
        <div>
            {advanced.length > 0 && renderLevel("Expert", advanced, "#10b981", 0)}
            {intermediate.length > 0 && renderLevel("Intermediate", intermediate, "#f97316", 0.1)}
            {beginner.length > 0 && renderLevel("Learning", beginner, "#8b5cf6", 0.2)}
        </div>
    );
}
