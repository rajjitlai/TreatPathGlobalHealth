import { database } from "../config/appwrite";
import { Query } from "appwrite";

export const searchProducts = async (term, page = 1, limit = 12) => {
    if (!term || !term.trim()) return {
        documents: [],
        total: 0,
        page: 1,
        limit: limit,
        totalPages: 0
    };

    try {
        const databaseId = import.meta.env.VITE_APP_DB;
        const collectionId = import.meta.env.VITE_APP_PROD_COLLECTION;

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Get products with ordering and pagination
        const allProducts = await database.listDocuments(databaseId, collectionId, [
            Query.orderDesc('$createdAt'), // Order by creation date, newest first
            Query.limit(200) // Get more products to search through
        ]);

        // Ensure documents is an array
        if (!allProducts || !Array.isArray(allProducts.documents)) {
            console.error("Invalid response from database:", allProducts);
            return {
                documents: [],
                total: 0,
                page: page,
                limit: limit,
                totalPages: 0
            };
        }

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

        // Apply pagination to filtered results
        const total = filteredProducts.length;
        const paginatedResults = filteredProducts.slice(offset, offset + limit);

        return {
            documents: paginatedResults,
            total: total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error("Error searching products:", error);
        return {
            documents: [],
            total: 0,
            page: 1,
            limit: limit,
            totalPages: 0
        };
    }
};

export default searchProducts;

