import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Toaster } from "react-hot-toast";

// Conditionally inject Google AdSense only in production when publisher ID is provided
if (import.meta.env.PROD) {
  const adsensePublisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
  if (adsensePublisherId) {
    try {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsensePublisherId)}`;
      script.crossOrigin = "anonymous";
      script.onerror = () => {
        // Likely blocked by an ad blocker; ignore to reduce console noise
        if (typeof console !== "undefined" && console.debug) {
          console.debug("AdSense script blocked or failed to load.");
        }
      };
      document.head.appendChild(script);
    } catch {
      // No-op; avoid crashing if document/head is unavailable for some reason
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
