import { useTheme } from "../context/ThemeContext";
import { BsMoonStars, BsSun } from "react-icons/bs";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/80 backdrop-blur text-gray-700 shadow-sm transition hover:scale-105 hover:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        >
            {isDark ? <BsSun size={16} /> : <BsMoonStars size={16} />}
        </button>
    );
};

export default ThemeToggle;


