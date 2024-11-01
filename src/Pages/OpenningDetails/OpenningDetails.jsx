import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Modal from 'react-modal';
import UseAuth from './../../hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';
Modal.setAppElement('#root');

const OpenningDetails = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosCommon = UseAxiosCommon();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumeType, setResumeType] = useState('file'); // New state to manage resume type selection
    const [resume, setResume] = useState(null);
    const [resumeLink, setResumeLink] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [submitError, setSubmitError] = useState('');

    const { data: openingData = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["opening", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/jobOpenning/${id}`);
            return data;
        },
    });

    useEffect(() => {
        refetch();
    }, [openingData]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleResumeChange = (e) => setResume(e.target.files[0]);
    const handleResumeLinkChange = (e) => setResumeLink(e.target.value);
    const handlePortfolioChange = (e) => setPortfolio(e.target.value);

    const handleApply = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if ((resumeType === 'file' && !resume) || (resumeType === 'link' && !resumeLink) || !portfolio) {
            setSubmitError("Please complete all fields.");
            return;
        }

        const formData = new FormData();
        if (resumeType === 'file') formData.append("resume", resume);
        else formData.append("resumeLink", resumeLink);

        formData.append("portfolio", portfolio);

        try {
            await axiosCommon.post(`/jobOpenning/${id}/apply`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted',
                text: 'Your application has been submitted successfully.',
            });

            closeModal();
        } catch (error) {
            console.error("Error applying for job:", error);
            setSubmitError("Failed to submit application. Please try again.");
            Swal.fire({
                icon: 'error',
                title: 'Application Failed',
                text: 'Failed to submit application. Please try again.',
            });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-5xl bg-[#3b3b4f] mx-auto rounded-lg shadow-md p-6">
            <img
                className="object-cover w-full h-80 rounded-md"
                src={openingData.jobImage}
                alt={openingData.title}
            />
            <h2 className="text-2xl font-semibold mt-4">{openingData.title}</h2>
            <p className="text-sm">{openingData.company} - {openingData.location}</p>
            <p className="mt-2">{openingData.description}</p>
            <p className="mt-2"><strong>Experience:</strong> {openingData.experience} years</p>
            <p className="mt-2"><strong>Salary:</strong> BDT {openingData.salary}</p>
            <button
                onClick={openModal}
                className="mt-4 px-4 py-2 rounded-md focus:outline-none text-white bg-[#ad8a54]"
            >
                Apply Now
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Apply for Job"
                className="relative border-4 bg-indigo-400 border-gray-700 rounded-lg shadow-lg max-w-lg mx-auto p-6 overflow-hidden w-[400px] text-gray-800 h-[450px]"
                overlayClassName="bg-gray-800 bg-opacity-75 fixed inset-0 flex justify-center items-center"
            >
                <h2 className="text-lg font-semibold text-gray-800 capitalize">Apply for the Job</h2>
                <form onSubmit={handleApply} className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mt-3">Email Address</label>
                    <input
                        value={user.email}
                        readOnly
                        type="email"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md mt-3"
                    />

                    {/* Resume Type Selection as Tabs */}
                    <div className="mt-4 ">
                        <label className="block text-sm font-medium text-gray-700">Resume Option</label>
                        <div className="flex mt-2 border-b border-gray-300">
                            <button
                                type="button"
                                onClick={() => setResumeType('file')}
                                className={`px-4 py-2 text-sm font-medium ${resumeType === 'file' ? 'text-white bg-indigo-600' : 'text-gray-600 bg-gray-100'
                                    } rounded-t`}
                            >
                                Upload Resume
                            </button>
                            <button
                                type="button"
                                onClick={() => setResumeType('link')}
                                className={`px-4 py-2 text-sm font-medium ${resumeType === 'link' ? 'text-white bg-indigo-600' : 'text-gray-600 bg-gray-100'
                                    } rounded-t`}
                            >
                                Resume Link
                            </button>
                        </div>
                    </div>

                    {/* Conditional Inputs */}
                    {resumeType === 'file' ? (
                        <label className="block mt-3 h-10" htmlFor="resume">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer "
                            />
                        </label>
                    ) : (
                        <label className="block mt-3 h-10" htmlFor="resumeLink">
                            <input
                                type="url"
                                placeholder="https://yourresume.com"
                                value={resumeLink}
                                onChange={handleResumeLinkChange}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                            />
                        </label>
                    )}

                    <label className="block mt-5 " htmlFor="portfolio">
                        <input
                            type="url"
                            placeholder="https://yourportfolio.com"
                            value={portfolio}
                            onChange={handlePortfolioChange}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                        />
                    </label>

                    {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-[#ad8a54] hover:bg-[#ad8a54] rounded"
                        >
                            Apply Now
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OpenningDetails;
