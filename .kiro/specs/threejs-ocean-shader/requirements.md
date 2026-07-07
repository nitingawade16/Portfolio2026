# Requirements Document

# Three.js Ocean Shader Background - Realistic Water Ripples

## Introduction

This specification defines a premium Three.js + GLSL Fragment Shader implementation for the portfolio background, replacing the CSS-based ocean animations with a high-performance, realistic water ripple effect. The shader will respond dynamically to scroll position, create cinematic caustic lighting patterns, and maintain 60 FPS performance across all devices while seamlessly integrating with the existing Cyber-Minimalist Dark theme.

---

## Executive Summary

The current CSS-based ocean background uses 10 animated layers with pure CSS, achieving acceptable performance but lacking the visual premium quality of shaders. This enhancement replaces it with a Three.js WebGL shader that renders:

- **Realistic water ripples** with organic, non-repetitive waving motion
- **Animated caustic light rays** (underwater light refraction patterns)
- **Scroll-reactive wave intensity** that increases as user scrolls
- **Depth of field effects** (Gaussian blur separation of foreground)
- **Brand-aware reactive glow** (orange highlights on wave crests)
- **60 FPS performance** on desktop, tablet, and mobile
- **Dark theme integration** (#0A0A0A, #111111 with #FF4500 accents)

**Key Difference from Current:**
- Current: 10 CSS layers, ~65KB CSS, acceptable performance
- New: Single Three.js shader, ~250KB bundle addition (Three.js), **superior visual fidelity**, professional polish

---

## Glossary

- **Fragment Shader**: GLSL code that determines pixel color; executes for every pixel on screen
- **Vertex Shader**: GLSL code that transforms vertex positions (used for plane geometry)
- **WebGL**: Browser graphics API enabling GPU rendering
- **Caustics**: Underwater light refraction patterns; realistic wavy light effects on surfaces
- **Scroll Uniforms**: Shader inputs tied to scroll position for reactive effects
- **Time Uniforms**: Shader inputs tied to elapsed time for continuous animation
- **Normals**: Surface direction vectors used for lighting calculations
- **Perlin Noise**: Procedural noise function generating organic patterns
- **GPU-Accelerated**: Rendering performed by graphics card, not CPU
- **Depth of Field**: Selective blur based on distance/depth
- **z-index**: CSS layering order (-1 = behind content)

---

## Requirements

### Requirement 1: Three.js Scene Setup

**User Story:** As a developer, I need a properly configured Three.js scene so that shaders render correctly at full screen without affecting page layout or interactions.

#### Acceptance Criteria

1. WHEN the component mounts, A Three.js scene SHALL be created with a camera, renderer, and full-screen canvas
2. THE canvas SHALL be positioned `fixed` with `z-index: -1` to sit behind all content
3. WHEN window is resized, THE renderer SHALL update to maintain full-screen coverage at all times
4. THE renderer output SHALL match the viewport dimensions exactly (no letterboxing or overflow)
5. WHEN the component unmounts, ALL Three.js resources (scene, renderer, materials) SHALL be properly disposed
6. THE canvas SHALL have `pointer-events: none` to prevent interaction interference
7. WHEN DOM loads, renderer initialization SHALL not block page content rendering

#### Implementation Details

- Canvas element: `<canvas>` positioned `fixed`, `inset: 0`, `z-index: -1`
- Camera: Orthographic camera (`THREE.OrthographicCamera`) for 2D shader visualization
- Renderer: `THREE.WebGLRenderer` with antialiasing enabled, transparent background
- Geometry: Simple plane geometry (`THREE.PlaneGeometry`) filling viewport
- Viewport handling: Listen to `window.resize`, update renderer and camera on change
- Resource cleanup: `dispose()` on geometry, material, renderer in cleanup function

---

### Requirement 2: Water Ripple Fragment Shader

**User Story:** As a user viewing the portfolio, I want to see realistic, organic water ripples that create a premium, cinematic ocean atmosphere.

#### Acceptance Criteria

1. WHEN the page renders, THE shader SHALL display animated water ripples with wave motion
2. THE wave pattern SHALL use Perlin noise or similar algorithm to create organic, non-repetitive motion
3. THE ripple animation SHALL have a 20-40 second cycle to avoid obvious repetition
4. WHEN multiple ripple frequencies overlay, THEY SHALL create complex interference patterns (realistic water surface)
5. THE wave height (amplitude) SHALL be subtle but visible (not jarring)
6. THE wave color SHALL use deep oceanic blues: #001F3F to #003D7A range
7. WHEN time progresses, THE ripples SHALL move smoothly without sudden jumps or resets
8. THE shader SHALL maintain 60 FPS on desktop, 50+ FPS on tablet, 40+ FPS on mobile

#### Implementation Details

**Shader Strategy:**
- Use multiple sine/cosine waves at different frequencies to create Gerstner waves (realistic ocean physics)
- Combine 3-5 wave layers with different speeds and scales
- Apply Perlin noise distortion to break up repetitive patterns
- Normal calculation: Use height derivatives to compute surface normals for lighting

**Color Gradient:**
- Base water: `vec3(0.0, 0.15, 0.3)` (deep blue)
- Shallow areas: `vec3(0.0, 0.25, 0.5)` (lighter blue)
- Transition: Smooth gradient based on height

**Performance Optimization:**
- Use efficient trigonometric functions (not expensive noise)
- Limit shader calculations to essential operations
- Precalculate constants in JavaScript, pass as uniforms

---

### Requirement 3: Caustic Lighting Patterns

**User Story:** As a user experiencing the background, I want subtle animated caustic light patterns that add premium visual depth and realism without overwhelming the interface.

#### Acceptance Criteria

1. WHEN scrolling through the portfolio, THE caustic patterns SHALL appear as moving light refraction (underwater light dancing)
2. THE caustic animation SHALL overlay on water ripples without replacing them
3. CAUSTIC intensity SHALL never exceed 20% opacity to maintain readability of content
4. THE caustic colors SHALL use blues and cyans: #00B6D4 to #64B4DC range
5. THE caustic pattern SHALL move independently from water ripples (different animation speed)
6. WHEN caustic patterns move, THEY SHALL create smooth transitions without flickering
7. THE caustic effect SHALL be subtle enough to not distract but obvious enough to enhance atmosphere

#### Implementation Details

- **Caustic Generation**: Use Perlin noise texture or shader calculation for caustic patterns
- **Overlay Blending**: Multiply blend mode for caustics over ripples (`mix(ripple, caustic, 0.2)`)
- **Animation Speed**: 1.5-2x slower than ripple waves (different uniform for time scaling)
- **Pattern Distortion**: Apply ripple displacement to caustic pattern for organic movement

---

### Requirement 4: Scroll-Reactive Wave Intensity

**User Story:** As a user scrolling through the portfolio, I want the background to react to my engagement with increasing wave intensity, creating a sense of the page coming alive as I explore.

#### Acceptance Criteria

1. WHEN user is at top of page (scrollY = 0), THE wave amplitude SHALL be at baseline (e.g., 1.0 scale)
2. WHEN user scrolls down, THE wave height and ripple intensity SHALL increase proportionally to scroll position
3. WHEN user reaches bottom of page, THE wave amplitude SHALL reach maximum (e.g., 1.5-2.0 scale)
4. WHEN user scrolls back up, THE amplitude SHALL smoothly decrease back to baseline
5. THE amplitude change SHALL be smooth without sudden jumps (use easing/smoothing)
6. WHEN scrolling speed increases, THE wave intensity response SHALL feel natural (not exaggerated)
7. THE formula: `amplitude = mix(1.0, 2.0, clamp(scrollY / docHeight, 0, 1))`

#### Implementation Details

- Pass `scrollY` as uniform to shader: `uniform float uScroll`
- Calculate scroll ratio: `float scrollRatio = clamp(scrollY / maxScroll, 0.0, 1.0)`
- Apply to wave amplitude: `float amplitude = mix(1.0, 2.0, scrollRatio)`
- Use in wave calculation: `float wave = sin(pos.x * freq + time) * amplitude`
- Smooth transitions: Use `smoothstep()` for easing if needed

---

### Requirement 5: Orange Reactive Glow

**User Story:** As a user scrolling through interactive elements, I want the background to subtly catch orange highlights on wave crests, tying the ocean theme to the brand identity.

#### Acceptance Criteria

1. WHEN scrolling, THE wave crests SHALL occasionally catch a faint orange glow (#FF4500)
2. THE glow intensity SHALL be tied to scroll position (increases as user scrolls more)
3. THE orange highlight SHALL never exceed 15% opacity to prevent distraction
4. WHEN user is at top of page, THE orange glow SHALL be barely visible (near 0%)
5. WHEN user scrolls to mid-page, THE orange glow SHALL be subtle but noticeable
6. WHEN user scrolls to bottom, THE orange glow SHALL reach maximum subtle intensity
7. THE glow SHALL fade smoothly when scrolling back to top

#### Implementation Details

- Define orange color: `vec3(1.0, 0.27, 0.0)` (normalized #FF4500)
- Glow amount: `float glowIntensity = mix(0.0, 0.15, scrollRatio)`
- Apply to highlights: `vec3 highlight = mix(waterColor, orangeColor, glowIntensity * waveHeight)`
- Only apply to wave crests: `if (height > threshold) { applyGlow; }`

---

### Requirement 6: Depth of Field Blur Separation

**User Story:** As a user viewing content, I want the background to have selective blur that separates it from sharp foreground content, creating visual depth and focus.

#### Acceptance Criteria

1. WHEN content (text, cards, buttons) overlays the background, THE background layers SHALL be slightly blurred
2. THE blur intensity SHALL be subtle (2-5px blur radius) to maintain background visibility
3. WHEN foreground content has important information, CONTRAST shall remain sufficient (WCAG AA)
4. THE blur effect SHALL be achieved via CSS `filter: blur()` on background container (not in shader)
5. WHEN user scrolls, THE blur SHALL remain consistent (not animate or flicker)
6. WHEN user zooms page (mobile pinch), THE blur scaling SHALL remain proportional

#### Implementation Details

- Add to background container: `filter: blur(4px)`
- Apply conditionally: Only blur specific layers if shader output needs separation
- Alternative: Render shader with reduced blur, add content overlay with slight blur
- Performance: Use `will-change: filter` with caution (only when scrolling)

---

### Requirement 7: Performance & 60 FPS Target

**User Story:** As a user on any device, I want the background animations to maintain smooth 60 FPS performance without causing jank or battery drain.

#### Acceptance Criteria

1. THE shader rendering SHALL maintain 60 FPS on desktop (Chrome, Firefox, Safari, Edge)
2. THE shader rendering SHALL maintain 50+ FPS on tablet devices
3. THE shader rendering SHALL maintain 40+ FPS on mobile devices (iPhone, Android)
4. WHEN scrolling, THE scroll event handler SHALL NOT cause frame drops
5. WHEN user interacts with page, THE background animation SHALL NOT lag behind interactions
6. THE GPU memory usage SHALL not exceed 50MB for shader resources
7. THE JavaScript event handling overhead SHALL be <5ms per frame
8. WHEN page has heavy content (many cards), THE background performance SHALL not degrade

#### Implementation Details

- **Shader Optimization**:
  - Use efficient math (avoid expensive functions like `sin()` in inner loop)
  - Precalculate what's possible in JavaScript
  - Use lower resolution renders if needed on mobile (half-size buffer)
  - Clamp computation-heavy operations

- **Event Handling**:
  - Throttle scroll listener to RAF (already done in current code)
  - Update uniforms without triggering re-renders
  - Use `requestAnimationFrame` for animation loop

- **Rendering**:
  - Use renderer pixel ratio detection for high-DPI displays
  - Implement LOD (level of detail) for mobile
  - Consider render scaling on low-end devices

---

### Requirement 8: React Component Integration

**User Story:** As a developer, I need a drop-in React component that integrates seamlessly with existing portfolio structure without breaking layout or requiring API changes.

#### Acceptance Criteria

1. WHEN `OceanShaderBackground.jsx` component is added to `App.jsx`, IT SHALL render behind all content
2. THE component props SHALL be optional (no required props) or minimal
3. WHEN component mounts, IT SHALL not block or delay content rendering
4. WHEN page navigates between routes, THE background animation SHALL continue smoothly (no reset)
5. WHEN component unmounts, IT SHALL clean up all resources properly
6. THE component API SHALL remain stable (no breaking changes in future)
7. WHEN `reducedMotion` preference is enabled, THE shader animation SHALL be significantly reduced or disabled

#### Implementation Details

**Component Structure:**
```jsx
export function OceanShaderBackground({ scrollY = 0, colorScheme = 'dark' }) {
  // Setup Three.js scene
  // Create shader material
  // Render loop
  // Cleanup
}
```

**Props (minimal):**
- `scrollY`: Current scroll position (passed from App)
- `colorScheme`: Theme ('dark' or 'light') for color palette
- `intensity`: Optional amplitude multiplier

**Exports:**
- Default export: `OceanShaderBackground` component
- Utility exports: Shader code, constants for customization

---

### Requirement 9: Responsive & Device Compatibility

**User Story:** As a user on any device from mobile to ultra-wide desktop, I want the background to scale appropriately and maintain visual quality.

#### Acceptance Criteria

1. WHEN viewport is 320px (mobile), THE shader rendering SHALL work correctly
2. WHEN viewport is 2560px+ (ultra-wide), THE shader rendering SHALL maintain quality
3. WHEN device pixel ratio is 2.0+ (Retina), THE shader output SHALL render crisply
4. WHEN device pixel ratio is 1.0 (standard), THE shader output SHALL render normally
5. WHEN orientation changes (portrait ↔ landscape), THE canvas SHALL update immediately
6. WHEN window resizes, THE background SHALL scale without gaps or stretching
7. WHEN rendering on low-end mobile GPUs, THE shader performance SHALL degrade gracefully (not crash)

#### Implementation Details

- Use `window.devicePixelRatio` for high-DPI scaling
- Listen to `window.resize` for responsive updates
- Implement mobile detection: Reduce shader complexity on mobile
- Fallback: If WebGL unavailable, display solid gradient background
- Test on: iPhone, Android, iPad, MacBook, Windows laptop, 4K monitor

---

### Requirement 10: Shader Customization & Maintainability

**User Story:** As a developer, I need well-documented, customizable shader code so that future tweaks (colors, speeds, intensity) don't require deep shader knowledge.

#### Acceptance Criteria

1. THE shader code SHALL have clear comments explaining each section (vertex, fragment, uniforms)
2. MAGIC numbers SHALL be extracted to named constants at the top of shader
3. WHEN color scheme needs updating, IT SHALL be a simple config change (not shader rewrite)
4. WHEN animation speed needs adjustment, IT SHALL be a single uniform value change
5. THE shader implementation SHALL follow GLSL best practices and be readable
6. DOCUMENTATION SHALL include: what each uniform does, valid ranges, effects

#### Implementation Details

**Shader Constants** (at top, easy to tweak):
```glsl
#define WAVE_FREQ 0.5
#define WAVE_SPEED 1.0
#define WAVE_AMP 0.15
#define CAUSTIC_SCALE 2.0
#define BASE_BLUE vec3(0.0, 0.15, 0.3)
#define ACCENT_BLUE vec3(0.0, 0.4, 0.8)
#define ORANGE vec3(1.0, 0.27, 0.0)
```

**Uniforms** (updated from JS):
- `uTime`: Elapsed time in seconds
- `uScroll`: Current scroll Y position
- `uResolution`: Viewport resolution
- `uIntensity`: Wave intensity multiplier

---

### Requirement 11: Browser Compatibility

**User Story:** As a developer, I want the component to work across all major browsers without requiring extensive polyfills.

#### Acceptance Criteria

1. THE component SHALL work on Chrome 90+
2. THE component SHALL work on Firefox 88+
3. THE component SHALL work on Safari 14+
4. THE component SHALL work on Edge 90+
5. WHEN browser doesn't support WebGL, A fallback solid background SHALL display (not crash)
6. WHEN WebGL 2.0 unavailable, WebGL 1.0 SHALL be attempted as fallback
7. WHEN rendering fails, Console logging SHALL explain the issue

#### Implementation Details

- Use `THREE.WebGLRenderer` with `antialias: true`, `precision: 'highp'`
- Test WebGL support: `const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2')`
- Fallback: If WebGL fails, render solid background color or simple CSS gradient
- Error handling: Wrap Three.js initialization in try-catch

---

### Requirement 12: Accessibility

**User Story:** As a user with motion sensitivity or accessibility requirements, I want background animations to respect my preferences.

#### Acceptance Criteria

1. WHEN `prefers-reduced-motion: reduce` is set, THE shader animation SHALL be disabled or significantly reduced
2. WHEN reduced motion is active, A static background color or minimal animation SHALL display
3. WHEN animation is disabled, The portfolio functionality SHALL remain 100% intact
4. THE background SHALL not interfere with focus indicators or keyboard navigation
5. HIGH contrast mode support: Background colors SHALL adjust for better contrast if needed

#### Implementation Details

- Detect: `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
- If true: Set `uTime` to constant, set amplitude to 0, or render static gradient
- Test: Enable reduced motion in OS settings, verify no animations
- Fallback: Use CSS custom property for motion preference: `--reduce-motion: 1`

---

## Non-Functional Requirements

### Performance
- **Target FPS**: 60 FPS on desktop, 50+ tablet, 40+ mobile
- **GPU Memory**: <50MB for shader resources
- **JavaScript Overhead**: <5ms per frame for event handling
- **Bundle Addition**: Three.js ~250KB gzipped (acceptable tradeoff for visual quality)
- **Load Time Impact**: <200ms additional page load time

### Quality
- **Visual Fidelity**: Premium, cinematic, matching reference images
- **Consistency**: Matches theme colors (#0A0A0A base, #FF4500 accents)
- **Smoothness**: No flickering, stuttering, or sudden jumps
- **Responsiveness**: All devices from 320px to 4K displays

### Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Mobile 90+
- Fallback for unsupported browsers

### Accessibility
- Respects `prefers-reduced-motion`
- No interference with focus/keyboard navigation
- Maintains contrast for content readability

---

## Success Criteria

✅ Water ripples render with realistic Gerstner waves  
✅ Caustic lighting adds premium visual depth  
✅ Wave intensity increases with scroll position smoothly  
✅ Orange glow ties to brand identity without distraction  
✅ Depth of field separates foreground from background  
✅ 60 FPS maintained on desktop, 40+ FPS on mobile  
✅ Component integrates seamlessly with existing App.jsx  
✅ Respects reduced motion preferences  
✅ Works across all major browsers  
✅ Visual quality exceeds current CSS background  

---

## Implementation Notes

- **Start Point**: Examine current `OceanBackground.jsx` and `OceanBackground.css`
- **Reference**: Use provided image references for color grading and visual style
- **Shader Resources**: 
  - Gerstner waves tutorial: https://en.wikipedia.org/wiki/Gerstner_wave
  - Three.js docs: https://threejs.org/docs/
  - GLSL reference: https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language
- **Testing**: Verify on multiple devices before considering complete
- **Documentation**: Create `THREEJS_SHADER_GUIDE.md` after implementation

---

