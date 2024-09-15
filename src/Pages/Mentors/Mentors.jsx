import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Mentors = () => {
  const axiosCommon = UseAxiosCommon();
  const {
    data: mentors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/approvedMentors");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-center mt-10">
            <img className="object-cover w-full h-96 rounded-xl lg:w-4/5" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
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
        


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10  ">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 h-[700px] border-2 border-amber-400"
            >
              <img
                className=" object-center w-full h-96 object-cover"
                src={mentor.profile_image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                alt={mentor.name}
              />
              <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {mentor.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mentor.designation} - {mentor.location}
                </p>
                <p className="py-2 text-gray-700 dark:text-gray-400">
                  {mentor.bio}
                </p>
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <svg
                    aria-label="suitcase icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 11H10V13H14V11Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                    />
                  </svg>
                  <h1 className="px-2 text-sm">{mentor.designation}</h1>
                </div>
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <svg
                    aria-label="location pin icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                    />
                  </svg>
                  <h1 className="px-2 text-sm">{mentor.location}</h1>
                </div>
              
              </div>
              <div className="mt-auto w-full ">
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
      </div>
    </div>
  );
};

export default Mentors;
