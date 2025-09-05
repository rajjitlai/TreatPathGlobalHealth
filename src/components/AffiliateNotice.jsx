const AffiliateNotice = () => {
    return (
        <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-600/50 text-blue-800 dark:text-blue-200 rounded-lg p-3 text-sm">
            <p className="text-center">
                <span className="font-medium">Note:</span> We may earn a small commission from purchases made through our links, at no extra cost to you. This helps us maintain our service. <a href="/affiliate-disclosure" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learn more</a>.
            </p>
        </div>
    );
};

export default AffiliateNotice;

