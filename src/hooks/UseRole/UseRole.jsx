import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../UseAxiosCommon/UseAxiosCommon";


const UseRole = (email) => {
    const axiosCommon = UseAxiosCommon();
    // console.log(email);

    const { data: isAdmin, isLoading: isAdminLoading, refetch } = useQuery({
        queryKey: ['isAdmin', email],
        queryFn: async () => {
            try {
                const response = await axiosCommon.get(`/users/admin/${email}`);
                // console.log(response);
                if (response.data?.role === "admin") {
                    return true;
                    
                }
                return false
                ; 
            } catch (error) {
                console.error("Error fetching admin role:", error);
                return false;
            }
        },
    });
    

    const { data: isMentor, isPending: isMentorLoading } = useQuery({
        queryKey: ['isMentor', email],
        queryFn: async () => {
            try {
                const response = await axiosCommon.get(`/users/mentor/${email}`);
                if (response.data?.role === "mentor") {
                    return true;
                
                }
                return false;
            } catch (error) {
                console.error("Error fetching trainer role:", error);
                return false; // Return false in case of error
            }
        },
    });
    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: ['isMember', email],
        queryFn: async () => {
           
            try {
                const response = await axiosCommon.get(`/users/member/${email}`);
                // console.log(response);
                if (response.data?.role === "member") {
                    return true;
                    
                }
                return false;
            } catch (error) {
                console.error("Error fetching member role:", error);
                return false;
            }
        },
    });

    const isLoading = isAdminLoading || isMentorLoading || isMemberLoading;

    const role = {
        isAdmin: isAdmin ,
        isMentor: isMentor,
        isMember: isMember
        
    };
    // console.log(role);
    

    return [role, isLoading, refetch];
};

export default UseRole;
