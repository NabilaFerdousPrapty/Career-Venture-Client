import { useQuery } from "@tanstack/react-query";
import Hero from "./Hero/Hero";
import { ClockLoader } from "react-spinners";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";

const Resources = () => {
    const axiosCommon = UseAxiosCommon();
  const {
    data: resources = [],
    isLoading, isError,error,} = useQuery({
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
    </div>
  );
};

export default Resources;
