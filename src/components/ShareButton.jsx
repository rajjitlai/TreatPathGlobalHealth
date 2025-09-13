import { useState } from 'react';
import { BsShare } from 'react-icons/bs';
import toast from 'react-hot-toast';

const ShareButton = ({ 
    url = window.location.href, 
    title = 'Check out this product!', 
    text = 'I found this interesting product and thought you might like it.',
    className = '',
    size = 'md' 
}) => {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (isSharing) return;
        
        setIsSharing(true);
        
        try {
            // Check if Web Share API is available
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url,
                });
                toast.success('Shared successfully!');
            } else {
                // Fallback to copying to clipboard
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
            }
        } catch (error) {
            // Handle user cancellation or other errors
            if (error.name === 'AbortError') {
                // User cancelled the share dialog
                return;
            }
            
            // If clipboard API also fails, show error
            console.error('Error sharing:', error);
            toast.error('Failed to share. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const iconSizes = {
        sm: 16,
        md: 18,
        lg: 20
    };

    return (
        <button
            onClick={handleShare}
            disabled={isSharing}
            className={`
                inline-flex items-center gap-2 
                bg-gradient-to-r from-blue-500 to-blue-600 
                hover:from-blue-600 hover:to-blue-700 
                text-white font-semibold rounded-xl 
                transition-all duration-300 
                hover:scale-105 hover:shadow-lg 
                disabled:opacity-50 disabled:cursor-not-allowed 
                disabled:hover:scale-100
                ${sizeClasses[size]}
                ${className}
            `}
            title="Share this product"
        >
            {isSharing ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
                <BsShare size={iconSizes[size]} />
            )}
            Share
        </button>
    );
};

export default ShareButton;