import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState } from "react";

const Mentors = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const axiosCommon = UseAxiosCommon();
  const limit = 6; // Number of items per page

  // Fetch mentors with pagination
  const {
    data: { mentors = [], totalPages } = {}, // Destructure data with fallback values
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mentors", currentPage], // Refetch when currentPage changes
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/approvedMentors?page=${currentPage}&limit=${limit}`);
      return data;
    },
    keepPreviousData: true, // Keep old data while fetching new page data
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-center mt-10">
        <img
          className="object-cover w-full h-96 rounded-xl lg:w-4/5"
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt="Mentors"
        />
      </div>
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Meet Our Mentors
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Learn from industry experts and elevate your career.
          </p>
          <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
            Start 14-Day Free Trial
          </button>
          <p className="mt-3 text-sm text-gray-400">No credit card required</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="flex flex-col w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 h-[700px] border-2 border-amber-400"
            >
              <img
                className="object-center w-full h-96 object-cover"
                src={mentor.profile_image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                alt={mentor.name}
              />
              <div className="px-6 py-4 flex flex-col flex-grow">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {mentor.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mentor.designation} - {mentor.location}
                </p>
                <p className="py-2 text-gray-700 dark:text-gray-400">{mentor.bio}</p>
              </div>
              <div className="mt-auto w-full">
                <Link to={`/learnAboutMentors/${mentor?._id}`}>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide bg-[#ad8a54] text-gray-50 rounded-xl"
                  >
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
