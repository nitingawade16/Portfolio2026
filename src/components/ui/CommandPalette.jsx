import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import {
    Search, Copy,
    Sliders, ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

import { useAccessibility } from "@/context/AccessibilityContext";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const {
        largeText, highContrast, reducedMotion,
        toggleLargeText, toggleHighContrast, toggleReducedMotion
    } = useAccessibility();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Capture Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("gawadenitin1603@gmail.com");
        toast.success("Email copied to clipboard!");
        setIsOpen(false);
    };

    const handleNavigate = (path, scrollId = null) => {
        navigate(path);
        setIsOpen(false);
        if (scrollId) {
            setTimeout(() => {
                const el = document.getElementById(scrollId);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    };

    const items = [
        // Navigation Options
        { label: "Navigate to Home", type: "nav", action: () => handleNavigate("/") },
        { label: "Navigate to About", type: "nav", action: () => handleNavigate("/about") },
        { label: "Navigate to Skills", type: "nav", action: () => handleNavigate("/skills") },
        { label: "Navigate to Projects", type: "nav", action: () => handleNavigate("/projects") },
        { label: "Navigate to Education", type: "nav", action: () => handleNavigate("/education") },
        { label: "Navigate to Achievements", type: "nav", action: () => handleNavigate("/achievements") },
        { label: "Navigate to Certificates", type: "nav", action: () => handleNavigate("/certificates") },
        { label: "Navigate to Contact", type: "nav", action: () => handleNavigate("/contact") },

        // Quick Actions

        {
            label: `Copy Contact Email (gawadenitin1603@gmail.com)`,
            type: "action",
            icon: Copy,
            action: handleCopyEmail
        },

        // Accessibility Adjustments
        {
            label: `Toggle Large Font Size (${largeText ? "Disable" : "Enable"})`,
            type: "acc",
            icon: Sliders,
            action: () => { toggleLargeText(); toast.success(largeText ? "Standard font size enabled" : "Enlarged font size enabled"); }
        },
        {
            label: `Toggle High Contrast Mode (${highContrast ? "Disable" : "Enable"})`,
            type: "acc",
            icon: Sliders,
            action: () => { toggleHighContrast(); toast.success(highContrast ? "High contrast disabled" : "High contrast enabled"); }
        },
        {
            label: `Toggle Reduced Motion Settings (${reducedMotion ? "Disable" : "Enable"})`,
            type: "acc",
            icon: Sliders,
            action: () => { toggleReducedMotion(); toast.success(reducedMotion ? "Animations restored" : "Reduced animations active"); }
        }
    ];

    const filtered = items.filter(
        (item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            {/* Keyboard shortcut floating hint */}
            <div style={{
                position: "fixed",
                bottom: 24,
                left: 24,
                zIndex: 8000,
                pointerEvents: "auto",
            }}
                className="hidden md:block"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 8,
                        color: "var(--text-secondary)",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        cursor: "none",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                    }}
                >
                    <span>Search / Actions</span>
                    <kbd style={{
                        background: "var(--border-primary)",
                        border: "1px solid var(--border-secondary)",
                        borderRadius: 4,
                        padding: "2px 5px",
                        fontSize: "0.65rem",
                        fontFamily: "monospace"
                    }}>Ctrl+K</kbd>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 99999,
                            background: "rgba(0,0,0,0.8)",
                            backdropFilter: "blur(16px)",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            padding: "60px 16px 20px"
                        }}
                    >
                        <m.div
                            initial={{ scale: 0.95, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: "100%",
                                maxWidth: 540,
                                background: "#0b0b0b",
                                border: "1px solid var(--glass-bg-light)",
                                borderRadius: 16,
                                overflow: "hidden",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.6)"
                            }}
                        >
                            {/* Search Header */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "16px 20px",
                                borderBottom: "1px solid var(--border-primary)"
                            }}>
                                <Search size={18} style={{ color: "var(--text-secondary)", marginRight: 12, flexShrink: 0 }} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command or page name..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        outline: "none",
                                        color: "var(--text-primary)",
                                        fontSize: "0.95rem",
                                        width: "100%",
                                        cursor: "text"
                                    }}
                                />
                                <kbd style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--glass-bg-light)",
                                    borderRadius: 4,
                                    padding: "2px 6px",
                                    fontSize: "0.68rem",
                                    color: "var(--text-muted)"
                                }}>ESC</kbd>
                            </div>

                            {/* Commands List */}
                            <div style={{
                                maxHeight: 330,
                                overflowY: "auto",
                                padding: "8px"
                            }}>
                                {filtered.length > 0 ? (
                                    filtered.map((item, index) => {
                                        const ItemIcon = item.icon || ArrowRight;
                                        return (
                                            <button
                                                key={index}
                                                onClick={item.action}
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    padding: "10px 16px",
                                                    background: "none",
                                                    border: "none",
                                                    borderRadius: 10,
                                                    textAlign: "left",
                                                    cursor: "none",
                                                    color: "var(--text-secondary)",
                                                    transition: "all 0.15s ease",
                                                    outline: "none"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "var(--border-primary)";
                                                    e.currentTarget.style.color = "var(--text-primary)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "none";
                                                    e.currentTarget.style.color = "var(--text-secondary)";
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                    <ItemIcon size={14} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                                                    <span style={{ fontSize: "0.86rem", fontWeight: 500 }}>{item.label}</span>
                                                </div>
                                                <span style={{
                                                    fontSize: "0.7rem",
                                                    padding: "2px 8px",
                                                    borderRadius: 50,
                                                    background: item.type === "nav" ? "rgba(224,64,251,0.07)" : "rgba(224,64,251,0.05)",
                                                    border: item.type === "nav" ? "1px solid rgba(224,64,251,0.2)" : "1px solid rgba(224,64,251,0.15)",
                                                    color: item.type === "nav" ? "var(--accent-blue)" : "var(--accent-purple)"
                                                }}>
                                                    {item.type.toUpperCase()}
                                                </span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div style={{
                                        padding: "24px 16px",
                                        textAlign: "center",
                                        color: "var(--text-muted)",
                                        fontSize: "0.85rem"
                                    }}>
                                        No commands found for "{query}"
                                    </div>
                                )}
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
