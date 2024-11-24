import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/UseTheme/UseTheme";
import Options from "../Pages/Shared/Navbar/Dropdown/Options";
import Dropdown from './../Pages/Shared/Navbar/Dropdown/Dropdown';


function UpperNavbar() {

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);



    return (
        <nav className="bg-accent text-primary flex justify-end gap-6 items-center px-4 py-2 shadow-md">


            {/* Time */}
            <div className="hidden lg:flex items-center space-x-2">
                <span className="font-semibold">{time}</span>
            </div>

            <Dropdown />

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
