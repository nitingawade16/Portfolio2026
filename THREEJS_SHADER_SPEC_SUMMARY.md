# Three.js Ocean Shader Background - Complete Specification Summary

## 🎯 Mission

Replace the current **CSS-based ocean background** (10 layers, 65KB CSS) with a **high-performance Three.js WebGL shader** that renders realistic water ripples, caustic lighting, and scroll-reactive effects matching the visual quality of Apple, Linear, and Vercel.

---

## 📊 Key Comparison

| Aspect | Current CSS | New Three.js |
|--------|------------|--------------|
| **Technology** | CSS animations | WebGL Fragment Shader |
| **Visual Quality** | Good | Premium/Cinematic |
| **Water Effect** | Static gradients + animated layers | Realistic Gerstner waves |
| **Caustics** | Simple radial gradients | Animated light refraction patterns |
| **Scroll Reaction** | Parallax movement | Dynamic wave intensity |
| **Orange Glow** | Static overlay | Reactive highlight on crests |
| **FPS** | 60 FPS (CSS) | 60 FPS (GPU-accelerated) |
| **Bundle Size** | 65KB CSS | +250KB Three.js (one-time) |
| **Customization** | CSS variables | Shader uniforms + JS config |

---

## 🏗️ Architecture

### Component Structure
```
OceanShaderBackground.jsx
├── Three.js Scene (WebGL canvas)
├── Shader Material (GLSL code)
├── Uniforms (Dynamic values from JS)
├── Animation Loop (60 FPS render)
└── Event Listeners (Scroll, resize)
```

### Shader Pipeline
```
Vertex Shader (Transform geometry)
    ↓
Fragment Shader (Calculate pixel colors)
    ├── Gerstner Waves (water surface)
    ├── Perlin Noise (organic distortion)
    ├── Normal Calculation (lighting)
    ├── Caustic Patterns (light refraction)
    ├── Scroll-Reactive Intensity (amplitude)
    ├── Orange Glow (brand color)
    └── Color Blending (final output)
```

---

## 🎨 Visual Features

### 1. **Realistic Water Ripples**
- 3-5 overlapping sine/cosine waves (Gerstner physics)
- Different frequencies for complex interference
- 20-40 second animation cycle (no obvious repetition)
- Subtle but visible wave motion

**Color Range:**
- Deep: #001F3F (0.0, 0.15, 0.3)
- Mid: #003D7A (0.0, 0.25, 0.5)
- Light: #0E5A8A (0.0, 0.4, 0.8)

