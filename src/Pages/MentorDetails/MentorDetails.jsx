import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import { FaCalendarAlt, FaEnvelope, FaMapPin, FaSuitcase } from 'react-icons/fa';

const MentorDetails = () => {
    const axiosCommon = UseAxiosCommon();
    const { id } = useParams();
    const navigate = useNavigate(); // for redirection

    // Fetch mentor data
    const { data: mentorData = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["mentorData", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentors/${id}`);
            return data;
        },
    });

    // Fetch mentor's available slots
    const { data: mentorSlots = [], isLoading: isSlotLoading, isError: isSlotError, error: slotError } = useQuery({
        queryKey: ["mentorSlots", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/mentor/slots/${id}`);
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [mentorData, mentorSlots]);

    const handleBookSlot = (slotId) => {
        // Redirect to Pricing Plans page with query parameters
        navigate(`/pricingPlans?slotId=${slotId}&mentorId=${id}&mentorName=${mentorData.name}`);
    };

    if (isLoading || isSlotLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-5xl mx-auto p-5 text-center bg-slate-950">
            <div className="w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 flex flex-col lg:flex-row justify-between items-center px-5 gap-3">
                <div>
                    <img
                        className="object-cover object-center mx-auto rounded-xl border border-gray-500 h-[460px]"
                        src={mentorData.profile_image}
                        alt={mentorData.name}
                    />
                </div>

                <div className="pb-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{mentorData.name}</h1>
                    <p className="py-2 text-gray-700 dark:text-gray-400">{mentorData.bio}</p>
                    <div className="mt-4">
                        <ul className="flex flex-wrap justify-between items-center list-inside text-gray-700 dark:text-gray-400">
                            {mentorData.skills.map((skill) => (
                                <li className="bg-slate-300 text-blue-900 p-1 border-amber-600 rounded-2xl w-30" key={skill}>
                                    #{skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        {/* Designation */}
                        <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                            <FaSuitcase className="w-6 h-6 text-current" />
                            <h1 className="px-2 text-sm">{mentorData.designation}</h1>
                        </div>

                        {/* Location */}
                        <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                            <FaMapPin className="w-6 h-6 text-current" />
                            <h1 className="px-2 text-sm">{mentorData.location}</h1>
                        </div>

                        {/* Email */}
                        <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                            <FaEnvelope className="w-6 h-6 text-current" />
                            <h1 className="px-2 text-sm">{mentorData.email}</h1>
                        </div>

                        {/* Available Days */}
                        <div className="flex justify-center items-center mt-4 text-gray-700 dark:text-gray-200">
                            <FaCalendarAlt className="w-6 h-6 text-current" />
                            <h1 className="px-2 text-sm">Available: {mentorData.available_days.join(', ')}</h1>
                        </div>

                        {/* Qualifications */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="mt-4">
                                <h2 className="text-gray-800 dark:text-white font-semibold">Qualifications:</h2>
                                <p className="text-gray-700 dark:text-gray-400">{mentorData.background_and_qualifications}</p>
                            </div>

                            {/* Other Info */}
                            <div className="mt-4">
                                <h2 className="text-gray-800 dark:text-white font-semibold">Other Info:</h2>
                                <p className="text-gray-700 dark:text-gray-400">{mentorData.other_info}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentor's Available Slots */}
            <div className="mt-8 max-w-xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Available Slots</h2>
                <div className="flex flex-col lg:flex-row flex-wrap gap-4 mt-4">
                    {mentorSlots.map((slot) => (
                        slot.status === "available" && (
                            <div
                                key={slot._id}
                                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center max-w-md mx-auto"
                            >
                                <div>
                                    <p className="text-gray-700 dark:text-gray-400">{slot.day_of_week}</p>
                                    <p className="text-gray-700 dark:text-gray-400">{slot.hour}</p>
                                    <p className="text-gray-700 dark:text-gray-400">Duration: {slot.duration} hour(s)</p>
                                </div>
                                <button
                                    onClick={() => handleBookSlot(slot._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Book
                                </button>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorDetails;
