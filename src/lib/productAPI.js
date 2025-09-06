/**
 * Product API utilities for n8n automation
 * This provides structured data that n8n can easily consume
 */

/**
 * Get product data in a format suitable for n8n automation
 * @param {Object} product - Product object from database
 * @returns {Object} Structured product data for automation
 */
export const getProductDataForAutomation = (product) => {
    if (!product) return null;

    return {
        // Basic product information
        id: product.$id,
        name: product.item_name,
        description: product.item_description,
        image: product.item_image,
        link: product.item_link,

        // Categorization
        tags: Array.isArray(product.tags) ? product.tags : (product.tags ? [product.tags] : []),
        category: product.category || '',
        brand: product.brand || '',

        // Pricing and availability
        price: product.price || '',
        availability: product.availability || 'in-stock',

        // Metadata
        createdAt: product.$createdAt,
        updatedAt: product.$updatedAt,

        // SEO data
        seo: {
            title: `${product.item_name} | Treat Path Global`,
            description: product.item_description,
            keywords: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ''),
            image: product.item_image,
            url: window.location.href
        },

        // Structured data for search engines
        structuredData: {
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
        }
    };
};

/**
 * Get all products data for automation (useful for bulk operations)
 * @param {Array} products - Array of product objects
 * @returns {Array} Array of structured product data
 */
export const getAllProductsDataForAutomation = (products) => {
    if (!Array.isArray(products)) return [];

    return products.map(product => getProductDataForAutomation(product));
};

/**
 * Create a simple API response format for n8n
 * @param {Object} product - Product object
 * @returns {Object} API response format
 */
export const createAPIResponse = (product) => {
    const productData = getProductDataForAutomation(product);

    return {
        success: true,
        data: productData,
        timestamp: new Date().toISOString(),
        source: 'Treat Path Global'
    };
};

/**
 * Get product data as JSON string (useful for webhooks)
 * @param {Object} product - Product object
 * @returns {string} JSON string of product data
 */
export const getProductDataAsJSON = (product) => {
    return JSON.stringify(createAPIResponse(product), null, 2);
};

export default {
    getProductDataForAutomation,
    getAllProductsDataForAutomation,
    createAPIResponse,
    getProductDataAsJSON
};
