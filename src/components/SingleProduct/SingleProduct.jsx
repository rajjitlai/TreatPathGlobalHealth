import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdById } from "../../lib/getProdById";
import { getProdByTags } from "../../lib/getProductByTags";
import RelatedProducts from "./RelatedProducts";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect as useReactEffect } from "react";
import useSEO from "../../hooks/useSEO";
import { getProductDataForAutomation, createAPIResponse } from "../../lib/productAPI";

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
                    const relatedResponse = await getProdByTags(prodData.tags);
                    let relatedProds = relatedResponse.documents || [];
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

    // Use SEO hook for dynamic meta tags with full description for automation
    useSEO({
        title: product?.item_name,
        description: product?.item_description,
        image: product?.item_image,
        type: 'product',
        fullDescription: true // Use full description for n8n automation
    });

    // Inject comprehensive meta tags and JSON-LD for SEO and automation
    useReactEffect(() => {
        if (!product) return;

        // Add custom meta tags for n8n automation
        const addOrUpdateMetaTag = (name, content, isProperty = false) => {
            const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let metaTag = document.querySelector(selector);

            if (metaTag) {
                metaTag.setAttribute('content', content);
            } else {
                metaTag = document.createElement('meta');
                if (isProperty) {
                    metaTag.setAttribute('property', name);
                } else {
                    metaTag.setAttribute('name', name);
                }
                metaTag.setAttribute('content', content);
                document.head.appendChild(metaTag);
            }
        };

        // Add automation-friendly meta tags
        addOrUpdateMetaTag('product-name', product.item_name);
        addOrUpdateMetaTag('product-description', product.item_description);
        addOrUpdateMetaTag('product-image', product.item_image || '');
        addOrUpdateMetaTag('product-id', product.$id);
        addOrUpdateMetaTag('product-tags', Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ''));
        addOrUpdateMetaTag('product-link', product.item_link || '');
        addOrUpdateMetaTag('product-category', product.category || '');
        addOrUpdateMetaTag('product-brand', product.brand || '');
        addOrUpdateMetaTag('product-price', product.price || '');
        addOrUpdateMetaTag('product-availability', product.availability || 'in-stock');

        // Enhanced JSON-LD structured data
        const data = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.item_name,
            description: product.item_description,
            image: product.item_image ? [product.item_image] : [],
            identifier: product.$id,
            url: window.location.href,
            category: product.category || '',
            brand: product.brand ? {
                "@type": "Brand",
                name: product.brand
            } : undefined,
            offers: {
                "@type": "Offer",
                url: product.item_link || window.location.href,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                price: product.price || "0"
            },
            additionalProperty: Array.isArray(product.tags) ? product.tags.map(tag => ({
                "@type": "PropertyValue",
                name: "tag",
                value: tag
            })) : []
        };

        // Remove undefined properties
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) {
                delete data[key];
            }
        });

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(data);
        document.head.appendChild(script);

        // Make product data available globally for n8n automation
        window.getCurrentProductData = () => {
            return getProductDataForAutomation(product);
        };

        window.getCurrentProductAPIResponse = () => {
            return createAPIResponse(product);
        };

        return () => {
            document.head.removeChild(script);
            // Clean up custom meta tags
            const customMetaTags = [
                'product-name', 'product-description', 'product-image',
                'product-id', 'product-tags', 'product-link',
                'product-category', 'product-brand', 'product-price', 'product-availability'
            ];
            customMetaTags.forEach(name => {
                const tag = document.querySelector(`meta[name="${name}"]`);
                if (tag) {
                    document.head.removeChild(tag);
                }
            });
            // Clean up global functions
            delete window.getCurrentProductData;
            delete window.getCurrentProductAPIResponse;
        };
    }, [product]);

    if (isLoading) return (
        <div className="flex justify-center items-center py-20">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="text-center py-20">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-700 dark:text-red-400 font-semibold">{error}</p>
            </div>
        </div>
    );

    const handleBuyNow = () => {
        if (!user) {
            toast.error("Please login first");
            navigate('/login');
        } else {
            window.location.href = product.item_link;
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
            {/* Left Side - Product Details */}
            <div className="w-full lg:w-3/4 relative">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 flex items-center bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-all duration-300 backdrop-blur-sm"
                    >
                        <BsArrowLeft size={20} className="mr-2" /> Back
                    </button>

                    {product && (
                        <div
                            className="flex flex-col gap-8 mt-12"
                            data-product-id={product.$id}
                            data-product-name={product.item_name}
                            data-product-description={product.item_description}
                            data-product-image={product.item_image}
                            data-product-link={product.item_link}
                            data-product-tags={Array.isArray(product.tags) ? product.tags.join(',') : (product.tags || '')}
                            data-product-category={product.category || ''}
                            data-product-brand={product.brand || ''}
                            data-product-price={product.price || ''}
                        >
                            {/* Product Image */}
                            <div className="w-full flex justify-center">
                                <div className="relative group">
                                    <img
                                        src={product.item_image || "https://via.placeholder.com/500"}
                                        alt={product.item_name}
                                        className="w-full max-w-lg h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {product.item_name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    {product.item_description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleBuyNow}
                                        className="modern-button px-8 py-4 rounded-xl text-lg font-semibold"
                                    >
                                        Know More
                                    </button>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="px-8 py-4 rounded-xl text-lg font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                    >
                                        Browse Similar Products
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Related Products */}
            <div className="w-full lg:w-1/4">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 max-h-[600px] overflow-y-auto">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Related Products</h3>
                    {relatedProd.length > 0 ? (
                        <RelatedProducts relatedProd={relatedProd} />
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No related products found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
