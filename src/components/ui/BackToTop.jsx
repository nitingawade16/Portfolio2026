import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [show, setShow] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        // RAF-throttled scroll handler - more efficient than ticking pattern
        const onScroll = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    setShow(window.scrollY > 400);
                    rafRef.current = null;
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <m.button
                    key="btt"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="back-to-top-btn"
                    style={{
                        position: "fixed",
                        bottom: "32px",
                        right: "32px",
                        zIndex: 9999,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "none",
                        background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                        boxShadow: "0 0 20px rgba(0,212,255,0.4)",
                        cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowUp style={{ color: "#ffffff", fontSize: "20px" }} />
                </m.button>
            )}
        </AnimatePresence>
    );
}
