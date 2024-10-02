import { useQuery } from "@tanstack/react-query";
import Hero from "./Hero/Hero";
import { ClockLoader } from "react-spinners";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import ResourcesCard from "./ResourcesCard";
import { useState } from "react";

const Resources = () => {
  const axiosCommon = UseAxiosCommon();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const {
    data: resourcesData = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["resources", currentPage],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/resources?page=${currentPage}&limit=${limit}`
      );
      return data;
    },
  });

  const { resources = [], totalPages } = resourcesData;

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
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {resources.map((resource) => (
          <ResourcesCard key={resource._id} resource={resource} refetch={refetch} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Resources;
