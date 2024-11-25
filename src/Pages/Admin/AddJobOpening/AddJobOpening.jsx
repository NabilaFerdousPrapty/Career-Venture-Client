import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const JobForm = () => {

    const [applyBy, setApplyBy] = useState(new Date()); // State to manage the date
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            designation: '',
            company: '',
            location: '',
            type: '',
            experience: '',
            salary: '',
            description: '',
            postedDate: new Date(),
            applyBy: applyBy, // Set default value for applyBy
            jobImage: '', // New field for Job Image URL
        },
    });

    const axiosSecure = UseAxiosSecure();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission
        axiosSecure.post('/jobOpenning', data)
            .then((res) => {
                console.log(res.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Job Posted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            });
    };

    return (
        <section className="max-w-4xl lg:my-10 my-3 p-6 mx-auto border bg-accent border-amber-600 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-primary capitalize ">Job Posting</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
                    <div>
                        <label className="text-primary" htmlFor="title">Job Title</label>
                        <input
                            id="title"
                            {...register('title', { required: 'Job Title is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.title ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="designation">Designation</label>
                        <input
                            id="designation"
                            {...register('designation', { required: 'Designation is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.designation ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="company">Company</label>
                        <input
                            id="company"
                            {...register('company', { required: 'Company is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.company ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="location">Location</label>
                        <input
                            id="location"
                            {...register('location', { required: 'Location is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.location ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="type">Job Type</label>
                        <input
                            id="type"
                            {...register('type', { required: 'Job Type is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.type ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="experience">Experience (in years)</label>
                        <input
                            id="experience"
                            type="number"
                            {...register('experience', { required: 'Experience is required', min: 0 })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.experience ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="salary">Salary</label>
                        <input
                            id="salary"
                            type="number"
                            {...register('salary', { required: 'Salary is required', min: 0 })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.salary ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="jobImage">Job Image URL</label>
                        <input
                            id="jobImage"
                            {...register('jobImage', { required: 'Job Image URL is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.jobImage ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        />
                        {errors.jobImage && <p className="text-red-500">{errors.jobImage.message}</p>}
                    </div>

                    <div className=''>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="applyBy">Apply By</label>
                        <div>
                            <DatePicker
                                id="applyBy"
                                selected={applyBy} // Use the state variable
                                onChange={(date) => {
                                    setApplyBy(date); // Update the state when the date changes
                                    setValue('applyBy', date); // Update the form value
                                }}
                                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.applyBy ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Job Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            {...register('description', { required: 'Description is required' })}
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
                                ${errors.description ? 'border-red-500' : 'border-gray-200'} 
                                 focus:ring-opacity-40 
                                dark:focus:border-blue-300 focus:outline-none focus:ring`}
                        ></textarea>
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 font-semibold text-white bg-amber-600 rounded-md hover:bg-amber-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default JobForm;
