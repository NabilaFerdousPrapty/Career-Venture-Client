import { useState } from "react";
import logo from "../../../assets/logo2w.png";
import { Link, useLocation } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import Dropdown from "./Dropdown/Dropdown";
import { FaBell } from "react-icons/fa";
import useTheme from './../../../hooks/UseTheme/UseTheme';
import Options from "./Dropdown/Options";
import { useTranslation } from 'react-i18next';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UseAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Set the navbar background based on the theme
  const navbarBg = theme === "synthwave" ? "bg-[#1e1737]" : "bg-[#4C4A52]";

  return (
    <nav className={`rounded-full mt-2 shadow fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${navbarBg}`}>
      <div className="container px-4 py-1 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link>
              <img src={logo} alt="logo" className="w-auto h-16" />
            </Link>
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 w-full px-4 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen
              ? "translate-x-0 opacity-100 py-0"
              : "opacity-80 -translate-x-full bg-[#1a202c] lg:translate-x-0 lg:opacity-100 lg:bg-transparent"
              }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link
                to="/"
                className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/")
                  ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                  : "bg-[#333333] lg:bg-transparent"
                  }`}
              >
                {t('home')}
              </Link>

              <Link
                to="/bootCamps"
                className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/bootCamps")
                  ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                  : "bg-[#333333] lg:bg-transparent"
                  }`}
              >
                {t('bootCamps')}
              </Link>

              <Link
                to="/mentors"
                className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/mentors")
                  ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                  : "bg-[#333333] lg:bg-transparent"
                  }`}
              >
                {t('mentors')}
              </Link>

              <Link
                to="/openings"
                className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/openings")
                  ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                  : "bg-[#333333] lg:bg-transparent"
                  }`}
              >
                {t('openings')}
              </Link>

              {user && (
                <Link
                  to="/dashBoard/intro"
                  className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/dashBoard")
                    ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                    : "bg-[#333333] lg:bg-transparent"
                    }`}
                >
                  {t('dashboard')}
                </Link>
              )}

              <Link
                to="/resources"
                className={`px-4 py-2 text-lg font-semibold text-[#ad8a54] lg:bg-transparent ${isActiveLink("/resources")
                  ? "text-[#c5e384] bg-[#4A5568] border-b-2 border-[#ffd700] rounded-3xl"
                  : "bg-[#333333] lg:bg-transparent"
                  }`}
              >
                {t('resources')}
              </Link>
            </div>

            <div className="flex items-center lg:mt-4 mt-1 justify-between text-[#c5e384] bg-[#333333] rounded-lg lg:bg-transparent lg:gap-2">
              {/* Theme toggle checkbox */}
              <input
                type="checkbox"
                value={theme}
                className="toggle theme-controller"
                checked={theme === "synthwave"}
                onChange={toggleTheme} // Call the toggleTheme function on change
              />
              <button
                className="mx-1 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                aria-label="show notifications"
              >
                <FaBell />
              </button>
              <Options />

              {user ? (
                <Dropdown />
              ) : (
                <button
                  type="button"
                  className="flex items-center focus:outline-none btn bg-[#ad8a54]"
                >
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
