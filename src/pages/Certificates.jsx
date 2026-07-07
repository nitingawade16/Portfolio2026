import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, X, Calendar, Award } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { certificates } from "@/data/education";

function CertModal({ cert, onClose }) {
    if (!cert) return null;
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 9000,
                background: "rgba(5,5,16,0.92)", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            }}
        >
            <m.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="glass-strong"
                style={{ borderRadius: 24, maxWidth: 560, width: "100%", overflow: "hidden" }}
            >
                {/* Certificate preview area */}
                <div style={{
                    height: 220,
                    background: "linear-gradient(135deg, rgba(224,64,251,0.08), rgba(224,64,251,0.12))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                }}>
                    <Award size={80} color="#E040FB" />
                    <button onClick={onClose} style={{
                        position: "absolute", top: 16, right: 16,
                        width: 36, height: 36, borderRadius: "50%",
                        background: "rgba(0,0,0,0.5)", border: "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", cursor: "none",
                    }}>
                        <X size={18} />
                    </button>
                </div>

                <div style={{ padding: 32 }}>
                    <h3 style={{ color: "#f0f0ff", fontWeight: 700, fontSize: "1.3rem", marginBottom: 8 }}>
                        {cert.title}
                    </h3>
                    <p style={{ color: "#E040FB", fontWeight: 600, fontSize: "0.9rem", marginBottom: 16 }}>
                        {cert.organization}
                    </p>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#606080", fontSize: "0.8rem" }}>
                            <Calendar size={12} /> {cert.date}
                        </span>
                    </div>
                    <p style={{ color: "#a0a0c0", lineHeight: 1.7, fontSize: "0.875rem", marginBottom: 24 }}>
                        {cert.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                        {cert.tags.map((t) => (
                            <span key={t} className="tag" style={{ fontSize: "0.75rem" }}>{t}</span>
                        ))}
                    </div>
                    {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <ExternalLink size={16} /> Verify Certificate
                        </a>
                    )}
                    {!cert.credentialUrl && (
                        <p style={{ color: "#606080", fontSize: "0.8rem" }}>Credential URL coming soon...</p>
                    )}
                </div>
            </m.div>
        </m.div>
    );
}

export default function Certificates() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = certificates.filter((c) =>
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.organization.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

                <SectionTitle
                    tag="Credentials"
                    title="My"
                    highlight="Certificates"
                    subtitle="Verified credentials and professional certifications earned through dedication."
                />

                {/* Search */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    style={{ marginBottom: 40 }}
                >
                    <div style={{
                        display: "flex", alignItems: "center",
                        background: "var(--bg-card)",
                        border: "1px solid var(--glass-panel)",
                        borderRadius: 12, padding: "12px 20px", gap: 10, maxWidth: 400,
                    }}>
                        <Search size={16} style={{ color: "#606080" }} />
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                background: "none", border: "none", outline: "none",
                                color: "#f0f0ff", fontSize: "0.875rem", width: "100%", cursor: "text",
                            }}
                        />
                        {search && (
                            <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "none", color: "#606080" }}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </m.div>

                {/* Certificates grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 24,
                }}>
                    {filtered.map((cert, i) => (
                        <m.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            onClick={() => setSelected(cert)}
                            className="glass animated-border"
                            style={{ borderRadius: 20, overflow: "hidden", cursor: "none" }}
                        >
                            {/* Certificate image placeholder */}
                            <div style={{
                                height: 160,
                                background: "linear-gradient(135deg, rgba(224,64,251,0.06), rgba(224,64,251,0.1))",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                position: "relative",
                            }}>
                                <Award size={48} color="#E040FB" />
                                <div style={{
                                    position: "absolute", bottom: 12, right: 12,
                                    background: "rgba(224,64,251,0.1)",
                                    border: "1px solid rgba(224,64,251,0.2)",
                                    color: "#E040FB", padding: "3px 10px",
                                    borderRadius: 50, fontSize: "0.7rem",
                                    display: "flex", alignItems: "center", gap: 4
                                }}>
                                    <Award size={10} />
                                    {cert.organization}
                                </div>
                            </div>

                            <div style={{ padding: "20px 24px" }}>
                                <h3 style={{ color: "#f0f0ff", fontWeight: 700, fontSize: "0.95rem", marginBottom: 8 }}>
                                    {cert.title}
                                </h3>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                                    <Calendar size={12} style={{ color: "#606080" }} />
                                    <span style={{ color: "#606080", fontSize: "0.8rem" }}>{cert.date}</span>
                                </div>
                                <p style={{ color: "#a0a0c0", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: 14 }}>
                                    {cert.description.slice(0, 80)}...
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {cert.tags.slice(0, 2).map((t) => (
                                        <span key={t} className="tag" style={{ fontSize: "0.7rem" }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#606080" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                            <Award size={48} color="#E040FB" />
                        </div>
                        <p>No certificates found.</p>
                    </div>
                )}

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
                        <Award size={16} color="#E040FB" /> Real certificates will be added soon with verification links.
                    </p>
                </m.div>
            </div>

            <AnimatePresence>
                {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </main>
    );
}
