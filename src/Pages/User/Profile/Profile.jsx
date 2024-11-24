import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";

const ProfilePage = () => {
    const { user, updateUserProfile } = UseAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const axiosCommon = UseAxiosCommon();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // Initialize form fields with user data
        setName(user?.displayName || "");
        setPhoto(user?.photoURL || "");
    }, [user]);

    const onSubmit = (data) => {
        const { name, photo } = data;

        // Update in Firebase
        updateUserProfile(name, photo)
            .then(() => {
                // Update in backend
                axiosCommon
                    .patch(`/users/update/${user.email}`, { name: name, photo: photo })
                    .then((response) => {
                        if (response.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: "Profile Updated Successfully",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        } else {
                            Swal.fire({
                                icon: "info",
                                title: "No changes detected in the database.",
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Database Update Failed",
                            text: error.message,
                        });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Firebase Update Failed",
                    text: error.message,
                });
            });
    };


    const convertToLocalDateString = (timestamp) => {
        return new Date(Number(timestamp)).toLocaleString();
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my">
                <h1 className="text-2xl font-semibold text-center mt-4  text-primary">Profile</h1>
                <p className="my-4 text-primary">This is your profile page. You can see your details here.</p>
                <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-accent  rounded-2xl">
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                        <img
                            src={user?.photoURL}
                            alt=""
                            className="object-cover object-center w-full h-full rounded bg-gray-500"
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-primary">{user?.displayName}</h2>
                            <span className="text-sm text-primary"></span>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    aria-label="Email address"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                                    ></path>
                                </svg>
                                <span className="text-primary">{user?.email}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    aria-label="Phonenumber"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                                    ></path>
                                </svg>
                                <span className="text-primary">+25 381 77 983</span>
                            </span>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-primary">
                                    <span className="font-semibold text-primary">Created At: </span>
                                    <span className="text-primary ">
                                        {convertToLocalDateString(user?.reloadUserInfo.createdAt)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold">Last Login At: </span>
                                    <span className="text-primary">
                                        {convertToLocalDateString(user?.reloadUserInfo.lastLoginAt)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-primary">Token Expiration Time: </span>
                                    <span className="text-primary ">
                                        {convertToLocalDateString(
                                            user?.stsTokenManager?.expirationTime
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center my-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-500 rounded-md hover:bg-amber-600 focus:bg-amber-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                        Update Your Profile
                    </button>

                    {isOpen && (
                        <div
                            className="fixed inset-0 z-10 overflow-y-auto"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <span
                                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>

                                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-accent rounded-lg shadow-xl  sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                                    <h3
                                        className="text-lg font-medium leading-6 text-primary capitalize "
                                        id="modal-title"
                                    >
                                        Your Info
                                    </h3>
                                    <p className="mt-2 text-sm text-primary">
                                        You can update your profile here.
                                    </p>

                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="mt-4"
                                        action="#"
                                    >
                                        <label
                                            htmlFor="emails-list"
                                            className="text-sm text-primary"
                                        >
                                            Email address
                                        </label>

                                        <label className="block mt-3" htmlFor="email">
                                            <input
                                                readOnly
                                                value={user?.email}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                            />
                                        </label>

                                        <label className="block mt-3" htmlFor="name">
                                            <input
                                                {...register("name", { required: true })}
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                            />
                                            {errors.name && (
                                                <span className="text-red-700">
                                                    This field is required
                                                </span>
                                            )}
                                        </label>

                                        <label className="block mt-3" htmlFor="photo">
                                            <input
                                                {...register("photo", { required: true })}
                                                type="url"
                                                name="photo"
                                                id="photo"
                                                placeholder="Your Photo URL"
                                                value={photo}
                                                onChange={(e) => setPhoto(e.target.value)}
                                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                            />
                                            {errors.photo && (
                                                <span className="text-red-700">
                                                    This field is required
                                                </span>
                                            )}
                                        </label>

                                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-amber-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
