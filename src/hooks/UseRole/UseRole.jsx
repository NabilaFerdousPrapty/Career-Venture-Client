import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../UseAxiosCommon/UseAxiosCommon";


const UseRole = (email) => {
    const axiosCommon = UseAxiosCommon();
    console.log(email);

    const { data: isAdmin, isLoading: isAdminLoading, refetch } = useQuery({
        queryKey: ['isAdmin', email],
        queryFn: async () => {
            try {
                const response = await axiosCommon.get(`/users/admin/${email}`);
                return response.data?.admin; 
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
                return response.data?.mentor;
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
                return response.data?.member;
            } catch (error) {
                console.error("Error fetching trainer role:", error);
                return false; // Return false in case of error
            }
        },
    });

    const isLoading = isAdminLoading || isMentorLoading || isMemberLoading;

    const role = {
        isAdmin: isAdmin ,
        isMentor: isMentor,
        isMember: isMember
        
    };
    console.log(role);
    

    return [role, isLoading, refetch];
};

export default UseRole;
