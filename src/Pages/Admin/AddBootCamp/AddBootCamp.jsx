import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';

const AddBootCamp = () => {
    const axiosCommon = UseAxiosCommon();

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            duration: '',
            price: '',
            location: '',
            rating: 0,
            mentors: [{ name: '', experience: '', expertise: '', m_image: '' }],
            classImage: '',
            classVideo: '',
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'mentors',
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosCommon.post('/bootCamps', data);
            Swal.fire({
                icon: 'success',
                title: 'Bootcamp Added',
                text: 'Your bootcamp was successfully added!',
            });
            reset(); // Reset the form after successful submission
            console.log(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error while adding the bootcamp.',
            });
            console.error('Error adding bootcamp:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Add Bootcamp</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Bootcamp Details */}
                <div>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        placeholder="Bootcamp Name"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Description"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    ></textarea>
                    {errors.description && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('duration', { required: true })}
                        placeholder="Duration (e.g., 12 weeks)"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.duration && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <input
                        type="number"
                        {...register('price', { required: true })}
                        placeholder="Price (e.g., 3500)"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.price && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('location', { required: true })}
                        placeholder="Location (e.g., New York, USA)"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.location && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('classImage', { required: true })}
                        placeholder="Class Image URL"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.classImage && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <input
                        type="text"
                        {...register('classVideo', { required: true })}
                        placeholder="Class Video URL"
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                    />
                    {errors.classVideo && <span className="text-red-500">This field is required</span>}
                </div>

                {/* Mentor Details */}
                <div>
                    <h2 className="font-semibold">Mentors</h2>
                    {fields.map((mentor, index) => (
                        <div key={mentor.id} className="space-y-2">
                            <input
                                type="text"
                                {...register(`mentors.${index}.name`, { required: true })}
                                placeholder="Mentor Name"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                            />
                            {errors.mentors?.[index]?.name && (
                                <span className="text-red-500">This field is required</span>
                            )}

                            <input
                                type="text"
                                {...register(`mentors.${index}.experience`, { required: true })}
                                placeholder="Experience (e.g., 7 years)"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                            />
                            {errors.mentors?.[index]?.experience && (
                                <span className="text-red-500">This field is required</span>
                            )}

                            <input
                                type="text"
                                {...register(`mentors.${index}.expertise`, { required: true })}
                                placeholder="Expertise (e.g., Full-Stack Development)"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                            />
                            {errors.mentors?.[index]?.expertise && (
                                <span className="text-red-500">This field is required</span>
                            )}

                            {/* Mentor Image URL */}
                            <input
                                type="text"
                                {...register(`mentors.${index}.m_image`, { required: true })}
                                placeholder="Mentor Image URL"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                            />
                            {errors.mentors?.[index]?.m_image && (
                                <span className="text-red-500">This field is required</span>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: '', experience: '', expertise: '', m_image: '' })}
                        className="bg-stone-600 my-2 text-white px-4 py-2 rounded hover:bg-gold-400"
                    >
                        Add Mentor
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddBootCamp;
