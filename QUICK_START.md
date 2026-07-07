# 🚀 Quick Start Guide — Premium Design System

## 5-Minute Setup

### 1. Review the Design System
```bash
# Check out the complete system
cat DESIGN_SYSTEM.md

# Or view the summary
cat REDESIGN_SUMMARY.md
```

### 2. Use Premium Components

#### Option A: Import Ready-Made Components
```jsx
import { 
  PremiumButton, 
  PremiumCard, 
  Heading,
  Text,
  Grid 
} from '@/components/ui/PremiumComponents';

export function MyComponent() {
  return (
    <div>
      <Heading level={2} gradient>Welcome</Heading>
      
      <Grid cols={3} gap="lg">
        <PremiumCard glow="blue">
          <h3>Feature 1</h3>
          <p>Description</p>
        </PremiumCard>
        
        <PremiumCard glow="purple">
          <h3>Feature 2</h3>
          <p>Description</p>
        </PremiumCard>
        
        <PremiumCard glow="cyan">
          <h3>Feature 3</h3>
          <p>Description</p>
        </PremiumCard>
      </Grid>
      
      <PremiumButton variant="primary">Get Started</PremiumButton>
    </div>
  );
}
```

#### Option B: Use CSS Classes Directly
```jsx
export function MyComponent() {
  return (
    <div>
      <h2 className="h2 gradient-text">Welcome</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card card-glow-blue">
          <h3>Feature 1</h3>
          <p>Description</p>
        </div>
        
        <div className="card card-glow-purple">
          <h3>Feature 2</h3>
          <p>Description</p>
        </div>
        
        <div className="card card-glow-cyan">
          <h3>Feature 3</h3>
          <p>Description</p>
        </div>
      </div>
      
      <button className="btn btn-primary">Get Started</button>
    </div>
  );
}
```

### 3. Use Utilities for Dynamic Classes

```jsx
import { getButtonClasses, getCardClasses, cn } from '@/lib/component-utils';

export function DynamicComponent({ variant = 'primary', cardColor = 'blue' }) {
  return (
    <div>
      <button className={getButtonClasses(variant, 'lg')}>
        Click me
      </button>
      
      <div className={getCardClasses('default', cardColor, true)}>
        Elevated card with glow
      </div>
    </div>
  );
}
```

### 4. Access Design Tokens

```javascript
import { colors, spacing, shadows, gradients } from '@/lib/design-system';

// Colors
const primaryBlue = colors.primary.blue;        // #0055ff
const bgCard = colors.background.card;          // rgba(20, 25, 50, 0.4)

// Spacing
const padding = spacing.xl;                      // 24px
const margin = spacing['2xl'];                   // 32px

// Shadows
const cardShadow = shadows.lg;                   // 0 8px 32px...

// Gradients
const primaryGradient = gradients.primary;       // linear-gradient...
```

## Common Use Cases

### Create a Premium Hero Section
```jsx
import { PremiumButton, Heading, Text, Section } from '@/components/ui/PremiumComponents';

export function Hero() {
  return (
    <Section className="text-center">
      <Heading level={1} gradient>
        Welcome to Premium UI
      </Heading>
      
      <Text size="lg" color="secondary" className="mt-4 mb-8">
        Experience a premium SaaS design system
      </Text>
      
      <div className="flex gap-4 justify-center">
        <PremiumButton variant="primary" size="lg">
          Get Started
        </PremiumButton>
        <PremiumButton variant="secondary" size="lg">
          Learn More
        </PremiumButton>
      </div>
    </Section>
  );
}
```

### Create Feature Cards
```jsx
import { PremiumCard, FeatureCard, Grid } from '@/components/ui/PremiumComponents';

const features = [
  { icon: '✨', title: 'Premium', description: 'Sophisticated design' },
  { icon: '🎯', title: 'Consistent', description: 'Unified language' },
  { icon: '♿', title: 'Accessible', description: 'WCAG compliant' },
];

export function Features() {
  return (
    <Grid cols={3} gap="lg">
      {features.map((feature, i) => (
        <FeatureCard
          key={i}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          glow={['blue', 'purple', 'cyan'][i]}
        />
      ))}
    </Grid>
  );
}
```

### Create Statistics Section
```jsx
import { StatCard, Grid } from '@/components/ui/PremiumComponents';

const stats = [
  { value: '10K+', label: 'Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '500+', label: 'Projects' },
];

export function Stats() {
  return (
    <Grid cols={3} gap="lg">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          value={stat.value}
          label={stat.label}
          glow={['blue', 'purple', 'cyan'][i]}
        />
      ))}
    </Grid>
  );
}
```

