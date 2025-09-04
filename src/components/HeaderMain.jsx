import logo from "../assets/icon.png";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const HeaderMain = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const userCheck = user?.labels?.includes("admin");

    const handleProtectedRoute = (e) => {
        if (!user) {
            e.preventDefault();
            toast.error("Please login to save your favorite product.")
            navigate("/login");
        }
    };

    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100 py-4">
            <div className="container px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                <Link to="/">
                    <img src={logo} alt="Treat Path Global logo" className="w-16 md:w-20 transition-transform hover:scale-105" />
                </Link>

                <div className="w-full sm:w-[320px] md:w-[60%] relative">
                    <form action="/search" onSubmit={(e) => { e.preventDefault(); const q = e.currentTarget.query.value; if (q?.trim()) navigate(`/search?q=${encodeURIComponent(q)}`); }}>
                        <input
                            name="query"
                            type="text"
                            placeholder="Search products..."
                            className="border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition border outline-none p-2 px-4 rounded-full w-full"
                        />
                    </form>
                    <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" size={20} />
                </div>

                <div className="hidden lg:flex gap-4 cursor-pointer items-center">
                    <Link to="/saved" onClick={handleProtectedRoute} className="text-black hover:text-primary hover:underline font-semibold items-center justify-center flex text-base">
                        Saved
                    </Link>

                    {user ? (
                        <Link
                            to={userCheck ? "/admin" : "/dashboard"}
                            className="flex items-center gap-2 text-base font-semibold text-gray-700 hover:text-primary"
                        >
                            <span>{user.username}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1 text-black hover:text-primary hover:underline font-semibold text-base">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;
