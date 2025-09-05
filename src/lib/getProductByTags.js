import { database } from "../config/appwrite";
import { Query } from "appwrite";

export const getProdByTags = async (tags, page = 1, limit = 12) => {
    try {
        const databaseId = import.meta.env.VITE_APP_DB;
        const collectionId = import.meta.env.VITE_APP_PROD_COLLECTION;

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        const response = await database.listDocuments(databaseId, collectionId, [
            Query.contains("tags", tags),
            Query.orderDesc('$createdAt'), // Order by creation date, newest first
            Query.limit(limit),
            Query.offset(offset)
        ]);

        return {
            documents: response.documents,
            total: response.total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(response.total / limit)
        };
    } catch (error) {
        console.error("An error occurred while fetching related products:", error);
        return {
            documents: [],
            total: 0,
            page: 1,
            limit: limit,
            totalPages: 0
        };
    }
};
