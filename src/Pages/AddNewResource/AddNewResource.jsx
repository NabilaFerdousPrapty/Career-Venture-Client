import React, { useState } from 'react';
import useTheme from '../../hooks/UseTheme/UseTheme';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import Swal from 'sweetalert2';

const AddNewResource = () => {
    const { theme } = useTheme();
    const axiosCommon = UseAxiosCommon();

    const [formData, setFormData] = useState({
        name: '',
        details: '',
        description: '',
        author: {
            name: '',
            bio: '',
            profileLink: '',
            a_image: '',
        },
        imageLink: '',
        tags: '',
        resourceLink: '',
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        // For nested author fields
        if (name.startsWith('author.')) {
            const key = name.split('.')[1];
            setFormData({
                ...formData,
                author: { ...formData.author, [key]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosCommon.post('/resources', {
                ...formData,
                tags: formData.tags.split(',').map((tag) => tag.trim()),
            });

            Swal.fire({
                icon: 'success',
                title: 'Resource Added Successfully',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Resource',
                text: error.response.data.message,
            });
        }
    };

    return (
        <div className={`p-6 mx-auto max-w-4xl rounded-md shadow-md `}>
            <h2 className={`text-lg  font-semibold capitalize text-primary text-center`}>Add New Resource</h2>
            <form onSubmit={handleSubmit} className="mt-6 bg-accent p-5">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div className='lg:col-span-2'>
                        <label className={`text-primary`} htmlFor="name">Resource Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Resource Name"
                            onChange={handleChange}
                            required
                            className={` w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-2">
                        <label className={`text-primary`} htmlFor="details">Details</label>
                        <textarea
                            id="details"
                            name="details"
                            placeholder="Details"
                            onChange={handleChange}
                            required
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40 focus:outline-none focus:ring`}
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                        <label className={`text-primary`} htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            required
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40 focus:outline-none focus:ring`}
                        ></textarea>
                    </div>

                    {/* Author Fields */}
                    <div>
                        <label className={`text-primary`} htmlFor="author.name">Author Name</label>
                        <input
                            id="author.name"
                            name="author.name"
                            type="text"
                            placeholder="Author Name"
                            onChange={handleChange}
                            required
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                    <div>
                        <label className={`text-primary`} htmlFor="author.bio">Author Bio</label>
                        <input
                            id="author.bio"
                            name="author.bio"
                            type="text"
                            placeholder="Author Bio"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                    <div>
                        <label className={`text-primary`} htmlFor="author.profileLink">Author Profile Link</label>
                        <input
                            id="author.profileLink"
                            name="author.profileLink"
                            type="url"
                            placeholder="Author Profile Link"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2 border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                    <div>
                        <label className={`text-primary`} htmlFor="author.a_image">Author Image URL</label>
                        <input
                            id="author.a_image"
                            name="author.a_image"
                            type="url"
                            placeholder="Author Image URL"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>

                    {/* Other Fields */}
                    <div>
                        <label className={`text-primary`} htmlFor="imageLink">Resource Image Link</label>
                        <input
                            id="imageLink"
                            name="imageLink"
                            type="url"
                            placeholder="Resource Image Link"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                    <div>
                        <label className={`text-primary`} htmlFor="tags">Tags</label>
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            placeholder="Tags (comma-separated)"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                    <div>
                        <label className={`text-primary`} htmlFor="resourceLink">Resource Link</label>
                        <input
                            id="resourceLink"
                            name="resourceLink"
                            type="url"
                            placeholder="Resource Link"
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 mt-2  border  rounded-md focus:ring-opacity-40  focus:outline-none focus:ring`}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        Add Resource
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewResource;
