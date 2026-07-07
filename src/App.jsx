import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Background
import OceanBackground from "@/components/backgrounds/OceanBackground";

// UI
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import Loader from "@/components/ui/Loader";
import CommandPalette from "@/components/ui/CommandPalette";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

// Pages (Lazy Loaded)
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Skills = lazy(() => import("@/pages/Skills"));
const Projects = lazy(() => import("@/pages/Projects"));
const Education = lazy(() => import("@/pages/Education"));
const Certificates = lazy(() => import("@/pages/Certificates"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const Contact = lazy(() => import("@/pages/Contact"));

// Context
import { AccessibilityProvider } from "@/context/AccessibilityContext";

/* ─── Premium page transition - OPTIMIZED ────────────────────────────────── */
function PageTransition({ children }) {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            {children}
        </m.div>
    );
}

/* ─── Route definitions ──────────────────────────────────────── */
function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={null}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                    <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
                    <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                    <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
                    <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
                    <Route path="/achievements" element={<PageTransition><Achievements /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                    {/* 404 */}
                    <Route path="*" element={
                        <PageTransition>
                            <div style={{
                                minHeight: "100vh", display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", gap: 20,
                            }}>
                                <p style={{ fontSize: "clamp(5rem,15vw,8rem)", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.04em", lineHeight: 1.05, fontWeight: 700, color: "var(--text-dim)" }}>404</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>This page doesn't exist.</p>
                                <a href="/" className="btn-primary" style={{ textDecoration: "none", marginTop: 8 }}>← Back to Home</a>
                            </div>
                        </PageTransition>
                    } />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

/* ─── Root App ───────────────────────────────────────────────── */
export default function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <AccessibilityProvider>
            <LazyMotion features={domAnimation}>
                <BrowserRouter>
                    {/* Loading screen */}
                    {!loaded && <Loader onComplete={() => setLoaded(true)} />}

                    {/* Main content */}
                    <SmoothScroll>
                        <div style={{
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            position: "relative", minHeight: "100vh",
                        }}>
                            {/* ── Background layers ── */}
                            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                                <OceanBackground />
                                <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />
                            </div>

                            {/* UI chrome */}
                            <CommandPalette />
                            <ScrollProgress />
                            <Navbar />

                            {/* Pages */}
                            <main style={{ position: "relative", zIndex: 2 }} id="main">
                                <AnimatedRoutes />
                            </main>

                            <Footer />
                            <BackToTop />
                        </div>
                    </SmoothScroll>

                    {/* Toast notifications */}
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: "rgba(8,8,18,0.95)",
                                color: "#f4f4ff",
                                border: "1px solid var(--glass-bg-light)",
                                backdropFilter: "blur(12px)",
                                borderRadius: "14px",
                                fontSize: "0.875rem",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                            },
                        }}
                    />

                    {/* Premium Features */}
                    <KeyboardShortcuts />
                </BrowserRouter>
            </LazyMotion>
        </AccessibilityProvider>
    );
}
