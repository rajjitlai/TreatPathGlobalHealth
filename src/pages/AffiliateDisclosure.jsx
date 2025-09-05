import Layout from "../Layout";

const AffiliateDisclosure = () => {
    return (
        <Layout>
            <div className="section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Affiliate Disclosure</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">This page explains our affiliate relationships and how they work.</p>

                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-xl p-6 mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Affiliate Program</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                This website participates in affiliate marketing programs. This means we may earn commissions on qualifying purchases made through our links to retailer sites. Prices and availability are subject to change. Our goal is to help users discover relevant products; recommendations are not medical advice. Always consult professionals when appropriate.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">How It Works</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            When you click on a product link on our website, you may be redirected to a third-party merchant's website. If you make a purchase through that link, we may receive a small commission at no additional cost to you.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Transparency & Trust</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>We only recommend products we believe are valuable to our users</li>
                            <li>All affiliate relationships are disclosed transparently</li>
                            <li>Commission earnings help us maintain and improve our service</li>
                            <li>You are under no obligation to purchase through our links</li>
                            <li>The price you pay is exactly the same as if you found the product directly</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Important Disclaimers</h2>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-600 rounded-xl p-6 mb-6">
                            <p className="text-amber-800 dark:text-amber-200 font-semibold mb-2">Medical Advice Disclaimer</p>
                            <p className="text-amber-700 dark:text-amber-300">
                                Our product recommendations are for informational purposes only and should not be considered as medical advice. Always consult with qualified healthcare professionals before making any health-related decisions for yourself or your pets.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Product Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Product details, pricing, and availability are provided by third-party merchants and may change without notice. We recommend verifying current information directly on the merchant's website before making any purchases.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Your Privacy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            When you click on affiliate links, you may be subject to the privacy policies of the respective merchant websites. We encourage you to review their privacy policies before making any purchases.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            If you have any questions about our affiliate relationships or this disclosure, please feel free to contact us through our <a href="/#contact" className="text-primary hover:text-secondary underline">contact form</a>.
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-8">
                            <p className="text-gray-600 dark:text-gray-400 text-center font-medium">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AffiliateDisclosure;

