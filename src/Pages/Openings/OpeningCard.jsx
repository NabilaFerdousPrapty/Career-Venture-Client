import React from 'react';
import { Link } from 'react-router-dom';

const OpeningCard = ({ opening }) => {
  const {
    _id,
    title,
    designation,
    company,
    location,
    description,
    salary,
    experience,
    postedDate,
    type,
    applyBy,
    postedBy,
    jobImage
  } = opening;
console.log(opening);

  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      {/* Use the jobImage from the fetched data */}
      <img
        className="object-cover w-full h-64"
        src={jobImage || "https://via.placeholder.com/500"}
        alt={title}
      />

      <div className="p-6">
        <div>
          {/* Dynamically display the job title */}
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            {designation || "Job Opening"}
          </span>

          {/* Job title as the link */}
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            tabIndex="0"
            role="link"
          >
            {title}
          </a>

          {/* Job description */}
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description.slice(0,100) || "No description available."}.....
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Display company name */}
              <span className="mx-2 font-semibold text-gray-700 dark:text-gray-200">
                {company || "Unknown Company"}
              </span>
            </div>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
              {/* Display posted date */}
              {new Date(postedDate).toLocaleDateString() || "Date not available"}
            </span>
          </div>
        </div>

        {/* Additional job details */}
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Location: {location || "Not specified"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Salary: {salary ? `৳${salary}` : "Not mentioned"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Experience: {experience || "Not required"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Job Type: {type || "Full-time"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Apply by: {new Date(applyBy).toLocaleDateString() || "N/A"}
          </span>
        </div>
        <div className="mt-auto w-full mt-2">
                <Link to={`/opening/${opening?._id}`}>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide bg-[#ad8a54] text-gray-50 rounded-xl"
                  >
                    Learn more
                  </button>
                </Link>
              </div>
      </div>
  
    </div>
  );
};

export default OpeningCard;
