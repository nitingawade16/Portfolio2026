# 🎬 Premium Animation System Guide

Comprehensive guide for Framer Motion animations with purpose-driven, smooth transitions.

## Overview

The animation system is built with **Framer Motion** and provides:
- Page transitions with blur reveal
- Scroll-triggered animations
- Hover effects with physics-based motion
- Card tilt and lift animations
- Text animations (letter & word reveal)
- Animated counters and progress bars
- Icon animations and bounces
- Timeline animations
- Background parallax effects
- Premium spring configurations

**Philosophy**: Every animation has purpose. No gratuitous motion. Premium feel and smooth transitions.

## File Structure

```
src/
├── lib/
│   └── animations.js                  ← Animation variants & configs
├── hooks/
│   └── useScrollAnimation.js          ← Scroll-based animation hook
└── components/animations/
    ├── AnimatedButton.jsx             ← Button with ripple
    ├── AnimatedCard.jsx               ← Card with tilt & hover
    ├── AnimatedText.jsx               ← Letter/word reveal
    ├── AnimatedCounter.jsx            ← Counters & progress bars
    ├── AnimatedIcon.jsx               ← Icon animations
    └── AnimatedTimeline.jsx           ← Timeline components
```

## Animation Categories

### 1. Page Transitions

**When**: User navigates to a different page
**Purpose**: Smooth visual connection between routes
**Implementation**: Blur fade with scale

```jsx
// In App.jsx - Already implemented
<motion.div
  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
  transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
>
  {children}
</motion.div>
```

### 2. Scroll Reveal Animations

**When**: Element enters viewport
**Purpose**: Guide attention, improve perceived performance
**Implementation**: Staggered reveal with custom easing

```jsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function MyComponent() {
  const { ref, controls, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={scrollRevealVariants}
    >
      Content
    </motion.div>
  );
}
```

**Variants Available:**
- `scrollRevealVariants` - Fade up with y-translate
- `blurRevealVariants` - Blur to sharp transition
- `scaleRevealVariants` - Scale from small to full size

### 3. Hover Effects

**When**: User hovers over interactive elements
**Purpose**: Provide feedback, indicate interactivity
**Implementation**: Spring-based physics

```jsx
// Button with scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Card with lift
<motion.div
  variants={cardHoverVariants}
  initial="rest"
  whileHover="hover"
>
  Content
</motion.div>
```

**Available Hover Variants:**
- `cardHoverVariants` - Lift effect with shadow change
- `iconHoverVariants` - Scale and rotate
- `buttonHoverVariants` - Scale and glow

### 4. Card Animations

**Tilt Effect** (3D perspective)
```jsx
<AnimatedCard tilt glow="blue">
  Card automatically tilts toward mouse
</AnimatedCard>
```

**Lift Effect** (on hover)
```jsx
<AnimatedCard elevated glow="purple">
  Card lifts and shadow expands
</AnimatedCard>
```

### 5. Text Animations

**Letter Reveal**
```jsx
import { AnimatedText } from '@/components/animations/AnimatedText';

<AnimatedText
  text="Premium SaaS Design"
  variant="letter"
  as="h1"
  className="h1"
/>
```

**Word Reveal**
```jsx
<AnimatedText
  text="Build stunning interfaces"
  variant="word"
  as="p"
  className="text-lg"
/>
```

**Blur Heading**
```jsx
import { AnimatedHeading } from '@/components/animations/AnimatedText';

<AnimatedHeading level={2}>
  Animated Heading
</AnimatedHeading>
```

### 6. Number Counters

**Usage:**
```jsx
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';

<AnimatedCounter
  from={0}
  to={1000}
  duration={2}
  suffix=" Users"
  prefix="$"
/>
```

**Features:**
- Increments smoothly over duration
- Triggers on scroll into view
- Customizable prefix/suffix
- Formatted numbers with commas

### 7. Progress Bars

**Animated Progress Bar**
```jsx
import { AnimatedProgressBar } from '@/components/animations/AnimatedCounter';

<AnimatedProgressBar
  value={75}
  max={100}
  label="Performance"
  color="blue"
  animated={true}
/>
```

**Skill Bar**
```jsx
import { SkillBar } from '@/components/animations/AnimatedCounter';

<SkillBar
  name="React"
  level={90}
  index={0}
  color="blue"
/>
```

### 8. Icon Animations

**Hover Icon**
```jsx
import { AnimatedIcon } from '@/components/animations/AnimatedIcon';

<AnimatedIcon variant="hover">
  <StarIcon />
</AnimatedIcon>
```

**Bounce Icon**
```jsx
<AnimatedIcon variant="bounce">
  <HeartIcon />
</AnimatedIcon>
```

**Rotating Icon**
```jsx
<AnimatedIcon variant="rotate">
  <LoadingIcon />
</AnimatedIcon>
```

**Pulsing Icon**
```jsx
<AnimatedIcon variant="pulse">
  <BellIcon />
</AnimatedIcon>
```

**Social Icons**
```jsx
import { SocialIcon } from '@/components/animations/AnimatedIcon';

<SocialIcon
  href="https://twitter.com"
  icon={TwitterIcon}
  label="Follow me"
  delay={0}
/>
```

**Glow Icon**
```jsx
import { GlowIcon } from '@/components/animations/AnimatedIcon';

<GlowIcon color="cyan">
  <DiamondIcon />
</GlowIcon>
```

**Floating Icon**
```jsx
import { FloatingIcon } from '@/components/animations/AnimatedIcon';

<FloatingIcon delay={0} duration={3}>
  <CloudIcon />
</FloatingIcon>
```

### 9. Button Animations

