# Requirements Document

# Production Optimization - Performance, Accessibility, Responsiveness

## Introduction

This specification comprehensively optimizes the React + Vite portfolio to achieve production-grade quality matching Apple, Linear, Vercel, Stripe, and Framer standards.

## Executive Summary

This specification comprehensively optimizes the React + Vite portfolio to achieve production-grade quality matching Apple, Linear, Vercel, Stripe, and Framer. The portfolio currently has 0 build errors but exhibits performance degradation, accessibility gaps, and responsive design issues across devices. This optimization ensures 60 FPS animations, instant load times, perfect responsiveness (320px-4K displays), WCAG AA accessibility compliance, and premium smooth interactions on all devices.

**Audit Results:** 8 critical issues, 12 high-priority issues, 15 medium-priority issues
**Bundle Size:** 506KB total (245KB vendor + 41KB main + 66KB CSS)
**Current Performance Score:** 6/10
**Target Performance Score:** 9/10+

---

## Glossary

- **GPU Acceleration**: Hardware-based rendering using `transform`, `will-change`, and avoiding layout thrashing
- **60 FPS Target**: 16.67ms per frame; maintain smooth animations at 60 frames per second
- **Jank**: Visible frame drops, stuttering, or lag during animations or interactions
- **CLS (Cumulative Layout Shift)**: Unintended movement of page elements during load
- **Reflow/Repaint**: Browser recalculations (reflow) and redrawing (repaint) operations
- **useCallback**: React hook preventing function recreation on every render
- **Framer Motion**: Animation library currently consuming 87KB of bundle
- **Throttle**: Limiting function execution frequency (e.g., mousemove to 60fps max)
- **Lazy Loading**: Deferred loading of components/images until needed
- **Tree Shaking**: Removing unused code during build process
- **WCAG**: Web Content Accessibility Guidelines compliance level
- **Focus Visible**: Keyboard navigation indicator styling

---

## Requirements

### Phase 1: Critical Bugs (P0)

#### Requirement 1.1: Fix Missing React Import

**User Story:** As a developer maintaining the codebase, I need all JavaScript to execute without runtime errors so that the portfolio doesn't crash in production.

**Acceptance Criteria:**
1. WHEN `useScrollAnimation.js` is loaded, THE hook SHALL not throw "React is not defined" error
2. WHEN the hook is imported in components, THE `useHoverAnimation` function SHALL properly access React state
3. THE build process SHALL detect and warn about missing imports (requires ESLint setup)

**Implementation Details:**
- File: `src/hooks/useScrollAnimation.js` line 53
- Issue: `React.useState` called without `import React from 'react'`
- Solution: Add `import { useState } from 'react'` or `import React from 'react'`

---

#### Requirement 1.2: Remove Unused showAvailability Prop

**User Story:** As a code maintainer, I need to remove dead code to keep the codebase clean and reduce cognitive load for future developers.

**Acceptance Criteria:**
1. WHEN `ContactCard.jsx` is reviewed, THE `showAvailability` prop SHALL not appear in the component signature
2. WHEN `Contact.jsx` renders cards, THE `showAvailability` prop SHALL not be passed to ContactCard
3. THE component API SHALL remain unchanged (no breaking changes for callers not using this prop)
4. THE build SHALL complete with 0 warnings about unused props

**Implementation Details:**
- File: `src/components/ui/ContactCard.jsx` line 8
- Issue: `showAvailability = false` declared but never used in component
- Impact: Documentation debt, confusion for future developers
- Solution: Remove from destructuring and all call sites in `src/pages/Contact.jsx`

---

#### Requirement 1.3: Fix ShiftingRoles Memory Leak

**User Story:** As a user interacting with the portfolio, I want smooth performance without memory leaks so that the site remains responsive during long browsing sessions.

**Acceptance Criteria:**
1. WHEN `ShiftingRoles` component mounts/unmounts frequently, THE `setInterval` SHALL be properly cleaned up
2. WHEN the component re-renders, THE previous interval SHALL be cleared before starting a new one
3. THE browser DevTools memory profiler SHALL show no growing heap after multiple mount/unmount cycles
4. THE dependency array for `useEffect` SHALL include `roles` to prevent stale closures

**Implementation Details:**
- File: `src/pages/Home.jsx` (ShiftingRoles component)
- Issue: `setInterval` lacks proper cleanup; missing dependency in useEffect
- Current: `useEffect(() => { setInterval(...) }, [])`
- Expected: `useEffect(() => { const interval = setInterval(...); return () => clearInterval(interval); }, [roles])`

---

### Phase 2: Performance Optimization (P1)

