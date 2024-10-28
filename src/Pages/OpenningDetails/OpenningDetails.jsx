import React from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';

const OpenningDetails = () => {
    const { id } = useParams();
    const axiosCommon = UseAxiosCommon();
    const {
        data: openningData = {},
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["opening", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/openings/${id}`);

            return data;
        },
    });

    return (
        <div>

        </div>
    );
};

export default OpenningDetails;