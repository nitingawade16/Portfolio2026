/**
 * Premium Component Examples
 * Showcase of the new design system in action
 */

import React, { useState } from 'react';
import {
    getButtonClasses,
    getCardClasses,
    getTagClasses,
    getGradientTextClasses,
    getGlowBorderClasses,
    cn
} from '@/lib/component-utils';

/**
 * Premium Button Component
 */
export const PremiumButton = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    ...props
}) => {
    return (
        <button
            className={getButtonClasses(variant, size, className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {children}
                </span>
            ) : children}
        </button>
    );
};

/**
 * Premium Card Component
 */
export const PremiumCard = ({
    children,
    title,
    subtitle,
    glow = 'blue',
    elevated = false,
    interactive = false,
    className,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                getCardClasses('default', glow, elevated, className),
                interactive && 'cursor-pointer'
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h3 className="h4 mb-2">{title}</h3>}
                    {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
                </div>
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

/**
 * Premium Tag Component
 */
export const PremiumTag = ({
    children,
    color = 'blue',
    pill = false,
    icon,
    className,
    ...props
}) => {
    return (
        <span className={getTagClasses(color, pill, className)} {...props}>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </span>
    );
};

/**
 * Gradient Text Component
 */
export const GradientText = ({
    children,
    type = 'full',
    className,
    ...props
}) => {
    return (
        <span className={getGradientTextClasses(type, className)} {...props}>
            {children}
        </span>
    );
};

/**
 * Premium Badge/Pill Component
 */
export const Badge = ({
    children,
    color = 'blue',
    variant = 'default',
    className,
    ...props
}) => {
    const variantClasses = {
        default: 'tag',
        pill: 'tag-pill',
    };

    const colorClasses = {
        blue: 'tag-blue',
        purple: 'tag-purple',
        cyan: 'tag-cyan',
        green: 'tag-green',
        orange: 'tag-orange',
    };

    return (
        <span
            className={cn(
                variantClasses[variant],
                variant === 'default' && colorClasses[color],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

/**
 * Glow Border Container
 */
export const GlowBorder = ({
    children,
    color = 'blue',
    animated = false,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                getGlowBorderClasses(color),
                animated && 'border-glow',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Premium Text Component
 */
export const Text = ({
    children,
    size = 'base',
    color = 'primary',
    weight = 'regular',
    gradient = false,
    glow = false,
    className,
    ...props
}) => {
    const weights = {
        light: 'font-light',
        regular: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    return (
        <span
            className={cn(
                `text-${size}`,
                `text-${color}`,
                weights[weight],
                gradient && 'gradient-text',
                glow && 'glow-text',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

/**
 * Premium Heading Component
 */
export const Heading = ({
    children,
    level = 2,
    gradient = false,
    glow = false,
    className,
    ...props
}) => {
    const HeadingTag = `h${level}`;
    const headingClasses = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5',
        6: 'h6',
    };

    return (
        <HeadingTag
            className={cn(
                headingClasses[level],
                gradient && 'gradient-text',
                glow && 'glow-text',
                className
            )}
            {...props}
        >
            {children}
        </HeadingTag>
    );
};

/**
 * Premium Stat Card Component
 */
export const StatCard = ({
    value,
    label,
    icon,
    glow = 'cyan',
    className,
    ...props
}) => {
    return (
        <PremiumCard glow={glow} className={className} {...props}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-muted text-sm mb-1">{label}</p>
                    <h3 className="h2 gradient-text">{value}</h3>
                </div>
                {icon && (
                    <div className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center',
                        'bg-gradient-to-br from-blue-500/10 to-purple-500/10',
                        'border border-blue-500/20'
                    )}>
                        {icon}
                    </div>
                )}
            </div>
        </PremiumCard>
    );
};

/**
 * Premium Feature Card Component
 */
export const FeatureCard = ({
    icon,
    title,
    description,
    glow = 'blue',
    className,
    ...props
}) => {
    return (
        <PremiumCard
            glow={glow}
            title={title}
            subtitle={description}
            className={className}
            {...props}
        >
            {icon && (
                <div className="mb-4 text-2xl">
                    {icon}
                </div>
            )}
        </PremiumCard>
    );
};

/**
 * Premium Pill Button Component
 */
export const PillButton = ({
    children,
    color = 'blue',
    icon,
    className,
    ...props
}) => {
    const colors = {
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:border-blue-500/60',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-500/60',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60',
    };

    return (
        <button
            className={cn(
                'px-4 py-2 rounded-full border transition-all',
                colors[color],
                className
            )}
            {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

/**
 * Premium Section Component
 */
export const Section = ({
    children,
    title,
    subtitle,
    className,
    ...props
}) => {
    return (
        <section className={cn('py-20 md:py-24 px-4 md:px-8', className)} {...props}>
            <div className="max-w-6xl mx-auto">
                {(title || subtitle) && (
                    <div className="mb-12 md:mb-16 text-center">
                        {title && <h2 className="section-title mb-4">{title}</h2>}
                        {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

/**
 * Premium Grid Component
 */
export const Grid = ({
    children,
    cols = 1,
    gap = 'base',
    className,
    ...props
}) => {
    const colClasses = {
        1: 'grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClasses = {
        xs: 'gap-2',
        sm: 'gap-4',
        base: 'gap-6',
        lg: 'gap-8',
    };

    return (
        <div
            className={cn(
                'grid',
                colClasses[cols],
                gapClasses[gap],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Usage Examples
 */
export const ComponentShowcase = () => {
    return (
        <div className="space-y-16 py-20">
            {/* Buttons */}
            <div>
                <h3 className="h3 mb-6">Premium Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <PremiumButton variant="primary">Primary</PremiumButton>
                    <PremiumButton variant="secondary">Secondary</PremiumButton>
                    <PremiumButton variant="outline">Outline</PremiumButton>
                    <PremiumButton variant="ghost">Ghost</PremiumButton>
                    <PremiumButton variant="primary" size="sm">Small</PremiumButton>
                    <PremiumButton variant="primary" size="lg">Large</PremiumButton>
                </div>
            </div>

            {/* Cards */}
            <div>
                <h3 className="h3 mb-6">Premium Cards</h3>
                <Grid cols={3}>
                    <PremiumCard glow="blue" title="Blue Card">
                        Beautiful card with blue glow effect
                    </PremiumCard>
                    <PremiumCard glow="purple" title="Purple Card">
                        Beautiful card with purple glow effect
                    </PremiumCard>
                    <PremiumCard glow="cyan" title="Cyan Card">
                        Beautiful card with cyan glow effect
                    </PremiumCard>
                </Grid>
            </div>

            {/* Tags */}
            <div>
                <h3 className="h3 mb-6">Premium Tags</h3>
                <div className="flex flex-wrap gap-3">
                    <PremiumTag color="blue">Blue Tag</PremiumTag>
                    <PremiumTag color="purple">Purple Tag</PremiumTag>
                    <PremiumTag color="cyan">Cyan Tag</PremiumTag>
                    <PremiumTag color="green">Green Tag</PremiumTag>
                    <PremiumTag color="orange">Orange Tag</PremiumTag>
                </div>
            </div>

            {/* Text */}
            <div className="space-y-4">
                <h3 className="h3 mb-6">Premium Text</h3>
                <Heading level={2} gradient>Gradient Text</Heading>
                <Heading level={3} glow>Glowing Text</Heading>
                <Text gradient size="lg">Large gradient text</Text>
                <Text glow size="lg">Large glowing text</Text>
            </div>
        </div>
    );
};

export default {
    PremiumButton,
    PremiumCard,
    PremiumTag,
    GradientText,
    Badge,
    GlowBorder,
    Text,
    Heading,
    StatCard,
    FeatureCard,
    PillButton,
    Section,
    Grid,
};
