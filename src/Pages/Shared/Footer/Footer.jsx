import logo from '../../../assets/logo2w.png';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 m-1 rounded-xl">
            <div className="container px-6 py-6 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                            Subscribe to our newsletter for career tips and job updates.
                        </h1>

                        <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                            <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" />
                            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Quick Links</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">About Us</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Our Services</a>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Career Resources</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Career Advice</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Job Listings</a>
                            <a href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Skills Development</a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 md:mt-6 dark:border-gray-700" />

                <div className="flex items-center justify-between">
                    <a href="#">
                        <img className="w-auto h-16" src={logo} alt="Career Venture" />
                    </a>

                    <div className="flex -mx-2">
                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6287 12.383 14.042 12.221C14.4553 12.0591 14.9167 12.207 15.141 12.572C15.3653 12.937 15.2878 13.432 14.963 13.7C14.8271 13.8021 14.6678 13.8673 14.497 13.89L14.483 13.893L14.438 13.897C14.428 13.898 14.419 13.898 14.41 13.898H14.305V14.08H14.307ZM9.693 14.08H9.695C9.25428 14.0506 8.89451 13.7185 8.82937 13.2825C8.76423 12.8465 9.02377 12.4226 9.437 12.261C9.85023 12.0993 10.3116 12.2472 10.536 12.612C10.7603 12.9768 10.6828 13.471 10.358 13.739C10.222 13.8411 10.0628 13.9063 9.892 13.929L9.878 13.932L9.833 13.936C9.82302 13.9374 9.81401 13.9374 9.805 13.936H9.693V14.08Z" />
                            </svg>
                        </a>

                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 2C13.7652 2 14.0196 2.10536 14.2071 2.29289C14.3946 2.48043 14.5 2.73478 14.5 3V6.5H17.5C17.7652 6.5 18.0196 6.60536 18.2071 6.79289C18.3946 6.98043 18.5 7.23478 18.5 7.5V11.5C18.5 11.7652 18.3946 12.0196 18.2071 12.2071C18.0196 12.3946 17.7652 12.5 17.5 12.5H14.5V21C14.5 21.2652 14.3946 21.5196 14.2071 21.7071C14.0196 21.8946 13.7652 22 13.5 22H9.5C9.23478 22 8.98043 21.8946 8.79289 21.7071C8.60536 21.5196 8.5 21.2652 8.5 21V12.5H6.5C6.23478 12.5 5.98043 12.3946 5.79289 12.2071C5.60536 12.0196 5.5 11.7652 5.5 11.5V7.5C5.5 7.23478 5.60536 6.98043 5.79289 6.79289C5.98043 6.60536 6.23478 6.5 6.5 6.5H8.5V3C8.5 2.73478 8.60536 2.48043 8.79289 2.29289C8.98043 2.10536 9.23478 2 9.5 2H13.5ZM12.5 20V11.5C12.5 11.2348 12.6054 10.9804 12.7929 10.7929C12.9804 10.6054 13.2348 10.5 13.5 10.5H16.5V8.5H13.5C13.2348 8.5 12.9804 8.39464 12.7929 8.20711C12.6054 8.01957 12.5 7.76522 12.5 7.5V4H10.5V7.5C10.5 7.76522 10.3946 8.01957 10.2071 8.20711C10.0196 8.39464 9.76522 8.5 9.5 8.5H7.5V10.5H10.5C10.7652 10.5 11.0196 10.6054 11.2071 10.7929C11.3946 10.9804 11.5 11.2348 11.5 11.5V20H12.5Z" />
                            </svg>
                        </a>

                        <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Twitter">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 2.99902C22.0424 3.67541 20.9821 4.19219 19.86 4.52902C19.2577 3.8375 18.4573 3.34672 17.567 3.12396C16.6767 2.90121 15.7395 2.95847 14.8821 3.28662C14.0246 3.61477 13.2884 4.19698 12.773 4.96329C12.2575 5.72959 11.9877 6.64447 12 7.57902V8.49902C10.2426 8.54094 8.50127 8.18583 6.93101 7.45385C5.36074 6.72188 4.01032 5.62938 3 4.25902C3 4.25902 -1 13.499 8 17.499C5.94053 18.898 3.48716 19.5989 1 19.499C10 24.499 21 19.499 21 7.49902C20.9991 7.2215 20.9723 6.94453 20.92 6.67202C21.9406 5.66359 22.6608 4.39276 23 2.99902Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
