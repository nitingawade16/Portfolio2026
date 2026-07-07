# Premium SaaS Design System

A comprehensive, cohesive design system for modern premium applications with glassmorphism, gradients, and sophisticated animations.

## 🎨 Design Principles

- **Premium**: Sophisticated, polished, and refined
- **Consistent**: Unified design language across all components
- **Accessible**: WCAG compliant and inclusive
- **Performance**: Optimized animations and smooth interactions
- **Responsive**: Seamless experience across all devices

## 📦 Color Palette

### Primary Colors
- **Blue**: `#0055ff` - Main action color
- **Purple**: `#7c3aed` - Secondary action color
- **Cyan**: `#06b6d4` - Accent and highlight color

### Semantic Colors
- **Success Green**: `#10b981` - Positive actions and states
- **Warning Orange**: `#f97316` - Warnings and alerts
- **Error Red**: `#ef4444` - Errors and destructive actions

### Background Colors
- **Primary**: `#0a0e27` - Main background
- **Secondary**: `#0f1535` - Secondary backgrounds
- **Card**: `rgba(20, 25, 50, 0.4)` - Card backgrounds with glassmorphism

### Text Colors
- **Primary**: `#f5f5ff` - Main text
- **Secondary**: `#a8a8cc` - Secondary text
- **Tertiary**: `#6f6f94` - Tertiary text
- **Muted**: `#4a4a6a` - Muted text

## 🎯 Components

### Buttons

All buttons use the `.btn` base class with variants:

```html
<!-- Primary Button -->
<button class="btn btn-primary">Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost</button>

<!-- Icon Button -->
<button class="btn btn-icon">
  <svg>...</svg>
</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

**Features**:
- Gradient backgrounds
- Glow effects on hover
- Ripple animations on click
- Smooth transitions
- Magnetic movement effect

### Cards

Premium cards with glass effect, gradients, and hover animations:

```html
<!-- Default Card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- Glow Variant -->
<div class="card card-glow-blue">Content</div>
<div class="card card-glow-purple">Content</div>
<div class="card card-glow-cyan">Content</div>

<!-- Elevated Card -->
<div class="card card-elevated">Content</div>

<!-- Gradient Border Card -->
<div class="card card-gradient-border">Content</div>
```

**Features**:
- Glass effect with backdrop blur
- Gradient borders (optional)
- Floating shadows
- Shimmer animation on hover
- Color-coded glow effects

### Tags & Badges

Colorful, premium tags and badges:

```html
<!-- Tags -->
<span class="tag tag-blue">Blue Tag</span>
<span class="tag tag-purple">Purple Tag</span>
<span class="tag tag-cyan">Cyan Tag</span>
<span class="tag tag-green">Green Tag</span>

<!-- Pills -->
<span class="tag-pill">Pill Badge</span>
```

**Features**:
- Multiple color variants
- Backdrop blur effect
- Smooth hover transitions
- Glow on hover

### Text & Typography

Comprehensive typography system:

```html
<!-- Headings -->
<h1>Large Heading</h1>
<h2>Medium Heading</h2>
<h3>Small Heading</h3>

<!-- Text Sizes -->
<p class="text-lg">Large text</p>
<p class="text-base">Base text</p>
<p class="text-sm">Small text</p>
<p class="text-xs">Extra small text</p>

<!-- Text Colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-muted">Muted text</p>

<!-- Gradient Text -->
<h1 class="gradient-text">Gradient heading</h1>
<p class="gradient-text-blue">Blue gradient</p>
<p class="gradient-text-purple">Purple gradient</p>

<!-- Glow Text -->
<p class="glow-text">Glowing cyan text</p>
<p class="glow-text-blue">Glowing blue text</p>
<p class="glow-text-purple">Glowing purple text</p>
```

## 🌈 Gradients

Pre-defined gradient styles:

```javascript
// Using gradient utilities
import { getGradient } from '@/lib/design-system';

// Predefined gradients
const primary = getGradient('primary');     // Blue to Purple
const accent = getGradient('accent');       // Purple to Cyan
const full = getGradient('full');           // Blue to Purple to Cyan
```

## ✨ Effects & Animations

### Glow Effects

```html
<!-- Glow Borders -->
<div class="glow-border-blue">Blue glow</div>
<div class="glow-border-purple">Purple glow</div>
<div class="glow-border-cyan">Cyan glow</div>

<!-- Animated Borders -->
<div class="animated-border">Animated gradient border</div>

<!-- Border Glow -->
<div class="border-glow">Spinning gradient border</div>
```

### Animations

```html
<!-- Floating Animation -->
<div class="floating">Float up and down</div>
<div class="floating-gentle">Gentle float</div>
<div class="floating-slow">Slow float</div>

