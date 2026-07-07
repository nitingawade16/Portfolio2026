# Three.js Ocean Shader - Code Structure Reference

## Vertex Shader Structure

```glsl
// vertex.glsl
#version 300 es
precision highp float;

// Input vertex attributes
in vec3 position;
in vec2 uv;

// Uniforms (from JavaScript)
uniform float uTime;
uniform float uScroll;
uniform float uIntensity;
uniform vec2 uResolution;

// Output to fragment shader
out vec2 vUv;
out float vHeight;
out float vScrollRatio;

void main() {
    vUv = uv;
    
    // Calculate scroll ratio for vertex effects if needed
    vScrollRatio = uScroll / 2000.0; // Normalize scroll to reasonable range
    
    // Calculate wave height at this vertex
    vec3 pos = position;
    
    // Apply wave deformations to vertex position
    float wave = sin(pos.x * 0.5 + uTime) * 0.1;
    wave += sin(pos.x * 0.8 + uTime * 0.7) * 0.08;
    wave += sin(pos.x * 1.2 + uTime * 0.5) * 0.06;
    
    // Scale by scroll-reactive intensity
    wave *= mix(1.0, 2.0, clamp(vScrollRatio, 0.0, 1.0));
    
    pos.z += wave * uIntensity;
    vHeight = wave;
    
    // Standard projection
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

---

## Fragment Shader Structure

```glsl
// fragment.glsl
#version 300 es
precision highp float;

// Input from vertex shader
in vec2 vUv;
in float vHeight;
in float vScrollRatio;

// Uniforms
uniform float uTime;
uniform float uScroll;
uniform float uIntensity;
uniform vec2 uResolution;

// Output color
out vec4 FragColor;

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS - Tune these for visual appearance
// ═══════════════════════════════════════════════════════════════════

// Wave frequencies and amplitudes
#define WAVE_FREQ_1     0.5
#define WAVE_FREQ_2     0.8
#define WAVE_FREQ_3     1.2
#define WAVE_AMP_1      0.1
#define WAVE_AMP_2      0.08
#define WAVE_AMP_3      0.06
#define WAVE_SPEED_1    1.0
#define WAVE_SPEED_2    0.7
#define WAVE_SPEED_3    0.5

// Caustic configuration
#define CAUSTIC_FREQ    2.5
#define CAUSTIC_SPEED   1.5
#define CAUSTIC_OPACITY 0.2

// Colors
#define BASE_BLUE       vec3(0.0, 0.15, 0.3)      // Deep ocean
#define ACCENT_BLUE     vec3(0.0, 0.4, 0.8)       // Lighter blue
#define LIGHT_BLUE      vec3(0.0, 0.5, 1.0)       // Even lighter
#define ORANGE          vec3(1.0, 0.27, 0.0)      // Brand color

// Performance
#define NOISE_SCALE     2.0
#define GLOW_THRESHOLD  0.3

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

// Simple pseudo-random function
float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Perlin-like noise (simplified)
float simpleNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(
        mix(a, b, u.x),
        mix(c, d, u.x),
        u.y
    );
}

