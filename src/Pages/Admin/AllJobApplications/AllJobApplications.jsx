import React, { useState, useEffect } from "react";
import AOS from "aos";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AllJobApplications() {

    const [applicationsWithDetails, setApplicationsWithDetails] = useState([]);


    const axiosCommon = UseAxiosCommon();
    const [page, setPage] = useState(1); // Track the current page
    const [limit] = useState(6); // Set the number of items per page

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["jobApplications", page,],
        queryFn: async () => {
            const response = await axiosCommon.get(
                `/jobApplications?page=${page}&limit=${limit}`
            );
            return response.data;
        },
    });

    const { jobApplications, currentPage, totalPages } = data || {}; // Safely access the response data

    useEffect(() => {
        if (jobApplications && jobApplications.length > 0) {
            const fetchJobDetailsForApplications = async () => {
                const applicationsWithDetails = await Promise.all(
                    jobApplications.map(async (application) => {
                        const jobResponse = await axiosCommon.get(`/jobOpenning/${application.jobId}`);
                        return {
                            ...application,
                            jobDetails: jobResponse.data, // Attach job details to the application
                        };
                    })
                );
                setApplicationsWithDetails(applicationsWithDetails);
            };

            fetchJobDetailsForApplications();
        }
    }, [jobApplications, axiosCommon]);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <ClockLoader />
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500 text-center">Error: {error.message}</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-[#1a103d] text-white">


            <div className="p-4 rounded-lg shadow-md border-2 bg-gray-300 text-gray-950 border-[#1a103d]">
                {applicationsWithDetails && applicationsWithDetails.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse text-left">
                        <thead className="bg-[#1a103d] text-white">
                            <tr>
                                <th className="px-4 py-2">Applicant Name</th>
                                <th className="px-4 py-2">Job Title</th>
                                <th className="px-4 py-2">Company Name</th>
                                <th className="px-4 py-2">
                                    See Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationsWithDetails.map((application) => (
                                <tr key={application._id} className="">
                                    <td className="px-4 py-2 border-2 border-[#1a103d]">{application.applicant_name}</td>
                                    <td className="px-4 py-2 border-2 border-[#1a103d]">{application.jobDetails?.title}</td>
                                    <td className="px-4 py-2 border-2 border-[#1a103d]">{application.jobDetails?.company}</td>
                                    <td className="px-4 py-2 border-2 border-[#1a103d]">
                                        <Link
                                            to={`/dashboard/application/${application.jobId}/${application._id}`}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No job applications found.</p>
                )}
            </div>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-lg text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => (!totalPages || prev + 1 > totalPages ? prev : prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllJobApplications;
