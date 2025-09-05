import { FaFacebook, FaInstagram, FaSnapchat, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 text-black py-10 mt-16 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100">
            <div className="container px-4 md:px-16 grid md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">TREAT PATH GLOBAL</h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Quality Health and Pet Care Medicines
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Company</h3>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/#products" className="hover:text-primary hover:underline">Products</Link></li>
                            <li><Link to="/#services" className="hover:text-primary hover:underline">Services</Link></li>
                            <li><Link to="/about" className="hover:text-primary hover:underline">About</Link></li>
                            <li><Link to="/faq" className="hover:text-primary hover:underline">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Support</h3>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/#contact" className="hover:text-primary hover:underline">Contact Us</Link></li>
                            <li><Link to="/terms" className="hover:text-primary hover:underline">Terms</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary hover:underline">Privacy</Link></li>
                            <li><Link to="/affiliate-disclosure" className="hover:text-primary hover:underline">Affiliate Disclosure</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Follow Us</h3>
                    <div className="flex space-x-4 mt-3">
                        <a href="https://www.facebook.com/profile.php?id=61561559393495" target='_blank' className="hover:text-primary" rel="noreferrer"><FaFacebook size={20} /></a>
                        <a href="https://www.snapchat.com/add/treatpathglobal?share_id=Nz03kAb8DLI&locale=en-US" target='_blank' className="hover:text-primary" rel="noreferrer"><FaSnapchat size={20} /></a>
                        <a href="https://www.instagram.com/treatpathglobal/" target='_blank' className="hover:text-primary" rel="noreferrer"><FaInstagram size={20} /></a>
                        <a href="https://in.pinterest.com/treatpath/" target='_blank' className="hover:text-primary" rel="noreferrer"><FaPinterest size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 border-t border-gray-100 pt-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                © 2024 - {new Date().getFullYear()} TREAT PATH GLOBAL. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
