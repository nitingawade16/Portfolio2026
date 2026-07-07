# Three.js Ocean Shader - Quick Reference Guide

## What You're Building

A **high-performance WebGL ocean shader background** that replaces the current CSS-based animations with realistic water ripples, caustic lighting, and scroll-reactive effects.

---

## Key Metrics

| Aspect | Target |
|--------|--------|
| **FPS** | 60 desktop, 50+ tablet, 40+ mobile |
| **GPU Memory** | <50MB |
| **Visual Quality** | Premium, cinematic |
| **Bundle Impact** | +250KB (Three.js) |
| **Colors** | #0A0A0A base, #001F3F-#003D7A blues, #FF4500 accents |

---

## Architecture Overview

```
OceanShaderBackground.jsx (React Component)
├── Three.js Scene Setup
│   ├── Camera (Orthographic)
│   ├── Renderer (WebGL)
│   └── Geometry (Plane)
├── Shader Material
│   ├── Vertex Shader (transform vertices)
│   └── Fragment Shader (calculate pixel colors)
├── Uniforms (JS → Shader)
│   ├── uTime (animation)
│   ├── uScroll (scroll position)
│   ├── uResolution (viewport size)
│   └── uIntensity (wave amplitude)
└── Animation Loop
    ├── Update uniforms
    ├── Render to canvas
    └── Cleanup on unmount
```

---

## Shader Uniforms (JavaScript passes these to GPU)

```glsl
uniform float uTime;           // Elapsed time in seconds
uniform float uScroll;         // Current scroll Y position
uniform vec2 uResolution;      // Viewport width/height
uniform float uIntensity;      // Wave amplitude multiplier
uniform bool uReducedMotion;   // Respects prefers-reduced-motion
```

---

## Fragment Shader Main Sections

### 1. **Gerstner Waves** (Water Surface)
```glsl
// Combine multiple wave frequencies for realistic ocean
float wave = sin(uv.x * freq1 + uTime) * amp1
           + sin(uv.x * freq2 + uTime * 0.7) * amp2
           + sin(uv.x * freq3 + uTime * 0.5) * amp3;
```

### 2. **Perlin Noise Distortion** (Organic Movement)
```glsl
// Break up repetitive patterns
float noise = perlinNoise(uv + uTime * 0.1);
wave += noise * 0.1;
```

### 3. **Normal Calculation** (Lighting)
```glsl
// Calculate surface direction for lighting effects
vec3 normal = normalize(vec3(
    dFdx(wave),
    1.0,
    dFdy(wave)
));
```

### 4. **Caustic Patterns** (Light Refraction)
```glsl
// Animated light patterns overlay
float caustic = sin(uv.y * 3.0 + uTime * 0.5)
              * cos(uv.x * 2.5 + uTime * 0.3);
```

### 5. **Scroll-Reactive Intensity**
```glsl
// Increase wave height based on scroll position
float scrollRatio = clamp(uScroll / documentHeight, 0.0, 1.0);
wave *= mix(1.0, 2.0, scrollRatio);
```

### 6. **Orange Glow Highlights**
```glsl
// Highlight wave crests with brand color
if (wave > 0.5) {
    color = mix(color, ORANGE, wave * 0.15 * scrollRatio);
}
```

### 7. **Color Blending**
```glsl
// Mix base blue with lighter blue based on wave height
vec3 finalColor = mix(BASE_BLUE, ACCENT_BLUE, wave);
finalColor = mix(finalColor, ORANGE, glowAmount);
```

---

## Key Shader Constants (Tune These)

```glsl
#define WAVE_FREQ_1    0.5    // First wave frequency
#define WAVE_FREQ_2    0.8    // Second wave frequency
#define WAVE_FREQ_3    1.2    // Third wave frequency

#define WAVE_AMP_1     0.1    // First wave amplitude
#define WAVE_AMP_2     0.08   // Second wave amplitude
#define WAVE_AMP_3     0.06   // Third wave amplitude

#define WAVE_SPEED_1   1.0    // First wave speed multiplier
#define WAVE_SPEED_2   0.7    // Second wave speed multiplier
#define WAVE_SPEED_3   0.5    // Third wave speed multiplier

#define CAUSTIC_SCALE  2.0    // Caustic pattern density
#define CAUSTIC_SPEED  1.5    // Caustic animation speed

#define BASE_BLUE      vec3(0.0, 0.15, 0.3)      // Deep ocean
#define ACCENT_BLUE    vec3(0.0, 0.4, 0.8)       // Lighter blue
#define ORANGE         vec3(1.0, 0.27, 0.0)      // Brand color

#define BLUR_RADIUS    4.0    // CSS blur (CSS, not shader)
```

---

## JavaScript → Shader Communication

### Updating Uniforms

```javascript
const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: window.scrollY },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uIntensity: { value: 1.0 },
    uReducedMotion: { value: prefersReducedMotion },
};

// In animation loop:
uniforms.uTime.value += deltaTime;
uniforms.uScroll.value = window.scrollY;

// Update material
material.uniforms = uniforms;
```

### Passing Scroll Position

