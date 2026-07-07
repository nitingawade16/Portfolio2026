import { useState, useRef, useCallback } from "react";
import { m } from "framer-motion";
import { Calendar, BookOpen, Award, TrendingUp, MapPin, CheckCircle, GraduationCap } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

// Enhanced education data
const educationWithDetails = [
    {
        id: 1,
        course: "Bachelor of Computer Applications (BCA)",
        institute: "Jain College of BBA, BCA & Commerce",
        location: "Tilakwadi, Belgaum",
        year: "2023 – 2024",
        status: "Completed Successfully",
        current: false,
        semester: "First Year",
        cgpa: "8.2/10",
        color: "#7C3AED", // Purple
        skillsLearned: ["C++", "Java", "Data Structures", "OOP Basics"],
        achievements: [
            "Scored 8.2 CGPA in freshman year programming curricula.",
            "Built simple C++ CLI text games and OOP management apps.",
            "Active helper in peer-to-peer programming study circles."
        ]
    },
    {
        id: 2,
        course: "Bachelor of Computer Applications (BCA)",
        institute: "Jain College of BBA, BCA & Commerce",
        location: "Tilakwadi, Belgaum",
        year: "2024 – 2025",
        status: "Completed Successfully",
        current: false,
        semester: "Second Year",
        cgpa: "8.5/10",
        color: "#06B6D4", // Cyan
        skillsLearned: ["Python", "HTML5 & CSS3", "JavaScript", "SQL & Databases"],
        achievements: [
            "Attained 8.5 CGPA during key software-focused semesters.",
            "Built responsive web app designs using HTML, CSS, and basic JavaScript.",
            "Designed structured schema tables and complex queries in MySQL."
        ]
    },
    {
        id: 3,
        course: "Bachelor of Computer Applications (BCA)",
        institute: "Jain College of BBA, BCA & Commerce",
        location: "Tilakwadi, Belgaum",
        year: "2025 – Present (2026)",
        status: "Currently Studying (Third Year)",
        current: true,
        semester: "Third Year",
        cgpa: "8.7/10",
        color: "#FF4500", // Orange
        skillsLearned: ["React.js", "Node.js & Express", "Tailwind CSS", "Modern UI/UX"],
        achievements: [
            "Maintaining 8.7 CGPA while building real-world web apps.",
            "Specialize in frontend optimization, custom hooks, and layout state.",
            "Engaged in freelance frontend initiatives and collaborative projects."
        ]
    }
];

// Skills progression mapping
const skillsByYear = [
    { year: "Year 1 (Foundations)", color: "#7C3AED", skills: ["C++", "Java Basics", "DSA Fundamentals", "OOP Logic"] },
    { year: "Year 2 (Development)", color: "#06B6D4", skills: ["Python Scripting", "Responsive Web Design", "SQL Databases", "PHP Basics"] },
    { year: "Year 3 (Specialization)", color: "#FF4500", skills: ["React.js & Hooks", "Node.js REST APIs", "Tailwind CSS", "Framer Motion Animations"] },
];

