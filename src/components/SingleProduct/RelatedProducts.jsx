/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProd }) => {
    return (
        <div className="space-y-4">
            {relatedProd.map((product) => (
                <Link to={`/product/${product.$id}`} key={product.$id} className="group block">
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 flex items-center gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={product.item_image || "https://via.placeholder.com/80"}
                                alt={product.item_name}
                                className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                                {product.item_name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {product.item_description?.substring(0, 60)}...
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedProducts;
