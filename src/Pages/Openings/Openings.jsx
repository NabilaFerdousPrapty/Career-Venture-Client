
import { useQuery } from '@tanstack/react-query';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import Hero from './Hero/Hero';
import { ClockLoader } from 'react-spinners';

const Openings = () => {
  const axiosCommon = UseAxiosCommon();
  const {
    data: openings = [],
    isLoading, isError,error,} = useQuery({
    queryKey: ["openings"], queryFn: async () => {
      const { data } = await axiosCommon.get("/jobOpenning");
      return data;
    },
  });
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", openings);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClockLoader />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
          <Hero/>
        </div>
    );
};

export default Openings;