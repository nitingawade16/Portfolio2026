/**
 * Premium Design System
 * Central hub for design tokens and utilities
 */

// Color Palette
export const colors = {
    primary: {
        blue: '#0055ff',
        blueLight: '#3380ff',
        blueDark: '#003dd9',
    },
    secondary: {
        purple: '#7c3aed',
        purpleLight: '#a78bfa',
        purpleDark: '#5b21b6',
    },
    accent: {
        cyan: '#06b6d4',
        cyanLight: '#22d3ee',
        cyanDark: '#0891b2',
    },
    success: {
        green: '#10b981',
        greenLight: '#6ee7b7',
        greenDark: '#059669',
    },
    warning: {
        orange: '#f97316',
        orangeLight: '#fed7aa',
        orangeDark: '#ea580c',
    },
    error: {
        red: '#ef4444',
        redLight: '#fca5a5',
    },
    background: {
        primary: '#0a0e27',
        secondary: '#0f1535',
        tertiary: '#151c3f',
        card: 'rgba(20, 25, 50, 0.4)',
        cardHover: 'rgba(20, 25, 50, 0.6)',
    },
    text: {
        primary: '#f5f5ff',
        secondary: '#a8a8cc',
        tertiary: '#6f6f94',
        muted: '#4a4a6a',
        dim: '#2a2a42',
    },
};

// Spacing
export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '56px',
    '6xl': '64px',
    '8xl': '80px',
    '10xl': '96px',
};

// Border Radius
export const radius = {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    full: '9999px',
};

// Shadows
export const shadows = {
    xs: '0 1px 2px rgba(0, 0, 0, 0.5)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.5)',
    md: '0 4px 16px rgba(0, 0, 0, 0.6)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.7)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.8)',
    '2xl': '0 20px 80px rgba(0, 0, 0, 0.9)',
    floating: '0 16px 64px rgba(0, 0, 0, 0.8)',
};

// Glow Effects
export const glows = {
    blue: '0 0 20px rgba(0, 85, 255, 0.3), 0 0 40px rgba(0, 85, 255, 0.15)',
    blueHeavy: '0 0 40px rgba(0, 85, 255, 0.5), 0 0 80px rgba(0, 85, 255, 0.25), inset 0 0 40px rgba(0, 85, 255, 0.1)',
    purple: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.15)',
    purpleHeavy: '0 0 40px rgba(124, 58, 237, 0.5), 0 0 80px rgba(124, 58, 237, 0.25), inset 0 0 40px rgba(124, 58, 237, 0.1)',
    cyan: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.15)',
    green: '0 0 20px rgba(16, 185, 129, 0.3)',
};

// Easing Functions
export const easing = {
    outExpo: 'cubic-bezier(0.22, 1, 0.36, 1)',
    spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    sharp: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

// Durations
export const duration = {
    fast: 100,
    base: 250,
    slow: 400,
    slower: 600,
};

// Gradient presets
export const gradients = {
    primary: 'linear-gradient(135deg, #0055ff, #7c3aed)',
    accent: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    full: 'linear-gradient(135deg, #0055ff 0%, #7c3aed 50%, #06b6d4 100%)',
    purpleCyan: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    bluePurple: 'linear-gradient(135deg, #0055ff, #7c3aed)',
};

// Helper functions
export const getGradient = (color = 'primary') => {
    return gradients[color] || gradients.primary;
};

export const getColor = (category, shade = 'default') => {
    if (shade === 'default' || shade === 'base') {
        return colors[category]?.[Object.keys(colors[category])[0]];
    }
    return colors[category]?.[shade];
};

export const getSpacing = (size) => {
    return spacing[size] || size;
};

export const getRadius = (size) => {
    return radius[size] || size;
};

export const getShadow = (level) => {
    return shadows[level] || shadows.md;
};

export const getGlow = (color, intensity = 'normal') => {
    const key = intensity === 'heavy' ? `${color}Heavy` : color;
    return glows[key] || glows.blue;
};

// Animation utilities
export const createTransition = (property = 'all', duration = 'base', easing$1 = 'smooth') => {
    return `${property} ${duration}ms ${easing[easing$1]}`;
};

export const createGradientAnimation = (duration$1 = 4000) => {
    return `
    background-size: 300% 300%;
    animation: gradient-shift ${duration$1}ms ease infinite;
  `;
};

// Responsive utilities
export const mediaQueries = {
    mobile: '(max-width: 640px)',
    tablet: '(min-width: 641px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
};

export default {
    colors,
    spacing,
    radius,
    shadows,
    glows,
    easing,
    duration,
    gradients,
    mediaQueries,
};
