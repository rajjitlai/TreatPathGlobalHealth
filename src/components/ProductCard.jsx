/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { savePost, deleteSavedPost } from "../lib/createSaved";
import { useAuth } from "../context/AuthContext"; // Get user from AuthContext

const ProductCard = ({ id, img, title, desc, isSaved: initialIsSaved = false, onSaveToggle }) => {
    const { user } = useAuth(); // Get authenticated user
    const userId = user?.$id;

    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [savedRecordId, setSavedRecordId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Update local state when prop changes
    useEffect(() => {
        setIsSaved(initialIsSaved);
    }, [initialIsSaved]);

    const handleSavePost = async (e) => {
        e.stopPropagation();

        if (!userId) {
            console.log("User not logged in");
            return;
        }

        setIsLoading(true);
        try {
            if (isSaved && savedRecordId) {
                console.log("Deleting saved post:", savedRecordId);
                await deleteSavedPost(savedRecordId);
                setIsSaved(false);
                setSavedRecordId(null);
                // Notify parent component
                onSaveToggle?.(id, false);
            } else {
                console.log("Saving post:", id);
                const savedPost = await savePost(id, userId);
                if (savedPost) {
                    setIsSaved(true);
                    setSavedRecordId(savedPost.$id);
                    // Notify parent component
                    onSaveToggle?.(id, true);
                }
            }
        } catch (error) {
            console.error("Error saving/deleting post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="group relative max-w-[320px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Save button with glassmorphism */}
            {userId && (
                <button
                    className="absolute top-4 right-4 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border border-white/50 dark:border-gray-600/50 rounded-full p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSavePost}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                    ) : isSaved ? (
                        <BsBookmarkFill className="text-primary" />
                    ) : (
                        <BsBookmark />
                    )}
                </button>
            )}

            <Link to={`/product/${id}`} className="block">
                {/* Image container with modern styling */}
                <div className="relative overflow-hidden">
                    <img
                        src={img}
                        alt={`${title} product image`}
                        loading="lazy"
                        className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content with glassmorphism */}
                <div className="p-6 space-y-3">
                    <h2 className="text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 font-bold text-lg uppercase tracking-wide">
                        {title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {desc}
                    </p>

                    {/* Modern CTA button */}
                    <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-primary dark:text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                            View Details
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
