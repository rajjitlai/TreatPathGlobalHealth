import {Query} from "appwrite"
import { database } from "../config/appwrite"

export const getProd = async (page = 1, limit = 12) =>{
    try{
        const databaseId = import.meta.env.VITE_APP_DB
        const collectionId = import.meta.env.VITE_APP_PROD_COLLECTION

        // Calculate offset for pagination
        const offset = (page - 1) * limit

        const response = await database.listDocuments(databaseId, collectionId, [
            Query.orderDesc('$createdAt'), // Order by creation date, newest first
            Query.limit(limit),
            Query.offset(offset)
        ])
        
        return {
            documents: response.documents,
            total: response.total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(response.total / limit)
        }
    }catch(error){
        console.error("An error occurred", error)
        return {
            documents: [],
            total: 0,
            page: 1,
            limit: limit,
            totalPages: 0
        }
    }
}