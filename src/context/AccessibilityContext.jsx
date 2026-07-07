import { createContext, useContext, useState, useEffect } from "react";

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
    const [largeText, setLargeText] = useState(() => {
        return localStorage.getItem("ng-acc-large") === "true";
    });
    const [highContrast, setHighContrast] = useState(() => {
        return localStorage.getItem("ng-acc-contrast") === "true";
    });
    const [reducedMotion, setReducedMotion] = useState(() => {
        const savedM = localStorage.getItem("ng-acc-motion");
        if (savedM !== null) return savedM === "true";
        return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const savedL = localStorage.getItem("ng-acc-large");
        const savedC = localStorage.getItem("ng-acc-contrast");
        const savedM = localStorage.getItem("ng-acc-motion");
        if (savedL) setLargeText(savedL === "true");
        if (savedC) setHighContrast(savedC === "true");
        if (savedM) setReducedMotion(savedM === "true");
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (largeText) {
            root.classList.add("acc-large-text");
        } else {
            root.classList.remove("acc-large-text");
        }
    }, [largeText]);

    useEffect(() => {
        const root = document.documentElement;
        if (highContrast) {
            root.classList.add("acc-high-contrast");
        } else {
            root.classList.remove("acc-high-contrast");
        }
    }, [highContrast]);

    useEffect(() => {
        const root = document.documentElement;
        if (reducedMotion) {
            root.classList.add("acc-reduced-motion");
        } else {
            root.classList.remove("acc-reduced-motion");
        }
    }, [reducedMotion]);

    const toggleLargeText = () => {
        const next = !largeText;
        setLargeText(next);
        localStorage.setItem("ng-acc-large", String(next));
    };

    const toggleHighContrast = () => {
        const next = !highContrast;
        setHighContrast(next);
        localStorage.setItem("ng-acc-contrast", String(next));
    };

    const toggleReducedMotion = () => {
        const next = !reducedMotion;
        setReducedMotion(next);
        localStorage.setItem("ng-acc-motion", String(next));
    };

    return (
        <AccessibilityContext.Provider
            value={{
                largeText,
                highContrast,
                reducedMotion,
                toggleLargeText,
                toggleHighContrast,
                toggleReducedMotion,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export const useAccessibility = () => useContext(AccessibilityContext);
