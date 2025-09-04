import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchProducts from "../lib/searchProducts";
import ProductCard from "../components/ProductCard";
import Layout from "../Layout";

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
                <div className="max-w-2xl mx-auto">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={placeholder}
                        className="w-full border border-gray-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>

                {loading ? (
                    <p className="text-center mt-6">Searching...</p>
                ) : (
                    <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10 mt-8">
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

