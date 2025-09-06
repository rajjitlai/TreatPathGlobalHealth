import { useEffect, useState } from "react";
import { getUserSavedProducts } from "../lib/createSaved";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook to fetch products with saved status optimization
 * @param {Function} fetchProductsFn - Function to fetch products (e.g., getProd, getProdByTags)
 * @param {Array} staticParams - Static parameters to pass to fetchProductsFn (excluding currentPage)
 * @param {Array} dependencies - Dependencies for useEffect
 * @returns {Object} Products data with saved status
 */
export const useProductsWithSavedStatus = (fetchProductsFn, staticParams = [], dependencies = []) => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [savedProducts, setSavedProducts] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Build fetch parameters with currentPage
                const fetchParams = [...staticParams];

                // For getProd: (page, limit) - currentPage should be first
                // For getProdByTags: (tags, page, limit) - currentPage should be second
                if (staticParams.length === 1) {
                    // getProd case: (page, limit) - staticParams = [12]
                    fetchParams.unshift(currentPage); // Add currentPage at the beginning
                } else if (staticParams.length === 2) {
                    // getProdByTags case: (tags, page, limit) - staticParams = ["health", 12]
                    fetchParams.splice(1, 0, currentPage); // Insert currentPage after tags
                }

                // Fetch products and saved status in parallel
                const [result, savedData] = await Promise.all([
                    fetchProductsFn(...fetchParams),
                    user ? getUserSavedProducts(user.$id) : Promise.resolve([])
                ]);

                setProducts(result.documents || []);
                setTotalPages(result.totalPages || 1);
                setTotalProducts(result.total || 0);

                // Create a Set of saved product IDs for O(1) lookup
                const savedIds = new Set(savedData.map(item => item.product?.$id).filter(Boolean));
                setSavedProducts(savedIds);
            } catch (err) {
                console.error("Error fetching products", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [...dependencies, currentPage, user]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSaveToggle = (productId, isSaved) => {
        const newSavedProducts = new Set(savedProducts);
        if (isSaved) {
            newSavedProducts.add(productId);
        } else {
            newSavedProducts.delete(productId);
        }
        setSavedProducts(newSavedProducts);
    };

    return {
        products,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalProducts,
        savedProducts,
        handlePageChange,
        handleSaveToggle
    };
};

export default useProductsWithSavedStatus;
