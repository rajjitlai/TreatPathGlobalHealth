import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdById } from "../../lib/getProdById";
import { getProdByTags } from "../../lib/getProductByTags";
import RelatedProducts from "./RelatedProducts";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AffiliateNotice from "../AffiliateNotice";
import { useEffect as useReactEffect } from "react";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProd, setRelatedProd] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        const fetchProdData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const prodData = await getProdById(id);
                setProduct(prodData);

                if (prodData?.tags?.length > 0) {
                    let relatedProds = await getProdByTags(prodData.tags);
                    relatedProds = relatedProds.filter((prod) => prod.$id !== id);
                    setRelatedProd(relatedProds);
                }
            } catch (err) {
                setError("Failed to fetch product. Please try again later.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProdData();
    }, [id]);

    // Inject Product JSON-LD for SEO
    useReactEffect(() => {
        if (!product) return;
        const data = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.item_name,
            image: product.item_image ? [product.item_image] : [],
            description: product.item_description,
            offers: {
                "@type": "Offer",
                url: window.location.href,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock"
            }
        };
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, [product]);

    if (isLoading) return <h2 className="text-center text-lg">Loading...</h2>;
    if (error) return <h2 className="text-red-500 text-center">{error}</h2>;

    const handleBuyNow = () => {
        if (!user) {
            toast.error("Please login first");
            navigate('/login');
        } else {
            window.location.href = product.item_link;
        }
    };


    return (
        <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Product Details (Full width on small screens, 3/4 on large) */}
            <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6 relative">
                {/* Back Button (Sticky for mobile usability) */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-2 left-2 lg:top-4 lg:left-4 flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    <BsArrowLeft size={20} className="mr-2" /> Back
                </button>

                {product && (
                    <div className="flex flex-col gap-6 mt-10">
                        {/* Product Image */}
                        <div className="w-full flex justify-center">
                            <img
                                src={product.item_image || "https://via.placeholder.com/500"}
                                alt={product.item_name}
                                className="w-full max-w-lg h-auto object-contain rounded-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.item_name}</h2>
                        <p className="text-gray-600">{product.item_description}</p>

                        {/* Affiliate Notice */}
                        <AffiliateNotice />

                        {/* Action Buttons */
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                    </div>
                )}
            </div>

            {/* Right Side - Related Products (Scrollable & full width on mobile) */}
            <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-4 max-h-[600px] overflow-y-auto">
                {relatedProd.length > 0 ? (
                    <RelatedProducts relatedProd={relatedProd} />
                ) : (
                    <p className="text-gray-500 text-center">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
