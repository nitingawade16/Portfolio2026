import { useState, useMemo, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Rocket, Wrench } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { ProjectCard3D } from "@/components/ui/ProjectCard3D";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/animations/ScrollReveal";

// Generate unique tags from all projects
function getUniqueTags(projectsList) {
    const tags = new Set(["All"]);
    projectsList.forEach((p) => {
        p.tech?.forEach((t) => tags.add(t));
    });
    return Array.from(tags);
}

export default function Projects() {
    const [activeTag, setActiveTag] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Get unique tags and generate tag pills
    const uniqueTags = useMemo(() => getUniqueTags(projects), []);

    // Filter projects
    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchTag = activeTag === "All" || p.tech?.includes(activeTag);
            const matchSearch =
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            return matchTag && matchSearch;
        });
    }, [activeTag, search]);

    // Get featured project
    const featuredProject = projects.find((p) => p.featured);
    const otherProjects = filtered.filter((p) => p.id !== featuredProject?.id);

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
                    width: "55vw",
                    height: "55vw",
                    top: "-15%",
                    left: "-10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,0,0.05), transparent 70%)",
                    filter: "blur(90px)"
                }} />
                <div style={{
                    position: "absolute",
                    width: "45vw",
                    height: "45vw",
                    bottom: "-10%",
                    right: "-5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.04), transparent 70%)",
                    filter: "blur(90px)"
                }} />
            </div>

            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
                {/* Page Title */}
                <SectionTitle
                    tag="My Work"
                    title="Featured"
                    highlight="Projects"
                    subtitle="Premium project showcases with detailed case studies, performance metrics, and full technical breakdowns."
                    center
                />

                {/* Featured Project Section */}
                {projects.length > 0 && featuredProject && (
                    <ScrollReveal variant="up" delay={0.15}>
                        <div style={{ marginBottom: 80 }}>
                            <FeaturedProjectSection
                                project={featuredProject}
                                onClick={() => setSelectedProject(featuredProject)}
                            />
                        </div>
                    </ScrollReveal>
                )}

                {/* Search and Filters */}
                {projects.length > 0 && (
                    <>
                        <m.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                display: "flex",
                                gap: 16,
                                marginBottom: 28,
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {/* Search Bar */}
                            <div
                                style={{
                                    flex: 1,
                                    minWidth: 280,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    background: isSearchFocused ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.02)",
                                    border: isSearchFocused ? "1px solid rgba(255, 69, 0, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                                    borderRadius: "16px",
                                    padding: "12px 18px",
                                    backdropFilter: "blur(12px)",
                                    boxShadow: isSearchFocused ? "0 0 20px rgba(255, 69, 0, 0.15)" : "none",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <Search
                                    size={18}
                                    style={{
                                        color: isSearchFocused ? "var(--color-primary-orange)" : "var(--text-muted)",
                                        transition: "color 0.3s ease",
                                        flexShrink: 0
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        outline: "none",
                                        color: "var(--text-primary)",
                                        fontSize: "0.9rem",
                                        width: "100%",
                                        fontFamily: "'Geist', sans-serif"
                                    }}
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Filter Toggle */}
                            <m.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowFilters(!showFilters)}
                                className={`premium-pill-tab ${showFilters ? 'active' : ''}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "12px 20px"
                                }}
                            >
                                <Filter size={16} /> <span style={{ fontFamily: "'Geist', sans-serif" }}>Filters</span>
                            </m.button>
                        </m.div>

                        {/* Tag Filters */}
                        <AnimatePresence>
                            {showFilters && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 8,
                                        marginBottom: 32,
                                        padding: "16px",
                                        borderRadius: "16px",
                                        background: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        backdropFilter: "blur(12px)",
                                        overflow: "hidden"
                                    }}
                                >
                                    {uniqueTags.map((tag) => {
                                        const active = activeTag === tag;
                                        return (
                                            <m.button
                                                key={tag}
                                                onClick={() => setActiveTag(tag)}
                                                whileTap={{ scale: 0.95 }}
                                                className={`premium-pill-tab ${active ? 'active' : ''}`}
                                                style={{
                                                    padding: "6px 14px",
                                                    fontSize: "0.78rem"
                                                }}
                                            >
                                                {tag}
                                            </m.button>
                                        );
                                    })}
                                </m.div>
                            )}
                        </AnimatePresence>

                        {/* Results Count */}
                        <m.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.825rem",
                                marginBottom: 28,
                                fontWeight: 500,
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            Showing <span style={{ color: "var(--color-primary-orange)", fontWeight: 700 }}>{filtered.length}</span> project
                            {filtered.length !== 1 ? "s" : ""}
                        </m.p>
                    </>
                )}

                {/* Projects Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                        gap: 28,
                        marginBottom: 60,
                    }}
                >
                    <AnimatePresence>
                        {otherProjects.map((project, i) => (
                            <ProjectCard3D
                                key={project.id}
                                project={project}
                                onClick={() => setSelectedProject(project)}
                                index={i}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: "center", padding: "80px 24px" }}
                    >
                        {/* Animated Icon */}
                        <m.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
                        >
                            <Rocket size={80} color="#FF4500" />
                        </m.div>

                        {/* Status Badge */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "8px 14px",
                                    borderRadius: "50px",
                                    background: "rgba(255,69,0,0.1)",
                                    border: "1px solid rgba(255,69,0,0.3)",
                                    color: "#FF4500",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    fontFamily: "'Space Mono', monospace"
                                }}
                            >
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: "#FF4500",
                                        boxShadow: "0 0 12px rgba(255,69,0,0.8)",
                                        display: "inline-block",
                                        animation: "pulse 2s infinite",
                                    }}
                                />
                                Uploading Soon
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            style={{
                                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.1,
                                marginBottom: 16,
                                background: "linear-gradient(135deg, var(--text-primary), var(--text-secondary))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontFamily: "'Playfair Display', serif",
                            }}
                        >
                            Projects Coming Soon
                        </h2>

                        {/* Description */}
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.95rem",
                                lineHeight: 1.7,
                                maxWidth: 480,
                                margin: "0 auto 32px",
                                fontFamily: "'Geist', sans-serif"
                            }}
                        >
                            I'm curating premium project showcases with detailed case studies, performance metrics, and full technical breakdowns. They'll be live very soon!
                        </p>

                        {/* Animated Dots */}
                        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36 }}>
                            {[0, 1, 2].map((i) => (
                                <m.div
                                    key={i}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: "#FF4500",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Info Card */}
                        <div
                            style={{
                                maxWidth: 480,
                                margin: "0 auto",
                                padding: "24px",
                                borderRadius: "16px",
                                background: "rgba(255,69,0,0.03)",
                                border: "1px dashed rgba(255,69,0,0.2)",
                                backdropFilter: "blur(12px)"
                            }}
                        >
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                                <Wrench size={16} color="#FF4500" style={{ flexShrink: 0 }} />
                                <span style={{ fontFamily: "'Geist', sans-serif", textAlign: "left" }}>
                                    <strong>Building premium projects</strong> with React, Node.js, Python, and modern web
                                    technologies. Each project will include case studies, performance metrics, live demos, and full
                                    source code.
                                </span>
                            </p>
                        </div>
                    </m.div>
                )}

                {/* No Results State */}
                {projects.length > 0 && filtered.length === 0 && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            textAlign: "center",
                            padding: "60px 24px",
                        }}
                    >
                        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
                        <h3
                            style={{
                                color: "var(--text-primary)",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                marginBottom: 8,
                                fontFamily: "'Geist', sans-serif"
                            }}
                        >
                            No projects found
                        </h3>
                        <p style={{ color: "var(--text-secondary)", marginBottom: 20, fontFamily: "'Geist', sans-serif" }}>
                            Try adjusting your search or filter criteria
                        </p>
                        <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSearch("");
                                setActiveTag("All");
                                setShowFilters(false);
                            }}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "10px",
                                background: "rgba(255,69,0,0.1)",
                                border: "1px solid rgba(255,69,0,0.3)",
                                color: "var(--color-primary-orange)",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontFamily: "'Space Mono', monospace"
                            }}
                        >
                            Reset Filters
                        </m.button>
                    </m.div>
                )}
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </main>
    );
}
