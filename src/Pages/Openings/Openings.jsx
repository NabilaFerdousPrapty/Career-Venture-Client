import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import Hero from "./Hero/Hero";
import { ClockLoader } from "react-spinners";
import OpeningCard from "./OpeningCard";

const Openings = () => {
  const axiosCommon = UseAxiosCommon();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set your items per page limit

  const {
    data: { results: openings, totalPages = 1 } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["openings", currentPage], // Include currentPage in queryKey
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/jobOpenning?page=${currentPage}&limit=${itemsPerPage}`);
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
console.log(openings);

  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {openings && openings.map((opening) => (
          <OpeningCard key={opening._id} opening={opening} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-5">
      <div className="flex justify-center mt-5">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`mx-2 p-2 text-white rounded ${
      currentPage === 1 ? 'bg-slate-700' : 'bg-amber-500'
    }`}
  >
    Previous
  </button>
  
  <span className="mx-2">
    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
  </span>
  
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`mx-2 p-2 text-white rounded ${
      currentPage === totalPages ? 'bg-gray-300' : 'bg-amber-500'
    }`}
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default Openings;