### 2. **Caustic Lighting**
- Underwater light refraction patterns
- Animated independently from water (different speed)
- 20% max opacity (doesn't overwhelm)
- Blue/cyan colors (#00B6D4 to #64B4DC)

### 3. **Scroll-Reactive Intensity**
- Base amplitude at scrollY = 0: 1.0x
- Maximum amplitude at bottom: 2.0x
- Formula: `amplitude = mix(1.0, 2.0, clamp(scrollY / docHeight, 0, 1))`
- Smooth transitions (no sudden jumps)

### 4. **Orange Reactive Glow**
- Brand color #FF4500 on wave crests
- Increases with scroll (0% at top, 15% max at bottom)
- Subtle but noticeable enhancement
- Fades smoothly when scrolling up

### 5. **Depth of Field**
- Gaussian blur (4px) separates background from content
- CSS `filter: blur(4px)` on background container
- Maintains WCAG AA contrast for readability
- Creates visual hierarchy and focus

---

## ⚙️ Technical Specifications

### Performance Targets
- **Desktop**: 60 FPS (Chrome, Firefox, Safari, Edge)
- **Tablet**: 50+ FPS (iPad, Galaxy Tab)
- **Mobile**: 40+ FPS (iPhone, Android)
- **GPU Memory**: <50MB
- **JS Overhead**: <5ms per frame
- **Load Impact**: <200ms additional time

### Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Mobile 90+
- Fallback: Solid background for unsupported browsers

### Accessibility
- Respects `prefers-reduced-motion: reduce` (disable animations)
- Focus indicators preserved (not covered by background)
- Content readability maintained (WCAG AA contrast)
- Keyboard navigation fully functional

### Responsiveness
- Works at 320px (mobile) to 4K+ (ultrawide)
- Canvas scales to window resize
- High-DPI display support (Retina, etc.)
- Orientation change handling (portrait ↔ landscape)

---

## 📦 Implementation Plan

### Phase 1: Shader Setup (1 hour)
1. Create `OceanShaderBackground.jsx` component
2. Write vertex shader (transform plane geometry)
3. Write fragment shader (color calculation)
4. Set up Three.js scene, camera, renderer
5. Create shader material with uniforms
6. Add animation loop with `requestAnimationFrame`

### Phase 2: Wave Physics (1 hour)
1. Implement Gerstner waves (primary wave pattern)
2. Add Perlin noise distortion (organic movement)
3. Calculate surface normals (lighting)
4. Blend wave colors smoothly
5. Test wave appearance and speed

### Phase 3: Advanced Effects (45 minutes)
1. Implement caustic light patterns
2. Add scroll-reactive amplitude
3. Implement orange glow highlights
4. Add depth of field blur (CSS)
5. Fine-tune colors and intensities

### Phase 4: Performance & Polish (45 minutes)
1. Optimize shader calculations
2. Test on multiple devices
3. Implement mobile LOD (level of detail)
4. Add accessibility (reduced motion, contrast)
5. Error handling and fallbacks
6. Resource cleanup on unmount

**Total: ~4 hours**

---

## 🎛️ Shader Uniforms (JS → GPU Communication)

| Uniform | Type | Purpose | Update Frequency |
|---------|------|---------|------------------|
| `uTime` | float | Elapsed time for animation | Every frame |
| `uScroll` | float | Current scroll Y position | On scroll |
| `uResolution` | vec2 | Viewport width/height | On resize |
| `uIntensity` | float | Wave amplitude multiplier | Static (1.0) |
| `uReducedMotion` | bool | Disable animation if true | On load |

---

## 🎯 Success Criteria

✅ **Visual Quality**
- Water ripples render with realistic wave physics
- Caustic patterns add premium depth
- Orange glow enhances brand presence
- Depth blur separates background from content
- Overall appearance matches or exceeds reference images

✅ **Performance**
- 60 FPS on desktop, 50+ tablet, 40+ mobile
- No jank during scroll or interactions
- GPU memory <50MB
- <5ms JavaScript overhead per frame

✅ **Integration**
- Drop-in React component (OceanShaderBackground)
- Seamless with existing App.jsx
- No breaking changes to other components
- Smooth page transitions on route changes

✅ **Accessibility**
- Respects motion preferences
- Focus/keyboard navigation works
- WCAG AA contrast maintained
- Screen readers function normally

✅ **Responsiveness**
- Works at all breakpoints (320px-4K)
- High-DPI displays render crisply
- Canvas scales to window resize
- Mobile and desktop experiences equivalent

---

## 📁 File Structure

```
src/components/backgrounds/
├── OceanShaderBackground.jsx      # Main React component
├── shaders/
│   ├── vertex.glsl                # Vertex shader code
│   └── fragment.glsl              # Fragment shader code
├── constants.js                   # Shader constants & config
└── OceanShaderBackground.css      # Styling (blur filter)

.kiro/specs/threejs-ocean-shader/
├── config.json                    # Spec metadata
├── requirements.md                # Detailed requirements
└── QUICK_REFERENCE.md             # Implementation guide
```

---

## 🔧 Configuration Constants

```javascript
// These live in constants.js and are tuned for optimal appearance

export const WAVE_CONFIG = {
  frequencies: [0.5, 0.8, 1.2],        // Wave frequencies
  amplitudes: [0.1, 0.08, 0.06],       // Wave amplitudes
  speeds: [1.0, 0.7, 0.5],             // Speed multipliers
};

export const CAUSTIC_CONFIG = {
  scale: 2.0,                          // Pattern density
  speed: 1.5,                          // Animation speed
  opacity: 0.2,                        // Max 20% opacity
};

export const COLOR_CONFIG = {
  baseBlue: [0.0, 0.15, 0.3],         // Deep ocean
  accentBlue: [0.0, 0.4, 0.8],        // Lighter blue
  orange: [1.0, 0.27, 0.0],           // Brand color #FF4500
};

export const PERFORMANCE_CONFIG = {
  blur: 4.0,                           // CSS blur radius
  mobileQuality: 0.75,                 // Render scale on mobile
  targetFPS: 60,                       // Target frame rate
};
```

---

## 🚀 Execution Checklist

### Pre-Implementation
- [ ] Review all 12 requirements thoroughly
- [ ] Study Gerstner wave physics
- [ ] Understand GLSL shader syntax
- [ ] Familiarize with Three.js documentation

### Implementation
- [ ] Set up Three.js scene with proper cleanup
- [ ] Write and test vertex shader
- [ ] Write and test fragment shader
- [ ] Implement scroll event handling
- [ ] Add window resize handling
- [ ] Implement animation loop

### Testing
- [ ] Visual testing on desktop
- [ ] Performance profiling (60 FPS check)
- [ ] Mobile device testing
- [ ] Browser compatibility testing
- [ ] Accessibility testing (keyboard, motion prefs)
- [ ] Memory leak testing

### Optimization
- [ ] Profile shader performance
- [ ] Reduce calculations if needed
- [ ] Implement mobile LOD if necessary
- [ ] Fine-tune colors and timings
- [ ] Add error handling and fallbacks

### Documentation
- [ ] Add code comments
- [ ] Create implementation guide
- [ ] Document shader constants
- [ ] Add troubleshooting guide

### Cleanup
- [ ] Verify old CSS background is removed
- [ ] Ensure no conflicts with other components
- [ ] Clean up unused imports/styles
- [ ] Final build and performance check

---

## 📚 Resources

### Learning Materials
- Gerstner Waves: https://en.wikipedia.org/wiki/Gerstner_wave
- Three.js Docs: https://threejs.org/docs/
- GLSL Reference: https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language
- WebGL Best Practices: https://www.khronos.org/webgl/

### Tools
- Shader Editor: https://www.shadertoy.com/
- Three.js Inspector: https://inspector.babylonjs.com/
- DevTools: Chrome/Firefox DevTools for profiling
- WebGL Validator: https://www.khronos.org/webgl/

---

## ⚠️ Known Considerations

1. **Bundle Size**: Three.js adds ~250KB (acceptable tradeoff for visual quality)
2. **Mobile Performance**: May need LOD (reduced quality) on older devices
3. **Browser Support**: Need fallback for Safari pre-14
4. **Animation Overhead**: Scroll event handling should be throttled
5. **Memory Management**: Must properly dispose Three.js resources

---

## 📋 Related Documentation

- Previous spec: `.kiro/specs/ocean-visual-fidelity/` (CSS enhancement spec - can be referenced for color/visual guidance)
- Current background: `src/components/backgrounds/OceanBackground.jsx` (CSS-based, will be replaced)
- Production optimization spec: `.kiro/specs/production-optimization/` (parallel work stream)

---

## 💡 Final Notes

This implementation will elevate the portfolio to **Apple/Linear/Vercel visual quality** while maintaining excellent performance across all devices. The Three.js shader approach provides:

✨ **Premium visual fidelity** beyond CSS capabilities  
⚡ **GPU acceleration** for smooth 60 FPS  
🎯 **Customizable effects** via shader uniforms  
📱 **Responsive scaling** across all devices  
♿ **Accessibility support** for all users  

The ~4 hour implementation effort is well-worth the visual enhancement and professional polish it brings to the portfolio.

---

**Status**: Ready for implementation  
**Created**: July 6, 2026  
**Version**: 1.0  

