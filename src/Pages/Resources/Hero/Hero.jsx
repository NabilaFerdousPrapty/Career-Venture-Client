import React from 'react';

const Hero = () => {
    return (
        <div>
            <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img className="w-full h-full max-w-md border border-amber-400 rounded-xl" src="https://i.ibb.co.com/2866CpT/43fdc93b807eaf0007e23d3392f9cf3f-removebg-preview.png" alt="email illustration vector art"/>
            </div>
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                        Search for Sepecific 
                         <span className="text-blue-500 mx-2">
                            Resources
                            </span></h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400"> 
                        Here you can find all the resources you need to get started with your career in tech.
                        <span className="font-medium text-blue-500 mx-1">
                            Search your future
                            </span> 
                            now and get started.
                            </p>

                    <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                        <input id="text" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Recourses tag"/>

                        <button className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Search
                        </button>
                    </div>
                </div>
            </div>

           
        </div>
    </div>
        </div>
    );
};

export default Hero;