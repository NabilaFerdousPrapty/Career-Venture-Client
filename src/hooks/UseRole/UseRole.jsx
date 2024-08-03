import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./UseAxiosCommon";

const UseRole = (email) => {
    const axiosCommon = UseAxiosCommon();
    // console.log(email);

    const { data: isAdmin, isPending: isAdminLoading,refetch } = useQuery({
        queryKey: ['isAdmin', email],
        queryFn: async () => {
            try {
                const response = await axiosCommon.get(`/users/admin/${email}`);
                return response.data?.admin;
            } catch (error) {
                console.error("Error fetching admin role:", error);
                return false; // Return false in case of error
            }
        },
    });

    const { data: isTrainer, isPending: isTrainerLoading } = useQuery({
        queryKey: ['isTrainer', email],
        queryFn: async () => {
            try {
                const response = await axiosCommon.get(`/users/trainer/${email}`);
                return response.data?.trainer;
            } catch (error) {
                console.error("Error fetching trainer role:", error);
                return false; // Return false in case of error
            }
        },
    });

    const isLoading = isAdminLoading || isTrainerLoading;

    const role = {
        isAdmin: isAdmin ,
        isTrainer: isTrainer,
        
    };

    return [role, isLoading, refetch];
};

export default UseRole;
