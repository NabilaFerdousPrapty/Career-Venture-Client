import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Modal from 'react-modal';
import UseAuth from './../../hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

Modal.setAppElement('#root');

const OpenningDetails = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosCommon = UseAxiosCommon();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumeType, setResumeType] = useState('file'); // Manage resume type selection
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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const resumeFile = watch('resume'); // Watching for resume file

    // Add a useEffect to clear opposite field based on resumeType
    useEffect(() => {
        if (resumeType === 'file') {
            setValue('resumeLink', ''); // Clear resume link if file is selected
        } else {
            setValue('resume', null); // Clear resume file if link is selected
        }
    }, [resumeType, setValue]);

    const handleApply = async (data) => {
        setSubmitError("");

        if ((resumeType === 'file' && !resumeFile) || (resumeType === 'link' && !data.resumeLink)) {
            setSubmitError("Please complete all fields.");
            return;
        }

        let resumeUrl = data.resumeLink;

        if (resumeType === 'file') {
            try {
                const cloudinaryFormData = new FormData();
                cloudinaryFormData.append("file", resumeFile[0]);
                cloudinaryFormData.append("upload_preset", "all_files_preset");

                const response = await axiosCommon.post(
                    `https://api.cloudinary.com/v1_1/dadvrb8ri/upload`,
                    cloudinaryFormData
                );
                resumeUrl = response.data.secure_url;
            } catch (error) {
                console.error("Error uploading file to Cloudinary:", error);
                setSubmitError("Failed to upload resume. Please try again.");
                return;
            }
        }

        // Include email, resumeLink, and portfolio in the application data
        const applicationData = {
            email: user.email,
            resumeLink: resumeUrl,
            portfolio: data.portfolio,
        };

        try {
            await axiosCommon.post(`/jobOpenning/${id}/apply`, applicationData);
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
                className="relative border-4 bg-[#333333] border-gray-700 rounded-lg shadow-lg max-w-lg mx-auto p-6 overflow-hidden w-[400px] text-slate-300 h-[450px]"
                overlayClassName="bg-gray-800 bg-opacity-75 fixed inset-0 flex justify-center items-center"
            >
                <h2 className="text-lg font-semibold capitalize">Apply for the Job</h2>
                <form onSubmit={handleSubmit(handleApply)} className="mt-4">
                    <label className="block text-sm font-medium mt-3">Email Address</label>
                    <input
                        value={user.email}
                        readOnly
                        type="email"
                        className="block w-full px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-md mt-3"
                    />

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Resume Option</label>
                        <div className="flex mt-2 border-b border-gray-300">
                            <button
                                type="button"
                                onClick={() => setResumeType('file')}
                                className={`px-4 py-2 text-sm font-medium ${resumeType === 'file' ? 'text-gray-800 bg-indigo-600' : 'text-slate-950 bg-gray-100'} rounded-t`}
                            >
                                Upload Resume
                            </button>
                            <button
                                type="button"
                                onClick={() => setResumeType('link')}
                                className={`px-4 py-2 text-sm font-medium ${resumeType === 'link' ? 'text-white bg-indigo-600' : 'text-gray-600 bg-gray-100'} rounded-t`}
                            >
                                Resume Link
                            </button>
                        </div>
                    </div>

                    {resumeType === 'file' ? (
                        <label className="block mt-3 h-10" htmlFor="resume">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                {...register('resume', { required: resumeType === 'file' })}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer"
                            />
                            {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
                        </label>
                    ) : (
                        <label className="block mt-3 h-10" htmlFor="resumeLink">
                            <input
                                type="url"
                                placeholder="https://yourresume.com"
                                {...register('resumeLink', { required: resumeType === 'link' })}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                            />
                            {errors.resumeLink && <p className="text-red-500 text-sm">{errors.resumeLink.message}</p>}
                        </label>
                    )}

                    <label className="block mt-5" htmlFor="portfolio">
                        <input
                            type="url"
                            placeholder="https://yourportfolio.com"
                            {...register('portfolio', { required: true })}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                        />
                        {errors.portfolio && <p className="text-red-500 text-sm">Portfolio is required.</p>}
                    </label>

                    {submitError && <p className="text-red-500 mt-2">{submitError}</p>}

                    <div className="flex items-center mt-5 justify-center">
                        <button type="submit" className="px-4 py-2 rounded-md text-white bg-[#ad8a54]">Apply Now</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OpenningDetails;
