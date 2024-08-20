import React, { useState } from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router-dom';
import UseAuth from '../../../../hooks/UseAuth/UseAuth';
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
const {user, setUser,LogOut} = UseAuth();
  return (
    <div className="relative inline-block">

      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 flex items-center  text-sm   border border-transparent rounded-full focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring  focus:outline-none"
      >
        <span className="">
          <img
            className="object-cover w-auto h-10 rounded-full"
            src={user?.photoURL || 'https://i.ibb.co/M7Zxxsm/770fb75f5e81e4c2dbe8934f246aeeab.jpg'}
            alt="jane doe"
          />
        </span>
       
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-20 lg:w-64 md:w-56 w-48 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
          <li  className="flex items-center p-2 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-4 h-4"
              src={user?.photoURL || 'https://randomuser.me/api/portraits'}
              alt="jane avatar"
            />
            <div className=" text-center">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {user?.displayName || 'No Name'}
                 </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email || 'No Email'}
              </p>
            </div>
          </li>

          <hr className="border-gray-200 dark:border-gray-700" />

          <Link to={'dashboard/profilePage'} className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center">
            view profile
          </Link>

          <Link to={'dashboard/profilePage'} className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center">
          Update Profile
          </Link>

          <hr className="border-gray-200 dark:border-gray-700" />

          <button onClick={LogOut} className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center w-full">
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
