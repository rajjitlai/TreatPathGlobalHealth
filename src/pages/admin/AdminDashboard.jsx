import { useState, useEffect } from "react";
import AdminUpload from "./AdminUpload";
import ContactMessages from "./ContactMessages";
import { useTheme } from "../../context/ThemeContext";

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("upload");
    const { theme, isInitialized } = useTheme();

    // Ensure theme is applied when AdminDashboard mounts
    useEffect(() => {
        if (isInitialized) {
            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme, isInitialized]);

    // Ensure that AdminUpload is shown by default when the component mounts
    useEffect(() => {
        setSelectedTab("upload");
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

            {/* Navigation Tabs */}
            <div className="flex justify-around mb-6 border-b pb-3 dark:border-gray-800">
                <button
                    onClick={() => setSelectedTab("upload")}
                    className={`px-4 py-2 font-medium transition ${selectedTab === "upload" ? "text-primary border-b-2 border-primary" : "text-gray-600 dark:text-gray-400 hover:text-primary"}`}
                >
                    Upload
                </button>
                <button
                    onClick={() => setSelectedTab("contacts")}
                    className={`px-4 py-2 font-medium transition ${selectedTab === "contacts" ? "text-primary border-b-2 border-primary" : "text-gray-600 dark:text-gray-400 hover:text-primary"}`}
                >
                    Contacts
                </button>
            </div>

            {/* Content Switching */}
            <div>
                {selectedTab === "upload" && <AdminUpload />}
                {selectedTab === "contacts" && <ContactMessages />}
            </div>
        </div>
    );
};

export default AdminDashboard;
