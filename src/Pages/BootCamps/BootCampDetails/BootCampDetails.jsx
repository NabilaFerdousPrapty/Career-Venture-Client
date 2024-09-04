import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BootCampDetails = () => {
    const bootCampDetails = useLoaderData();
    console.log(bootCampDetails);

    const {
        name,
        description,
        duration,
        price,
        location,
        classVideo, // This should be the video URL
        classImage,
        mentors,
    } = bootCampDetails;

    // Function to extract video ID from the YouTube URL
    const extractVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : '';
    };

    const videoId = extractVideoId(classVideo);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img 
                    className="object-cover w-full h-full rounded-2xl" 
                    src={classImage} 
                    alt="Bootcamp" 
                />

                <div className="p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Duration:</strong> {duration}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Price:</strong> ${price}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><strong>Location:</strong> {location}</p>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                        <iframe
                            width="800"
                            height="450"
                            src={`https://www.youtube.com/embed/${videoId}`} 
                            title="Bootcamp Introduction Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Mentors</h3>
                        {mentors.map((mentor, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <div className="flex items-center">
                                    <img 
                                        className="object-cover h-10 rounded-full" 
                                        src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" 
                                        alt={mentor.name} 
                                    />
                                    <a 
                                        href="#" 
                                        className="mx-2 font-semibold text-gray-700 dark:text-gray-200" 
                                        tabIndex="0" 
                                        role="link"
                                    >
                                        {mentor.name}
                                    </a>
                                </div>
                                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                                    {mentor.experience} - {mentor.expertise}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BootCampDetails;
