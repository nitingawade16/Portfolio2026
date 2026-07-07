/**
 * Premium Animation Library
 * Reusable Framer Motion animations with purpose
 */

// Page transition animations
export const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4, // Page transition: 350-500ms
            ease: [0.22, 1, 0.36, 1], // premium easing
        },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

export const pageTransition = {
    type: 'tween',
    ease: [0.22, 1, 0.36, 1],
    duration: 0.4,
};

// Container animations
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

// Item animations (for stagger)
export const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Scroll reveal animations
export const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6, // Section reveal: 500-700ms
            delay: custom * 0.08,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

// Blur reveal animation
export const blurRevealVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Scale reveal animation
export const scaleRevealVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Card hover animation
export const cardHoverVariants = {
    rest: {
        y: 0,
        scale: 1,
    },
    hover: {
        y: -5,
        scale: 1,
        transition: {
            duration: 0.22, // Hover: 180-250ms
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Card tilt animation
export const cardTiltVariants = {
    rest: {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
    },
    hover: {
        rotateX: 1.5,
        rotateY: -1.5,
        rotateZ: 0,
        transition: {
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Button ripple animation
export const rippleVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: {
        scale: 4,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Glow animation
export const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
        opacity: 1,
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
        },
    },
};

// Border animation
export const borderAnimationVariants = {
    animate: {
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
        },
    },
};

// Icon hover animation
export const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.15,
        rotate: 5,
        transition: {
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Icon bounce animation
export const iconBounceVariants = {
    animate: {
        y: [0, -5, 0],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: 'easeInOut',
        },
    },
};

// Number counter animation
export const numberCounterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Progress bar animation
export const progressBarVariants = {
    initial: { width: 0 },
    animate: (value = 50) => ({
        width: `${value}%`,
        transition: {
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
        },
    }),
};

// Skill bar animation
export const skillBarVariants = {
    hidden: { scaleX: 0 },
    visible: (delay = 0) => ({
        scaleX: 1,
        transition: {
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

// Timeline animation
export const timelineItemVariants = {
    hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -50 : 50) },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Navbar animation
export const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

// Mobile menu animation
export const mobileMenuVariants = {
    closed: { opacity: 0, y: -20 },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const mobileMenuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
};

// Floating animation (gentle)
export const floatingVariants = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Floating rotation
export const floatingRotateVariants = {
    animate: {
        y: [-8, 8, -8],
        rotate: [0, 2, -2, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Rotating animation
export const rotatingVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

// Pulse animation
export const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Parallax animation (scroll-based)
export const parallaxVariants = (offset = 0) => ({
    y: offset * 0.5,
    transition: {
        type: 'spring',
        stiffness: 100,
        damping: 30,
        mass: 1,
    },
});

// Word reveal animation
export const wordRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: custom * 0.05,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    }),
};

// Letter reveal animation
export const letterRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: custom * 0.03,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

// Perspective transforms
export const perspectiveVariants = {
    rest: {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        transformPerspective: 1000,
    },
    hover: {
        rotateX: -5,
        rotateY: 10,
        rotateZ: 0,
        transformPerspective: 1000,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

// Shared layout animation
export const layoutIdVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
    },
};

// Fade animations
export const fadeInVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

export const fadeInOutVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.4 },
    },
};

// Spring animation config
export const springConfig = {
    smooth: {
        type: 'spring',
        stiffness: 50,
        damping: 15,
        mass: 1,
    },
    bounce: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 0.8,
    },
    tight: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 1,
    },
    slow: {
        type: 'spring',
        stiffness: 30,
        damping: 12,
        mass: 1.2,
    },
};

// Easing curves
export const easings = {
    sharp: [0.25, 0.46, 0.45, 0.94],
    smooth: [0.22, 1, 0.36, 1],
    spring: [0.34, 1.56, 0.64, 1],
    outExpo: [0.22, 1, 0.36, 1],
    inOut: [0.4, 0, 0.2, 1],
};

// Transition presets
export const transitionPresets = {
    fast: { duration: 0.2, ease: easings.sharp },
    base: { duration: 0.3, ease: easings.smooth },
    slow: { duration: 0.6, ease: easings.smooth },
    slower: { duration: 1, ease: easings.smooth },
};

export default {
    pageVariants,
    pageTransition,
    containerVariants,
    itemVariants,
    scrollRevealVariants,
    blurRevealVariants,
    scaleRevealVariants,
    cardHoverVariants,
    cardTiltVariants,
    rippleVariants,
    glowVariants,
    borderAnimationVariants,
    iconHoverVariants,
    iconBounceVariants,
    numberCounterVariants,
    progressBarVariants,
    skillBarVariants,
    timelineItemVariants,
    navbarVariants,
    mobileMenuVariants,
    mobileMenuItemVariants,
    floatingVariants,
    floatingRotateVariants,
    rotatingVariants,
    pulseVariants,
    parallaxVariants,
    wordRevealVariants,
    letterRevealVariants,
    perspectiveVariants,
    layoutIdVariants,
    fadeInVariants,
    fadeInOutVariants,
    springConfig,
    easings,
    transitionPresets,
};
