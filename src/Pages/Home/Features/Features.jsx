import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Features = () => {
    return (
        <div className='my-5 mt-9'>
            <div className='text-center my-2 font-play '>
            <h1 className="text-5xl my-5">
                The Features and Benefits of Our Platform
            </h1>
            <p className="text-lg">
                Discover the advantages of using our platform to advance your career.
            </p>
            </div>
           <section className=" bg-amber-200 p-1 rounded-md">
	<div className="container flex flex-col-reverse mx-auto lg:flex-row">
		<div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 bg-[#c9a267] ">
			<div className="flex space-x-2 sm:space-x-4">
				<FaCheckCircle className="flex-shrink-0 w-6 h-6" />
				<div className="space-y-2">
					<p className="text-lg font-medium leading-snug">Comprehensive Career Guidance</p>
					<p className="leading-snug">Receive personalized advice and resources to navigate your career path effectively.</p>
				</div>
			</div>
			<div className="flex space-x-2 sm:space-x-4">
				<FaCheckCircle className="flex-shrink-0 w-6 h-6" />
				<div className="space-y-2">
					<p className="text-lg font-medium leading-snug">Skill Development Programs</p>
					<p className="leading-snug">Access a variety of training modules to enhance your skills and stay competitive.</p>
				</div>
			</div>
			<div className="flex space-x-2 sm:space-x-4">
				<FaCheckCircle className="flex-shrink-0 w-6 h-6" />
				<div className="space-y-2">
					<p className="text-lg font-medium leading-snug">Job Finding Assistance</p>
					<p className="leading-snug">Utilize our tools and resources to find the perfect job that matches your skills and interests.</p>
				</div>
			</div>
		</div>
		<div className="lg:w-1/2 xl:w-3/5 bg-amber-100">
			<div className="flex items-center justify-center p-1 md:p-2 lg:p-5">
				<img src="https://i.ibb.co/1mGw8LQ/office-supplies.jpg" alt="" className="rounded-lg shadow-lg bg-gray-500 aspect-video sm:min-h-96" />
			</div>
		</div>
	</div>
</section> 
        </div>
    );
};

export default Features;
