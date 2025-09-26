import { useEffect, useState } from "react";
import { getProd } from "../../lib/getProd";
import { deleteProdById } from "../../lib/deleteProdById";
import toast from "react-hot-toast";
import EditProdById from "./EditProdById";
import { useTheme } from "../../context/ThemeContext";

const EditProd = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme, isInitialized } = useTheme();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const prodList = await getProd();
            const docs = Array.isArray(prodList?.documents) ? prodList.documents : [];
            setProducts(docs);
        } catch (error) {
            toast.error("Error fetching products");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Ensure theme is applied when EditProd mounts
    useEffect(() => {
        if (isInitialized) {
            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme, isInitialized]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProdById(id);
                toast.success("Product deleted successfully");
                fetchProducts();
            } catch (error) {
                toast.error("Failed to delete product");
                console.error(error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit or Delete Products</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product catalog</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    Product Name
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr
                                        key={product.$id}
                                        className={`border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-white/50 dark:bg-gray-900/50' : 'bg-gray-50/30 dark:bg-gray-800/20'
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={product.item_image || "https://via.placeholder.com/40"}
                                                    alt={product.item_name}
                                                    className="w-10 h-10 object-cover rounded-lg"
                                                />
                                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {product.item_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-3">
                                                <button
                                                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                                                    onClick={() => setSelectedProductId(product.$id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                                                    onClick={() => handleDelete(product.$id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-6 py-12 text-center">
                                        <div className="text-gray-500 dark:text-gray-400">
                                            <p className="text-lg font-medium">No products found</p>
                                            <p className="text-sm mt-1">Add some products to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedProductId && (
                <EditProdById
                    productId={selectedProductId}
                    onClose={() => {
                        setSelectedProductId(null);
                        fetchProducts();
                    }}
                />
            )}
        </div>
    );
};

export default EditProd;
