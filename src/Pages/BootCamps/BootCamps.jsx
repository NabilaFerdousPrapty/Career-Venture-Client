import React from "react";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BootCamps = () => {
  const axiosCommon = UseAxiosCommon();

  const { data: bootCamps = [], isLoading, isError, error } = useQuery({
    queryKey: ["bootCamps"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/bootCamps");
      return data;
    },
  });

  // Debugging output
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", bootCamps);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto lg:px-4 py-8 px-2">
      <h1 className="text-3xl font-bold text-center mb-8">Boot Camps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bootCamps.map((bootCamp) => (
          <div
          key={bootCamp._id}
          className="flex flex-col bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={bootCamp.classImage}
            alt={bootCamp.name}
            className="object-cover w-full h-60"
          />
          <div className="lg:p-4 p-1 flex flex-col flex-grow items-center">
            <h2 className="text-2xl font-bold mb-2">{bootCamp.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{bootCamp.description.slice(0, 80)}....</p>
            <div className="flex flex-col justify-between items-center mb-4">
              <span className="text-lg font-semibold">Duration: {bootCamp.duration}</span>
              <span className="text-lg font-semibold">Price: <span className="text-2xl">৳</span>{bootCamp.price}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Location: {bootCamp.location}</p>
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-600 mr-2">Rating: {bootCamp.rating}</span>
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
            {/* "Learn more" button at the bottom */}
            <div className="mt-auto w-full">
              <Link to={'/LearnAboutBootCamp'}>
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
    </div>
  );
};

export default BootCamps;