#### Requirement 2.1: Eliminate useMousePosition Hook Performance Issues

**User Story:** As a user interacting with cards and components, I want the portfolio to remain smooth at 60 FPS without jank during mouse movement.

**Acceptance Criteria:**
1. WHEN user moves mouse over portfolio, THE frame rate SHALL maintain 60 FPS minimum (measured via DevTools)
2. WHEN `mousemove` events fire at 100+fps, THE component re-renders SHALL be throttled to max 60fps
3. THE `useMousePosition` hook SHALL use `requestAnimationFrame` throttling, NOT state updates on every event
4. WHEN components using this hook unmount, THE mouse listener SHALL be properly removed
5. THE performance profiler SHALL show <1% time spent in mouse event handlers

**Implementation Details:**
- File: `src/hooks/useMousePosition.js`
- Issue: Every `mousemove` fires re-render (60+ per second across multiple components)
- Used In: `ContactCard.jsx`, `InteractiveProfileCard` (Home.jsx), `OceanBackground.jsx`
- Solution: 
  - Use `useRef` for position instead of state
  - Implement RAF throttling: `let ticking = false; requestAnimationFrame(...)`
  - Only trigger re-render when actually needed (e.g., hover state change, not position)
  - Add `{ passive: true }` to event listener

---

#### Requirement 2.2: Optimize OceanBackground Animation Performance

**User Story:** As a user scrolling through the portfolio, I want the background animations to remain smooth without causing frame drops or stuttering.

**Acceptance Criteria:**
1. WHEN user scrolls page, THE background animations SHALL maintain 60 FPS without visible stuttering
2. WHEN 30 particles animate simultaneously, THE frame rate SHALL not drop below 55 FPS
3. THE component re-renders on scroll/mouse movement SHALL use `useRef` for continuous tracking
4. WHEN animation state updates, THEY SHALL be batched using React 18's automatic batching
5. THE DevTools Performance tab SHALL show <100ms total animation frame time

**Implementation Details:**
- File: `src/components/backgrounds/OceanBackground.jsx`
- Issue: Multiple state updates (`scrollY`, `mousePos`) cause excessive re-renders
- Current: Framer Motion animates using state values
- Solution:
  - Store scroll/mouse position in refs, not state
  - Update CSS variables instead of re-rendering component
  - Use `useCallback` for handlers
  - Keep particle animations in Framer Motion (isolated component)

---

#### Requirement 2.3: Reduce Framer Motion Bundle Size

**User Story:** As a user on slower networks, I want the portfolio to load quickly without unnecessarily large JavaScript bundles.

**Acceptance Criteria:**
1. THE JavaScript bundle size SHALL not exceed 300KB (gzipped)
2. WHEN simple scroll-reveal animations can be replaced with CSS, THEY SHALL be migrated
3. WHEN complex 3D transforms are unnecessary, Framer Motion usage SHALL be eliminated for that component
4. THE build output SHALL explicitly show bundle breakdown (Framer Motion should be <20KB not 87KB)
5. THE page interactivity time (TTI) SHALL improve by minimum 15% after optimization

**Implementation Details:**
- File: `src/components/backgrounds/OceanBackground.jsx` and page components
- Issue: Framer Motion 87KB (17% of bundle) for basic fade/scale animations
- Solution:
  - Replace simple scroll reveals with CSS `@keyframes` + Intersection Observer
  - Keep Framer Motion only for interactive 3D transforms
  - Consider `react-spring` or native CSS as lighter alternative
  - Lazy load Framer Motion only for pages that need it

---

#### Requirement 2.4: GPU Accelerate All Animations

**User Story:** As a user on mobile or older devices, I want animations to be smooth and not drain battery unnecessarily.

**Acceptance Criteria:**
1. ALL animations SHALL use only GPU-accelerated properties: `transform`, `opacity`, `scale`, `rotate`, `translate`
2. ANIMATIONS SHALL NOT use CPU-intensive properties: `width`, `height`, `top`, `left`, `margin`, `padding`, `filter`, `box-shadow`
3. ALL frequently animated elements SHALL have `will-change: transform` (used sparingly, not on every element)
4. WHEN animations use `filter: blur()`, THEY SHALL be replaced with alternative approaches
5. THE DevTools rendering timeline SHALL show 0 reflows/repaints during animation playback

**Implementation Details:**
- Review all animation files for non-GPU properties
- Examples to fix:
  - BentoCard hover: Uses `boxShadow` (CPU) → Use accent overlay instead
  - Gradient text: Uses `background-position` animation (CPU) → Use opacity change instead
  - Scroll reveals: Use `scale` + `opacity` instead of `filter: blur()`

