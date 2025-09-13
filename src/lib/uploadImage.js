import { prodBuck, ID } from "../config/appwrite";

export const uploadImage = async (file) => {
    try {
        console.log('Starting upload for file:', {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            constructor: file.constructor.name
        });

        // Validate file object
        if (!(file instanceof File) && !(file instanceof Blob)) {
            throw new Error('Invalid file object provided');
        }

        if (!file.name || file.size === 0) {
            throw new Error('File is empty or has no name');
        }

        const buckId = import.meta.env.VITE_APP_PROD_BUCK;
        
        if (!buckId) {
            throw new Error('Bucket ID is not configured');
        }

        console.log('Using bucket ID:', buckId);
        console.log('Attempting to upload file...');

        const fileResponse = await prodBuck.createFile(buckId, ID.unique(), file);
        const imageId = fileResponse.$id;
        const imageUrl = prodBuck.getFileView(buckId, imageId);

        console.log("Image uploaded successfully:", imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("An error occurred while uploading image:", {
            message: error.message,
            code: error.code,
            type: error.type,
            response: error.response
        });
        return null;
    }
};
