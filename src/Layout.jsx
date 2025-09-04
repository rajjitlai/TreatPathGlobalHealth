/* eslint-disable react/prop-types */
import { useEffect } from "react";
import HeaderTop from "./components/HeaderTop";
import HeaderMain from "./components/HeaderMain";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import { useTheme } from "./context/ThemeContext";

const Layout = ({ children }) => {
    const { theme, isInitialized } = useTheme();

    // Ensure theme is applied when Layout mounts
    useEffect(() => {
        if (isInitialized) {
            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme, isInitialized]);

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-page)] dark:bg-gray-950 dark:text-gray-100">
            <HeaderTop />
            <HeaderMain />
            <main className="flex-1 container mx-auto px-4 md:px-16 py-8 md:py-10">
                {children}
            </main>
            <Footer />
            <CookieConsent />
        </div>
    );
};

export default Layout;
