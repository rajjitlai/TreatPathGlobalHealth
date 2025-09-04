import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../lib/getUser";
import { BiUser } from "react-icons/bi";
import Saved from "./Saved";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, isInitialized } = useTheme();

  // Ensure theme is applied when Dashboard mounts
  useEffect(() => {
    if (isInitialized) {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme, isInitialized]);

  useEffect(() => {
    if (user) {
      console.log("Fetching profile for user:", user);
      if (!user.$id) {
        console.error("Error: user.id is undefined");
        setLoading(false);
        return;
      }
      getUserProfile(user.id).then((data) => {
        setUserData(data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
  };

  const editClick = () => {
    toast.success("Edit options will be available soon");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-700 dark:text-red-400 font-semibold">Error loading profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 relative mb-6">
              {userData?.image ? (
                <img
                  src={userData.image}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-lg">
                  <BiUser className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-700 rounded-full"></div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {userData?.username || "User Name"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Welcome back! Manage your saved products and profile.
            </p>

            <button
              onClick={editClick}
              className="px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Saved Products Section */}
        <div className="mb-8">
          <Saved />
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
