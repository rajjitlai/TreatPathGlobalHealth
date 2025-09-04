import Layout from "../Layout";

const Terms = () => {
    return (
        <Layout>
            <div className="section">
                <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-gray-600 mb-4">Welcome to Treat Path Global. By using our website, you agree to the following terms.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Affiliate Links: We list products from third-party merchants and may earn commissions when you purchase via our links.</li>
                    <li>No Medical Advice: Content is for informational purposes only and not a substitute for professional advice.</li>
                    <li>Pricing and Availability: Product details may change without notice. Verify on the merchant site before purchasing.</li>
                    <li>User Accounts: You are responsible for maintaining account security and activity under your account.</li>
                    <li>Limitation of Liability: We are not responsible for transactions or issues arising from third-party merchants.</li>
                </ul>
            </div>
        </Layout>
    );
};

export default Terms;

