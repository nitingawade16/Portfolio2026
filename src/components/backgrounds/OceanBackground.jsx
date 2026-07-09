import "./OceanBackground.css";

/**
 * Premium Underwater Background System - ULTRA-OPTIMIZED
 * 
 * Minimal static background for maximum performance
 */
export default function OceanBackground() {
  return (
    <div
      className="ocean-background"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        background: "#060b15",
      }}
    >
      {/* Layer 1: Deep Gradient Background - STATIC */}
      <div className="ocean-layer ocean-layer-1" />

      {/* Layer 7: Soft Glow Gradients - STATIC */}
      <div className="ocean-layer ocean-layer-7" />

      {/* Layer 8: Subtle Vignette - STATIC */}
      <div className="ocean-layer ocean-layer-8" />
    </div>
  );
}
