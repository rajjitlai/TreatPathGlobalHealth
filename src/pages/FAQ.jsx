import Layout from "../Layout";

const FAQ = () => {
    return (
        <Layout>
            <div className="section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Frequently Asked Questions</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Find answers to common questions about our service, products, and policies.</p>

                    <div className="space-y-6">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do affiliate links work?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                When you click on a product link on our website, you're redirected to the merchant's website where the product is sold. If you make a purchase through that link, we may earn a small commission from the merchant. This commission comes at no extra cost to you - the price you pay is exactly the same as if you had found the product directly on the merchant's website. This helps us maintain our service and continue providing valuable product recommendations.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Is this medical advice?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>No, absolutely not.</strong> Our content is for informational purposes only and should never be considered as medical advice, diagnosis, or treatment. We are not healthcare professionals, and the information on our website is not a substitute for professional medical advice. Always consult with qualified healthcare professionals, veterinarians, or other appropriate specialists before making any medical decisions for yourself or your pets.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Where do products come from?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                All products featured on our website are offered by third-party merchants and retailers. We carefully select reputable merchants to ensure quality and reliability. However, we are not responsible for the products themselves, their availability, pricing, shipping, or returns. Always confirm current information, including availability, shipping policies, return policies, and pricing directly on the merchant's website before making a purchase.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do I create an account?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Creating an account is simple and free. Click on the "Sign Up" button in the top navigation, provide your email address and create a password, then verify your email address. Having an account allows you to save products to your personal dashboard, access your saved items across devices, and receive updates about new products and features.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How often is product information updated?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                We regularly update our product catalog with new items and refresh existing product information. However, product details, pricing, and availability can change frequently on merchant websites. We recommend always checking the current information on the merchant's website before making a purchase to ensure accuracy and availability.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I trust the product recommendations?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                We strive to feature products from reputable merchants and provide accurate information. However, we cannot guarantee the quality, effectiveness, or suitability of any product for your specific needs. We recommend researching products thoroughly, reading customer reviews on the merchant's website, and consulting with appropriate professionals before making purchasing decisions.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do I contact customer support?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                You can contact us through our contact form on the website, or reach out to us directly via email. We aim to respond to all inquiries within 24-48 hours. For issues related to specific products or orders, please contact the merchant directly as they handle all transactions and customer service for their products.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Is my personal information safe?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Yes, we take your privacy seriously. We only collect necessary information to provide our services and never sell your personal data to third parties. We use industry-standard security measures to protect your information. For detailed information about how we handle your data, please review our Privacy Policy.
                            </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I suggest products to be featured?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                We welcome product suggestions from our users! If you know of a quality health or pet care product that you think would be valuable to our community, please contact us with the details. We review all suggestions and may add them to our catalog if they meet our quality standards and come from reputable merchants.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Still have questions?</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                If you didn't find the answer you were looking for, we're here to help!
                            </p>
                            <a
                                href="/#contact"
                                className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;