/* ─── Spotlight Card for Education ─────────────────── */
function EducationCard({ item }) {
    const rectRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        e.currentTarget.style.setProperty('--mouse-x', x);
        e.currentTarget.style.setProperty('--mouse-y', y);
    }, []);

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    return (
        <m.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            style={{
                position: "relative",
                padding: "32px",
                borderRadius: 24,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                borderColor: isHovered ? `${item.color}35` : "rgba(255, 255, 255, 0.06)",
                boxShadow: isHovered
                    ? `0 16px 40px rgba(0,0,0,0.4), 0 0 32px ${item.color}10, 0 0 0 1px ${item.color}15`
                    : "0 4px 20px rgba(0,0,0,0.12)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease"
            }}
        >
            {/* Spotlight Glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(
                        240px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%),
                        ${item.color}12,
                        transparent 70%
                    )`
                }}
            />

            {/* Glowing top line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${item.color}45, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    zIndex: 1
                }}
            />

            {/* Card Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header Row */}
                <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        flexShrink: 0,
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        boxShadow: `0 0 12px ${item.color}15`
                    }}>
                        <GraduationCap size={22} />
                    </div>
                    <div>
                        <h3 style={{
                            color: "var(--text-primary)",
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            marginBottom: 2,
                            fontFamily: "'Geist', sans-serif",
                            letterSpacing: "-0.01em"
                        }}>
                            {item.semester}
                        </h3>
                        <p style={{
                            color: "var(--text-muted)",
                            fontSize: "0.78rem",
                            fontFamily: "'Space Mono', monospace",
                            margin: 0
                        }}>
                            {item.year}
                        </p>
                    </div>
                </div>

                {/* Course Details */}
                <h4 style={{
                    color: "var(--text-primary)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: 6,
                    fontFamily: "'Geist', sans-serif"
                }}>
                    {item.course}
                </h4>
                <p style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 16,
                    fontFamily: "'Geist', sans-serif"
                }}>
                    <MapPin size={14} style={{ color: item.color, flexShrink: 0 }} />
                    <span>{item.institute}, {item.location}</span>
                </p>

                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                    <span
                        style={{
                            fontSize: "0.72rem",
                            padding: "4px 10px",
                            borderRadius: 50,
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            color: "var(--text-primary)",
                            fontWeight: 600,
                            fontFamily: "'Space Mono', monospace"
                        }}
                    >
                        CGPA: {item.cgpa}
                    </span>
                    {item.current && (
                        <m.span
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{
                                fontSize: "0.72rem",
                                padding: "4px 10px",
                                borderRadius: 50,
                                background: "rgba(16, 185, 129, 0.08)",
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                color: "#10b981",
                                fontWeight: 600,
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            In Progress
                        </m.span>
                    )}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 0 20px" }} />

                {/* Skills Learned */}
                <div style={{ marginBottom: 20 }}>
                    <p style={{
                        color: "var(--text-muted)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                        fontFamily: "'Space Mono', monospace"
                    }}>
                        Key Tools & Concepts
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {item.skillsLearned.map((skill) => (
                            <span
                                key={skill}
                                style={{
                                    fontSize: "0.68rem",
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    background: `${item.color}06`,
                                    border: `1px solid ${item.color}15`,
                                    color: item.color,
                                    fontWeight: 600,
                                    fontFamily: "'Geist', sans-serif"
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Achievements List */}
                <div>
                    <p style={{
                        color: "var(--text-muted)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                        fontFamily: "'Space Mono', monospace"
                    }}>
                        Highlights
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                        {item.achievements.map((ach, index) => (
                            <li
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "flex-start",
                                    color: "var(--text-secondary)",
                                    fontSize: "0.825rem",
                                    lineHeight: 1.5,
                                    fontFamily: "'Geist', sans-serif"
                                }}
                            >
                                <CheckCircle size={13} style={{ color: item.color, marginTop: 2, flexShrink: 0 }} />
                                <span>{ach}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </m.div>
    );
}

/* ─── Progression Card for bottom section ─────────── */
function ProgressionCard({ year, index }) {
    const rectRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ y: -4 }}
            style={{
                position: "relative",
                padding: "28px 24px",
                borderRadius: 20,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(16px)",
                borderColor: hovered ? `${year.color}35` : "rgba(255, 255, 255, 0.06)",
                boxShadow: hovered
                    ? `0 12px 32px ${year.color}08, 0 0 0 1px ${year.color}15`
                    : "0 4px 16px rgba(0,0,0,0.08)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease"
            }}
        >
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
                        ${year.color}10,
                        transparent 70%
                    )`
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{
                    color: "var(--text-primary)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: 16,
                    fontFamily: "'Geist', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: year.color }} />
                    {year.year}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {year.skills.map((skill, j) => (
                        <span
                            key={j}
                            style={{
                                fontSize: "0.72rem",
                                padding: "4px 10px",
                                borderRadius: 50,
                                background: `${year.color}08`,
                                border: `1px solid ${year.color}15`,
                                color: "var(--text-secondary)",
                                fontWeight: 500,
                                fontFamily: "'Geist', sans-serif"
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </m.div>
    );
}

/* ═══════════════════════════════════════════════════════ */
/*  Main Education Component                              */
/* ═══════════════════════════════════════════════════════ */
export default function Education() {
    return (
        <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80, position: "relative" }}>
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
                    top: "-10%",
                    right: "-10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124,58,237,0.04), transparent 70%)",
                    filter: "blur(80px)"
                }} />
                <div style={{
                    position: "absolute",
                    width: "45vw",
                    height: "45vw",
                    bottom: "-15%",
                    left: "-5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,0,0.04), transparent 70%)",
                    filter: "blur(90px)"
                }} />
            </div>

            <style>{`
                .timeline-container {
                    position: relative;
                    margin-top: 60px;
                    margin-bottom: 80px;
                }
                .timeline-line {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: linear-gradient(to bottom, #7C3AED, #06B6D4, #FF4500, rgba(255, 255, 255, 0.02));
                    border-radius: 2px;
                    z-index: 1;
                }
                .timeline-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 56px;
                }
                .timeline-item {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: flex-start;
                    position: relative;
                }
                .timeline-dot {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 42px);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--bg-primary);
                    border: 3px solid var(--text-muted);
                    z-index: 2;
                    transition: all 0.3s ease;
                }
                .timeline-item.active .timeline-dot {
                    border-color: #FF4500;
                    box-shadow: 0 0 16px rgba(255, 69, 0, 0.5);
                }
                @media (max-width: 820px) {
                    .timeline-line {
                        left: 16px;
                        transform: none;
                    }
                    .timeline-grid {
                        gap: 36px;
                    }
                    .timeline-item {
                        grid-template-columns: 1fr;
                        gap: 16px;
                        padding-left: 48px;
                    }
                    .timeline-dot {
                        left: 16px;
                        transform: translate(-50%, 28px);
                    }
                }
            `}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                <SectionTitle
                    tag="My Learning Journey"
                    title="Education"
                    highlight="Timeline"
                    subtitle="Transforming into a developer through structured learning and hands-on experience."
                    center
                />

                {/* ═══ MAIN TIMELINE ═══ */}
                <section className="timeline-container">
                    {/* Glowing vertical line */}
                    <m.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="timeline-line"
                        style={{ originY: 0 }}
                    />

                    <div className="timeline-grid">
                        {educationWithDetails.map((item, i) => {
                            const isEven = i % 2 === 0;
                            const cardContent = (
                                <m.div
                                    initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <EducationCard item={item} />
                                </m.div>
                            );

                            return (
                                <div
                                    key={item.id}
                                    className={`timeline-item ${item.current ? "active" : ""}`}
                                >
                                    {/* Timeline dot */}
                                    <m.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                                        className="timeline-dot"
                                        style={{
                                            borderColor: item.color,
                                            boxShadow: `0 0 12px ${item.color}35`
                                        }}
                                    />

                                    {isEven ? (
                                        <>
                                            {cardContent}
                                            <div className="md:block hidden" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="md:block hidden" />
                                            {cardContent}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ SKILLS PROGRESSION ═══ */}
                <section style={{ marginBottom: 48, marginTop: 80 }}>
                    <div style={{ marginBottom: 36, textAlign: "center" }}>
                        <h2
                            style={{
                                color: "var(--text-primary)",
                                fontWeight: 800,
                                fontSize: "1.45rem",
                                marginBottom: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                                fontFamily: "'Playfair Display', serif",
                                letterSpacing: "-0.01em"
                            }}
                        >
                            <TrendingUp size={24} color="var(--color-primary-orange)" /> Curriculum Progression
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto", fontFamily: "'Geist', sans-serif" }}>
                            Academic roadmap highlighting core focus areas mastered throughout my BCA degree.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                        {skillsByYear.map((year, i) => (
                            <ProgressionCard
                                key={i}
                                year={year}
                                index={i}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
