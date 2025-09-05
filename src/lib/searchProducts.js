import { database } from "../config/appwrite";
import { Query } from "appwrite";

export const searchProducts = async (term) => {
    if (!term || !term.trim()) return [];

    try {
        const databaseId = import.meta.env.VITE_APP_DB;
        const collectionId = import.meta.env.VITE_APP_PROD_COLLECTION;

        // First try to get all products and filter client-side for better results
        const allProducts = await database.listDocuments(databaseId, collectionId, [
            Query.limit(100) // Get more products to search through
        ]);

        const searchTerm = term.toLowerCase().trim();

        // Filter products by name, description, and tags
        const filteredProducts = allProducts.documents.filter((product) => {
            const name = (product.item_name || '').toLowerCase();
            const description = (product.item_description || '').toLowerCase();

            // Normalize tags to a lowercase string regardless of data shape
            let tagsText = '';
            const { tags } = product;
            if (Array.isArray(tags)) {
                tagsText = tags
                    .filter((t) => typeof t === 'string')
                    .map((t) => t.toLowerCase())
                    .join(',');
            } else if (typeof tags === 'string') {
                tagsText = tags.toLowerCase();
            }

            return (
                name.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tagsText.includes(searchTerm)
            );
        });

        return filteredProducts.slice(0, 24); // Limit to 24 results
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};

export default searchProducts;

