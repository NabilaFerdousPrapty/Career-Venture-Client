import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserManagement = () => {
  
    const axiosSecure=UseAxiosSecure();
    const {
        data: users = [],
        isLoading,
        isError,
        error,
      } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const { data } = await axiosSecure.get("/users");
          return data;
        },
      });
      console.log("Loading:", isLoading);
      console.log("Error:", error);
      console.log("Data:", users);
    return (
        <div>
            
        </div>
    );
};

export default UserManagement;