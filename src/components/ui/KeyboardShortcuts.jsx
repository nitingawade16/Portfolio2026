import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * Keyboard Shortcuts - Premium feature for navigation
 * Shows on press ?
 */
export function KeyboardShortcuts() {
    const [showHelp, setShowHelp] = useState(false);

    const shortcuts = [
        { key: "?", action: "Show this help menu" },
        { key: "/", action: "Focus search" },
        { key: "H", action: "Go to Home" },
        { key: "A", action: "Go to About" },
        { key: "S", action: "Go to Skills" },
        { key: "P", action: "Go to Projects" },
        { key: "C", action: "Go to Contact" },
        { key: "D", action: "Toggle Dark Mode" },
        { key: "T", action: "Open Theme Customizer" },
        { key: "Esc", action: "Close menu" },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Show help on ?
            if (e.key === "?" || (e.shiftKey && e.key === "/")) {
                e.preventDefault();
                setShowHelp(!showHelp);
                return;
            }

            // Navigation shortcuts
            const keyMap = {
                h: "/",
                a: "/about",
                s: "/skills",
                p: "/projects",
                c: "/contact",
            };

            if (keyMap[e.key?.toLowerCase()]) {
                window.location.href = keyMap[e.key.toLowerCase()];
            }

            // Close on Escape
            if (e.key === "Escape") {
                setShowHelp(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showHelp]);

    return (
        <AnimatePresence>
            {showHelp && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowHelp(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(4px)",
                            zIndex: 9001,
                        }}
                    />

                    {/* Help Panel */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "rgba(8, 8, 16, 0.95)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid var(--glass-panel)",
                            borderRadius: "20px",
                            padding: "32px",
                            maxWidth: "500px",
                            width: "90%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            zIndex: 9002,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 24,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    color: "var(--text-primary)",
                                }}
                            >
                                ⌨️ Keyboard Shortcuts
                            </h2>
                            <button
                                onClick={() => setShowHelp(false)}
                                style={{
                                    background: "var(--glass-panel)",
                                    border: "none",
                                    color: "var(--text-muted)",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Shortcuts Grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 12,
                            }}
                        >
                            {shortcuts.map((shortcut, idx) => (
                                <m.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px",
                                        background: "var(--bg-card)",
                                        borderRadius: "8px",
                                        border: "1px solid var(--glass-bg-light)",
                                    }}
                                >
                                    <div
                                        style={{
                                            minWidth: "45px",
                                            padding: "6px 10px",
                                            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                                            borderRadius: "6px",
                                            textAlign: "center",
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}
                                    >
                                        {shortcut.key}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {shortcut.action}
                                    </span>
                                </m.div>
                            ))}
                        </div>

                        <div
                            style={{
                                marginTop: 24,
                                paddingTop: 16,
                                borderTop: "1px solid var(--glass-panel)",
                                fontSize: "0.8rem",
                                color: "var(--text-muted)",
                            }}
                        >
                            💡 Tip: Press <strong>?</strong> anytime to see this menu
                        </div>
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
}
