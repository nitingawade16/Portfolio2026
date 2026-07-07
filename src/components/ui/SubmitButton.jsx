import { m } from "framer-motion";
import { Send, Check } from "lucide-react";

/**
 * Animated Submit Button with Loading and Success States
 */
export function SubmitButton({ status, onClick, disabled = false }) {
    const isLoading = status === "sending";
    const isSuccess = status === "success";

    return (
        <m.button
            type="submit"
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: disabled || isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                background: isSuccess
                    ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))"
                    : "linear-gradient(135deg, #E040FB, #7C4DFF)",
                color: isSuccess ? "#10b981" : "#fff",
                border: isSuccess ? "1.5px solid rgba(16,185,129,0.3)" : "1.5px solid var(--glass-panel)",
                opacity: disabled ? 0.6 : 1,
                boxShadow: isSuccess
                    ? "0 0 20px rgba(16,185,129,0.2)"
                    : isLoading
                        ? "0 0 20px rgba(224,64,251,0.3)"
                        : "0 4px 16px rgba(224,64,251,0.2)",
            }}
        >
            {/* Loading State */}
            {isLoading && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <m.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: 16,
                            height: 16,
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid #fff",
                            borderRadius: "50%",
                        }}
                    />
                    <span>Sending...</span>
                </m.div>
            )}

            {/* Success State */}
            {isSuccess && (
                <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    <m.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Check size={18} />
                    </m.div>
                    <span>Message sent!</span>
                </m.div>
            )}

            {/* Default State */}
            {!isLoading && !isSuccess && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    <Send size={16} />
                    <span>Send Message</span>
                </m.div>
            )}

            {/* Animated Background on Success */}
            {isSuccess && (
                <m.div
                    animate={{
                        x: ["0%", "100%"],
                        opacity: [0.5, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, var(--border-hover), transparent)",
                        pointerEvents: "none",
                    }}
                />
            )}
        </m.button>
    );
}
