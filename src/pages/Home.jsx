
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Services from "../components/Services";
import Contact from "../components/Contact";
import { useState } from "react";
import Layout from "../Layout";
import MobileSidebar from "../components/MobileNavbar";
import useSEO from "../hooks/useSEO";

const Home = () => {
    const [filter, setFilter] = useState("All");

    // SEO for home page
    useSEO({
        title: "Treat Path Global - Quality Health & Pet Care Medicines",
        description: "Discover high-quality healthcare and pet care medicines at Treat Path Global. We provide reliable and effective treatments for your health and pets with genuine products and 24/7 support.",
        type: 'website'
    });

    return (
        <Layout>
            <Hero />
            <Navbar setFilter={setFilter} />
            <MobileSidebar setFilter={setFilter} />
            <div className="section">
                <Products filter={filter} />
            </div>
            <div className="section">
                <Services />
            </div>
            <div className="section" id="contact">
                <Contact />
            </div>
        </Layout>
    );
};

export default Home;
