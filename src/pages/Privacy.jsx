import Layout from "../Layout";

const Privacy = () => {
    return (
        <Layout>
            <div className="section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Privacy Policy</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you use our website.</p>

                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">1. Information We Collect</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We collect information you provide directly to us and information we obtain automatically when you use our services.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Information You Provide</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Account Information:</strong> Email address, username, and password when you create an account</li>
                            <li><strong>Contact Information:</strong> Name and email when you contact us through our contact form</li>
                            <li><strong>Saved Products:</strong> Products you save to your personal dashboard</li>
                            <li><strong>Communication:</strong> Any messages you send to us directly</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Information We Collect Automatically</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Usage Data:</strong> Pages visited, time spent on site, and interaction patterns</li>
                            <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                            <li><strong>Log Data:</strong> IP address, access times, and referring website addresses</li>
                            <li><strong>Cookies and Similar Technologies:</strong> To enhance your browsing experience and analyze site usage</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">2. How We Use Your Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We use the information we collect to provide, maintain, and improve our services.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Provide and maintain your user account</li>
                            <li>Process and respond to your inquiries and requests</li>
                            <li>Send you important updates about our service</li>
                            <li>Improve our website functionality and user experience</li>
                            <li>Analyze usage patterns to optimize our content and services</li>
                            <li>Prevent fraud and ensure website security</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">3. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We use cookies and similar technologies to enhance your experience on our website.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences (like theme selection)</li>
                            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">4. Information Sharing and Disclosure</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating our website</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                            <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">5. Third-Party Links and Services</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Our website contains links to third-party merchants and services. When you click on these links, you are subject to the privacy policies of those external websites. We are not responsible for the privacy practices or content of these third-party sites.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">6. Data Security</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">7. Your Rights and Choices</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You have certain rights regarding your personal information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Access:</strong> Request access to your personal information</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">8. Data Retention</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">9. Children's Privacy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">10. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">11. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            If you have any questions about this privacy policy or our privacy practices, please contact us through our website's contact form or email us directly.
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

export default Privacy;

