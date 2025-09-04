/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => { } });

const THEME_KEY = "treatpath_theme";

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        const initializeTheme = () => {
            try {
                const stored = localStorage.getItem(THEME_KEY);
                if (stored === "dark" || stored === "light") {
                    setTheme(stored);
                } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            } catch (error) {
                console.error("Error initializing theme:", error);
                setTheme("light");
            } finally {
                setIsInitialized(true);
            }
        };

        initializeTheme();
    }, []);

    // Apply theme to document and save to localStorage
    useEffect(() => {
        if (!isInitialized) return;

        const root = document.documentElement;

        // Remove all theme classes first
        root.classList.remove("light", "dark");

        // Add the current theme class
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.add("light");
        }

        // Save to localStorage
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            console.error("Error saving theme to localStorage:", error);
        }
    }, [theme, isInitialized]);

    // Listen for storage changes (in case theme is changed in another tab)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === THEME_KEY && e.newValue) {
                if (e.newValue === "dark" || e.newValue === "light") {
                    setTheme(e.newValue);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            return newTheme;
        });
    };

    const value = useMemo(() => ({
        theme,
        toggleTheme,
        isInitialized,
    }), [theme, isInitialized]);

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};


