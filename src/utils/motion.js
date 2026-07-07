/**
 * Reusable Framer Motion animation variants
 * Import these to keep animations consistent across the site.
 */

export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
});

export const viewportOnce = { once: true, amount: 0.15 };
