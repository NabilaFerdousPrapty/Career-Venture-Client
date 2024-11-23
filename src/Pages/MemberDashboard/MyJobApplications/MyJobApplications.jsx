import React from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';

const MyJobApplications = () => {
    const { user } = UseAuth();
    const { email } = user;
    const userEmail = email;

    const axiosCommon = UseAxiosCommon();
    const { data: myJobApplications = [], refetch: applicationRefetch } = useQuery({
        queryKey: ["myJobApplications"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/jobApplications/user/${userEmail}`);
            return data;
        },
    });

    const { data: myJobApplicationResponse = [], refetch: responseRefetch } = useQuery({
        queryKey: ["myJobApplicationResponse"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/jobApplicationResponse/${userEmail}`);
            return data;
        },
    });

    return (
        <div className="p-6 max-w-6xl mx-auto ">
            <h2 className="text-2xl font-semibold mb-6">My Job Applications</h2>

            {/* Job Applications Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myJobApplications.map((application) => (
                    <div key={application._id} className="bg-stone-600 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">{application.applicant_name}</h3>
                        </div>
                        <div className="p-4">
                            <p><strong>Job ID:</strong> {application.jobId}</p>
                            <p><strong>Email:</strong> {application.email}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                            <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
                            <div className="mt-4">
                                <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a>
                                <br />
                                <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Portfolio</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">My Job Application Responses</h2>

            {/* Job Application Responses Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myJobApplicationResponse.map((response) => (
                    <div key={response._id} className="bg-stone-600 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">{response.jobTitle}</h3>
                        </div>
                        <div className="p-4">
                            <p><strong>Interview Date:</strong> {new Date(response.interviewDate).toLocaleString()}</p>
                            <p><strong>Feedback:</strong> {response.feedback}</p>
                            <p><strong>Status:</strong> {response.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyJobApplications;
