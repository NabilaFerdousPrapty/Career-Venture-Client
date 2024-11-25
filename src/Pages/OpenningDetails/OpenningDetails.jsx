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
    const [resumeType, setResumeType] = useState('file');
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

    const resumeFile = watch('resume');

    useEffect(() => {
        if (resumeType === 'file') {
            setValue('resumeLink', '');
        } else {
            setValue('resume', null);
        }
    }, [resumeType, setValue]);

    const handleApply = async (data) => {
        setSubmitError("");

        // Check if required fields are filled
        if ((resumeType === 'file' && !resumeFile) || (resumeType === 'link' && !data.resumeLink)) {
            setSubmitError("Please complete all fields.");
            return;
        }

        let resumeUrl = data.resumeLink;

        // Upload resume to Cloudinary if it's a file
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

        // Create application data including photo
        const applicationData = {
            name: data.name,
            email: user.email,
            resumeLink: resumeUrl,
            portfolio: data.portfolio,  // Portfolio Link
            phone: data.phone,
            address: data.address,
            photo: user.photoURL,  // Photo URL from user object
            status: "pending",
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
        <div className="max-w-5xl bg-accent mx-auto rounded-lg shadow-md p-6 my-3 mt-24">
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
                className="relative border-4 bg-[#333333] border-gray-700 rounded-lg shadow-lg max-w-3xl mx-auto p-6 overflow-auto h-[500px] text-slate-300  max-h-[90vh] grid grid-cols-1 gap-4"
                overlayClassName="bg-gray-800 bg-opacity-75 fixed inset-0 flex justify-center items-center"
            >
                <h2 className="text-lg font-semibold capitalize text-center">Apply for the Job</h2>
                <form onSubmit={handleSubmit(handleApply)} className="mt-4 space-y-4">
                    {/* Name Field */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium mt-3">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md mt-3"
                        />
                        {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
                    </div>

                    {/* Email Address (Read Only) */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium mt-3">Email Address</label>
                        <input
                            value={user.email}
                            readOnly
                            type="email"
                            className="block w-full px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-md mt-3"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium mt-3">Phone Number</label>
                        <input
                            type="text"
                            {...register('phone', { required: true })}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md mt-3"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">Phone is required.</p>}
                    </div>

                    {/* Address Field */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium mt-3">Address</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md mt-3"
                        />
                        {errors.address && <p className="text-red-500 text-sm">Address is required.</p>}
                    </div>

                    {/* Portfolio Field */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="block text-sm font-medium mt-3">Portfolio Link</label>
                        <input
                            type="url"
                            {...register('portfolio', { required: false })}
                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md mt-3"
                        />
                    </div>

                    {/* Resume Option */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <label className="block text-sm font-medium">Resume Option</label>
                        <div className="flex gap-2">
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
                                className={`px-4 py-2 text-sm font-medium ${resumeType === 'link' ? 'text-white bg-indigo-600' : 'text-slate-950 bg-gray-100'} rounded-t`}
                            >
                                Provide Resume Link
                            </button>
                        </div>
                    </div>

                    {/* Conditional Resume Upload Field */}
                    {resumeType === 'file' ? (
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <label className="block text-sm font-medium mt-3">Upload Resume (PDF, DOCX)</label>
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                {...register('resume', { required: true })}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                            />
                            {errors.resume && <p className="text-red-500 text-sm">Resume is required.</p>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <label className="block text-sm font-medium mt-3">Resume Link</label>
                            <input
                                type="url"
                                {...register('resumeLink', { required: true })}
                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md"
                            />
                            {errors.resumeLink && <p className="text-red-500 text-sm">Resume link is required.</p>}
                        </div>
                    )}

                    {/* Error Message */}
                    {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                    {/* Submit Button */}
                    <div className="mt-4 text-center">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OpenningDetails;
