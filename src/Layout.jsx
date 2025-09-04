/* eslint-disable react/prop-types */
import HeaderTop from "./components/HeaderTop";
import HeaderMain from "./components/HeaderMain";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-page)]">
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
