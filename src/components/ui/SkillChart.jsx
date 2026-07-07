import { m } from "framer-motion";

/**
 * Animated Skill Chart - Bar chart with animated fills
 */
export function SkillChart({ skills, color }) {
    const maxLevel = 100;

    return (
        <div style={{ width: "100%" }}>
            {skills.map((skill, index) => {
                const percentage = (skill.level / maxLevel) * 100;
                return (
                    <m.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        style={{ marginBottom: 20 }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 8,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {skill.name}
                            </span>
                            <m.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    color,
                                }}
                            >
                                {skill.level}%
                            </m.span>
                        </div>
                        <div
                            style={{
                                height: 8,
                                borderRadius: "50px",
                                background: `${color}15`,
                                border: `1px solid ${color}25`,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <m.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: percentage / 100 }}
                                transition={{
                                    duration: 1.2,
                                    delay: index * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                                    borderRadius: "50px",
                                    boxShadow: `0 0 8px ${color}60`,
                                    transformOrigin: "left",
                                }}
                            />
                        </div>
                    </m.div>
                );
            })}
        </div>
    );
}
