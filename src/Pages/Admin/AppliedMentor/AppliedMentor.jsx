import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AppliedMentor = () => {


    const axiosSecure=UseAxiosSecure();
    const {
        data: pendingMembers = [],
        isLoading,
        isError,
        error,
      } = useQuery({
        queryKey: ["bootCamps"],
        queryFn: async () => {
          const { data } = await axiosSecure.get("/pendingMentors");
          return data;
        },
      });
        console.log(pendingMembers);
        if (isLoading) {
            return <div>Loading...</div>;
          }
        
          if (isError) {
            return <div>Error: {error.message}</div>;
            }
    return (
        <div>
            
        </div>
    );
};

export default AppliedMentor;