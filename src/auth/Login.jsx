import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import banner from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const { theme, isInitialized } = useTheme();

    // Ensure theme is applied when Login mounts
    useEffect(() => {
        if (isInitialized) {
            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme, isInitialized]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="flex-1 flex justify-center items-center w-full p-4">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-2xl p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome Back</h2>
                        <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="modern-input"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="modern-input"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full modern-button py-4 rounded-xl text-lg font-semibold"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-primary dark:text-primary font-semibold hover:underline transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center p-8">
                <div className="relative">
                    <img src={banner} alt="logo" className="w-3/4 object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
};

export default Login;
