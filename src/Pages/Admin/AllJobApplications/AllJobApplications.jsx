import React, { useEffect, useState } from 'react';
import { AOS } from 'aos';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import { ClockLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

function AllJobApplications() {
    const [search, setSearch] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
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
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <ClockLoader />
            </div>
        );
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    const { jobApplications, currentPage, totalPages } = data || {}; // Safely access the response data

    console.log("Job Applications:", jobApplications);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <input
                    type="text"
                    placeholder="Search job applications"
                    {...register('search')}
                    className="border p-2 rounded"
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
            </form>

            <div className="job-list">
                {jobApplications && jobApplications.length > 0 ? (
                    jobApplications.map((application) => (
                        <div key={application._id} className="job-item">
                            {/* Render job application details here */}
                            <p>{application.position}</p>
                            <p>{application.candidateName}</p>
                            <p>{application.dateApplied}</p>
                        </div>
                    ))
                ) : (
                    <p>No job applications found.</p>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="p-2 bg-gray-300 rounded"
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="p-2 bg-gray-300 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllJobApplications;
