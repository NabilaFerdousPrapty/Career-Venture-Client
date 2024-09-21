import { useQuery } from "@tanstack/react-query";
import Hero from "./Hero/Hero";
import { ClockLoader } from "react-spinners";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import ResourcesCard from "./ResourcesCard";

const Resources = () => {
    const axiosCommon = UseAxiosCommon();
  const {
    data: resources = [],
    isLoading, isError,error,refetch} = useQuery({
    queryKey: ["resources"], queryFn: async () => {
      const { data } = await axiosCommon.get("/resources");
      return data;
    },
  });
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", resources);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10  ">
  {
    resources.map((resource) => (
      <ResourcesCard key={resource._id} resource={resource} refetch={refetch} />))
  }
      </div>
    </div>
  );
};

export default Resources;
