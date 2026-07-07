# Design System Migration Guide

Complete guide for updating your components to use the new premium design system.

## 🚀 Getting Started

The new design system provides utilities and components that make it easy to build premium interfaces.

### Key Files

- **`src/index.css`** - All CSS tokens, components, and animations
- **`src/lib/design-system.js`** - Design tokens and constants
- **`src/lib/component-utils.js`** - Class builder utilities
- **`src/components/ui/PremiumComponents.jsx`** - Reusable premium components
- **`DESIGN_SYSTEM.md`** - Complete design system documentation

## 📋 Migration Steps

### Step 1: Update Colors

**Before:**
```jsx
<button style={{ background: 'blue', color: 'white' }}>Click</button>
```

**After:**
```jsx
import { colors } from '@/lib/design-system';

<button style={{ background: colors.primary.blue, color: '#fff' }}>
  Click
</button>
```

**Or use CSS classes:**
```jsx
import { getButtonClasses } from '@/lib/component-utils';

<button className={getButtonClasses('primary')}>Click</button>
```

### Step 2: Update Components

#### Buttons

**Before:**
```jsx
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
```

**After:**
```jsx
import { PremiumButton } from '@/components/ui/PremiumComponents';

<PremiumButton variant="primary">Primary</PremiumButton>
<PremiumButton variant="secondary">Secondary</PremiumButton>

// Or use class utilities
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
```

#### Cards

**Before:**
```jsx
<div className="rounded-lg p-4 bg-gray-900 border border-gray-700">
  Card content
</div>
```

**After:**
```jsx
import { PremiumCard } from '@/components/ui/PremiumComponents';

<PremiumCard glow="blue">
  Card content
</PremiumCard>

// Or use class utilities
<div className="card card-glow-blue">
  Card content
</div>
```

#### Tags

**Before:**
```jsx
<span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs">
  Tag
</span>
```

**After:**
```jsx
import { PremiumTag } from '@/components/ui/PremiumComponents';

<PremiumTag color="blue">Tag</PremiumTag>

// Or use class utilities
<span className="tag tag-blue">Tag</span>
```

### Step 3: Update Typography

**Before:**
```jsx
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-gray-400">Description</p>
```

**After:**
```jsx
import { Heading, Text } from '@/components/ui/PremiumComponents';

<Heading level={1}>Heading</Heading>
<Text color="secondary">Description</Text>

// Or use CSS classes
<h1 className="h1">Heading</h1>
<p className="text-secondary">Description</p>
```

### Step 4: Update Spacing

**Before:**
```jsx
<div className="p-4 m-4 space-y-4">
  Content
</div>
```

**After:**
```jsx
<div className="p-6 my-8 space-y-6">
  Content
</div>

// Or use CSS variables
<div style={{ padding: 'var(--sp-6)', margin: 'var(--sp-8)' }}>
  Content
</div>
```

### Step 5: Add Animations

**Before:**
```jsx
<div className="transition hover:scale-105">
  Hover me
</div>
```

**After:**
```jsx
<div className="card hover:scale-105 transition-transform duration-base">
  Hover me
</div>

// Or use animation utilities
<div className="fade-up floating-gentle">
  Animated content
</div>
```

## 🎨 Component Update Examples

### Complete Button Component Migration

**Before:**
```jsx
export const Button = ({ children, variant, ...props }) => {
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600'
  }[variant];

  return (
    <button 
      className={`px-4 py-2 rounded transition ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**After:**
```jsx
import { getButtonClasses } from '@/lib/component-utils';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}) => {
  return (
    <button 
      className={getButtonClasses(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage
<Button variant="primary" size="lg">Click me</Button>
```

### Complete Card Component Migration

**Before:**
```jsx
export const Card = ({ title, children, ...props }) => {
  return (
    <div 
      className="rounded-xl bg-gray-900 border border-gray-700 p-6 hover:border-blue-500 transition"
      {...props}
    >
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
};
```

**After:**
```jsx
import { getCardClasses } from '@/lib/component-utils';

export const Card = ({ 
  title, 
  children,
  glow = 'blue',
  elevated = false,
  className,
  ...props 
}) => {
  return (
    <div 
      className={getCardClasses('default', glow, elevated, className)}
      {...props}
    >
      {title && <h3 className="h3 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

// Usage
<Card title="My Card" glow="purple" elevated>
  Card content
</Card>
```

## 🎯 Color Updates

Update color usage throughout your components:

| Before | After |
|--------|-------|
| `blue-600` | `var(--color-primary-blue)` or `colors.primary.blue` |
| `gray-900` | `var(--bg-primary)` or `colors.background.primary` |
| `gray-400` | `var(--text-secondary)` or `colors.text.secondary` |
| `green-500` | `var(--color-success-green)` or `colors.success.green` |
| `orange-500` | `var(--color-warning-orange)` or `colors.warning.orange` |
| `red-500` | `var(--color-error-red)` or `colors.error.red` |

