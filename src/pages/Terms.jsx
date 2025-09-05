import Layout from "../Layout";

const Terms = () => {
    return (
        <Layout>
            <div className="section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Terms and Conditions</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Welcome to Treat Path Global. By using our website, you agree to the following terms and conditions. Please read them carefully.</p>

                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            By accessing and using Treat Path Global ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">2. Affiliate Relationships</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Treat Path Global is an affiliate website that features products from third-party merchants. We may earn commissions when you purchase products through our affiliate links. This does not affect the price you pay for products.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>All affiliate relationships are disclosed transparently</li>
                            <li>We only recommend products we believe are valuable to our users</li>
                            <li>Commission earnings help us maintain and improve our service</li>
                            <li>You are under no obligation to purchase through our links</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">3. Medical and Health Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Important Disclaimer:</strong> The information provided on this website is for informational purposes only and is not intended as medical advice, diagnosis, or treatment.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Always consult with qualified healthcare professionals before making medical decisions</li>
                            <li>Product information is provided by third-party merchants and may not be verified by us</li>
                            <li>We do not provide medical advice or recommendations</li>
                            <li>Individual results may vary and are not guaranteed</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">4. Product Information and Pricing</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We strive to provide accurate and up-to-date product information, but we cannot guarantee the accuracy of all details.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Product details, pricing, and availability may change without notice</li>
                            <li>Always verify current information on the merchant's website before purchasing</li>
                            <li>We are not responsible for pricing discrepancies or product unavailability</li>
                            <li>Product images and descriptions are provided by third-party merchants</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">5. User Accounts and Responsibilities</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you create an account with us, you are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Providing accurate and current information</li>
                            <li>Notifying us immediately of any unauthorized use of your account</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">6. Limitation of Liability</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Treat Path Global shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our service, including but not limited to damages for loss of profits, use, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">7. Third-Party Websites</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Our website contains links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. When you click on these links, you are subject to the terms and conditions of the respective websites.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">8. Changes to Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">9. Contact Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            If you have any questions about these Terms and Conditions, please contact us through our website's contact form or email us directly.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-lg p-6 mt-8">
                            <p className="text-blue-800 dark:text-blue-200 text-center font-medium">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Terms;

