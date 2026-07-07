import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Hook for scroll-based animations
 * Triggers animation when element enters viewport
 */
export const useScrollAnimation = (threshold = 0.2) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: true, // Only trigger once for performance
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return { ref, controls, inView };
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    return { ref, inView };
};

/**
 * Hook for number counter animation
 */
export const useNumberCounter = (target, duration = 2, isVisible) => {
    return {
        transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
        },
    };
};

/**
 * Hook for hover animation state
 */
export const useHoverAnimation = (initialState = 'rest') => {
    const [isHovered, setIsHovered] = React.useState(initialState === 'hover');

    return {
        isHovered,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };
};

export default useScrollAnimation;
