import { useState } from "react";
import { m } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";

/**
 * Premium Animated Input Field with Floating Label and Focus Border Glow
 */
export function AnimatedInput({ label, name, type = "text", value, onChange, error, multiline = false, rows = 5, isValid = false, onFocus, onBlur, forceTouched = false }) {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const isTouched = touched || forceTouched;
    const Tag = multiline ? "textarea" : "input";
    const hasValue = value.trim().length > 0;

    const handleFocus = (e) => {
        setFocused(true);
        setTouched(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        setFocused(false);
        if (onBlur) onBlur(e);
    };

    // Calculate border gradient values dynamically
    const borderGradient = error
        ? "linear-gradient(135deg, #EF4444, #B91C1C)"
        : isValid
            ? "linear-gradient(135deg, #10B981, #059669)"
            : focused
                ? "linear-gradient(135deg, #E040FB, #06B6D4)"
                : "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))";

    const boxGlow = focused
        ? error
            ? "0 0 15px rgba(239, 68, 68, 0.25)"
            : "0 0 20px rgba(224, 64, 251, 0.25)"
        : isValid && isTouched
            ? "0 0 15px rgba(16, 185, 129, 0.2)"
            : "none";

    return (
        <div style={{ marginBottom: 28, position: "relative" }}>
            {/* Input Wrapper Container with Gradient Border */}
            <div
                style={{
                    position: "relative",
                    borderRadius: "16px",
                    border: "1.5px solid transparent",
                    background: focused
                        ? "rgba(255, 255, 255, 0.035)"
                        : "rgba(255, 255, 255, 0.012)",
                    backgroundImage: `linear-gradient(rgba(10,10,15, 0.98), rgba(10,10,15, 0.98)), ${borderGradient}`,
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                    boxShadow: boxGlow,
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                }}
            >
                {/* Spotlight Background Reflection */}
                <m.div
                    animate={{
                        opacity: focused ? 1 : 0,
                        scale: focused ? 1.05 : 0.95,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: error
                            ? "radial-gradient(circle at 10% 20%, rgba(239,68,68,0.08) 0%, transparent 60%)"
                            : "radial-gradient(circle at 10% 20%, rgba(224,64,251,0.08) 0%, transparent 60%)",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* Floating Label */}
                <m.label
                    animate={{
                        y: hasValue || focused ? -10 : 0,
                        scale: hasValue || focused ? 0.75 : 0.95,
                        color: error
                            ? "#ef4444"
                            : isValid && isTouched
                                ? "#10b981"
                                : focused
                                    ? "#E040FB"
                                    : "rgba(255,255,255,0.45)",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: 18,
                        top: 20,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        pointerEvents: "none",
                        zIndex: 2,
                        transformOrigin: "left top",
                    }}
                >
                    {label} <span style={{ color: "#ef4444" }}>*</span>
                </m.label>

                {/* Input Field Tag */}
                <Tag
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    rows={multiline ? rows : undefined}
                    style={{
                        width: "100%",
                        padding: hasValue || focused ? "32px 18px 12px 18px" : "20px 18px",
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        resize: multiline ? "vertical" : undefined,
                        fontFamily: "inherit",
                        cursor: "text",
                        minHeight: multiline ? 160 : undefined,
                        transition: "padding 0.25s ease, background 0.3s ease",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
                        caretColor: error ? "#ef4444" : "#E040FB",
                    }}
                />

                {/* Validation Indicator Icon */}
                {isTouched && (
                    <m.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            right: 18,
                            top: multiline ? 24 : "50%",
                            transform: multiline ? "none" : "translateY(-50%)",
                            zIndex: 3,
                        }}
                    >
                        {error ? (
                            <AlertCircle size={18} style={{ color: "#ef4444" }} />
                        ) : isValid ? (
                            <m.div
                                animate={{ scale: [0.8, 1.1, 1] }}
                                transition={{ duration: 0.4 }}
                            >
                                <Check size={18} style={{ color: "#10b981" }} />
                            </m.div>
                        ) : null}
                    </m.div>
                )}
            </div>

            {/* Error Message with Fade Slide Animation */}
            {error && isTouched && (
                <m.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        marginTop: 8,
                        color: "#ef4444",
                        fontSize: "0.76rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontWeight: 600,
                    }}
                >
                    <AlertCircle size={13} /> {error}
                </m.div>
            )}

            {/* Success Message */}
            {isValid && isTouched && !error && (
                <m.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        marginTop: 8,
                        color: "#10b981",
                        fontSize: "0.76rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontWeight: 600,
                    }}
                >
                    <Check size={13} /> {label} looks great!
                </m.div>
            )}
        </div>
    );
}
