import { useState, useEffect, useMemo, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Sliders } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAccessibility } from "@/context/AccessibilityContext";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Skills", to: "/skills" },
    { label: "Projects", to: "/projects" },
    { label: "Education", to: "/education" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar() {
    const { largeText, toggleLargeText } = useAccessibility();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCompact, setIsCompact] = useState(() => {
        if (typeof window !== "undefined") {
            return window.scrollY > 150;
        }
        return false;
    });
    const [linkWidth, setLinkWidth] = useState(100);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const navRef = useRef(null);

    // Calculate active index for the capsule
    const activeIndex = useMemo(() => {
        return navLinks.findIndex(link => link.to === location.pathname);
    }, [location.pathname]);

    // Handle responsive link width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setLinkWidth(80);
            } else {
                setLinkWidth(100);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Detect scroll to apply scrolled background styling to navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper to calculate compact state translation offset (pinned to top-right)
    const getTargetX = () => {
        if (typeof window === "undefined") return 0;
        const w = window.innerWidth;
        const r = w <= 480 ? 10 : 20;
        return (w / 2) - r - 52;
    };

    // Simplify navbar state logic: Expanded at top, compact when scrolled
    useEffect(() => {
        const handleScroll = () => {
            // Expand at the very top, compact everywhere else
            if (window.scrollY < 100) {
                setIsCompact(false);
                setIsScrolled(false);
            } else {
                setIsCompact(true);
                setIsScrolled(true);
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    // GSAP morph animation driven by isCompact state
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isCompact) {
                // Morph to compact hamburger button
                gsap.killTweensOf([
                    navRef.current,
                    ".nav-logo-link-wrapper",
                    ".desktop-nav-container",
                    ".nav-actions-expanded",
                    ".hamburger-btn"
                ]);

                // 1. Fade out the expanded children
                gsap.to([".nav-logo-link-wrapper", ".desktop-nav-container", ".nav-actions-expanded"], {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.15,
                    pointerEvents: "none",
                    overwrite: "auto",
                    display: "none"
                });

                // 2. Animate the navbar container to a rounded-square button in the top-right
                // Need to reposition from center to top-right
                gsap.to(navRef.current, {
                    left: "auto",
                    right: 24,
                    transform: "none",
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingLeft: 6,
                    paddingRight: 6,
                    maxWidth: 52,
                    duration: 0.4,
                    delay: 0.1,
                    ease: "back.inOut(1.2)",
                    overwrite: "auto"
                });

                // 3. Fade in and show the hamburger button
                gsap.to(".hamburger-btn", {
                    display: "flex",
                    opacity: 1,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 0.15,
                    delay: 0.1,
                    overwrite: "auto"
                });
            } else {
                // Morph back to full expanded navbar
                gsap.killTweensOf([
                    navRef.current,
                    ".nav-logo-link-wrapper",
                    ".desktop-nav-container",
                    ".nav-actions-expanded",
                    ".hamburger-btn"
                ]);

                // 1. Animate the navbar container back to its full size
                gsap.to(navRef.current, {
                    left: "50%",
                    right: "auto",
                    transform: "translateX(-50%)",
                    width: "calc(100% - 40px)",
                    maxWidth: 1200,
                    height: 58,
                    borderRadius: 9999,
                    padding: "12px 24px",
                    duration: 0.4,
                    ease: "back.out(1.2)",
                    overwrite: "auto"
                });

                // 2. Fade out compact button
                gsap.to(".hamburger-btn", {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.15,
                    pointerEvents: "none",
                    display: "none",
                    overwrite: "auto"
                });

                // 3. Show and fade in the expanded children
                gsap.set([".nav-logo-link-wrapper", ".desktop-nav-container", ".nav-actions-expanded"], {
                    display: "flex"
                });
                gsap.to([".nav-logo-link-wrapper", ".desktop-nav-container", ".nav-actions-expanded"], {
                    opacity: 1,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 0.15,
                    delay: 0.12,
                    overwrite: "auto"
                });
            }

            // Handle window resize dynamically to update compact translation position
            const handleResize = () => {
                if (isCompact) {
                    gsap.set(navRef.current, { xPercent: 0, x: getTargetX() });
                } else {
                    gsap.set(navRef.current, { xPercent: -50, x: 0 });
                }
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, navRef);

        return () => ctx.revert();
    }, [isCompact]);

    return (
        <>
            <nav
                ref={navRef}
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                aria-label="Main navigation"
                role="navigation"
                style={{
                    position: "fixed",
                    top: 20,
                    left: "50%",
                    zIndex: 9000,
                    border: "1.5px solid rgba(255, 255, 255, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    background: "rgba(10, 10, 15, 0.3)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    overflow: "hidden",
                    // Initial styles based on isCompact to avoid render layout flash
                    width: isCompact ? 52 : "calc(100% - 40px)",
                    height: isCompact ? 52 : 58,
                    borderRadius: isCompact ? 12 : 9999,
                    paddingTop: isCompact ? 6 : 12,
                    paddingBottom: isCompact ? 6 : 12,
                    paddingLeft: isCompact ? 6 : 24,
                    paddingRight: isCompact ? 6 : 24,
                    maxWidth: isCompact ? 52 : 1200,
                }}
            >
                <style>{`
                    .navbar {
                        transform: translateX(-50%);
                        transition: background 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    backdrop-filter 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    border-color 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1);
                    }
                    
                    .navbar.scrolled {
                        background: rgba(10, 10, 15, 0.75);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border-color: rgba(255, 255, 255, 0.1);
                        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                    }

                    .navbar-inner {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }

                    .nav-logo-link {
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        outline: none;
                        border-radius: 9999px;
                        flex-shrink: 0;
                    }

                    .nav-logo-link:focus-visible {
                        box-shadow: 0 0 0 2px var(--color-primary-orange);
                    }

                    .logo-circle {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--color-primary-orange), #ff6b33);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Space Mono', monospace;
                        font-weight: 700;
                        color: #fff;
                        box-shadow: 0 4px 12px rgba(255, 69, 0, 0.4);
                        font-size: 16px;
                    }

                    .logo-text {
                        font-family: 'Space Mono', monospace;
                        font-weight: 700;
                        color: var(--color-primary-orange);
                        letter-spacing: 2px;
                        margin-left: 12px;
                        text-transform: uppercase;
                        font-size: 15px;
                    }

                    .desktop-nav-container {
                        display: flex;
                        align-items: center;
                        position: relative;
                        background: var(--border-primary);
                        border-radius: 9999px;
                        padding: 4px;
                        border: 1px solid var(--bg-card);
                        overflow-x: auto;
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE10+ */
                        max-width: calc(100% - 180px);
                        flex-shrink: 1;
                    }

                    .desktop-nav-container::-webkit-scrollbar {
                        display: none; /* Chrome, Safari, Opera */
                    }

                    .active-capsule {
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        width: var(--link-width, 100px);
                        height: 44px;
                        border-radius: 9999px;
                        background: linear-gradient(180deg, rgba(255, 69, 0, 0.15) 0%, rgba(255, 69, 0, 0.05) 100%);
                        border: 1px solid rgba(255, 69, 0, 0.3);
                        box-shadow: 
                            0 4px 12px rgba(255, 69, 0, 0.15), 
                            inset 0 1px 1px var(--glass-panel),
                            inset 0 0 20px rgba(255, 69, 0, 0.05);
                        z-index: 1;
                        pointer-events: none;
                    }

                    .nav-actions-expanded {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        flex-shrink: 0;
                    }

                    .action-button {
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        background: var(--border-primary);
                        border: 1px solid var(--bg-card);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--text-secondary);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .action-button:hover {
                        background: var(--glass-bg-light);
                        color: #ffffff;
                    }

                    .action-button:focus-visible {
                        outline: none;
                        box-shadow: 0 0 0 2px var(--color-primary-orange);
                    }

                    .action-button.active {
                        color: var(--color-primary-orange);
                        background: rgba(255, 69, 0, 0.1);
                        border-color: rgba(255, 69, 0, 0.2);
                    }

                    .hamburger-btn {
                        width: 38px;
                        height: 38px;
                        border-radius: 8px;
                        background: var(--border-primary);
                        border: 1px solid var(--bg-card);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--text-secondary);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .hamburger-btn:hover {
                        background: var(--glass-bg-light);
                        color: #ffffff;
                    }

                    @media (max-width: 768px) {
                        .logo-text {
                            display: none;
                        }
                        .desktop-nav-container {
                            max-width: calc(100% - 100px);
                        }
                    }
                `}</style>

                <div className="navbar-inner">
                    {/* Logo Section Wrapper */}
                    <div className="nav-logo-link-wrapper" style={{ display: isCompact ? "none" : "flex", opacity: isCompact ? 0 : 1 }}>
                        <Link to="/" className="nav-logo-link" aria-label="Nitin - Portfolio home">
                            <m.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div className="logo-circle">N</div>
                                <span className="logo-text">NITIN</span>
                            </m.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation Section */}
                    <div 
                        className="desktop-nav-container" 
                        role="menubar"
                        style={{
                            "--link-width": `${linkWidth}px`,
                            display: isCompact ? "none" : "flex",
                            opacity: isCompact ? 0 : 1
                        }}
                    >
                        {activeIndex >= 0 && (
                            <m.div
                                className="active-capsule"
                                animate={{
                                    x: activeIndex * linkWidth
                                }}
                                transition={{
                                    type: "tween",
                                    ease: [0.22, 1, 0.36, 1],
                                    duration: 0.32
                                }}
                                initial={false}
                            />
                        )}

                        {navLinks.map((link, index) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link ${activeIndex === index ? "active" : ""}`}
                                role="menuitem"
                                style={{
                                    width: linkWidth,
                                    height: 44,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.85rem",
                                    fontWeight: activeIndex === index ? 700 : 500,
                                    color: activeIndex === index ? "var(--color-primary-orange)" : "var(--text-secondary)",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "color 0.25s ease",
                                    zIndex: 2,
                                    position: "relative",
                                    flexShrink: 0
                                }}
                            >
                                <m.span
                                    whileHover={{
                                        y: -1,
                                        color: activeIndex === index ? "var(--color-primary-orange)" : "#ffffff"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        display: "inline-block",
                                        textShadow: activeIndex === index ? "0 0 12px rgba(255, 69, 0, 0.3)" : "none",
                                        willChange: "transform, color",
                                    }}
                                >
                                    {link.label}
                                </m.span>
                            </Link>
                        ))}
                    </div>

                    {/* Expanded Actions Section */}
                    <div className="nav-actions-expanded" style={{ display: isCompact ? "none" : "flex", opacity: isCompact ? 0 : 1 }}>
                        <m.button
                            onClick={toggleLargeText}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle large text"
                            className={`action-button ${largeText ? 'active' : ''}`}
                        >
                            <Sliders size={16} />
                        </m.button>
                    </div>

                    {/* Hamburger Button (Absolute positioned and shown only in compact state) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`hamburger-btn`}
                        aria-label="Menu"
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            display: isCompact ? "flex" : "none",
                            opacity: isCompact ? 1 : 0,
                            transform: isCompact ? "scale(1)" : "scale(0.8)"
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <m.line x1="4" y1="6" x2="20" y2="6" animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }} transition={{ duration: 0.25 }} style={{ transformOrigin: "center" }} />
                            <m.line x1="4" y1="12" x2="20" y2="12" animate={{ opacity: mobileMenuOpen ? 0 : 1 }} transition={{ duration: 0.25 }} />
                            <m.line x1="4" y1="18" x2="20" y2="18" animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }} transition={{ duration: 0.25 }} style={{ transformOrigin: "center" }} />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Clicking outside Backdrop */}
            {mobileMenuOpen && (
                <div 
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 8998,
                        background: "transparent",
                    }}
                />
            )}

            {/* Compact Mobile Menu Panel (Popout) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: 80,
                            right: window.innerWidth <= 480 ? 10 : 20,
                            width: 220,
                            background: "rgba(10, 10, 15, 0.95)",
                            backdropFilter: "blur(32px)",
                            borderRadius: 16,
                            border: "1px solid var(--glass-bg-light)",
                            padding: 12,
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            zIndex: 8999,
                            boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--bg-card)",
                            transformOrigin: "top right",
                        }}
                    >
                        {navLinks.map((link) => {
                            const isLinkActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    style={{ textDecoration: "none" }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <m.div
                                        style={{
                                            padding: "12px 16px",
                                            borderRadius: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            background: isLinkActive ? "linear-gradient(90deg, rgba(255, 69, 0, 0.15), rgba(255, 69, 0, 0.05))" : "transparent",
                                            color: isLinkActive ? "var(--color-primary-orange)" : "var(--text-secondary)",
                                            fontWeight: isLinkActive ? 600 : 500,
                                            border: isLinkActive ? "1px solid rgba(255, 69, 0, 0.2)" : "1px solid transparent",
                                            fontSize: "0.9rem",
                                            transition: "all 0.2s ease"
                                        }}
                                        whileHover={{
                                            backgroundColor: !isLinkActive ? "var(--border-primary)" : undefined,
                                            color: !isLinkActive ? "#ffffff" : undefined
                                        }}
                                    >
                                        {link.label}
                                    </m.div>
                                </Link>
                            );
                        })}

                        {/* Accessibility Controls inside panel */}
                        <div style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            marginTop: 8,
                            paddingTop: 8,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>Large Text</span>
                            <button
                                onClick={toggleLargeText}
                                className={`action-button ${largeText ? 'active' : ''}`}
                                style={{ width: 32, height: 32 }}
                            >
                                <Sliders size={14} />
                            </button>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
