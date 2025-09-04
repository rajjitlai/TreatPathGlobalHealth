/* eslint-disable no-unused-vars */
import { useState } from "react";
import { addProduct } from "../../lib/uploadProducts";
import { uploadImage } from "../../lib/uploadImage";
import { useNavigate } from "react-router-dom";
import EditProd from "./EditProd";

const AdminUpload = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("upload"); // "upload" or "otherOption"

    const [formData, setFormData] = useState({
        item_name: "",
        item_description: "",
        item_image: "",
        item_price: "",
        item_link: "",
        tags: [],
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e) => {
        setFormData({
            ...formData,
            tags: e.target.value.split(",").map(tag => tag.trim()),
        });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            alert("Please select an image first.");
            return;
        }

        setUploading(true);
        try {
            const imageUrl = await uploadImage(imageFile);
            if (imageUrl) {
                setUploadedImageUrl(imageUrl);
                setFormData((prev) => ({ ...prev, item_image: imageUrl }));
            }
        } catch (error) {
            alert("Image upload failed.");
        }
        setUploading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uploadedImageUrl).then(() => {
            alert("Image URL copied!");
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(formData);
            alert("Product added successfully!");
            setFormData({
                item_name: "",
                item_description: "",
                item_image: "",
                item_price: "",
                item_link: "",
                tags: [],
            });
            setImageFile(null);
            setUploadedImageUrl("");
        } catch (error) {
            alert("Error adding product.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>

            {/* Dashboard Navigation */}
            <div className="flex justify-between mb-6 flex-col gap-3 md:flex-row">
                <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-4 py-2 font-semibold rounded transition ${activeTab === "upload" ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 dark:text-gray-200"}`}
                >
                    Upload Product
                </button>
                <button
                    onClick={() => setActiveTab("edit")}
                    className={`px-4 py-2 font-semibold rounded transition ${activeTab === "edit" ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 dark:text-gray-200"}`}
                >
                    Edit or Delete
                </button>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded transition"
                >
                    Dashboard
                </button>
            </div>

            {activeTab === "upload" ? (
                // Upload Product Section
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Image Upload Section */}
                    <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
                        <h3 className="text-lg font-semibold mb-3">Upload Image</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            disabled={uploading}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2 w-full transition"
                        >
                            {uploading ? "Uploading..." : "Upload Image"}
                        </button>

                        {/* Show uploaded image preview & copy URL button */}
                        {uploadedImageUrl && (
                            <div className="mt-4">
                                <img src={uploadedImageUrl} alt="Uploaded Preview" className="w-full h-40 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
                                <div className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        value={uploadedImageUrl}
                                        readOnly
                                        className="w-full p-2 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 ml-2 rounded transition"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Product Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
                        <label className="font-medium">
                            Item Name:
                            <input type="text" name="item_name" required value={formData.item_name} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700" />
                        </label>

                        <label className="font-medium">
                            Item Description:
                            <textarea name="item_description" required value={formData.item_description} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700"></textarea>
                        </label>

                        <label className="font-medium">
                            Item Image Link:
                            <input type="url" name="item_image" required value={formData.item_image} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700" />
                        </label>

                        <label className="font-medium">
                            Item Link:
                            <input type="url" name="item_link" required value={formData.item_link} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700" />
                        </label>

                        <label className="font-medium">
                            Tags (comma separated):
                            <input type="text" name="tags" value={formData.tags.join(", ")} onChange={handleTagsChange} className="w-full p-2 mt-1 border rounded-md outline-none dark:bg-gray-900 dark:border-gray-700" />
                        </label>

                        <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded w-full transition">
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                // Other Admin Option Section
                <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Edit or Delete Product</h3>
                    <EditProd />
                </div>
            )}

            {/* Back Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded transition"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default AdminUpload;
