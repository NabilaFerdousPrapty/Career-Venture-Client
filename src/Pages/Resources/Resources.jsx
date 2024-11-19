import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import ClockLoader from "react-spinners/ClockLoader";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import ResourcesCard from "./ResourcesCard";
import Hero from "./Hero/Hero";
import { useQuery } from "@tanstack/react-query";
import About from "./About";

const Resources = () => {
  const axiosCommon = UseAxiosCommon();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTag, setSearchTag] = useState(""); // State for search tag
  const limit = 6;

  // Function to handle the search operation from Hero component
  const onSearch = (tag) => {
    setSearchTag(tag);
    setCurrentPage(1); // Reset to the first page when searching
    refetch(); // Refetch the data based on the new search tag
  };

  const {
    data: resourcesData = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["resources", currentPage, searchTag], // Include searchTag in queryKey
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/resources?page=${currentPage}&limit=${limit}&search=${searchTag}`
      );
      return data;
    },
  });

  const { resources = [], totalPages } = resourcesData;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Hero onSearch={onSearch} /> {/* Pass onSearch to Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {resources.map((resource, index) => (
          <div
            key={resource._id}
            data-aos="fade-up" // AOS animation applied here
            data-aos-delay={`${index * 100}`} // Apply delay for staggered animation
          >
            <ResourcesCard resource={resource} refetch={refetch} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
      <About />
    </div>
  );
};

export default Resources;
