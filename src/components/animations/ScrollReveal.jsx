import { m } from "framer-motion";

/**
 * Generic scroll-triggered reveal animation with optional stagger support.
 *
 * Usage:
 *   <ScrollReveal><YourContent /></ScrollReveal>
 *   <ScrollReveal stagger>{children...}</ScrollReveal>
 */

const baseVariants = {
    up: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } },
    fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

export default function ScrollReveal({
    children,
    variant = "up",
    delay = 0,
    duration = 0.65,
    stagger = false,
    staggerDelay = 0.08,
    className = "",
    style = {},
}) {
    const chosen = baseVariants[variant] || baseVariants.up;

    if (stagger) {
        return (
            <m.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: staggerDelay,
                            delayChildren: delay,
                        },
                    },
                }}
                className={className}
                style={style}
            >
                {children}
            </m.div>
        );
    }

    return (
        <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: chosen.hidden,
                show: {
                    ...chosen.show,
                    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
                },
            }}
            className={className}
            style={style}
        >
            {children}
        </m.div>
    );
}

/**
 * Child item for use inside <ScrollReveal stagger>.
 * Wraps a child with reveal animation that triggers via parent stagger.
 */
export function ScrollRevealItem({
    children,
    variant = "up",
    duration = 0.55,
    className = "",
    style = {},
}) {
    const chosen = baseVariants[variant] || baseVariants.up;
    return (
        <m.div
            variants={{
                hidden: chosen.hidden,
                show: {
                    ...chosen.show,
                    transition: { duration, ease: [0.22, 1, 0.36, 1] },
                },
            }}
            className={className}
            style={style}
        >
            {children}
        </m.div>
    );
}
