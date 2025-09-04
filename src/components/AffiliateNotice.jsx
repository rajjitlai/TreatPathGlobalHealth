const AffiliateNotice = () => {
    return (
        <div className="card p-4 md:p-5 border border-amber-200/50 dark:border-amber-600/50 bg-amber-50/80 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold mb-1 text-amber-800 dark:text-amber-200">Affiliate Notice</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
                We may earn a commission when you purchase through links on our site. This helps support our work at no extra cost to you. Learn more in our <a href="/affiliate-disclosure" className="underline text-amber-800 dark:text-amber-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Affiliate Disclosure</a>.
            </p>
        </div>
    );
};

export default AffiliateNotice;

