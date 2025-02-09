/* eslint-disable react/prop-types */
import HeaderTop from "./components/HeaderTop";
import HeaderMain from "./components/HeaderMain";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderTop />
            <HeaderMain />
            <main className="flex-1 container mx-auto px-4 md:px-16 py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
