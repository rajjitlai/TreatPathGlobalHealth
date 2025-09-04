import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchProducts from "../lib/searchProducts";
import ProductCard from "../components/ProductCard";
import Layout from "../Layout";
import { BsSearch } from "react-icons/bs";

const useDebouncedValue = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
};

const Search = () => {
    const [params, setParams] = useSearchParams();
    const initialQ = params.get("q") || "";
    const [q, setQ] = useState(initialQ);
    const debouncedQ = useDebouncedValue(q, 350);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setParams((prev) => {
            const p = new URLSearchParams(prev);
            if (q) p.set("q", q); else p.delete("q");
            return p;
        }, { replace: true });
    }, [q, setParams]);

    useEffect(() => {
        const run = async () => {
            if (!debouncedQ) { setResults([]); return; }
            setLoading(true);
            const items = await searchProducts(debouncedQ);
            setResults(items);
            setLoading(false);
        };
        run();
    }, [debouncedQ]);

    const placeholder = useMemo(() => "Search products, brands, tags...", []);

    return (
        <Layout>
            <div className="section">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Search Products
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Find exactly what you're looking for with our advanced search
                    </p>
                </div>

                <div className="max-w-2xl mx-auto relative">
                    <div className="relative">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 pl-12 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800/50 dark:text-gray-100 backdrop-blur-sm transition-all duration-300"
                        />
                        <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                        </div>
                    </div>
                ) : q && results.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                No products found for "{q}"
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-x-8 xl:gap-y-8 mt-12">
                        {results.map((product) => (
                            <ProductCard
                                key={product.$id}
                                id={product.$id}
                                img={product.item_image}
                                title={product.item_name}
                                desc={product.item_description}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Search;

