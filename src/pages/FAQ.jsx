import Layout from "../Layout";

const FAQ = () => {
    return (
        <Layout>
            <div className="section">
                <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    <div className="card p-5">
                        <h3 className="font-semibold">How do affiliate links work?</h3>
                        <p className="text-gray-700 mt-1">When you click a product link, you’re redirected to the merchant’s website. If you make a purchase, we may earn a commission. The price you pay is the same.</p>
                    </div>
                    <div className="card p-5">
                        <h3 className="font-semibold">Is this medical advice?</h3>
                        <p className="text-gray-700 mt-1">No. Our content is for informational purposes only. Consult a qualified professional for medical decisions.</p>
                    </div>
                    <div className="card p-5">
                        <h3 className="font-semibold">Where do products come from?</h3>
                        <p className="text-gray-700 mt-1">Products are offered by third-party merchants. Always confirm availability, shipping, and returns on the merchant’s website.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;

