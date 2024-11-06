import React, { useState, useEffect } from "react";
import AOS from "aos";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import { ClockLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function AllJobApplications() {
    const [search, setSearch] = useState("");
    const [applicationsWithDetails, setApplicationsWithDetails] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        setSearch(data.search);
    };

    const axiosCommon = UseAxiosCommon();
    const [page, setPage] = useState(1); // Track the current page
    const [limit] = useState(6); // Set the number of items per page

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["jobApplications", page, search],
        queryFn: async () => {
            const response = await axiosCommon.get(
                `/jobApplications?page=${page}&limit=${limit}&search=${search}`
            );
            console.log("Job Applications Data:", response.data);  // Log the fetched job applications
            return response.data;
        },
    });

    const { jobApplications, currentPage, totalPages } = data || {}; // Safely access the response data

    useEffect(() => {
        if (jobApplications && jobApplications.length > 0) {
            // Fetch job details for each job application
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
        <div className="container mx-auto p-6 bg-[#1a103d] text-white"> {/* Dark background with white text */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex items-center justify-between p-4 rounded-lg shadow-md bg-[#1a103d]">
                <input
                    type="text"
                    placeholder="Search job applications"
                    {...register('search')}
                    className="border p-2 rounded-lg w-2/3 text-lg bg-[#1a103d] text-white" // Input field with dark background and white text
                />
                <button type="submit" className="ml-4 p-2 bg-blue-600 text-white rounded-lg text-lg">Search</button>
            </form>

            <div className="p-4 rounded-lg shadow-md bg-[#1a103d]">
                {applicationsWithDetails && applicationsWithDetails.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse text-left">
                        <thead className="bg-[#1a103d] text-white">
                            <tr>
                                <th className="px-4 py-2">Position</th>
                                <th className="px-4 py-2">Candidate Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Applied At</th>
                                <th className="px-4 py-2">Resume</th>
                                <th className="px-4 py-2">Portfolio</th>
                                <th className="px-4 py-2">Job Title</th>
                                <th className="px-4 py-2">Company</th>
                                <th className="px-4 py-2">Location</th>

                            </tr>
                        </thead>
                        <tbody>
                            {applicationsWithDetails.map((application) => (
                                <tr key={application._id} className="border-b ">
                                    <td className="px-4 py-2">{application.position}</td>
                                    <td className="px-4 py-2">{application.candidateName}</td>
                                    <td className="px-4 py-2">{application.email}</td>
                                    <td className="px-4 py-2">{new Date(application.appliedAt).toLocaleString()}</td>
                                    <td className="px-4 py-2">
                                        <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Portfolio</a>
                                    </td>
                                    <td className="px-4 py-2">{application.jobDetails?.title}</td>
                                    <td className="px-4 py-2">{application.jobDetails?.company}</td>
                                    <td className="px-4 py-2">{application.jobDetails?.location}</td>

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
