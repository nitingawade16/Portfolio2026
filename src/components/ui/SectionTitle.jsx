import { m } from "framer-motion";

/**
 * Premium animated section title with staggered reveal.
 * Each element (tag → title → underline → subtitle) enters sequentially.
 */

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const childUp = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function SectionTitle({ tag, title, highlight, subtitle, center = false }) {
    return (
        <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{
                marginBottom: 56,
                textAlign: center ? "center" : "left",
                display: "flex",
                flexDirection: "column",
                alignItems: center ? "center" : "flex-start",
                width: "100%",
            }}
        >
            {tag && (
                <m.span
                    variants={childUp}
                    className="premium-tag"
                    style={{ marginBottom: 18 }}
                >
                    {tag}
                </m.span>
            )}

            <m.h2
                variants={childUp}
                className="section-title"
                style={{
                    color: "var(--text-primary)",
                    margin: 0,
                    position: "relative",
                }}
            >
                {title}{" "}
                {highlight && (
                    <span className="gradient-text">{highlight}</span>
                )}
            </m.h2>

            {/* Animated gradient underline with shimmer */}
            <m.div
                variants={childUp}
                style={{
                    height: 3,
                    width: 64,
                    borderRadius: 2,
                    marginTop: 18,
                    marginBottom: 22,
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(90deg, var(--accent-blue), var(--accent-cyan), var(--color-primary-orange))",
                    backgroundSize: "200% 100%",
                    animation: "gradient-border-rotate 4s ease infinite",
                }}
            >
                {/* Shimmer overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "50%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        animation: "shine-sweep 3s ease-in-out infinite",
                    }}
                />
            </m.div>

            {subtitle && (
                <m.p
                    variants={childUp}
                    className="section-subtitle"
                    style={{
                        margin: 0,
                        marginLeft: center ? "auto" : 0,
                        marginRight: center ? "auto" : 0,
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                        maxWidth: 560,
                    }}
                >
                    {subtitle}
                </m.p>
            )}
        </m.div>
    );
}
