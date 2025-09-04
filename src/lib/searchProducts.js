import { database } from "../config/appwrite";
import { Query } from "appwrite";

export const searchProducts = async (term) => {
    if (!term || !term.trim()) return [];

    try {
        const databaseId = import.meta.env.VITE_APP_DB;
        const collectionId = import.meta.env.VITE_APP_PROD_COLLECTION;

        // Search by name
        const byName = await database.listDocuments(databaseId, collectionId, [
            Query.search("item_name", term),
            Query.limit(24)
        ]);

        // Search by description
        const byDesc = await database.listDocuments(databaseId, collectionId, [
            Query.search("item_description", term),
            Query.limit(24)
        ]);

        const map = new Map();
        for (const doc of byName.documents) map.set(doc.$id, doc);
        for (const doc of byDesc.documents) map.set(doc.$id, doc);

        return Array.from(map.values());
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};

export default searchProducts;

