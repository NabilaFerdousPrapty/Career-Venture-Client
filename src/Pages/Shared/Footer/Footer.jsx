import { FaFacebook, FaGit, FaGithub, FaReddit } from 'react-icons/fa'; // Import the Reddit icon from react-icons
import logo from '../../../assets/logo2w.png';

const Footer = () => {
    return (
        <footer className={`m-1 rounded-xl bg-accent`}>
            <div className="container px-6 py-6 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h1 className={`max-w-lg text-xl text-primary font-semibold tracking-tight xl:text-2xl`}>
                            Subscribe to our newsletter for career tips and job updates.
                        </h1>

                        <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                            <input
                                id="email"
                                type="text"
                                className="px-4 py-2 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 bg-accent"
                                placeholder="Email Address"
                            />
                            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-950 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-primary">Quick Links</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="transition-colors duration-300 text-primary  hover:text-blue-500 hover:underline">
                                Home
                            </a>
                            <a href="#" className="transition-colors duration-300 text-primary hover:text-blue-500 hover:underline">
                                About Us
                            </a>
                            <a href="#" className="transition-colors duration-300 text-primary  hover:text-blue-500 hover:underline">
                                Our Services
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text text-primary ">Career Resources</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="transition-colors text-primary duration-300 hover:text-blue-500 hover:underline">
                                Career Advice
                            </a>
                            <a href="#" className="transition-colors duration-300 text-primary  hover:text-blue-500 hover:underline">
                                Job Listings
                            </a>
                            <a href="#" className="transition-colors duration-300 text-primary  hover:text-blue-500 hover:underline">
                                Skills Development
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-primary md:mt-6 " />

                <div className="flex items-center justify-between">
                    <a href="#">
                        <img className="w-auto h-16" src={logo} alt="Career Venture" />
                    </a>

                    <div className="flex -mx-2">
                        <a href="#" className="mx-2  transition-colors duration-300 text-primary hover:text-blue-500" aria-label="Reddit">
                            <FaReddit className="w-5 h-5" />

                        </a>
                        <a href="#" className="mx-2 transition-colors duration-300 text-primary hover:text-blue-500" aria-label="Facebook">
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="mx-2 transition-colors duration-300 text-primary hover:text-blue-500" aria-label="Github">
                            <FaGithub className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2024 Career Venture. All Rights Reserved.

                </p >
                <p className="text-center text-sm text-gray-500 mt-1">
                    Created by <a target="_blank" href="https://github.com/NabilaFerdousPrapty" className="text-blue-500 hover:underline">Career Venture Team</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
