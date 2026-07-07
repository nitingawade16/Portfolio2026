# 🎬 Animation Quick Reference

Copy-paste ready animation code for common use cases.

## Scroll Reveal

```jsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { scrollRevealVariants } from '@/lib/animations';

export function MySection() {
  const { ref, controls } = useScrollAnimation();
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={scrollRevealVariants}>
      Content
    </motion.div>
  );
}
```

## Blur Reveal

```jsx
<motion.div
  initial={{ opacity: 0, filter: 'blur(10px)' }}
  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## Scale Reveal

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## Fade In

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## Stagger Children

```jsx
import { containerVariants, itemVariants } from '@/lib/animations';

<motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Card Hover Lift

```jsx
import { AnimatedCard } from '@/components/animations/AnimatedCard';

<AnimatedCard glow="blue">
  Content
</AnimatedCard>
```

## Card 3D Tilt

```jsx
<AnimatedCard glow="purple" tilt>
  Content tilts on mouse move
</AnimatedCard>
```

## Animated Button

```jsx
import { AnimatedButton } from '@/components/animations/AnimatedButton';

<AnimatedButton variant="primary" size="lg">
  Click for ripple
</AnimatedButton>
```

## Letter Reveal Text

```jsx
import { AnimatedText } from '@/components/animations/AnimatedText';

<AnimatedText text="Hello World" variant="letter" as="h1" className="h1" />
```

## Word Reveal Text

```jsx
<AnimatedText text="Build amazing things" variant="word" as="p" className="text-lg" />
```

## Blur Heading

```jsx
import { AnimatedHeading } from '@/components/animations/AnimatedText';

<AnimatedHeading level={2}>
  Premium Heading
</AnimatedHeading>
```

## Number Counter

```jsx
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';

<AnimatedCounter from={0} to={1000} duration={2} suffix=" Users" />
```

## Progress Bar

```jsx
import { AnimatedProgressBar } from '@/components/animations/AnimatedCounter';

<AnimatedProgressBar value={75} max={100} label="Progress" color="blue" />
```

## Skill Bar

```jsx
import { SkillBar } from '@/components/animations/AnimatedCounter';

<SkillBar name="React" level={90} index={0} color="blue" />
```

## Hover Icon

```jsx
import { AnimatedIcon } from '@/components/animations/AnimatedIcon';

<AnimatedIcon variant="hover">
  <StarIcon />
</AnimatedIcon>
```

## Bounce Icon

```jsx
<AnimatedIcon variant="bounce">
  <HeartIcon />
</AnimatedIcon>
```

## Rotating Icon

```jsx
<AnimatedIcon variant="rotate">
  <LoadingIcon />
</AnimatedIcon>
```

## Pulsing Icon

```jsx
<AnimatedIcon variant="pulse">
  <BellIcon />
</AnimatedIcon>
```

## Social Icon

```jsx
import { SocialIcon } from '@/components/animations/AnimatedIcon';
import { FiTwitter } from 'react-icons/fi';

<SocialIcon
  href="https://twitter.com"
  icon={FiTwitter}
  label="Follow"
  delay={0.1}
/>
```

## Floating Icon

```jsx
import { FloatingIcon } from '@/components/animations/AnimatedIcon';

<FloatingIcon delay={0} duration={3}>
  <CloudIcon />
</FloatingIcon>
```

## Vertical Timeline

```jsx
import { AnimatedTimeline } from '@/components/animations/AnimatedTimeline';

const items = [
  { date: '2024', title: 'Title', description: 'Desc' },
  { date: '2023', title: 'Title 2', description: 'Desc 2' },
];

<AnimatedTimeline items={items} variant="vertical" />
```

## Horizontal Timeline

```jsx
<AnimatedTimeline items={items} variant="horizontal" />
```

## Scale on Hover

```jsx
<motion.div whileHover={{ scale: 1.05 }}>
  Hover me
</motion.div>
```

## Scale on Tap

```jsx
<motion.button whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>
```

## Rotate on Hover

```jsx
<motion.div whileHover={{ rotate: 5 }}>
  Rotates on hover
</motion.div>
```

## Bounce Animation

```jsx
<motion.div
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 0.6,
    repeat: Infinity,
  }}
>
  Bouncing content
</motion.div>
```

## Float Animation

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

## Rotate Animation

```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: 'linear',
  }}
>
  Spinning content
</motion.div>
```

## Pulse Animation

```jsx
<motion.div
  animate={{
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  Pulsing content
</motion.div>
```

## Parallax Scroll

```jsx
import { useScroll, useTransform } from 'framer-motion';

export function ParallaxSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <motion.div style={{ y }}>
      Parallax content
    </motion.div>
  );
}
```

## Spring Animation

```jsx
import { springConfig } from '@/lib/animations';

<motion.div
  animate={{ x: 100 }}
  transition={{ type: 'spring', ...springConfig.bounce }}
>
  Bouncy spring
</motion.div>
```

## Custom Easing

```jsx
import { easings } from '@/lib/animations';

<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.6,
    ease: easings.smooth,
  }}
>
  Smooth easing
</motion.div>
```

## Stagger with Delay

```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

## 3D Tilt Effect

```jsx
const [rotation, setRotation] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientY - rect.top - rect.height / 2;
  const y = e.clientX - rect.left - rect.width / 2;
  setRotation({
    x: x / 10,
    y: y / 10,
  });
};

<motion.div
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setRotation({ x: 0, y: 0 })}
  animate={{
    rotateX: rotation.x,
    rotateY: rotation.y,
  }}
  style={{ transformPerspective: 1000 }}
>
  3D Tilt content
</motion.div>
```

## Page Transition

```jsx
import { pageVariants } from '@/lib/animations';

<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
  Page content
</motion.div>
```

## Reduced Motion Respect

```jsx
import { useReducedMotion } from 'framer-motion';

export function AccessibleAnimation() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduce ? { opacity: 1 } : { x: [0, 100, 0] }}
      transition={{ duration: shouldReduce ? 0 : 2 }}
    >
      Accessible animation
    </motion.div>
  );
}
```

## Animation Gallery

```jsx
import {
  scrollRevealVariants,
  blurRevealVariants,
  scaleRevealVariants,
  cardHoverVariants,
  iconBounceVariants,
  floatingVariants,
  rotatingVariants,
  pulseVariants,
} from '@/lib/animations';

// Use any of these in your components
<motion.div variants={scrollRevealVariants} initial="hidden" animate="visible">
  Animated with scroll reveal
</motion.div>
```

## Best Practices

✅ **Do:**
- Use `whileInView` with `viewport={{ once: true }}`
- Use transform animations (scale, rotate, y)
- Keep durations 0.2s - 1s
- Stagger related animations
- Test on mobile performance

❌ **Don't:**
- Animate width/height directly
- Overuse animations (every element)
- Use long delays (>0.5s)
- Forget about accessibility
- Animate too many things simultaneously

## Performance Tips

- Use `transform` instead of position
- Use `opacity` for visibility changes
- Add `will-change: transform` in CSS
- Use `LazyMotion` with `domAnimation`
- Test with DevTools Performance tab

---

**Quick Ref v1.0** | Use with `ANIMATION_GUIDE.md` for full docs
