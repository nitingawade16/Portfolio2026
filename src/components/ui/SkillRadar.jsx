import { m } from "framer-motion";

/**
 * Skill Radar Chart - Interactive radial visualization
 */
export function SkillRadar({ skills, color }) {
    const centerX = 120;
    const centerY = 120;
    const maxRadius = 100;
    const levels = 5;

    // Create radar points
    const points = skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        return { skill, angle, x, y, level: skill.level };
    });

    // Grid circles
    const gridCircles = Array.from({ length: levels }, (_, i) => {
        const radius = ((i + 1) / levels) * maxRadius;
        return (
            <circle
                key={`grid-${i}`}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="var(--glass-bg-light)"
                strokeWidth="1"
            />
        );
    });

    // Data lines (from center to each skill point)
    const dataLines = points.map((point, i) => (
        <line
            key={`line-${i}`}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="var(--border-primary)"
            strokeWidth="1"
        />
    ));

    // Skill polygon
    const polygonPoints = points
        .map((point) => {
            const radius = (point.level / 100) * maxRadius;
            const x = centerX + Math.cos(point.angle) * radius;
            const y = centerY + Math.sin(point.angle) * radius;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "20px 0" }}>
            <svg width="240" height="240" viewBox="0 0 240 240" style={{ maxWidth: "100%" }}>
                {/* Grid circles */}
                {gridCircles}

                {/* Data lines */}
                {dataLines}

                {/* Skill polygon background */}
                <m.polygon
                    points={polygonPoints}
                    fill={`${color}15`}
                    stroke={color}
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ filter: `drop-shadow(0 0 12px ${color}40)` }}
                />

                {/* Skill points */}
                {points.map((point, i) => {
                    const radius = (point.level / 100) * maxRadius;
                    const x = centerX + Math.cos(point.angle) * radius;
                    const y = centerY + Math.sin(point.angle) * radius;
                    return (
                        <m.g key={`point-${i}`}>
                            <m.circle
                                cx={x}
                                cy={y}
                                r="5"
                                fill={color}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            />
                        </m.g>
                    );
                })}

                {/* Labels */}
                {points.map((point, i) => (
                    <text
                        key={`label-${i}`}
                        x={point.x + (point.x > centerX ? 15 : -15)}
                        y={point.y + 4}
                        textAnchor={point.x > centerX ? "start" : "end"}
                        fontSize="10"
                        fill="var(--text-muted)"
                        fontWeight="500"
                    >
                        {point.skill.name}
                    </text>
                ))}
            </svg>
        </div>
    );
}
