import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteSavedPost, getUserSavedProducts } from "../../lib/createSaved";

const Saved = () => {
    const { user, loading: authLoading } = useAuth();
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedItems = async () => {
            if (!user) return;

            try {
                const savedItems = await getUserSavedProducts(user.$id);
                setSaved(savedItems || []);
            } catch (error) {
                console.error("Error fetching saved items:", error);
                setSaved([]);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchSavedItems();
        }
    }, [user, authLoading]);

    const deleteSave = async (id) => {
        try {
            await deleteSavedPost(id);
            setSaved(saved.filter((item) => item.$id !== id));
        } catch (error) {
            console.error("Error deleting saved product:", error);
        }
    };

    const truncateDescription = (desc, length = 100) => {
        return desc.length > length ? `${desc.substring(0, length)}...` : desc;
    };

    if (authLoading) {
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
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Saved Products</h2>
                <p className="text-gray-600 dark:text-gray-400">Your favorite products in one place</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                    </div>
                </div>
            ) : saved.length === 0 ? (
                <div className="text-center py-20">
                    <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No saved products found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Start saving products to see them here</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saved.map((product) => {
                        const productData = product.product;

                        if (!productData || !productData.item_image) {
                            return (
                                <div key={product.$id} className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                    <p className="text-red-700 dark:text-red-400 text-sm">Invalid product data</p>
                                </div>
                            );
                        }

                        return (
                            <div key={product.$id} className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={productData.item_image}
                                        alt={productData.item_name}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                    {productData.item_name}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {truncateDescription(productData.item_description)}
                                </p>

                                <div className="flex justify-between gap-3">
                                    <a
                                        href={`/product/${productData.$id}`}
                                        className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => deleteSave(product.$id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Back Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Saved;
