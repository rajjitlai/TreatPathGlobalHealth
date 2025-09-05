import Layout from "../Layout";

const About = () => {
    return (
        <Layout>
            <div className="section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">About Treat Path Global</h1>

                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                            Welcome to Treat Path Global, your trusted destination for discovering quality health and pet care products. We are passionate about helping you find effective treatments and wellness solutions that make a real difference in your life and the lives of your beloved pets.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Our mission is to bridge the gap between you and high-quality health and pet care products by carefully curating items from reputable merchants. We believe that everyone deserves access to effective treatments and wellness solutions, and we're here to help you make informed decisions.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">What We Do</h2>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Research and review health and pet care products from trusted suppliers</li>
                            <li>Provide detailed product information and descriptions to help you make informed choices</li>
                            <li>Organize products by categories and tags for easy browsing</li>
                            <li>Connect you directly with reputable merchants for your purchases</li>
                            <li>Maintain up-to-date information about product availability and pricing</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Our Commitment to You</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We are committed to transparency and honesty in everything we do. As an affiliate site, we may earn small commissions when you purchase through our links—this helps us maintain our service and continue providing valuable product recommendations at no extra cost to you.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            <strong>Important:</strong> Always verify product details, pricing, and availability on the merchant's website before making a purchase. For medical decisions, please consult with qualified healthcare professionals.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Why Choose Us</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Quality Focus</h3>
                                <p className="text-gray-600 dark:text-gray-400">We only feature products from reputable merchants with proven track records.</p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Easy Navigation</h3>
                                <p className="text-gray-600 dark:text-gray-400">Our intuitive design makes it simple to find exactly what you're looking for.</p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Regular Updates</h3>
                                <p className="text-gray-600 dark:text-gray-400">We continuously update our product catalog with new and relevant items.</p>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Customer Support</h3>
                                <p className="text-gray-600 dark:text-gray-400">We're here to help with any questions or concerns you may have.</p>
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-center text-lg font-medium">
                            Thank you for choosing Treat Path Global as your trusted partner in health and pet care.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;