## 📐 Spacing Updates

Update spacing values to use the new grid:

| Before | After | Tokens |
|--------|-------|--------|
| `p-2` | `p-1` or `p-2` | `--sp-1` to `--sp-24` |
| `m-4` | `m-4` or `m-6` | Use `--sp-*` variables |
| `gap-2` | `gap-2` or `gap-4` | 8px-based grid |
| `rounded-lg` | `rounded-xl` | `--r-*` variables |

## 🎬 Animation Updates

Add premium animations to your components:

```jsx
// Fade up animation on mount
<div className="fade-up">Content</div>

// Floating animation
<div className="floating">Content</div>

// Glow pulse
<div className="pulse-glow">Content</div>

// Custom transitions
<div className="transition-all duration-base ease-smooth hover:scale-105">
  Hover me
</div>
```

## 🎨 Gradient Updates

**Before:**
```jsx
<h1 style={{
  background: 'linear-gradient(135deg, #0066ff, #7c3aed)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}>
  Title
</h1>
```

**After:**
```jsx
import { getGradientTextClasses } from '@/lib/component-utils';

<h1 className={getGradientTextClasses('full')}>
  Title
</h1>

// Or use the class directly
<h1 className="gradient-text">Title</h1>
```

## 🔧 Using Design Tokens Programmatically

```javascript
import { 
  colors, 
  spacing, 
  radius, 
  shadows,
  duration,
  easing,
  gradients,
  getColor,
  getSpacing,
  createTransition
} from '@/lib/design-system';

// Access colors
const primaryBlue = colors.primary.blue;
const bgPrimary = colors.background.primary;

// Or use helpers
const textColor = getColor('text', 'secondary');
const padding = getSpacing('xl');

// Create dynamic transitions
const transition = createTransition('all', 'base', 'smooth');
```

## ✅ Checklist

- [ ] Update all button styles to use `.btn` and variants
- [ ] Update all card styles to use `.card` and variants
- [ ] Update all tag/badge styles to use `.tag`
- [ ] Update all typography to use heading classes (h1-h6)
- [ ] Update all colors to use CSS variables or color tokens
- [ ] Update all spacing to use `--sp-*` variables
- [ ] Update all border-radius to use `--r-*` variables
- [ ] Add animations where appropriate
- [ ] Test on all breakpoints
- [ ] Test in light mode
- [ ] Test accessibility features

## 🎨 Quick Reference

### CSS Classes

```
Buttons:    .btn, .btn-primary, .btn-secondary, .btn-outline, .btn-ghost, .btn-icon
Cards:      .card, .card-glow-blue, .card-glow-purple, .card-glow-cyan, .card-elevated
Tags:       .tag, .tag-blue, .tag-purple, .tag-cyan, .tag-green, .tag-orange
Typography: .h1-.h6, .text-xs, .text-sm, .text-base, .text-lg, .text-primary
Effects:    .gradient-text, .glow-text, .glow-border-blue, .glass, .glass-strong
Animations: .fade-up, .floating, .pulse-glow, .blob-animate
```

### CSS Variables

```
Colors:     --color-*, --bg-*, --text-*
Spacing:    --sp-1 through --sp-24
Radius:     --r-xs through --r-full
Shadows:    --shadow-xs through --shadow-floating
Glows:      --glow-* variants
Motion:     --ease-*, --duration-*
```

## 🚀 Performance Tips

1. **Use CSS variables** for dynamic theming
2. **Batch animations** to reduce repaints
3. **Use will-change** sparingly for heavy animations
4. **Leverage hardware acceleration** with transform/opacity
5. **Lazy load** complex components
6. **Minify CSS** in production
7. **Use CSS containment** for isolated components

## 📱 Responsive Updates

Use responsive utilities for mobile-first design:

```jsx
// Mobile-first classes
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
  <p className="text-sm md:text-base lg:text-lg">Text</p>
</div>
```

## 🆘 Common Issues

### Issue: Colors not updating
**Solution**: Make sure to import from the correct files and use CSS variables

### Issue: Animations are stuttery
**Solution**: Use `will-change` and `transform` properties, avoid `top/left` animations

### Issue: Cards look flat
**Solution**: Add `card-glow-*` classes and `card-elevated` for depth

### Issue: Text is hard to read
**Solution**: Use `text-primary` for main text, `text-secondary` for supporting text

## 📞 Support

For questions or issues:
1. Check `DESIGN_SYSTEM.md` for complete documentation
2. Review `PremiumComponents.jsx` for usage examples
3. Inspect `src/index.css` for all available styles
4. Check `component-utils.js` for available utility functions

---

Happy migrating! 🎉
