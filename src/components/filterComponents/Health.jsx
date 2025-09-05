import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import Pagination from "../Pagination";
import { getProdByTags } from "../../lib/getProductByTags";

const Health = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getProdByTags("health", currentPage, 12);
        setProducts(result.documents);
        setTotalPages(result.totalPages);
        setTotalProducts(result.total);
      } catch (err) {
        console.error("Error fetching products", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Function to truncate long descriptions
  const truncateDescription = (desc, length = 80) => {
    return desc.length > length ? `${desc.substring(0, length)}...` : desc;
  };

  return (
    <div className="container mx-auto px-8 lg:px-16 pt-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Health Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Discover our curated collection of health and wellness products
        </p>
        {totalProducts > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalProducts)} of {totalProducts} products
          </p>
        )}
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
        <>
          <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-x-8 xl:gap-y-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.$id}
                  id={product.$id}
                  img={product.item_image}
                  title={product.item_name}
                  desc={truncateDescription(product.item_description)}
                  price={product.item_price}
                  tags={product.tags}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No health products found.</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default Health;
