import { useState, useEffect, useMemo, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Sliders } from "lucide-react";

import { useAccessibility } from "@/context/AccessibilityContext";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Skills", to: "/skills" },
    { label: "Projects", to: "/projects" },
    { label: "Education", to: "/education" },
    { label: "Contact", to: "/contact" },
];

// Fixed dimensions guarantee mathematical alignment and no layout shifts
const LINK_WIDTH = 100;
const LINK_HEIGHT = 44;

const NavLink = memo(({ link, isActive }) => {
    return (
        <Link
            to={link.to}
            className={`nav-link ${isActive ? "active" : ""}`}
            role="menuitem"
            aria-current={isActive ? "page" : undefined}
            style={{
                width: LINK_WIDTH,
                height: LINK_HEIGHT,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--color-primary-orange)" : "var(--text-secondary)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.25s ease",
                zIndex: 2, // Must be above the sliding capsule
                position: "relative",
            }}
        >
            <m.span
                whileHover={{
                    y: -1,
                    color: isActive ? "var(--color-primary-orange)" : "#ffffff"
                }}
                transition={{ duration: 0.2 }}
                style={{
                    display: "inline-block",
                    textShadow: isActive ? "0 0 12px rgba(255, 69, 0, 0.3)" : "none",
                    willChange: "transform, color",
                }}
            >
                {link.label}
            </m.span>
        </Link>
    );
});
NavLink.displayName = "NavLink";