**Ripple Effect Button**
```jsx
import { AnimatedButton } from '@/components/animations/AnimatedButton';

<AnimatedButton
  variant="primary"
  size="lg"
>
  Click for ripple
</AnimatedButton>
```

Features:
- Ripple originates from click point
- Smooth scale and opacity transition
- Built-in hover/tap feedback

### 10. Timeline Animations

**Vertical Timeline**
```jsx
import { AnimatedTimeline } from '@/components/animations/AnimatedTimeline';

const items = [
  {
    date: '2024',
    title: 'Project Alpha',
    description: 'Launched successfully',
  },
  {
    date: '2023',
    title: 'Project Beta',
    description: 'Early development',
  },
];

<AnimatedTimeline items={items} variant="vertical" />
```

**Horizontal Timeline**
```jsx
<AnimatedTimeline items={items} variant="horizontal" />
```

### 11. Background Animations

**Parallax on Scroll**
```jsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <motion.div style={{ y }}>
      Content moves based on scroll
    </motion.div>
  );
}
```

**Floating Animation**
```jsx
<motion.div
  animate={{
    y: [-10, 10, -10],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  Floating content
</motion.div>
```

## Spring Configurations

Pre-defined spring configs for common use cases:

```javascript
import { springConfig } from '@/lib/animations';

// Smooth spring (default)
springConfig.smooth
// { stiffness: 50, damping: 15, mass: 1 }

// Bouncy spring
springConfig.bounce
// { stiffness: 100, damping: 10, mass: 0.8 }

// Tight spring
springConfig.tight
// { stiffness: 150, damping: 20, mass: 1 }

// Slow spring
springConfig.slow
// { stiffness: 30, damping: 12, mass: 1.2 }
```

**Usage:**
```jsx
<motion.div
  animate={{ y: 100 }}
  transition={{ type: 'spring', ...springConfig.bounce }}
>
  Content
</motion.div>
```

## Easing Curves

Pre-defined easing functions:

```javascript
import { easings } from '@/lib/animations';

easings.sharp      // [0.25, 0.46, 0.45, 0.94] - Crisp
easings.smooth     // [0.43, 0.13, 0.23, 0.96] - Professional
easings.spring     // [0.34, 1.56, 0.64, 1] - Bouncy
easings.outExpo    // [0.16, 1, 0.3, 1] - Premium feel
easings.inOut      // [0.4, 0, 0.2, 1] - Standard
```

## Transition Presets

Quick transition configurations:

```javascript
import { transitionPresets } from '@/lib/animations';

transitionPresets.fast     // 0.2s
transitionPresets.base     // 0.3s
transitionPresets.slow     // 0.6s
transitionPresets.slower   // 1.0s
```

## Best Practices

### ✅ Do's

1. **Use scroll reveal** for content sections
2. **Use hover effects** for interactive elements
3. **Use spring animations** for natural motion
4. **Use smooth easing** for page transitions
5. **Stagger animations** for visual interest
6. **Keep durations short** (0.2s - 1s)
7. **Test on performance** - monitor frame rates

### ❌ Don'ts

1. **Don't overuse animations** - Every animation has purpose
2. **Don't use too many simultaneous animations**
3. **Don't animate size/position directly** - Use scale/transform instead
4. **Don't forget `will-change`** on animating elements
5. **Don't forget `reduce-motion`** for accessibility
6. **Don't use `delay` excessively** - Keep it under 0.5s
7. **Don't animate on every interaction** - Only for key actions

## Performance Tips

1. **Use `will-change`** in CSS for animating elements
2. **Use `transform` and `opacity`** - GPU accelerated
3. **Avoid animating `width`, `height`, `top`, `left`**
4. **Use `LayoutAnimation` carefully** - Only when needed
5. **Test with DevTools Performance** tab
6. **Disable animations** with `prefers-reduced-motion`
7. **Use `LazyMotion`** with `domAnimation` to reduce bundle

## Accessibility

### Respect `prefers-reduced-motion`

```jsx
import { useReducedMotion } from 'framer-motion';

export function AccessibleAnimation() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={{ x: shouldReduce ? 0 : 100 }}
    >
      Content respects user preferences
    </motion.div>
  );
}
```

## Common Patterns

### Stagger Container

```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={containerVariants}
>
  {items.map(item => (
    <motion.div variants={itemVariants} key={item.id}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Fade In On Load

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  Content
</motion.div>
```

### Scale On Hover

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Parallax Scroll

```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);

<motion.div style={{ y }}>
  Moves with scroll
</motion.div>
```

## Animation Examples by Page

### Home Page
- Hero text letter reveal
- Card stagger on scroll
- Button ripple effects
- Floating icon animations
- Parallax background

### Projects Page
- Project card tilt on hover
- Image blur reveal
- Tag scale animation
- Timeline vertical animation

### Skills Page
- Skill bar fill animation
- Progress bar counter
- Icon bounce animations
- Staggered card reveal

### Education Page
- Timeline vertical layout
- Card hover lift
- Date animations
- Institution logo float

### Contact Page
- Form field focus animations
- Button ripple effect
- Success message scale-in
- Icon glow pulse

## Troubleshooting

### Animation not triggering
- Check `whileInView` viewport settings
- Ensure element is in viewport
- Check z-index and overflow settings

### Jittery animation
- Use `transform` instead of position properties
- Add `will-change` in CSS
- Reduce complexity of animation

### Animation too slow
- Reduce `duration` value
- Check `delay` settings
- Verify easing function

### Performance issues
- Reduce number of animating elements
- Use `LazyMotion` with `domAnimation`
- Check browser DevTools Performance tab

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://www.framer.com/motion/animation-principles/)
- [Easing Functions](https://easings.net/)

---

**Version**: 1.0.0
**Last Updated**: July 4, 2026
