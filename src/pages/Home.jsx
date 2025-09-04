
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Services from "../components/Services";
import Contact from "../components/Contact";
import { useState } from "react";
import Layout from "../Layout";
import MobileSidebar from "../components/MobileNavbar";
import AffiliateNotice from "../components/AffiliateNotice";

const Home = () => {
    const [filter, setFilter] = useState("All");

    return (
        <Layout>
            <Hero />
            <Navbar setFilter={setFilter} />
            <MobileSidebar setFilter={setFilter} />
            <div className="section">
                <AffiliateNotice />
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