```javascript
// Listen to scroll
window.addEventListener('scroll', () => {
    uniforms.uScroll.value = window.scrollY;
}, { passive: true });

// In shader, use it:
float scrollRatio = clamp(uScroll / documentHeight, 0.0, 1.0);
```

---

## Three.js Setup Checklist

- [ ] Create `THREE.Scene()`
- [ ] Create `THREE.OrthographicCamera()`
- [ ] Create `THREE.WebGLRenderer()` with alpha: true
- [ ] Create `THREE.PlaneGeometry()` sized to viewport
- [ ] Create `THREE.ShaderMaterial()` with vertex/fragment shaders
- [ ] Create `THREE.Mesh()` from geometry + material
- [ ] Add mesh to scene
- [ ] Implement animation loop with `requestAnimationFrame`
- [ ] Handle window resize events
- [ ] Dispose resources on unmount
- [ ] Add error handling for WebGL unavailable

---

## Performance Tips

### ✅ DO
- Use efficient math (precompute when possible)
- Limit expensive functions (sin, cos) in shader
- Batch uniform updates
- Use `will-change: transform` sparingly
- Detect device capability and adjust quality
- Use lower resolution on mobile if needed

### ❌ DON'T
- Recalculate the same values every frame
- Use expensive operations inside loops
- Create/destroy shaders frequently
- Leave resources undisposed
- Animate properties that trigger layout recalculation
- Ignore `prefers-reduced-motion` preference

---

## Testing Checklist

### Visual
- [ ] Water ripples visible and animate
- [ ] Caustic patterns overlay smoothly
- [ ] Orange glow appears on wave crests
- [ ] Depth of field blur visible (separate from ripples)
- [ ] Colors match theme (#0A0A0A, blues, #FF4500)
- [ ] Movement feels organic, not robotic

### Performance
- [ ] 60 FPS on desktop (DevTools → Performance)
- [ ] 50+ FPS on tablet (iPad, Galaxy Tab)
- [ ] 40+ FPS on mobile (iPhone, Android)
- [ ] No memory leaks (check heap over 5 min)
- [ ] No jank during scroll (smooth interaction)

### Responsiveness
- [ ] Canvas scales to window resize
- [ ] Works at 320px viewport
- [ ] Works at 2560px viewport
- [ ] High-DPI displays render crisply
- [ ] Orientation change handled (portrait ↔ landscape)

### Accessibility
- [ ] With `prefers-reduced-motion`, animation stops
- [ ] Content remains readable (contrast OK)
- [ ] Keyboard navigation works
- [ ] Tab order preserved
- [ ] Screen reader can navigate

### Browser Compatibility
- [ ] Chrome 90+ ✓
- [ ] Firefox 88+ ✓
- [ ] Safari 14+ ✓
- [ ] Edge 90+ ✓
- [ ] Mobile browsers ✓
- [ ] Fallback for no WebGL ✓

---

## Integration with App.jsx

### Current Setup
```jsx
// src/App.jsx
import OceanBackground from '@/components/backgrounds/OceanBackground';

export default function App() {
  return (
    <>
      <OceanBackground />  {/* CSS-based, replace with Three.js version */}
      {/* Rest of app */}
    </>
  );
}
```

### After Three.js Implementation
```jsx
import OceanShaderBackground from '@/components/backgrounds/OceanShaderBackground';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <OceanShaderBackground scrollY={scrollY} />
      {/* Rest of app */}
    </>
  );
}
```

---

## Color Palette Reference

| Element | Color | Hex | RGB |
|---------|-------|-----|-----|
| **Base** | Dark Background | #0A0A0A | 10, 10, 10 |
| **Wave Base** | Deep Blue | #001F3F | 0, 31, 63 |
| **Wave Mid** | Ocean Blue | #003D7A | 0, 61, 122 |
| **Wave Light** | Accent Blue | #00B6D4 | 0, 182, 212 |
| **Glow Base** | Blue Glow | #64B4DC | 100, 180, 220 |
| **Orange Accent** | Brand Orange | #FF4500 | 255, 69, 0 |

---

## File Structure

```
src/components/backgrounds/
├── OceanShaderBackground.jsx    (Main component)
├── shaders/
│   ├── vertex.glsl              (Vertex shader)
│   └── fragment.glsl            (Fragment shader)
├── constants.js                 (Shader constants, uniforms)
└── OceanShaderBackground.css    (Only for depth blur if needed)
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Black screen** | Renderer not clearing | Add `renderer.clearColor(0x000000, 1)` |
| **Stretched geometry** | Aspect ratio wrong | Calculate: `width / height` |
| **Low FPS** | Too many calculations | Reduce wave frequencies or mobile mode |
| **Memory leak** | Resources not disposed | Call `dispose()` on all objects |
| **Shader error** | GLSL syntax invalid | Check browser console for GLSL compile errors |
| **No animation** | Uniforms not updating | Verify `uniforms.value` updates in loop |

---

## Next Steps

1. **Create component file** with Three.js boilerplate
2. **Write vertex shader** for plane transformation
3. **Write fragment shader** with wave calculations
4. **Implement scroll handling** to update uniforms
5. **Test on devices** across all breakpoints
6. **Optimize performance** if needed
7. **Document final implementation** with screenshots

---

