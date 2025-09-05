/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getProdById } from "../../lib/getProdById";
import { updateProdById } from "../../lib/updateProdById";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const EditProdById = ({ productId, onClose }) => {
    const [formData, setFormData] = useState({
        item_name: "",
        item_description: "",
        item_image: "",
        item_link: "",
        tags: [],
    });
    const { theme, isInitialized } = useTheme();

    // Ensure theme is applied when EditProdById mounts
    useEffect(() => {
        if (isInitialized) {
            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme, isInitialized]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProdById(productId);
                setFormData({
                    item_name: product.item_name,
                    item_description: product.item_description,
                    item_image: product.item_image,
                    item_link: product.item_link,
                    tags: product.tags || [],
                });
            } catch (error) {
                toast.error("Error fetching product details");
                console.error(error);
            }
        };
        if (productId) fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagsChange = (e) => {
        setFormData({ ...formData, tags: e.target.value.split(",").map(tag => tag.trim()) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProdById(productId, formData);
            toast.success("Product updated successfully");
            onClose(); // Close the popup
        } catch (error) {
            toast.error("Failed to update product");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                        Item Name:
                        <input
                            type="text"
                            name="item_name"
                            required
                            value={formData.item_name}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </label>

                    <label className="font-medium text-gray-700 dark:text-gray-300">
                        Item Description:
                        <textarea
                            name="item_description"
                            required
                            value={formData.item_description}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows="3"
                        ></textarea>
                    </label>

                    <label className="font-medium text-gray-700 dark:text-gray-300">
                        Item Image Link:
                        <input
                            type="url"
                            name="item_image"
                            required
                            value={formData.item_image}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </label>

                    <label className="font-medium text-gray-700 dark:text-gray-300">
                        Item Link:
                        <input
                            type="url"
                            name="item_link"
                            required
                            value={formData.item_link}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </label>

                    <label className="font-medium text-gray-700 dark:text-gray-300">
                        Tags (comma separated):
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags.join(", ")}
                            onChange={handleTagsChange}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProdById;