## Color Variants

Use these color codes for cards, tags, and glow effects:

```
Blue:    "blue"    (#0055ff) - Primary actions
Purple:  "purple"  (#7c3aed) - Secondary actions
Cyan:    "cyan"    (#06b6d4) - Accents
Green:   "green"   (#10b981) - Success
Orange:  "orange"  (#f97316) - Warnings
```

## Responsive Patterns

```jsx
// Mobile-first responsive
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="card">Item 1</div>
    <div className="card">Item 2</div>
    <div className="card">Item 3</div>
  </div>
</div>
```

## Animation Examples

```jsx
// Fade in animation
<div className="fade-up">Content appears with fade-up animation</div>

// Floating animation
<div className="floating">Gently floating content</div>

// Pulsing glow
<div className="pulse-glow">Pulsing glow effect</div>

// Custom transition
<div className="transition-all duration-base hover:scale-105">
  Hover for scale effect
</div>
```

## Text Effects

```jsx
// Gradient text
<h1 className="gradient-text">Rainbow gradient text</h1>
<h2 className="gradient-text-blue">Blue gradient text</h2>
<h3 className="gradient-text-purple">Purple gradient text</h3>

// Glowing text
<p className="glow-text">Glowing cyan text</p>
<p className="glow-text-blue">Glowing blue text</p>
<p className="glow-text-purple">Glowing purple text</p>
```

## Button Variants

```jsx
// All button variants
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-ghost">Ghost</button>

// Button sizes
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Normal</button>
<button className="btn btn-primary btn-lg">Large</button>

// Full width
<button className="btn btn-primary btn-block">Full Width</button>

// Icon button
<button className="btn btn-icon">🔔</button>
```

## Spacing Reference

Most common spacing values:

```
xs:     --sp-1  (4px)
sm:     --sp-2  (8px)
md:     --sp-3  (12px)
base:   --sp-4  (16px)
lg:     --sp-6  (24px)
xl:     --sp-8  (32px)
2xl:    --sp-10 (40px)
3xl:    --sp-12 (48px)
```

Use with margin/padding:

```html
<div class="p-6 m-4 space-y-4">Content</div>
```

Or CSS variables:

```css
padding: var(--sp-6);
margin: var(--sp-4);
gap: var(--sp-4);
```

## Light Mode

Enable light mode on any element:

```jsx
<body className="light">
  {/* All content automatically switches to light theme */}
</body>
```

Or on specific components:

```jsx
<div className="light">
  <h1>Light mode heading</h1>
  <p>Light mode text</p>
</div>
```

## Accessibility

Built-in accessibility features:

```jsx
// High contrast mode
<html class="acc-high-contrast">

// Large text mode
<html class="acc-large-text">

// Reduced motion
<html class="acc-reduced-motion">
```

## Performance Tips

✅ **Do:**
- Use CSS variables for theming
- Leverage backdrop-filter for glass effects
- Use transform/opacity for animations
- Batch related updates
- Use will-change sparingly

❌ **Don't:**
- Animate top/left/width/height
- Overuse glow effects
- Apply will-change to many elements
- Use heavy box-shadows everywhere
- Animate on every hover

## Troubleshooting

### Cards look flat
**Solution:** Add `card-glow-*` class
```jsx
<div className="card card-glow-blue">Content</div>
```

### Text is hard to read
**Solution:** Use proper text colors
```jsx
<p className="text-primary">Main text</p>
<p className="text-secondary">Supporting text</p>
```

### Animations are stuttery
**Solution:** Use transform properties
```jsx
<div className="hover:scale-105 transition-transform">Content</div>
```

### Colors look wrong
**Solution:** Check light/dark mode and use correct classes
```jsx
<div className="text-primary">Primary text color</div>
```

## More Information

- 📚 **Complete Guide**: Read `DESIGN_SYSTEM.md`
- 🔄 **Migration**: Read `MIGRATION_GUIDE.md`
- 📊 **Summary**: Read `REDESIGN_SUMMARY.md`
- 💻 **Components**: Check `src/components/ui/PremiumComponents.jsx`
- 🎨 **Tokens**: Check `src/lib/design-system.js`
- 🔧 **Utils**: Check `src/lib/component-utils.js`

## Examples

Check the Premium Component file for live examples:
```jsx
import { ComponentShowcase } from '@/components/ui/PremiumComponents';

<ComponentShowcase />
```

---

**You're all set!** Start building premium UIs now. 🚀
