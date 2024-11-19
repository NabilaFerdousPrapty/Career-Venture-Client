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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Become a Mentor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={mentorData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={mentorData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={mentorData.designation}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Profile Image URL</label>
                    <input
                        type="text"
                        name="profile_image"
                        value={mentorData.profile_image}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Years of Experience</label>
                    <input
                        type="number"
                        name="years_of_experience"
                        value={mentorData.years_of_experience}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Social Media Links (Comma Separated)</label>
                    <input
                        type="text"
                        name="social_media_links"
                        value={mentorData.social_media_links.join(', ')} // Join array values for display
                        onChange={handleSocialMediaLinksChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Dropdown for Available Days */}
                <div>
                    <label className="block text-gray-700 mb-2">Select Available Days</label>
                    <select
                        value=""
                        onChange={handleDaySelect}
                        className="w-full p-2 border rounded"
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
                    <div className="mt-2">
                        <p className="text-sm">Selected days: {mentorData.available_days.join(', ')}</p>
                    </div>
                </div>

                <div>
                    <label className="block font-medium">Background and Qualifications</label>
                    <textarea
                        name="background_and_qualifications"
                        value={mentorData.background_and_qualifications}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Other Information</label>
                    <textarea
                        name="other_info"
                        value={mentorData.other_info}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Bio</label>
                    <textarea
                        name="bio"
                        value={mentorData.bio}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={mentorData.age}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Skills (Comma Separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={mentorData.skills.join(', ')} // Join array values for display
                        onChange={handleSkillsChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
        </div>
    );
};

export default BeAMentor;
