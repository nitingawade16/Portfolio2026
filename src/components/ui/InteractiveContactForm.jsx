import { useState, useRef } from "react";
import { m, AnimatePresence, useMotionValue } from "framer-motion";
import toast from "react-hot-toast";
import {
    Send, Check, AlertCircle, Loader,
    ArrowRight, CheckCircle
} from "lucide-react";
import { AnimatedInput } from "@/components/ui/AnimatedInput";

// Removed emailjs config

const formVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 15,
        }
    }
};

/**
 * Premium Interactive Contact Form
 */
export default function InteractiveContactForm({ email }) {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", _honey: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [focusedField, setFocusedField] = useState(null);
    const [touchedFields, setTouchedFields] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const rectRef = useRef(null);

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Full Name is required";
        if (!form.email.trim()) e.email = "Email Address is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
        if (!form.subject.trim()) e.subject = "Subject is required";
        if (!form.message.trim()) e.message = "Message is required";
        else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mark all fields as touched to show validation errors
        setTouchedFields({
            name: true,
            email: true,
            subject: true,
            message: true
        });

        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            toast.error("Please fix the errors in the form before sending.");
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "", _honey: "" });
            setTouchedFields({ name: false, email: false, subject: false, message: false });
            toast.success("Message sent! I'll get back to you soon 🚀");
            
        } catch (error) {
            console.error("API error:", error);
            setStatus("error");
            toast.error(error.message || "Failed to send message. Please try again.");
        }
    };

    const isFormValid =
        form.name.trim().length > 0 &&
        form.email.trim().length > 0 &&
        /\S+@\S+\.\S+/.test(form.email) &&
        form.subject.trim().length > 0 &&
        form.message.trim().length >= 10 &&
        Object.keys(errors).length === 0;

    return (
        <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => {
                setIsHovered(false);
                rectRef.current = null;
                mouseX.set(0);
                mouseY.set(0);
            }}
            className="shine-sweep"
            style={{
                borderRadius: "28px",
                overflow: "hidden",
                position: "relative",
                background: "rgba(255, 255, 255, 0.01)",
                backdropFilter: "blur(18px)",
                border: "1.5px solid transparent",
                backgroundImage: isHovered
                    ? "linear-gradient(rgba(10,10,15, 0.96), rgba(10,10,15, 0.96)), linear-gradient(135deg, rgba(224,64,251,0.25), rgba(6,182,212,0.15))"
                    : "linear-gradient(rgba(10,10,15, 0.88), rgba(10,10,15, 0.88)), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
                boxShadow: isHovered
                    ? "0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(224,64,251,0.08)"
                    : "0 20px 40px rgba(0,0,0,0.4)",
                transform: "perspective(1000px) rotateX(calc(var(--mouse-y, 0) * -3deg)) rotateY(calc(var(--mouse-x, 0) * 3deg))",
                transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                "--mouse-x": mouseX,
                "--mouse-y": mouseY
            }}
        >
            <m.div
                style={{
                    position: "absolute",
                    width: "350px",
                    height: "350px",
                    background: "radial-gradient(circle, rgba(224,64,251,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                    left: "calc((var(--mouse-x, 0) + 0.5) * 100%)",
                    top: "calc((var(--mouse-y, 0) + 0.5) * 100%)",
                    transform: "translate(-50%, -50%)",
                    opacity: isHovered ? 1 : 0,
                    transition: isHovered ? "opacity 0.2s ease" : "all 0.6s ease",
                    zIndex: 0,
                }}
            />

            <form ref={formRef} onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
                <div style={{ padding: "48px 40px" }}>

                    {/* Form Header */}
                    <m.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ marginBottom: 40 }}
                    >
                        <h3
                            style={{
                                color: "var(--text-primary)",
                                fontWeight: 800,
                                fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
                                marginBottom: 12,
                                fontFamily: "'Playfair Display', serif",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Send Me a Message
                        </h3>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.95rem",
                                lineHeight: 1.6,
                                opacity: 0.85,
                            }}
                        >
                            I'd love to hear from you. Fill out the fields below and let's start a conversation.
                        </p>
                    </m.div>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <m.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 24,
                                    padding: "60px 40px",
                                    textAlign: "center",
                                    minHeight: "420px",
                                    position: "relative",
                                }}
                            >
                                {/* Confetti particle explosion */}
                                {Array.from({ length: 25 }).map((_, i) => {
                                    const angle = Math.random() * Math.PI * 2;
                                    const distance = 60 + Math.random() * 160;
                                    return (
                                        <m.div
                                            key={i}
                                            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                            animate={{
                                                opacity: 0,
                                                x: Math.cos(angle) * distance,
                                                y: Math.sin(angle) * distance - 80,
                                                scale: 0.2,
                                                rotate: Math.random() * 360,
                                            }}
                                            transition={{ duration: 1.6, ease: "easeOut" }}
                                            style={{
                                                position: "absolute",
                                                width: 6 + (i % 6),
                                                height: 6 + (i % 6),
                                                background: ["#E040FB", "#06B6D4", "#10B981", "#F97316", "#FFD700"][i % 5],
                                                borderRadius: i % 2 === 0 ? "50%" : "0%",
                                                pointerEvents: "none",
                                                zIndex: 10,
                                            }}
                                        />
                                    );
                                })}

                                {/* Success Icon Ring */}
                                <m.div
                                    animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    style={{
                                        width: 84,
                                        height: 84,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.03))",
                                        border: "2px solid rgba(16,185,129,0.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 0 30px rgba(16,185,129,0.15)",
                                    }}
                                >
                                    <m.div
                                        animate={{ scale: [0.6, 1.15, 1] }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <CheckCircle
                                            size={42}
                                            style={{ color: "#10b981" }}
                                        />
                                    </m.div>
                                </m.div>

                                <div>
                                    <h4
                                        style={{
                                            color: "#ffffff",
                                            fontWeight: 800,
                                            fontSize: "1.45rem",
                                            marginBottom: 8,
                                            fontFamily: "'Playfair Display', serif",
                                        }}
                                    >
                                        Message Sent!
                                    </h4>
                                    <p
                                        style={{
                                            color: "var(--text-secondary)",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                            maxWidth: 320,
                                            margin: "0 auto",
                                        }}
                                    >
                                        Thank you for reaching out! I'll review your message and get back to you within 24 hours.
                                    </p>
                                </div>

                                <m.button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    whileHover={{ y: -3, scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="shine-sweep"
                                    style={{
                                        marginTop: 12,
                                        padding: "14px 30px",
                                        background: "linear-gradient(135deg, #E040FB, #9C27B0)",
                                        border: "none",
                                        borderRadius: "14px",
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontSize: "0.85rem",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        boxShadow: "0 10px 20px rgba(224,64,251,0.2)",
                                    }}
                                >
                                    Send Another Message <ArrowRight size={14} />
                                </m.button>
                            </m.div>
                        ) : status === "error" ? (
                            <m.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                    padding: "28px",
                                    background: "rgba(239,68,68,0.03)",
                                    border: "1.5px solid rgba(239,68,68,0.15)",
                                    borderRadius: "20px",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        color: "#EF4444",
                                        fontWeight: 700,
                                    }}
                                >
                                    <AlertCircle size={18} />
                                    Failed to send message
                                </div>
                                <p
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Please try again or contact me directly via email at gawadenitin1603@gmail.com.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#EF4444",
                                        fontSize: "0.9rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        textAlign: "left",
                                        padding: 0,
                                        outline: "none",
                                    }}
                                >
                                    Try again →
                                </button>
                            </m.div>
                        ) : (
                            <m.div
                                key="form"
                                variants={formVariants}
                                initial="hidden"
                                animate="show"
                                style={{ display: "flex", flexDirection: "column", gap: 8 }}
                            >
                                {/* Form Fields Staggered Entrance */}
                                <input
                                    type="text"
                                    name="_honey"
                                    style={{ display: "none" }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={form._honey}
                                    onChange={handleChange}
                                />
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                    <m.div variants={itemVariants}>
                                        <AnimatedInput
                                            label="Full Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => {
                                                setFocusedField(null);
                                                setTouchedFields(p => ({ ...p, name: true }));
                                            }}
                                            error={touchedFields.name ? errors.name : ""}
                                            isValid={
                                                form.name.trim().length > 0 && !errors.name
                                            }
                                            forceTouched={touchedFields.name}
                                        />
                                    </m.div>
                                    <m.div variants={itemVariants}>
                                        <m.div>
                                            <AnimatedInput
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => {
                                                    setFocusedField(null);
                                                    setTouchedFields(p => ({ ...p, email: true }));
                                                }}
                                                error={touchedFields.email ? errors.email : ""}
                                                isValid={
                                                    form.email.trim().length > 0 &&
                                                    /\S+@\S+\.\S+/.test(form.email) &&
                                                    !errors.email
                                                }
                                                forceTouched={touchedFields.email}
                                            />
                                        </m.div>
                                    </m.div>
                                </div>

                                <m.div variants={itemVariants}>
                                    <AnimatedInput
                                        label="Subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("subject")}
                                        onBlur={() => {
                                            setFocusedField(null);
                                            setTouchedFields(p => ({ ...p, subject: true }));
                                        }}
                                        error={touchedFields.subject ? errors.subject : ""}
                                        isValid={
                                            form.subject.trim().length > 0 && !errors.subject
                                        }
                                        forceTouched={touchedFields.subject}
                                    />
                                </m.div>

                                <m.div variants={itemVariants}>
                                    <AnimatedInput
                                        label="Message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => {
                                            setFocusedField(null);
                                            setTouchedFields(p => ({ ...p, message: true }));
                                        }}
                                        error={touchedFields.message ? errors.message : ""}
                                        isValid={
                                            form.message.trim().length >= 10 && !errors.message
                                        }
                                        multiline
                                        rows={6}
                                        forceTouched={touchedFields.message}
                                    />
                                </m.div>

                                {/* Character Count Fades In Dynamically */}
                                <m.div
                                    animate={{
                                        opacity: focusedField === "message" || form.message.length > 0 ? 0.8 : 0,
                                        y: focusedField === "message" || form.message.length > 0 ? 0 : -5,
                                    }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "var(--text-muted)",
                                        textAlign: "right",
                                        marginTop: -20,
                                        marginBottom: 16,
                                    }}
                                >
                                    {form.message.length} characters
                                </m.div>

                                {/* Expected Response Time info box */}
                                <m.div
                                    variants={itemVariants}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "14px 18px",
                                        background: "rgba(124,58,237,0.03)",
                                        border: "1px solid rgba(124,58,237,0.12)",
                                        borderRadius: "12px",
                                        color: "var(--text-secondary)",
                                        fontSize: "0.85rem",
                                        marginBottom: 20,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background: "var(--accent-purple)",
                                            animation: "pulse 2s infinite",
                                        }}
                                    />
                                    I typically respond within 24 hours
                                </m.div>

                                {/* Submit Button */}
                                <m.div variants={itemVariants}>
                                    <m.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="shine-sweep"
                                        style={{
                                            width: "100%",
                                            padding: "16px 32px",
                                            background: "linear-gradient(135deg, #E040FB, #9C27B0)",
                                            border: "1.5px solid transparent",
                                            backgroundImage: "linear-gradient(135deg, #E040FB, #9C27B0)",
                                            backgroundClip: "padding-box, border-box",
                                            backgroundOrigin: "padding-box, border-box",
                                            borderRadius: "16px",
                                            color: "#fff",
                                            fontWeight: 800,
                                            fontSize: "0.95rem",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 10,
                                            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                                            boxShadow: "0 12px 24px rgba(224,64,251,0.25), 0 4px 10px rgba(0,0,0,0.3)",
                                            outline: "none",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <m.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 1,
                                                        ease: "linear",
                                                    }}
                                                    style={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <Loader size={18} />
                                                </m.div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </m.button>
                                </m.div>
                            </m.div>
                        )}
                    </AnimatePresence>

                    {/* Pulse animation style */}
                    <style>{`
                        @keyframes pulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.5; }
                        }
                    `}</style>
                </div>
            </form>
        </m.div>
    );
}
