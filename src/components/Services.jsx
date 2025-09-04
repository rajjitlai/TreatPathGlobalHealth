import { FaShieldAlt, FaShippingFast, FaHeadset } from "react-icons/fa";

const Services = () => {
    return (
        <div className="section" id="services">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Our Services
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Delivering excellence in healthcare and pet care with cutting-edge solutions
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service Card 1 */}
                <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                                <FaShieldAlt className="text-white text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Genuine Products
                            </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            All medicines are sourced from trusted suppliers and verified for quality with advanced authentication systems.
                        </p>

                        {/* Hover effect indicator */}
                        <div className="mt-6 flex items-center gap-2 text-primary dark:text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Learn More</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Service Card 2 */}
                <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-lg">
                                <FaShippingFast className="text-white text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Fast Shipping
                            </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Quick and reliable delivery with real-time tracking so your care is never delayed.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-primary dark:text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Track Order</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Service Card 3 */}
                <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-secondary to-accent rounded-2xl shadow-lg">
                                <FaHeadset className="text-white text-2xl" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                24/7 Support
                            </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Friendly customer support team available round the clock with AI-powered assistance.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-primary dark:text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Get Help</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
