import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';

const MentorDetails = () => {
    const axiosCommon = UseAxiosCommon();
    const { id } = useParams();

    const { data: mentorData = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["mentorData", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentors/${id}`);
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [mentorData]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="flex justify-center p-5 text-center">
            <div className="w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover object-center w-[35%] mx-auto rounded-xl border border-gray-500 h-80"
                    src={mentorData.profile_image}
                    alt={mentorData.name}
                />



                <div className="px-6 py-4 ">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{mentorData.name}</h1>
                    <p className="py-2 text-gray-700 dark:text-gray-400">{mentorData.bio}</p>
                    <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg aria-label="suitcase icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 11H10V13H14V11Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
                        </svg>
                        <h1 className="px-2 text-sm">{mentorData.designation}</h1>
                    </div>

                    <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z" />
                        </svg>
                        <h1 className="px-2 text-sm">{mentorData.location}</h1>
                    </div>

                    <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg aria-label="email icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
                        </svg>
                        <h1 className="px-2 text-sm">{mentorData.email}</h1>
                    </div>

                    <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg aria-label="calendar icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 2C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V3C20 2.44772 19.5523 2 19 2H5ZM19 0H5C3.34315 0 2 1.34315 2 3V21C2 22.6569 3.34315 24 5 24H19C20.6569 24 22 22.6569 22 21V3C22 1.34315 20.6569 0 19 0ZM8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12Z" />
                        </svg>
                        <h1 className="px-2 text-sm">Available: {mentorData.available_days.join(', ')}</h1>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-gray-800 dark:text-white font-semibold">Qualifications:</h2>
                        <p className="text-gray-700 dark:text-gray-400">{mentorData.background_and_qualifications}</p>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-gray-800 dark:text-white font-semibold">Other Info:</h2>
                        <p className="text-gray-700 dark:text-gray-400">{mentorData.other_info}</p>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-gray-800 dark:text-white font-semibold">Skills:</h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                            {mentorData.skills.map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDetails;
