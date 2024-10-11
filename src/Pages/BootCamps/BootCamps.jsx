import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const BootCamps = () => {
  const axiosCommon = UseAxiosCommon();
  const [page, setPage] = useState(1); // Track the current page
  const [limit] = useState(6); // Set the number of items per page
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can customize the duration
  }, []);
  
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bootCamps", page],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/bootCamps?page=${page}&limit=${limit}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="text-center mt-4">
        Error: {error.message}
      </div>
    );
  }

  const { bootCamps, totalPages } = data;

  return (
    <div className="container mx-auto lg:px-4 py-2 px-2">
      <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-[45%]">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
              Discover the Best Boot Camps to Accelerate Your Career
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Our platform connects you with top-rated boot camps offering comprehensive training in various fields. Find the perfect boot camp to boost your career and gain valuable skills.
            </p>
            <div className="grid gap-6 mt-8 sm:grid-cols-2">
              {["Expert Instructors", "Flexible Schedules", "Certifications Provided", "Hands-On Training", "Career Support", "Networking Opportunities", "Affordable Prices"].map((feature) => (
                <div key={feature} className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                  <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mx-3">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-[55%] ">
          <img className="object-cover w-full h-full max-w-3xl rounded-md" src="https://media.geeksforgeeks.org/wp-content/uploads/20230927184335/Best-Free-Coding-Bootcamps.png" alt="BootCamp photo" />
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-3 py-5 ">
        <div className="lg:max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Subscribe To The <span className="text-blue-500">Newsletter</span>
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Get the specific boot camp details and updates as soon as a new
            <span className="font-medium text-blue-500"> Available Boot Camp</span> is live.
          </p>

          <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row justify-center items-center">
            <input
              id="text"
              type="text"
              className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Enter the bootcamp name"
              aria-label="Bootcamp name"
            />
            <button className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              Search
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl text-center mt-4 mb-9">
        Explore Boot Camps <span className="text-blue-500">Available</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bootCamps.map((bootCamp,index) => (
          <div
            key={bootCamp._id}
            className="flex flex-col bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up" // Add AOS animation here
            data-aos-delay={index * 100} // Delay for staggered animations

          >
            <img
              src={bootCamp.classImage}
              alt={bootCamp.name}
              className="object-cover w-full h-60"
            />
            <div className="lg:p-4 p-1 flex flex-col flex-grow items-center">
              <h2 className="text-2xl font-bold mb-2">{bootCamp.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {bootCamp.description.slice(0, 80)}....
              </p>
              <div className="flex flex-col justify-between items-center mb-4">
                <span className="text-lg font-semibold">
                  Duration: {bootCamp.duration}
                </span>
                <span className="text-lg font-semibold">
                  Price: <span className="text-2xl">৳</span>
                  {bootCamp.price}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Location: {bootCamp.location}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600 mr-2">
                  Rating: {bootCamp.rating}
                </span>
                <div className="flex">
                  {[...Array(Math.round(bootCamp.rating))].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-center">Mentors:</h3>
                <ul className="list-disc list-inside text-sm">
                  {bootCamp.mentors.map((mentor, index) => (
                    <li className="list-none" key={index}>
                      {mentor.name} - {mentor.experience} ({mentor.expertise})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto w-full">
                <Link to={`/LearnAboutBootCamp/${bootCamp?._id}`}>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide bg-[#ad8a54] text-gray-50 rounded-xl"
                  >
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination buttons */}
      <div className="flex justify-center items-center my-5">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 text-white rounded ${page <= 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="mx-3">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 text-white rounded ${page >= totalPages ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BootCamps;
