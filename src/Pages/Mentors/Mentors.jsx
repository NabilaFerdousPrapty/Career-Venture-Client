import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Mentors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosCommon = UseAxiosCommon();
  const limit = 6;

  const {
    data: { mentors = [], totalPages } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mentors", currentPage],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/approvedMentors?page=${currentPage}&limit=${limit}`);
      return data;
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader color="#FBBF24" />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="flex justify-center mt-10">
        <img
          className="object-cover w-full h-96 rounded-xl lg:w-4/5"
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          alt="Mentors"
        />
      </div>
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            Meet Our Mentors
          </h1>
          <p className="mt-6 text-gray-400">
            Learn from industry experts and elevate your career.
          </p>
          <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-yellow-500 rounded-lg hover:bg-yellow-400 focus:outline-none">
            Start 14-Day Free Trial
          </button>
          <p className="mt-3 text-sm text-gray-500">No credit card required</p>
        </div>

        <div className="my-5 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2 ">
            {


              mentors && mentors.map((mentor, index) => (

                <div
                  key={mentor._id}


                  className="relative mt-16 mb-32 sm:mb-24 transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="rounded overflow-hidden shadow-md bg-gray-800 hover:bg-gray-700 transition-all duration-300 lg:h-[550px] flex flex-col justify-between">
                    <div className="absolute -mt-24 w-full flex justify-center">
                      <div className="h-36 w-36 ">
                        <img
                          src={mentor.profile_image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                          alt={`Display Picture of ${mentor.name}`}
                          className="rounded-full object-cover h-full w-full shadow-md"
                        />
                      </div>
                    </div>
                    <div className="px-6 mt-16 flex-grow flex flex-col justify-between items-start text-justify">
                      <div>
                        <h1 className="font-bold text-3xl text-center mb-1 text-white">
                          {mentor.name}
                        </h1>
                        <p className="text-gray-400 text-sm text-center">
                          {mentor.designation} - {mentor.location}
                        </p>
                        <p className="text-center text-gray-300 text-base pt-3 font-normal">
                          {mentor.bio}
                        </p>
                        <div className="mt-4">
                          <p className="text-center text-gray-400 font-semibold">
                            <span className="text-amber-500">
                              Experience:
                            </span>
                            <span className="font-normal"> {mentor.years_of_experience} years</span>
                          </p>
                          <p className="text-center text-gray-400 font-semibold">
                            <span className="text-amber-500">
                              Skills:
                            </span>
                            <span className="font-normal"> {mentor.skills.join(", ")}</span>
                          </p>
                          <p className="text-center text-gray-400 font-semibold">

                            <span className="text-amber-500">
                              Available Days:
                            </span>
                            <span className="font-normal"> {mentor.available_days.join(", ")}</span>
                          </p>
                          <p className="text-center text-gray-400 font-semibold">
                            <span className="text-amber-500">
                              Background:
                            </span>
                            <span className="font-normal"> {mentor.background_and_qualifications}</span>
                          </p>

                        </div>
                      </div>
                      <div className="w-full flex justify-center pt-5">
                        <a href={mentor.social_media_links[1]} className="mx-5">
                          <FaGithub size={24} color="#FBBF24" />
                        </a>
                        <a href="javascript:void(0)" className="mx-5">
                          <FaTwitter size={24} color="#FBBF24" />
                        </a>
                        <a href="javascript:void(0)" className="mx-5">
                          <FaInstagram size={24} color="#FBBF24" />
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-center pb-5">
                      <Link to={`/mentor/${mentor._id}`} className="px-5 py-2 mt-4 text-sm font-medium leading-5 text-center text-white capitalize bg-yellow-500 rounded-lg hover:bg-yellow-400">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-full ${currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "bg-gray-700 text-gray-400"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="max-w-3xl px-6 py-12 lg:max-w-5xl  mx-auto flex justify-between items-center bg-amber-100 my-5 rounded-2xl">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Ready to take the next step? <br />
              <span className="text-blue-500">
                Be a mentor you wish you had.
              </span>
            </h2>

            <p className="mt-4 text-gray-700 ">
              Join our community of mentors and help guide the next generation of tech professionals
              Make a difference in someone's life today. What are you waiting for?

            </p>

            <div className="inline-flex w-full mt-6 sm:w-auto">
              <Link
                to="/becomeAMentor"
                className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                Become a Mentor
              </Link>
            </div>
          </div>
          <img className="rounded-3xl" src="https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Mentors;