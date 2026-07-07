import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Premium Component Utilities
 * Reusable patterns for premium UI components
 */

// Combine classnames with tailwind merge
export const cn = (...classes) => {
    return twMerge(clsx(...classes));
};

// Button class builders
export const getButtonClasses = (variant = 'primary', size = 'md', className = '') => {
    const baseClasses = 'btn';
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        icon: 'btn-icon',
    };
    const sizes = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    };

    return cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
    );
};

// Card class builders
export const getCardClasses = (variant = 'default', glow = null, elevated = false, className = '') => {
    const baseClasses = 'card';
    const variants = {
        default: '',
        gradient: 'card-gradient-border',
    };
    const glowClasses = {
        blue: 'card-glow-blue',
        purple: 'card-glow-purple',
        cyan: 'card-glow-cyan',
    };

    return cn(
        baseClasses,
        variants[variant],
        glow && glowClasses[glow],
        elevated && 'card-elevated',
        className
    );
};

// Tag class builders
export const getTagClasses = (color = 'blue', pill = false, className = '') => {
    const baseClasses = pill ? 'tag-pill' : 'tag';
    const colorClasses = {
        blue: 'tag-blue',
        purple: 'tag-purple',
        cyan: 'tag-cyan',
        green: 'tag-green',
        orange: 'tag-orange',
    };

    return cn(
        baseClasses,
        !pill && colorClasses[color],
        className
    );
};

// Text class builders
export const getTextClasses = (size = 'base', color = 'primary', className = '') => {
    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
    };
    const colors = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        muted: 'text-muted',
    };

    return cn(
        sizes[size],
        colors[color],
        className
    );
};

// Gradient text builder
export const getGradientTextClasses = (type = 'full', className = '') => {
    const types = {
        full: 'gradient-text',
        purple: 'gradient-text-purple',
        blue: 'gradient-text-blue',
    };

    return cn(types[type], className);
};

// Glow border builder
export const getGlowBorderClasses = (color = 'blue', className = '') => {
    const colors = {
        blue: 'glow-border-blue',
        purple: 'glow-border-purple',
        cyan: 'glow-border-cyan',
        green: 'glow-border-green',
    };

    return cn(colors[color], className);
};

// Glow text builder
export const getGlowTextClasses = (color = 'cyan', className = '') => {
    const colors = {
        cyan: 'glow-text',
        blue: 'glow-text-blue',
        purple: 'glow-text-purple',
    };

    return cn(colors[color], className);
};

// Glass builder
export const getGlassClasses = (strong = false, className = '') => {
    return cn(
        strong ? 'glass-strong' : 'glass',
        className
    );
};

// Hover animation utilities
export const getHoverAnimationClasses = (animation = 'lift', className = '') => {
    const animations = {
        lift: 'hover:scale-105',
        scale: 'hover:scale-110',
        glow: 'pulse-glow',
    };

    return cn(animations[animation], className);
};

// Spacing utilities
export const getSpacingClasses = (padding = null, margin = null, className = '') => {
    const spacingMap = {
        xs: 'p-1',
        sm: 'p-2',
        md: 'p-3',
        base: 'p-4',
        lg: 'p-5',
        xl: 'p-6',
        '2xl': 'p-8',
    };

    return cn(
        padding && spacingMap[padding],
        margin && `m-${margin}`,
        className
    );
};

// Flex utilities
export const getFlexClasses = (direction = 'row', justify = 'start', align = 'start', gap = 'base', className = '') => {
    const directions = {
        row: 'flex-row',
        col: 'flex-col',
    };
    const justifies = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
    };
    const aligns = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    };
    const gaps = {
        xs: 'gap-1',
        sm: 'gap-2',
        base: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
    };

    return cn(
        'flex',
        directions[direction],
        justifies[justify],
        aligns[align],
        gaps[gap],
        className
    );
};

// Grid utilities
export const getGridClasses = (cols = 1, gap = 'base', className = '') => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        auto: 'grid-cols-auto',
    };
    const gaps = {
        xs: 'gap-1',
        sm: 'gap-2',
        base: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
    };

    return cn(
        'grid',
        gridCols[cols],
        gaps[gap],
        className
    );
};

// Container utilities
export const getContainerClasses = (maxWidth = 'full', className = '') => {
    const widths = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'w-full',
    };

    return cn('container mx-auto px-4', widths[maxWidth], className);
};

// Responsive visibility
export const getResponsiveClasses = (mobileHidden = false, tabletHidden = false, desktopHidden = false, className = '') => {
    return cn(
        mobileHidden && 'hidden sm:block',
        tabletHidden && 'hidden md:block',
        desktopHidden && 'block lg:hidden',
        className
    );
};

// Transition utilities
export const getTransitionClasses = (property = 'all', duration = 'base', className = '') => {
    const durations = {
        fast: 'duration-100',
        base: 'duration-250',
        slow: 'duration-400',
        slower: 'duration-600',
    };

    return cn(
        'transition-' + property,
        durations[duration],
        className
    );
};

// Animation utilities
export const getAnimationClasses = (animation = 'fade-up', className = '') => {
    const animations = {
        fadeUp: 'fade-up',
        fadeIn: 'fade-in',
        scaleIn: 'scale-in',
        slideRight: 'slide-right',
        float: 'floating',
        floatGentle: 'floating-gentle',
        glowPulse: 'glow-pulse',
    };

    return cn(animations[animation], className);
};

export default {
    cn,
    getButtonClasses,
    getCardClasses,
    getTagClasses,
    getTextClasses,
    getGradientTextClasses,
    getGlowBorderClasses,
    getGlowTextClasses,
    getGlassClasses,
    getHoverAnimationClasses,
    getSpacingClasses,
    getFlexClasses,
    getGridClasses,
    getContainerClasses,
    getResponsiveClasses,
    getTransitionClasses,
    getAnimationClasses,
};