// Smoothstep function for smooth transitions
float smoothTransition(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

// ═══════════════════════════════════════════════════════════════════
// WAVE CALCULATION
// ═══════════════════════════════════════════════════════════════════

float calculateWaves(vec2 uv, float time, float intensity) {
    // Combine multiple wave frequencies for Gerstner-like waves
    float wave = sin(uv.x * WAVE_FREQ_1 + time * WAVE_SPEED_1) * WAVE_AMP_1;
    wave += sin(uv.x * WAVE_FREQ_2 + time * WAVE_SPEED_2) * WAVE_AMP_2;
    wave += sin(uv.x * WAVE_FREQ_3 + time * WAVE_SPEED_3) * WAVE_AMP_3;
    
    // Add cosine waves for variation
    wave += cos(uv.y * WAVE_FREQ_1 * 0.5 + time * WAVE_SPEED_1 * 0.8) * WAVE_AMP_1 * 0.5;
    
    // Apply Perlin-like noise for organic distortion
    float noise = simpleNoise(uv * NOISE_SCALE + time * 0.1);
    wave += (noise - 0.5) * 0.1;
    
    // Apply scroll-reactive intensity
    wave *= mix(1.0, 2.0, vScrollRatio);
    wave *= intensity;
    
    return wave;
}

// ═══════════════════════════════════════════════════════════════════
// CAUSTIC CALCULATION
// ═══════════════════════════════════════════════════════════════════

float calculateCaustics(vec2 uv, float time, float wave) {
    // Create caustic pattern with interference
    float caustic = sin(uv.y * CAUSTIC_FREQ + time * CAUSTIC_SPEED * 0.5);
    caustic *= cos(uv.x * CAUSTIC_FREQ * 0.8 + time * CAUSTIC_SPEED * 0.3);
    
    // Distort caustics by wave height
    caustic += sin(uv.x * CAUSTIC_FREQ * 1.2 + wave * 5.0 + time * CAUSTIC_SPEED);
    
    // Normalize to 0-1 range
    caustic = smoothstep(-1.5, 1.5, caustic);
    
    return caustic * CAUSTIC_OPACITY;
}

// ═══════════════════════════════════════════════════════════════════
// NORMAL CALCULATION (for lighting effects)
// ═══════════════════════════════════════════════════════════════════

vec3 calculateNormals(vec2 uv, float time, float intensity) {
    float eps = 0.01;
    
    // Get wave height at this point and nearby points
    float h0 = calculateWaves(uv, time, intensity);
    float h1 = calculateWaves(uv + vec2(eps, 0.0), time, intensity);
    float h2 = calculateWaves(uv + vec2(0.0, eps), time, intensity);
    
    // Calculate derivatives (slope) using finite differences
    float dhdx = (h1 - h0) / eps;
    float dhdy = (h2 - h0) / eps;
    
    // Convert to normal (perpendicular to surface)
    vec3 normal = normalize(vec3(dhdx, 1.0, dhdy));
    
    return normal;
}

// ═══════════════════════════════════════════════════════════════════
// COLOR CALCULATION
// ═══════════════════════════════════════════════════════════════════

vec3 calculateColor(float wave, float caustic, float scrollRatio) {
    // Base color interpolation based on wave height
    vec3 color = mix(BASE_BLUE, ACCENT_BLUE, smoothTransition(-0.1, 0.1, wave));
    color = mix(color, LIGHT_BLUE, smoothstep(0.1, 0.3, wave));
    
    // Add caustic lighting
    vec3 causticColor = mix(vec3(0.0), vec3(0.1, 0.3, 0.5), caustic);
    color = mix(color, color + causticColor, 0.5);
    
    // Add orange glow to wave crests
    float glowIntensity = smoothstep(0.1, 0.3, wave) * scrollRatio;
    color = mix(color, ORANGE, glowIntensity * 0.15);
    
    // Add subtle highlight on high peaks
    float highlight = smoothstep(0.2, 0.4, wave);
    color += vec3(1.0) * highlight * 0.1;
    
    return color;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN FRAGMENT SHADER
// ═══════════════════════════════════════════════════════════════════

void main() {
    // Calculate UV coordinates (0-1 range)
    vec2 uv = vUv;
    
    // Calculate waves
    float wave = calculateWaves(uv, uTime, uIntensity);
    
    // Calculate caustics
    float caustic = calculateCaustics(uv, uTime, wave);
    
    // Calculate surface normals (optional, for advanced lighting)
    vec3 normal = calculateNormals(uv, uTime, uIntensity);
    
    // Calculate final color
    vec3 finalColor = calculateColor(wave, caustic, vScrollRatio);
    
    // Add subtle depth gradient (darker at edges)
    vec2 edgeDist = abs(uv - 0.5);
    float vignette = 1.0 - smoothstep(0.3, 0.5, max(edgeDist.x, edgeDist.y));
    finalColor *= mix(0.8, 1.0, vignette);
    
    // Output final color with full alpha
    FragColor = vec4(finalColor, 1.0);
}
```

---

## React Component Structure

```jsx
// OceanShaderBackground.jsx

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const OceanShaderBackground = ({ scrollY = 0, colorScheme = 'dark' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const timeRef = useRef(0);
  const preferReducedMotion = useRef(false);

  useEffect(() => {
    // ===== Check accessibility preference
    preferReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ===== Initialize Three.js
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create orthographic camera for 2D shader
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      1000
    );
    camera.position.z = 1;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a0a0a, 1);
    renderer.domElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      filter: blur(4px);
    `;
    rendererRef.current = renderer;

    // Append to DOM
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Create geometry
    const geometry = new THREE.PlaneGeometry(width, height);

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: scrollY },
        uResolution: { value: new THREE.Vector2(width, height) },
        uIntensity: { value: 1.0 },
        uReducedMotion: { value: preferReducedMotion.current ? 1.0 : 0.0 },
      },
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ===== Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!preferReducedMotion.current) {
        timeRef.current += 0.016; // ~60fps
        material.uniforms.uTime.value = timeRef.current;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ===== Event Handlers
    const handleScroll = () => {
      material.uniforms.uScroll.value = window.scrollY;
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();

      material.uniforms.uResolution.value.set(newWidth, newHeight);

      geometry.dispose();
      const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
      mesh.geometry = newGeometry;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // ===== Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update scroll uniform when prop changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uScroll.value = scrollY;
    }
  }, [scrollY]);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />;
};

export default OceanShaderBackground;
```

---

## Shader Constants Configuration

```javascript
// constants.js

export const SHADER_CONFIG = {
  // Wave physics
  waves: {
    frequencies: [0.5, 0.8, 1.2],
    amplitudes: [0.1, 0.08, 0.06],
    speeds: [1.0, 0.7, 0.5],
  },

  // Caustic effects
  caustics: {
    frequency: 2.5,
    speed: 1.5,
    maxOpacity: 0.2,
  },

  // Color palette
  colors: {
    baseBlue: [0.0, 0.15, 0.3],        // #001F3F
    accentBlue: [0.0, 0.4, 0.8],       // #0066CC
    lightBlue: [0.0, 0.5, 1.0],        // #0080FF
    orange: [1.0, 0.27, 0.0],          // #FF4500
  },

  // Performance
  performance: {
    blurRadius: 4,                      // CSS blur
    targetFPS: 60,
    mobileQuality: 0.75,                // Render scale
  },

  // Scroll interaction
  scroll: {
    minAmplitude: 1.0,
    maxAmplitude: 2.0,
    normalizeHeight: 2000,              // scrollY / this value
  },
};
```

---

## Import Structure

```javascript
// In App.jsx or main layout
import OceanShaderBackground from '@/components/backgrounds/OceanShaderBackground';
import { SHADER_CONFIG } from '@/components/backgrounds/constants';

// Usage
<OceanShaderBackground scrollY={scrollY} />
```

---

## File Organization

```
src/components/backgrounds/
├── OceanShaderBackground.jsx
├── shaders/
│   ├── vertex.glsl          # Vertex shader code
│   ├── fragment.glsl        # Fragment shader code
│   └── index.js             # Import shaders as strings
├── constants.js             # Configuration constants
└── OceanShaderBackground.css # Styling (if needed)
```

---

## Shader Import Pattern

```javascript
// shaders/index.js
import vertexShaderCode from './vertex.glsl';
import fragmentShaderCode from './fragment.glsl';

export { vertexShaderCode, fragmentShaderCode };
```

```javascript
// OceanShaderBackground.jsx
import { vertexShaderCode, fragmentShaderCode } from './shaders';

// Use in ShaderMaterial
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShaderCode,
  fragmentShader: fragmentShaderCode,
  // ...
});
```

---

## Vite Configuration Note

Ensure `.glsl` files are handled:

```javascript
// vite.config.js - add if not present
export default defineConfig({
  assetsInclude: ['**/*.glsl'],
  // ... rest of config
});
```

Or use raw string imports:

```javascript
// In component
import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';
```

---

