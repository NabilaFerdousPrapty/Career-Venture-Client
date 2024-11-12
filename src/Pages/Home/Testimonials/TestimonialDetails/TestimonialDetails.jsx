import React from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const TestimonialDetails = () => {
    const { id } = useParams();
    const axiosCommon = UseAxiosCommon();

    // Fetch the specific testimonial data using react-query
    const { data: testimonial, isLoading } = useQuery({
        queryKey: ["reviewer", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/testimonial/${id}`);
            return data;
        },
    });

    // Loading spinner while data is being fetched
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-24 h-20 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    // If testimonial data is not available, display a message
    if (!testimonial) {
        return <p className="text-center mt-10 text-gray-600">Testimonial not found.</p>;
    }

    // Destructure testimonial data for easy access
    const { name, review, rating, date, feature, image } = testimonial;

    return (
        <div className="flex items-center justify-center ">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                <img className="w-full h-[600px] object-cover" src={image} alt={name} />

                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature}</p>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">{review}</p>

                    <div className="flex items-center mt-4">
                        <span className="text-yellow-500 font-bold text-sm">
                            Rating: {rating}/5
                        </span>
                        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {new Date(date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetails;