---

#### Requirement 2.5: Optimize React Component Re-renders

**User Story:** As a developer and user, I want to eliminate unnecessary component re-renders to improve performance and responsiveness.

**Acceptance Criteria:**
1. WHEN parent component re-renders, CHILD components wrapped in `React.memo` SHALL not re-render unless props change
2. EVENT handlers passed to animated components SHALL be wrapped in `useCallback` to maintain referential equality
3. THE AccessibilityContext value object SHALL be memoized with `useMemo` to prevent provider re-renders
4. THE DevTools Profiler SHALL show <5 render cycles during a 5-second interaction
5. THE "why did you render" detection SHALL show 0 unnecessary re-renders (with debugging setup)

**Implementation Details:**
- Add `useCallback` to:
  - `Navbar.jsx`: `handleScroll`, `handleMouseMove` handlers
  - `ContactCard.jsx`: `handleMouseMove`, `handleCopy` handlers
  - `BentoCard` in Home.jsx: Mouse interaction handlers
- Add `useMemo` to:
  - `AccessibilityContext.jsx`: Context value object
  - Navbar.jsx: `activeIndex` calculation (already done, verify)
- Review and enhance existing `React.memo` usage

---

### Phase 3: Accessibility Improvements (P1)

#### Requirement 3.1: Add Complete Keyboard Navigation

**User Story:** As a keyboard user or screen reader user, I want to navigate and interact with the entire portfolio using only keyboard controls.

**Acceptance Criteria:**
1. WHEN user presses Tab key, FOCUS SHALL move through all interactive elements in logical order
2. WHEN user presses Shift+Tab, FOCUS SHALL move backward through elements
3. WHEN focus reaches an element, A visible focus indicator SHALL appear (minimum 2px outline)
4. WHEN user presses Enter/Space on a button, IT SHALL activate (not just on click)
5. WHEN interactive components (cards, 3D transforms) have mouse interactions, THEY SHALL also respond to keyboard (e.g., Enter key)
6. THE tabindex hierarchy SHALL be logical (no tabindex > 0 except in rare cases)

**Implementation Details:**
- Add `:focus-visible` styles to all buttons and interactive elements
- InteractiveProfileCard: Add keyboard support for 3D tilt (not just mouse)
- BentoCard: Ensure keyboard can trigger interactions
- Navigation menu: Verify logical tab order
- Forms: Ensure proper label associations

---

#### Requirement 3.2: Implement WCAG AA Color Contrast

**User Story:** As a user with low vision or color blindness, I want sufficient color contrast so that text and UI elements are readable.