export default function Navbar() {

    const { largeText, toggleLargeText } = useAccessibility();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const rafRef = useRef(null);
    // Refs to track current state without stale closures
    const isScrolledRef = useRef(false);
    const isVisibleRef = useRef(true);

    // Calculate active index for the capsule
    const activeIndex = useMemo(() => {
        return navLinks.findIndex(link => link.to === location.pathname);
    }, [location.pathname]);

    // Handle smooth scroll shrink and auto-hide logic
    useEffect(() => {
        const HERO_THRESHOLD = 400;

        const handleScroll = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // 1. Shrink logic — read from ref to avoid stale closure
                    const scrolled = currentScrollY > 80;
                    if (scrolled !== isScrolledRef.current) {
                        isScrolledRef.current = scrolled;
                        setIsScrolled(scrolled);
                    }

                    // 2. Auto-hide logic
                    if (currentScrollY < HERO_THRESHOLD) {
                        if (!isVisibleRef.current) {
                            isVisibleRef.current = true;
                            setIsVisible(true);
                        }
                    } else {
                        const scrollingDown = currentScrollY > lastScrollY.current;
                        const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

                        if (scrollDifference > 4) {
                            const shouldBeVisible = !scrollingDown;
                            if (shouldBeVisible !== isVisibleRef.current) {
                                isVisibleRef.current = shouldBeVisible;
                                setIsVisible(shouldBeVisible);
                            }
                        }
                    }

                    lastScrollY.current = currentScrollY;
                    rafRef.current = null;
                });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []); // ✅ Empty deps — refs prevent stale closures, no re-registration

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    // Derived animation properties for smooth transitions
    const navbarAnimationValues = useMemo(() => {
        if (!isScrolled) {
            return {
                paddingY: 12,
                paddingX: 32,
                height: 58,
                maxWidth: 1180,
                borderRadius: 9999,
                widthOffset: 32,
            };
        } else {
            return {
                paddingY: 6,
                paddingX: 20,
                height: 52,
                maxWidth: 1060,
                borderRadius: 24,
                widthOffset: 64,
            };
        }
    }, [isScrolled]);

    return (
        <>
            <m.nav
                ref={navRef}
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                aria-label="Main navigation"
                role="navigation"
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0.4,
                }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9000,
                    border: "1.5px solid transparent",
                    willChange: isVisible ? "opacity" : "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // ensure inner content is centered
                    // Use CSS transitions for layout properties instead of Framer Motion
                    paddingTop: navbarAnimationValues.paddingY,
                    paddingBottom: navbarAnimationValues.paddingY,
                    paddingLeft: navbarAnimationValues.paddingX,
                    paddingRight: navbarAnimationValues.paddingX,
                    maxWidth: navbarAnimationValues.maxWidth,
                    borderRadius: navbarAnimationValues.borderRadius,
                    width: `calc(100% - ${navbarAnimationValues.widthOffset}px)`,
                    transition: `padding 0.32s cubic-bezier(0.22, 1, 0.36, 1), 
                                 max-width 0.32s cubic-bezier(0.22, 1, 0.36, 1), 
                                 border-radius 0.32s cubic-bezier(0.22, 1, 0.36, 1), 
                                 width 0.32s cubic-bezier(0.22, 1, 0.36, 1)`,
                }}
            >
                <style>{`
                    .navbar {
                        background: rgba(10, 10, 15, 0.3);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        border-color: rgba(255, 255, 255, 0.04);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                    }
                    
                    .navbar.scrolled {
                        background: rgba(10, 10, 15, 0.75);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border-color: rgba(255, 255, 255, 0.1);
                        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                    }
                    
                    /* Smooth CSS transition for background/blur instead of Framer Motion */
                    .navbar {
                        transition: background 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    backdrop-filter 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    border-color 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                                    box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1);
                    }

                    .navbar-inner {
                        display: grid;
                        grid-template-columns: 1fr auto 1fr;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                    }

                    .nav-logo-link {
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        height: 100%;
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
                    }

                    /* 
                       PREMIUM ACTIVE CAPSULE 
                       Uses translate3d for GPU acceleration.
                       Fixed dimensions ensure no stretching or jumping.
                    */
                    .active-capsule {
                        position: absolute;
                        top: 4px; /* matches container padding */
                        left: 4px; /* matches container padding */
                        width: ${LINK_WIDTH}px;
                        height: ${LINK_HEIGHT}px;
                        border-radius: 9999px;
                        background: linear-gradient(180deg, rgba(255, 69, 0, 0.15) 0%, rgba(255, 69, 0, 0.05) 100%);
                        border: 1px solid rgba(255, 69, 0, 0.3);
                        box-shadow: 
                            0 4px 12px rgba(255, 69, 0, 0.15), 
                            inset 0 1px 1px var(--glass-panel),
                            inset 0 0 20px rgba(255, 69, 0, 0.05);
                        z-index: 1;
                        pointer-events: none;
                        transform: translate3d(0, 0, 0);
                        backface-visibility: hidden;
                    }

                    .nav-actions {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
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

                    @media (max-width: 900px) {
                        .desktop-nav-container {
                            display: none;
                        }
                    }
                `}</style>

                <m.div
                    className="navbar-inner"
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: navbarAnimationValues.height }}
                >
                    {/* Logo Section */}
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

                    {/* Desktop Navigation Section */}
                    <div className="desktop-nav-container" role="menubar">
                        {activeIndex >= 0 && (
                            <m.div
                                className="active-capsule"
                                animate={{
                                    x: activeIndex * LINK_WIDTH
                                }}
                                transition={{
                                    type: "tween",
                                    ease: [0.22, 1, 0.36, 1], // Apple-like cubic-bezier
                                    duration: 0.32
                                }}
                                initial={false}
                            />
                        )}

                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.to}
                                link={link}
                                isActive={activeIndex === index}
                            />
                        ))}
                    </div>

                    {/* Actions Section */}
                    <div className="nav-actions">
                        <m.button
                            onClick={toggleLargeText}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle large text"
                            className={`action-button ${largeText ? 'active' : ''}`}
                        >
                            <Sliders size={16} />
                        </m.button>



                        <m.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`action-button ${mobileMenuOpen ? 'active' : ''}`}
                            aria-label="Menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <m.line x1="4" y1="6" x2="20" y2="6" animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }} transition={{ duration: 0.25 }} style={{ transformOrigin: "center" }} />
                                <m.line x1="4" y1="12" x2="20" y2="12" animate={{ opacity: mobileMenuOpen ? 0 : 1 }} transition={{ duration: 0.25 }} />
                                <m.line x1="4" y1="18" x2="20" y2="18" animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }} transition={{ duration: 0.25 }} style={{ transformOrigin: "center" }} />
                            </svg>
                        </m.button>
                    </div>
                </m.div>
            </m.nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1, top: isScrolled ? 88 : 106 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "calc(100% - 40px)",
                            maxWidth: 400,
                            background: "rgba(10, 10, 15, 0.95)",
                            backdropFilter: "blur(32px)",
                            borderRadius: 24,
                            border: "1px solid var(--glass-bg-light)",
                            padding: 16,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            zIndex: 8999,
                            boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--bg-card)",
                        }}
                    >
                        {navLinks.map((link) => {
                            const isMobileActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    style={{ textDecoration: "none" }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <m.div
                                        style={{
                                            padding: "14px 20px",
                                            borderRadius: 16,
                                            display: "flex",
                                            alignItems: "center",
                                            background: isMobileActive ? "linear-gradient(90deg, rgba(255, 69, 0, 0.15), rgba(255, 69, 0, 0.05))" : "transparent",
                                            color: isMobileActive ? "var(--color-primary-orange)" : "var(--text-secondary)",
                                            fontWeight: isMobileActive ? 600 : 500,
                                            border: isMobileActive ? "1px solid rgba(255, 69, 0, 0.2)" : "1px solid transparent",
                                            transition: "all 0.2s ease"
                                        }}
                                        whileHover={{
                                            backgroundColor: !isMobileActive ? "var(--border-primary)" : undefined
                                        }}
                                    >
                                        {link.label}
                                    </m.div>
                                </Link>
                            );
                        })}
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
