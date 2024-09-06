import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";

const Mentors = () => {
    const axiosCommon=UseAxiosCommon();
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
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", mentors);

  if (isLoading) return <div><ClockLoader /></div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Building Your Next App with our Awesome components
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
            similique obcaecati illum mollitia.
          </p>
          <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
            Start 14-Day free trial
          </button>
          <p className="mt-3 text-sm text-gray-400 ">No credit card required</p>
        </div>

        <div className="flex justify-center mt-10">
          <img
            className="object-cover w-full h-96 rounded-xl lg:w-4/5"
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
          />
        </div>
      </div>

    </div>
  );
};

export default Mentors;
