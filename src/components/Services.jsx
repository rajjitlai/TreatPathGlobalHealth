import { FaShieldAlt, FaShippingFast, FaHeadset } from "react-icons/fa";

const Services = () => {
    return (
        <div className="section" id="services">
            <h3 className="text-3xl font-bold mb-8 text-center">Services</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-3 text-primary">
                        <FaShieldAlt />
                        <h4 className="text-xl font-semibold text-gray-900">Genuine Products</h4>
                    </div>
                    <p className="text-gray-600">All medicines are sourced from trusted suppliers and verified for quality.</p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-3 text-primary">
                        <FaShippingFast />
                        <h4 className="text-xl font-semibold text-gray-900">Fast Shipping</h4>
                    </div>
                    <p className="text-gray-600">Quick and reliable delivery so your care is never delayed.</p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-3 text-primary">
                        <FaHeadset />
                        <h4 className="text-xl font-semibold text-gray-900">24/7 Support</h4>
                    </div>
                    <p className="text-gray-600">Friendly customer support team available round the clock.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;
