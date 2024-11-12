import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon/UseAxiosCommon';
import UseAuth from './../../hooks/UseAuth/UseAuth';
import Swal from 'sweetalert2';

const ResourceDetail = () => {
    const { id } = useParams();
    const axiosCommon = UseAxiosCommon();
    const { user } = UseAuth();

    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [comments, setComments] = useState([]);

    const {
        data: resourceData = {},
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["resource", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/resources/${id}`);
            setComments(data.comments || []);
            return data;
        },
    });

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setCommentError("Comment cannot be empty.");
            return;
        }
        setCommentError("");

        // Log the data being sent
        console.log("User:", user.displayName);
        console.log("Comment:", comment);

        try {
            const { data } = await axiosCommon.post(`/resources/${id}/comments`, {
                user: user.displayName,
                u_image: user.photoURL,
                comment: comment,
                date: new Date().toISOString(),
            });
            refetch();
            Swal.fire({
                icon: "success",
                title: "Comment added successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            setComment("");
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };



    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img
                    className="object-cover w-full "
                    src={resourceData.imageLink}
                    alt={resourceData.name}
                />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                            {resourceData.tags?.[0] || "Resource"}
                        </span>
                        <a
                            href={resourceData.resourceLink || "#"}
                            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                            tabIndex="0"
                            role="link"
                        >
                            {resourceData.name}
                        </a>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {resourceData.description}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <img
                                className="object-cover h-10 rounded-full"
                                src={resourceData.author?.a_image}
                                alt={resourceData.author?.name}
                            />
                            <a
                                href={resourceData.author?.profileLink || "#"}
                                className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                                tabIndex="0"
                                role="link"
                            >
                                {resourceData.author?.name}
                            </a>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                                {new Date(resourceData.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Comments</h3>
                        <ul className="mt-2 space-y-4">
                            {comments.map((comment, index) => (
                                <li key={index} className="p-2 bg-gray-100 rounded dark:bg-gray-700">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <strong className='flex justify-center items-center gap-2'><img className='h-4 w-4 rounded-3xl' src={comment.u_image} alt="" />{comment.user}:</strong> {comment.comment}</p>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Comment Form */}
                        <form onSubmit={handleAddComment} className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                rows="4"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
                            <button
                                type="submit"
                                className="px-4 py-2 mt-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Submit Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;
