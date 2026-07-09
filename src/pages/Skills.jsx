import { useState, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { skillCategories } from "@/data/skills";
import { InteractiveSkillCard } from "@/components/ui/InteractiveSkillCard";
import { SkillChart } from "@/components/ui/SkillChart";
import { SkillRadar } from "@/components/ui/SkillRadar";
import { SkillTree } from "@/components/ui/SkillTree";
import {
    Monitor, Server, Code, Database, Wrench, Users, BarChart2, GitBranch, Layers
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const categoryIcons = {
    frontend: Monitor,
    backend: Server,
    programming: Code,
    database: Database,
    tools: Wrench,
    soft: Users,
};

/* ─── Spotlight Overview Card ─────────────────────────── */
function SkillOverviewCard({ cat, categoryIcons: icons, onClick }) {
    const rectRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const Icon = icons[cat.id] || Code;
    const avgLevel = Math.round(
        cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
    );

    const onMove = useCallback((e) => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        e.currentTarget.style.setProperty('--mouse-x', x);
        e.currentTarget.style.setProperty('--mouse-y', y);
    }, []);

    const handleMouseEnter = (e) => {
        setHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    return (
        <m.div
            whileHover={{ y: -4 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={onMove}
            onClick={onClick}
            style={{
                position: "relative",
                padding: 24,
                borderRadius: 20,
                cursor: "pointer",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                borderColor: hovered ? `${cat.color}30` : "rgba(255, 255, 255, 0.06)",
                boxShadow: hovered
                    ? `0 8px 32px ${cat.color}10, 0 0 0 1px ${cat.color}15`
                    : "0 2px 12px rgba(0,0,0,0.08)"
            }}
        >
            {/* Cursor spotlight */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(
                        200px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%),
                        ${cat.color}12,
                        transparent 70%
                    )`
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            background: `${cat.color}10`,
                            border: `1px solid ${cat.color}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <span
                            style={{
                                color: "var(--text-primary)",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                fontFamily: "'Geist', sans-serif",
                            }}
                        >
                            {cat.label}
                        </span>
                        <div
                            style={{
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                                marginTop: 2,
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            Avg: {avgLevel}%
                        </div>
                    </div>
                </div>

                {/* Skill pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cat.skills.slice(0, 4).map((s) => (
                        <span
                            key={s.name}
                            style={{
                                fontSize: "0.7rem",
                                padding: "4px 10px",
                                borderRadius: 50,
                                background: `${cat.color}08`,
                                border: `1px solid ${cat.color}15`,
                                color: cat.color,
                                fontWeight: 500,
                                fontFamily: "'Geist', sans-serif"
                            }}
                        >
                            {s.name}
                        </span>
                    ))}
                    {cat.skills.length > 4 && (
                        <span
                            style={{
                                fontSize: "0.7rem",
                                padding: "4px 10px",
                                borderRadius: 50,
                                background: `${cat.color}08`,
                                border: `1px solid ${cat.color}15`,
                                color: cat.color,
                                fontWeight: 500,
                                fontFamily: "'Geist', sans-serif"
                            }}
                        >
                            +{cat.skills.length - 4} more
                        </span>
                    )}
                </div>
            </div>
        </m.div>
    );
}

/* ═══════════════════════════════════════════════════════ */
/*  Skills Page                                          */
/* ═══════════════════════════════════════════════════════ */
export default function Skills() {
    const [activeCategory, setActiveCategory] = useState("frontend");
    const [viewMode, setViewMode] = useState("cards");

    const category = skillCategories.find((c) => c.id === activeCategory);

    const renderVisualization = () => {
        if (!category) return null;

        switch (viewMode) {
            case "cards":
                return (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {category.skills.map((skill, i) => (
                            <InteractiveSkillCard
                                key={skill.name}
                                skill={skill}
                                category={category.label}
                                color={category.color}
                                index={i}
                            />
                        ))}
                    </div>
                );
            case "chart":
                return <SkillChart skills={category.skills} color={category.color} />;
            case "radar":
                return <SkillRadar skills={category.skills} color={category.color} />;
            case "tree":
                return <SkillTree skills={category.skills} color={category.color} />;
            default:
                return null;
        }
    };

    return (
        <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
            {/* Aurora background glow */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute",
                    width: "50vw",
                    height: "50vw",
                    top: "-15%",
                    right: "-10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,0,0.06), transparent 70%)",
                    filter: "blur(80px)"
                }} />
                <div style={{
                    position: "absolute",
                    width: "40vw",
                    height: "40vw",
                    bottom: "-10%",
                    left: "-5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.04), transparent 70%)",
                    filter: "blur(80px)"
                }} />
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                <SectionTitle
                    tag="What I Know"
                    title="My"
                    highlight="Skills"
                    subtitle="A constantly growing toolkit built through projects, learning, and relentless curiosity."
                    center
                />

                {/* ═══ Category Tabs ═══ */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    className="skills-category-tabs"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        justifyContent: "center",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        padding: "6px",
                        borderRadius: "40px",
                        width: "fit-content",
                        margin: "0 auto 32px",
                        backdropFilter: "blur(12px)"
                    }}
                >
                    {skillCategories.map((cat) => {
                        const Icon = categoryIcons[cat.id] || Code;
                        const active = activeCategory === cat.id;
                        return (
                            <m.button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                whileTap={{ scale: 0.96 }}
                                className={`premium-pill-tab ${active ? 'active' : ''}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    position: "relative"
                                }}
                            >
                                <Icon
                                    size={14}
                                    style={{
                                        color: active ? cat.color : "inherit",
                                        position: "relative",
                                        zIndex: 2,
                                        transition: "color 0.3s ease"
                                    }}
                                />
                                <span style={{ position: "relative", zIndex: 2, fontFamily: "'Geist', sans-serif" }}>{cat.label}</span>
                                {active && (
                                    <m.div
                                        layoutId="activeSkillTab"
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(255, 255, 255, 0.08)",
                                            borderRadius: 50,
                                            border: `1px solid ${cat.color}33`,
                                            zIndex: 1,
                                            boxShadow: `0 2px 12px ${cat.color}15`
                                        }}
                                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                    />
                                )}
                            </m.button>
                        );
                    })}
                </m.div>

                {/* ═══ View Mode Toggle ═══ */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
                    <div
                        style={{
                            display: "flex",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: 16,
                            padding: 4,
                            gap: 4,
                            backdropFilter: "blur(12px)"
                        }}
                    >
                        {[
                            { id: "cards", label: "Cards", icon: Monitor },
                            { id: "chart", label: "Chart", icon: BarChart2 },
                            { id: "radar", label: "Radar", icon: Layers },
                            { id: "tree", label: "Tree", icon: GitBranch },
                        ].map(({ id, label, icon: Icon }) => (
                            <m.button
                                key={id}
                                onClick={() => setViewMode(id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`premium-pill-tab ${viewMode === id ? 'active' : ''}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "8px 16px",
                                    fontSize: "0.78rem"
                                }}
                            >
                                <Icon size={14} />
                                <span style={{ fontFamily: "'Geist', sans-serif" }}>{label}</span>
                            </m.button>
                        ))}
                    </div>
                </div>

                {/* ═══ Skills Visualization ═══ */}
                <ScrollReveal variant="up" delay={0.15}>
                    <AnimatePresence mode="wait">
                        {category && (
                            <m.div
                                key={activeCategory + viewMode}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                                <div
                                    style={{
                                        padding: "40px 36px",
                                        borderRadius: 24,
                                        background: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    {/* Category header */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                                        {(() => {
                                            const Icon = categoryIcons[category.id] || Code;
                                            return (
                                                <div
                                                    style={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: 12,
                                                        background: `${category.color}10`,
                                                        border: `1px solid ${category.color}20`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <Icon size={20} style={{ color: category.color }} />
                                                </div>
                                            );
                                        })()}
                                        <div>
                                            <h3
                                                style={{
                                                    color: "var(--text-primary)",
                                                    fontWeight: 800,
                                                    fontSize: "1.25rem",
                                                    fontFamily: "'Geist', sans-serif",
                                                    letterSpacing: "-0.01em",
                                                    margin: 0
                                                }}
                                            >
                                                {category.label}
                                            </h3>
                                            <p
                                                style={{
                                                    color: "var(--text-muted)",
                                                    fontSize: "0.825rem",
                                                    fontWeight: 500,
                                                    fontFamily: "'Space Mono', monospace",
                                                    margin: "4px 0 0"
                                                }}
                                            >
                                                {category.skills.length} Technical Skills
                                            </p>
                                        </div>
                                    </div>

                                    {renderVisualization()}
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </ScrollReveal>

                {/* ═══ Complete Skills Overview ═══ */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.5 }}
                    style={{ marginTop: 80 }}
                >
                    <h3
                        style={{
                            color: "var(--text-primary)",
                            fontWeight: 800,
                            fontSize: "1.35rem",
                            marginBottom: 32,
                            textAlign: "center",
                            fontFamily: "'Playfair Display', serif",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Complete <span className="gradient-text">Skills Overview</span>
                    </h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 24,
                        }}
                    >
                        {skillCategories.map((cat) => (
                            <SkillOverviewCard
                                key={cat.id}
                                cat={cat}
                                categoryIcons={categoryIcons}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                            />
                        ))}
                    </div>
                </m.div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    .skills-category-tabs {
                        width: 100% !important;
                        flex-wrap: nowrap !important;
                        overflow-x: auto !important;
                        overflow-y: hidden !important;
                        justify-content: flex-start !important;
                        padding: 6px 12px !important;
                        border-radius: 20px !important;
                        scroll-behavior: smooth;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                    }
                    .skills-category-tabs::-webkit-scrollbar {
                        display: none;
                    }
                }
            `}</style>
        </main>
    );
}
