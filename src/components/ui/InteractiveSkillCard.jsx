import { useState, useRef, useEffect } from "react";
import { m, useInView, useMotionValue } from "framer-motion";
import {
    Atom, Code, Palette, FileCode, Wind, Code2, Server, GitBranch, PenTool,
    Database, Network, Plug, Binary, FileCode2, Flame, TerminalSquare, HardDrive,
    Puzzle, MessagesSquare, Users, RefreshCcw, BrainCircuit
} from "lucide-react";

/**
 * Custom CountUp hook — animates a number from 0 to `end` over `duration` ms.
 * Only triggers when `startCounting` becomes true.
 */
function useCountUp(end, duration = 1400, startCounting = false) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let startTime = null;
        let raf;
        const animate = (ts) => {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) {
                raf = requestAnimationFrame(animate);
            }
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [end, duration, startCounting]);

    return value;
}

/**
 * Interactive Skill Card — Premium glassmorphic skill card
 * with cursor-tracking spotlight and animated circular progress.
 */
export function InteractiveSkillCard({ skill, category, color, index }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(cardRef, { once: true, margin: "-40px" });
    const count = useCountUp(skill.level, 1200, isInView);
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

    // Skill icon mapping
    const iconMap = {
        react: <Atom size={28} />,
        html: <Code size={28} />,
        css: <Palette size={28} />,
        javascript: <FileCode size={28} />,
        tailwind: <Wind size={28} />,
        python: <Code2 size={28} />,
        node: <Server size={28} />,
        git: <GitBranch size={28} />,
        figma: <PenTool size={28} />,
        mongodb: <Database size={28} />,
        express: <Network size={28} />,
        api: <Plug size={28} />,
        cpp: <Binary size={28} />,
        typescript: <FileCode2 size={28} />,
        mysql: <Database size={28} />,
        firebase: <Flame size={28} />,
        vscode: <TerminalSquare size={28} />,
        database: <HardDrive size={28} />,
        brain: <Puzzle size={28} />,
        chat: <MessagesSquare size={28} />,
        users: <Users size={28} />,
        refresh: <RefreshCcw size={28} />,
        book: <BrainCircuit size={28} />,
    };

    const icon = iconMap[skill.icon] || <Code size={28} />;

    // Circular progress
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
        <m.div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "relative",
                padding: "28px 20px 24px",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 12,
                overflow: "hidden",
                borderRadius: 20,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                borderColor: isHovered ? `${color}30` : "rgba(255, 255, 255, 0.06)",
                boxShadow: isHovered
                    ? `0 8px 32px ${color}12, 0 0 0 1px ${color}18`
                    : "0 2px 12px rgba(0,0,0,0.12)"
            }}
        >
            {/* Cursor-tracking spotlight */}
            <m.div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(
                        240px circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%),
                        ${color}14,
                        transparent 70%
                    )`,
                    "--x": mouseX,
                    "--y": mouseY
                }}
            />

            {/* Subtle top-edge glow */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    zIndex: 0
                }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                {/* Icon */}
                <m.div
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        color: color,
                        marginBottom: 8,
                        filter: `drop-shadow(0 0 10px ${color}25)`
                    }}
                >
                    {icon}
                </m.div>

                {/* Skill Name */}
                <h3
                    style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        marginBottom: 2,
                        fontFamily: "'Geist', sans-serif",
                        letterSpacing: "-0.01em"
                    }}
                >
                    {skill.name}
                </h3>

                {/* Category label */}
                <span
                    style={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        color: color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 12,
                        display: "inline-block",
                        fontFamily: "'Space Mono', monospace"
                    }}
                >
                    {category}
                </span>

                {/* Circular Progress */}
                <div
                    style={{
                        position: "relative",
                        width: 90,
                        height: 90,
                        margin: "0 auto 4px"
                    }}
                >
                    <svg
                        viewBox="0 0 96 96"
                        style={{
                            transform: "rotate(-90deg)",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        {/* Background track */}
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="3"
                            fill="transparent"
                        />
                        {/* Animated progress arc */}
                        <m.circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke={color}
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 + 0.2 }}
                            strokeLinecap="round"
                            style={{ filter: `drop-shadow(0 0 6px ${color}35)` }}
                        />
                    </svg>

                    {/* Center count-up number */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: 800,
                                color: "#FFFFFF",
                                lineHeight: 1,
                                fontFamily: "'Geist', sans-serif",
                                fontVariantNumeric: "tabular-nums"
                            }}
                        >
                            {count}%
                        </span>
                        <span
                            style={{
                                fontSize: "0.55rem",
                                color: "var(--text-muted)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                lineHeight: 1,
                                marginTop: 2,
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            Proficiency
                        </span>
                    </div>
                </div>
            </div>
        </m.div>
    );
}
