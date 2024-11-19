import React, { useState } from 'react';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';

const Feedback = () => {
    const { user } = UseAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    const [formData, setFormData] = useState({
        name: user.displayName || '',
        review: '',
        rating: '',
        feature: '',
        image: user.photoURL || '',
    });

    const axiosCommon = UseAxiosCommon();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosCommon.post('/testimonials', formData);
            if (response.data.insertedId) {
                Swal.fire({
                    title: 'Feedback Submitted',
                    text: 'Thank you for submitting your feedback!',
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
                setFormData({
                    name: user.displayName,
                    review: '',
                    rating: '',
                    feature: '',
                    image: user.photoURL,
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error submitting your feedback. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            Swal.fire({
                title: 'Error',
                text: 'There was an error submitting your feedback. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    return (
        <div className="p-4 border-2 border-amber-600 my-3 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium">Review</label>
                    <textarea
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium">Rating (1-5)</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Feature</label>
                    <input
                        type="text"
                        name="feature"
                        value={formData.feature}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default Feedback;
