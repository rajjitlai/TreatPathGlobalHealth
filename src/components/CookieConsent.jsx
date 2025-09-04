import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent_accepted_v1";

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem(STORAGE_KEY);
        if (!accepted) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
            <div className="card p-4 md:p-5 border border-gray-200 bg-white shadow-lg md:min-w-[560px]">
                <p className="text-sm text-gray-700">
                    We use cookies to improve your experience, analyze traffic, and serve relevant content. By using this site, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>
                <div className="mt-3 flex gap-2 justify-end">
                    <button onClick={accept} className="px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary text-sm font-semibold">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;

