import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProd } from "../lib/getProd";

// Import other product category components
import Health from "./filterComponents/Health";
import Pets from "./filterComponents/Pets";
import Men from "./filterComponents/Men";
import Women from "./filterComponents/Women";
import Hot from "./filterComponents/Hot";

// eslint-disable-next-line react/prop-types
const Products = ({ filter }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (filter === "All") {
            const fetchProducts = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const gotProd = await getProd();
                    setProducts(gotProd);
                } catch (err) {
                    console.error("Error fetching products", err);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchProducts();
        }
    }, [filter]);

    const truncateDescription = (desc, length = 100) => {
        return desc.length > length ? `${desc.substring(0, length)}...` : desc;
    };

    if (filter === "Hot") return <Hot />;
    if (filter === "Health") return <Health />;
    if (filter === "Pets") return <Pets />;
    if (filter === "Men") return <Men />;
    if (filter === "Women") return <Women />;

    return (
        <div className="container px-8 lg:px-16 pt-16 mx-auto" id="products">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Featured Products
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover our curated collection of premium health and pet care products
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                    </div>
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
                        <p className="text-red-700 dark:text-red-400 font-semibold">Error: {error}</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-x-8 xl:gap-y-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.$id}
                                id={product.$id}
                                img={product.item_image}
                                title={product.item_name}
                                desc={truncateDescription(product.item_description)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">No products found.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
