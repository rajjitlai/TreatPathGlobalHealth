import Layout from "../Layout";

const Privacy = () => {
    return (
        <Layout>
            <div className="section">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-4">We value your privacy. This policy explains what data we collect and how we use it.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Account Data: We collect email and username to provide account services.</li>
                    <li>Usage Data: We may collect analytics to improve our website performance and content.</li>
                    <li>Cookies: Used for session management and user preferences. You can control cookies in your browser.</li>
                    <li>Third Parties: We link to third-party merchants; their privacy practices apply when you visit their sites.</li>
                    <li>Contact: For privacy inquiries, use the contact form on our website.</li>
                </ul>
            </div>
        </Layout>
    );
};

export default Privacy;