**Acceptance Criteria:**
1. ALL body text SHALL have minimum 4.5:1 contrast ratio (WCAG AA standard)
2. LARGE text (18pt+) SHALL have minimum 3:1 contrast ratio
3. UI components (buttons, icons) SHALL have minimum 3:1 contrast ratio
4. THE color palette variables SHALL all pass WebAIM Contrast Checker against backgrounds
5. WHEN high-contrast mode is enabled, ALL colors SHALL achieve 7:1 ratio (WCAG AAA)
6. THE orange accent (#FF4500) SHALL be verified against all backgrounds where used

**Implementation Details:**
- Test current colors:
  - `--text-primary` (#f4f4ff) on `--bg-primary` (#0A0A0A) = ~23:1 ✓
  - `--text-secondary` (#b8b8cc) on background = ~13:1 ✓
  - `--text-muted` (#707070) on background = ~6:1 (borderline)
  - Orange accent #FF4500 on dark = ~5.2:1 ✓
- Fix if needed and document in CSS variables

---

#### Requirement 3.3: Add ARIA Labels and Semantic HTML

**User Story:** As a screen reader user, I want proper semantic HTML and ARIA labels so that page structure and purpose is clear.

**Acceptance Criteria:**
1. MAJOR page sections SHALL use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
2. INTERACTIVE regions SHALL have `role` attribute or semantic equivalent
3. DECORATIVE elements SHALL have `role="presentation"` or `aria-hidden="true"`
4. ALL icon-only buttons SHALL have `aria-label` describing their purpose
5. DYNAMIC content updates SHALL use `aria-live="polite"` region
6. FORM labels SHALL be associated with inputs via `<label for="">` or `aria-labelledby`
7. WHEN reduced motion is enabled, animations SHALL be fully disabled (not just compressed)

**Implementation Details:**
- Profile card: Add `role="img"` or `role="region"`
- Decorative backgrounds: Add `aria-hidden="true"`
- Icon buttons: Add descriptive `aria-label` (e.g., "Toggle theme")
- Animated text: Add `aria-live="polite"` if content changes matter

---

### Phase 4: Responsive Design (P1)

#### Requirement 4.1: Consistent Breakpoint Strategy

**User Story:** As a developer maintaining the codebase, I want consistent breakpoints across all components so that responsive behavior is predictable.

**Acceptance Criteria:**
1. ALL breakpoints SHALL be defined in a single location (config file or CSS variable)
2. BREAKPOINT values SHALL be: `320px, 480px, 640px, 768px, 1024px, 1280px, 1920px` (standard)
3. WHEN components need mobile layout, THEY SHALL use consistent breakpoint values
4. THE media query syntax SHALL be consistent across all CSS files
5. WHEN developing new components, breakpoints SHALL match existing system (no ad-hoc additions)

**Current Issues:**
- Navbar: `@media (max-width: 900px)` - should be 768px
- Home: `@media (max-width: 1024px)` - correct
- Mobile: `@media (max-width: 640px)` - correct

**Implementation Details:**
- Create `/src/constants/breakpoints.js`:
  ```javascript
  export const breakpoints = {
    xs: '320px',
    sm: '480px',
    md: '640px',
    lg: '768px',
    xl: '1024px',
    '2xl': '1280px',
    '3xl': '1920px',
  };
  ```
- Update all media queries to use centralized values

---

#### Requirement 4.2: Responsive Typography with clamp()

**User Story:** As a user on any device (mobile to 4K), I want readable text that scales naturally without hard breakpoints.

**Acceptance Criteria:**
1. ALL font sizes SHALL use CSS `clamp()` function to scale fluidly between min and max
2. HEADINGS SHALL scale from mobile to desktop smoothly
3. BODY text SHALL maintain readable line-height (1.5-1.8) at all sizes
4. WHEN viewport is 320px, text SHALL be readable without zooming
5. WHEN viewport is 4K (3440px+), text SHALL remain proportional without becoming huge
6. THE formula SHALL use minimum, preferred, and maximum values

**Implementation Details:**
- Current: `.text { font-size: 0.95rem }` - FIXED
- Should be: `.text { font-size: clamp(0.85rem, 1.5vw, 1.05rem) }`
- Heading examples:
  - H1: `clamp(2rem, 5vw, 4rem)`
  - H2: `clamp(1.5rem, 4vw, 3rem)`
  - H3: `clamp(1.2rem, 3vw, 2rem)`
  - Body: `clamp(0.85rem, 1.5vw, 1.05rem)`

---

#### Requirement 4.3: Responsive Spacing System

**User Story:** As a user on different devices, I want consistent spacing that scales appropriately without requiring manual breakpoint adjustments.

**Acceptance Criteria:**
1. ALL padding/margin values SHALL use CSS custom properties linked to viewport size
2. CONTAINER max-width SHALL respect max 1280px for content readability on desktop
3. GRID gaps SHALL scale based on screen size using `clamp()`
4. WHEN layout stacks on mobile, spacing SHALL remain proportional
5. GUTTER spacing SHALL be: mobile 16px, tablet 24px, desktop 32px (via clamp)

**Implementation Details:**
- Define spacing variables:
  ```css
  :root {
    --spacing-xs: clamp(0.5rem, 1vw, 1rem);
    --spacing-sm: clamp(0.75rem, 1.5vw, 1.5rem);
    --spacing-md: clamp(1rem, 2vw, 2rem);
    --spacing-lg: clamp(1.5rem, 3vw, 3rem);
    --spacing-xl: clamp(2rem, 4vw, 4rem);
    --gutter: clamp(1rem, 2vw, 2rem);
  }
  ```
- Apply: `padding: var(--spacing-lg); margin: var(--spacing-md)`

---

#### Requirement 4.4: Responsive Grid System

**User Story:** As a designer and developer, I want grids that automatically adapt to different screen sizes without manual tweaking at every breakpoint.

**Acceptance Criteria:**
1. GRID layouts SHALL use CSS Grid `auto-fit` or `auto-fill` with `minmax()`
2. WHEN viewport narrows, grid columns SHALL automatically reduce without media queries
3. WHEN viewport is mobile, items SHALL stack to single column
4. WHEN viewport is tablet, items SHALL show 2-3 columns
5. WHEN viewport is desktop, items SHALL show 3-4 columns
6. GRID gaps SHALL scale using `clamp()`

**Implementation Details:**
- Instead of: `grid-template-columns: repeat(3, 1fr)`
- Use: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
- Gap: `grid-gap: clamp(1rem, 2vw, 2rem)`

---

### Phase 5: Code Quality & Cleanup (P2)

#### Requirement 5.1: Remove CSS Duplication and Unused Styles

**User Story:** As a developer maintaining CSS, I want clean, maintainable stylesheets without duplication or unused rules.

**Acceptance Criteria:**
1. CSS bundle size SHALL be reduced to <50KB by removing duplication
2. UNUSED utility classes and component styles SHALL be identified and removed
3. DUPLICATE gradient definitions SHALL be consolidated into variables
4. GLASS effect styles SHALL use single class with variations
5. THE final CSS SHALL pass automated unused-CSS detection tools

**Implementation Details:**
- Audit `index.css` for:
  - Duplicate gradients (consolidate to CSS variables)
  - Unused component classes (`.bg-grid`, `.glass-strong`, etc.)
  - Redundant vendor prefixes (let Vite handle via Autoprefixer)
- Split into modules if >50KB

---

#### Requirement 5.2: Establish ESLint and Code Quality Standards

**User Story:** As a development team, I want automated code quality checks to prevent performance/accessibility regressions.

**Acceptance Criteria:**
1. ESLint configuration SHALL catch unused variables and imports
2. REACT plugin SHALL enforce hooks rules (exhaustive-deps)
3. A11Y plugin SHALL warn about accessibility issues
4. CI/CD pipeline SHALL run linter before build
5. NO build shall proceed with ESLint warnings in critical rules

**Implementation Details:**
- Create `.eslintrc.json` with rules for:
  - `react/react-in-jsx-scope` (already not needed in React 17+)
  - `react-hooks/exhaustive-deps`
  - `jsx-a11y/` rules
  - `no-unused-vars`

---

#### Requirement 5.3: Implement Performance Monitoring

**User Story:** As a developer and site owner, I want automated performance monitoring to catch regressions early.

**Acceptance Criteria:**
1. LIGHTHOUSE CI SHALL run on every build with score thresholds
2. PERFORMANCE score SHALL remain ≥95 (from current ~60)
3. ACCESSIBILITY score SHALL be 100
4. BEST PRACTICES score SHALL be 100
5. SEO score SHALL be 100
6. Core Web Vitals SHALL be tracked:
   - LCP (Largest Contentful Paint) ≤2.5s
   - FID (First Input Delay) ≤100ms
   - CLS (Cumulative Layout Shift) ≤0.1

**Implementation Details:**
- Add GitHub Actions workflow with Lighthouse CI
- Define performance budget in `budget.json`
- Monitor with web-vitals library

---

## Non-Functional Requirements

### Performance
- **Target FPS**: 60 FPS minimum on all interactions
- **Load Time**: <2 second initial load time on 4G
- **Bundle Size**: <300KB gzipped (down from 506KB)
- **Time to Interactive**: <3 seconds
- **Paint Timing**: First Paint <1.5s, First Contentful Paint <2s

### Accessibility
- **WCAG Compliance**: Level AA minimum across all pages
- **Keyboard Support**: 100% keyboard navigable
- **Screen Readers**: Compatible with NVDA, JAWS, VoiceOver
- **Color Contrast**: 4.5:1 minimum for body text (WCAG AA)

### Responsiveness
- **Device Support**: 320px (iPhone SE) to 3440px (ultrawide)
- **Breakpoints**: Consistent across all components
- **Touch Targets**: 44px minimum for mobile
- **No Overflow**: Zero horizontal scroll on any device
- **No CLS**: Cumulative Layout Shift <0.1

### Browser Compatibility
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

### Code Quality
- **Build Warnings**: 0 (all TypeScript/ESLint warnings resolved)
- **Dead Code**: None (all unused code removed)
- **Bundle Analysis**: All dependencies justified and minimal
- **Documentation**: Clear comments for complex logic
- **Testability**: Components easily testable via Vitest/React Testing Library

---

## Out of Scope

- Complete redesign or visual overhaul
- Removal of existing features or functionality
- Migration to different framework (React stays)
- Addition of new pages or sections
- API changes or backend modifications
- CMS or content management system additions

---

## Success Criteria

✅ All 8 critical bugs fixed  
✅ All 12 high-priority issues addressed  
✅ Performance score 95+ (Lighthouse)  
✅ Accessibility score 100 (Lighthouse)  
✅ 60 FPS animations on all devices  
✅ <2s load time on 4G  
✅ Zero horizontal scroll on any viewport  
✅ Keyboard navigable 100%  
✅ <300KB bundle size (gzipped)  
✅ Zero layout shifts (CLS < 0.1)  

---

