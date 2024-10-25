import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';

const ResourceDetail = () => {
    const { id } = useParams();
    const axiosCommon = UseAxiosCommon();

    const {
        data: resourceData = {},
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["resource", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/resources/${id}`);
            return data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img
                    className="object-cover w-full "
                    src={resourceData.imageLink}
                    alt={resourceData.name}
                />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                            {resourceData.tags?.[0] || "Resource"}
                        </span>
                        <a
                            href={resourceData.resourceLink || "#"}
                            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                            tabIndex="0"
                            role="link"
                        >
                            {resourceData.name}
                        </a>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {resourceData.description}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img
                                    className="object-cover h-10 rounded-full"
                                    src={resourceData.author?.a_image}
                                    alt={resourceData.author?.name}
                                />
                                <a
                                    href={resourceData.author?.profileLink || "#"}
                                    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                                    tabIndex="0"
                                    role="link"
                                >
                                    {resourceData.author?.name}
                                </a>
                            </div>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                                {new Date(resourceData.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;
