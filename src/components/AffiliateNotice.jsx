const AffiliateNotice = () => {
    return (
        <div className="card p-4 md:p-5 border border-amber-200 bg-amber-50 text-amber-900 rounded-xl">
            <h3 className="font-semibold mb-1">Affiliate Notice</h3>
            <p className="text-sm">
                We may earn a commission when you purchase through links on our site. This helps support our work at no extra cost to you. Learn more in our <a href="/affiliate-disclosure" className="underline text-amber-900 hover:text-amber-700">Affiliate Disclosure</a>.
            </p>
        </div>
    );
};

export default AffiliateNotice;

