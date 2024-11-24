import React, { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import Swal from 'sweetalert2';

const BeAMentor = () => {
    const { user } = UseAuth();
    const axiosCommon = UseAxiosCommon();

    // Form state
    const [mentorData, setMentorData] = useState({
        name: '',
        location: '',
        designation: '',
        email: user.email, // Automatically setting the user's email
        profile_image: '',
        years_of_experience: '',
        social_media_links: [], // Ensure it's an array
        available_days: [], // Initially empty array
        background_and_qualifications: '',
        other_info: '',
        bio: '',
        age: '',
        skills: [], // Ensure skills is an array
    });

    // Handle input change for non-array fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMentorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle social media links change (comma separated string to array)
    const handleSocialMediaLinksChange = (e) => {
        const value = e.target.value;
        const linksArray = value.split(',').map(link => link.trim()); // Split and trim each link
        setMentorData((prevData) => ({
            ...prevData,
            social_media_links: linksArray,
        }));
    };

    // Handle day selection for available days (update to handle multiple selections)
    const handleDaySelect = (e) => {
        const selectedDay = e.target.value;
        setMentorData((prevData) => {
            const updatedDays = prevData.available_days.includes(selectedDay)
                ? prevData.available_days.filter(day => day !== selectedDay) // Remove if already in the array
                : [...prevData.available_days, selectedDay]; // Add if not already in the array
            return { ...prevData, available_days: updatedDays };
        });
    };

    // Handle skills input change (comma separated string to array)
    const handleSkillsChange = (e) => {
        const value = e.target.value;
        const skillsArray = value.split(',').map(skill => skill.trim()); // Split and trim each skill
        setMentorData((prevData) => ({
            ...prevData,
            skills: skillsArray,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMentorData = {
            ...mentorData, status: "pending",
        };
        console.log(updatedMentorData);
        // Add 'status' field
        try {
            const response = await axiosCommon.post('/mentor/apply', updatedMentorData);
            if (response.data) {
                Swal.fire({
                    title: 'Application Submitted',
                    text: 'Thank you for submitting your application!',
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
                setMentorData({
                    name: '',
                    location: '',
                    designation: '',
                    email: user.email,
                    profile_image: '',
                    years_of_experience: '',
                    social_media_links: [],
                    available_days: [],
                    background_and_qualifications: '',
                    other_info: '',
                    bio: '',
                    age: '',
                    skills: [],
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error submitting your application. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Error',
                text: 'There was an error submitting your application. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    return (
        <div className="container mx-auto p-6 bg-accent shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Become a Mentor</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={mentorData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={mentorData.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={mentorData.designation}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Profile Image URL</label>
                    <input
                        type="text"
                        name="profile_image"
                        value={mentorData.profile_image}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Years of Experience</label>
                    <input
                        type="number"
                        name="years_of_experience"
                        value={mentorData.years_of_experience}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Social Media Links</label>
                    <input
                        type="text"
                        name="social_media_links"
                        value={mentorData.social_media_links.join(', ')}
                        onChange={handleSocialMediaLinksChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Select Available Days</label>
                    <select
                        value=""
                        onChange={handleDaySelect}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <p className="mt-2 text-sm text-primary">
                        Selected days: {mentorData.available_days.join(', ')}
                    </p>
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="block font-medium text-primary mb-2">Background and Qualifications</label>
                    <textarea
                        name="background_and_qualifications"
                        value={mentorData.background_and_qualifications}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="block font-medium text-primary mb-2">Other Information</label>
                    <textarea
                        name="other_info"
                        value={mentorData.other_info}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="block font-medium text-primary mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={mentorData.bio}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block font-medium text-primary mb-2">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={mentorData.age}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col md:col-span-2">
                    <label className="block font-medium text-primary mb-2">Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={mentorData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="md:col-span-3 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
};

export default BeAMentor;
