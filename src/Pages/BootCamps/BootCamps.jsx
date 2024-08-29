import React from "react";
import UseAxiosCommon from "../../hooks/UseAxiosCommon/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
const BootCamps = () => {
  const axiosCommon = UseAxiosCommon();
  const { data: bootCamps = [], isLoading } = useQuery({
    queryKey: ["bootCamps"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/bootCamps");
      return data;
    },
  });
  return (
    <div>
     
    </div>
  );
};

export default BootCamps;