<!-- Other Animations -->
<div class="fade-up">Fade up animation</div>
<div class="pulse-glow">Pulsing glow</div>
<div class="blob-animate">Blob shape animation</div>
```

### Transitions

All interactive elements use smooth, performant transitions:

- **Fast**: 100ms
- **Base**: 250ms (default)
- **Slow**: 400ms
- **Slower**: 600ms

## 🎛️ Spacing System

8px grid-based spacing scale:

```javascript
--sp-1: 4px
--sp-2: 8px
--sp-3: 12px
--sp-4: 16px
--sp-5: 20px
--sp-6: 24px
--sp-8: 32px
--sp-10: 40px
--sp-12: 48px
--sp-16: 64px
--sp-20: 80px
--sp-24: 96px
```

## 📏 Border Radius

Consistent, modern border radius values:

```javascript
--r-xs: 6px
--r-sm: 10px
--r-md: 14px
--r-lg: 18px
--r-xl: 24px
--r-2xl: 32px
--r-3xl: 48px
--r-full: 9999px
```

## 🌙 Light Mode

Complete light mode support with automatic color inversion:

```html
<body class="light">
  <!-- Content automatically switches to light theme -->
</body>
```

Light mode colors:
- Background: `#f8f8fc`
- Text: `#0f0f1a`
- Cards: `rgba(255, 255, 255, 0.7)`

## ♿ Accessibility

- High contrast mode support
- Large text mode
- Reduced motion preferences
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management

```html
<!-- High Contrast Mode -->
<html class="acc-high-contrast">

<!-- Large Text -->
<html class="acc-large-text">

<!-- Reduced Motion -->
<html class="acc-reduced-motion">
```

## 📱 Responsive Design

Mobile-first responsive utilities:

```html
<!-- Hidden on mobile, visible on tablet+ -->
<div class="hidden md:block">Tablet and up</div>

<!-- Visible on mobile, hidden on tablet+ -->
<div class="md:hidden">Mobile only</div>

<!-- Responsive text sizes -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h1>

<!-- Responsive spacing -->
<section class="p-4 md:p-6 lg:p-8">Content</section>
```

## 🔧 Using the Design System

### Component Utilities

Import and use component utility functions:

```javascript
import { 
  getButtonClasses, 
  getCardClasses, 
  getTagClasses,
  cn 
} from '@/lib/component-utils';

// Usage
const buttonClass = getButtonClasses('primary', 'lg');
const cardClass = getCardClasses('default', 'blue');
const tagClass = getTagClasses('purple', false);

// Combine classes
const combined = cn(buttonClass, 'custom-class');
```

### Design Tokens

Access design tokens programmatically:

```javascript
import { 
  colors, 
  spacing, 
  radius, 
  shadows,
  duration,
  easing,
  gradients 
} from '@/lib/design-system';

// Usage
const blueColor = colors.primary.blue;
const baseSpacing = spacing.base;
const glowShadow = shadows.lg;
const smoothDuration = duration.base;
```

## 📊 Spacing Reference

### Section Padding

```css
/* Mobile */
section { padding: var(--sp-20) var(--sp-4); }

/* Tablet */
@media (min-width: 768px) {
  section { padding: var(--sp-24) var(--sp-6); }
}

/* Desktop */
@media (min-width: 1024px) {
  section { padding: var(--sp-24) var(--sp-8); }
}
```

### Card Spacing

```css
.card {
  padding: var(--sp-6);     /* 24px */
  border-radius: var(--r-xl); /* 24px */
  gap: var(--sp-4);         /* 16px between items */
}
```

## 🎬 Animation Easing

Premium easing functions for smooth, natural motion:

- **Out Expo**: Sharp, premium feel
- **Spring**: Bouncy, playful feel
- **Smooth**: Standard, professional feel
- **Sharp**: Crisp, snappy feel

## 📚 Usage Examples

### Complete Button Component

```jsx
import { getButtonClasses } from '@/lib/component-utils';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className 
}) {
  return (
    <button className={getButtonClasses(variant, size, className)}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary" size="lg">Click me</Button>
<Button variant="secondary">Secondary</Button>
```

### Card Component

```jsx
import { getCardClasses } from '@/lib/component-utils';

export function Card({ 
  children, 
  glow = 'blue',
  elevated = false,
  className 
}) {
  return (
    <div className={getCardClasses('default', glow, elevated, className)}>
      {children}
    </div>
  );
}

// Usage
<Card glow="purple">Card content</Card>
<Card glow="cyan" elevated>Elevated card</Card>
```

## 🎨 Customization

All design tokens are CSS variables, easily customizable:

```css
:root {
  --color-primary-blue: #0055ff;
  --bg-primary: #0a0e27;
  --sp-6: 24px;
  --r-xl: 24px;
  --duration-base: 250ms;
}
```

## 📋 Best Practices

1. **Use consistent spacing** - Follow the 8px grid
2. **Apply proper hierarchy** - Use heading levels correctly
3. **Maintain color contrast** - Ensure accessibility
4. **Use semantic colors** - Green for success, red for errors
5. **Animate purposefully** - Use animations to guide users
6. **Test responsiveness** - Check all breakpoints
7. **Consider accessibility** - Support keyboard and screen readers

## 🚀 Performance Tips

- Use CSS custom properties for dynamic theming
- Leverage backdrop-filter with will-change sparingly
- Use hardware-accelerated animations (transform, opacity)
- Optimize glow effects with box-shadow
- Lazy load heavy animations

## 📖 Typography Scale

```
H1: 4.2rem (clamp)
H2: 3.0rem (clamp)
H3: 1.8rem (clamp)
H4: 1.1rem
Body: 0.95rem
Small: 0.85rem
Tiny: 0.75rem
```

---

For component-specific examples, check individual component files.
