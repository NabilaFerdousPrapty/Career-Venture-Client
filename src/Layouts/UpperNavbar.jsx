import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/UseTheme/UseTheme";
import { Dropdown } from "react-day-picker";
import Options from "../Pages/Shared/Navbar/Dropdown/Options";


function UpperNavbar() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleLanguageSwitch = () => {
        // Toggle between languages
        const newLang = i18n.language === "en" ? "es" : "en"; // Example: toggle between English and Spanish
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="bg-[#1e1e2f] text-white flex justify-end gap-6 items-center px-4 py-2 shadow-md">
            <div className="flex items-center space-x-4">
                {/* Theme toggle */}
                <input
                    type="checkbox"
                    value={theme}
                    className="toggle theme-controller"
                    checked={theme === "synthwave"}
                    onChange={toggleTheme} // Call the toggleTheme function on change
                />

                {/* Language switch */}

            </div>

            {/* Time */}
            <div className="hidden lg:flex items-center space-x-2">
                <span className="font-semibold">{time}</span>
            </div>
            <Options />

            {/* Notification & Dropdown */}
            <div className="flex items-center space-x-4">
                <button className="relative">
                    <FaBell className="text-2xl" />
                    {/* Notification badge (optional) */}
                    <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                </button>



                {/* Time display for small screens */}
                <div className="lg:hidden flex items-center space-x-2">
                    <span className="font-semibold">{time}</span>
                </div>
            </div>
        </nav>
    );
}

export default UpperNavbar;
