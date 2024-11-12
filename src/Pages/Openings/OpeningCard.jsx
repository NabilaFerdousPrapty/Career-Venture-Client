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
    jobImage,
  } = opening;

  return (
    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="object-cover w-full h-56 rounded-t-lg"
        src={jobImage || 'https://via.placeholder.com/500'}
        alt={title}
      />

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            {designation || 'Job Opening'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(postedDate).toLocaleDateString() || 'Date not available'}
          </span>
        </div>

        <div className="space-y-2">
          <Link
            to={`/opening/${_id}`}
            className="block text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300 hover:text-gray-600 hover:underline"
          >
            {title}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description.slice(0, 100) || 'No description available'}...
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {company || 'Unknown Company'}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Location: {location || 'Not specified'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Salary: {salary ? `৳${salary}` : 'Not mentioned'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Experience: {experience || 'Not required'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Job Type: {type || 'Full-time'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Apply by: {new Date(applyBy).toLocaleDateString() || 'N/A'}
          </div>
        </div>

        <div className="w-full mt-4">
          <Link to={`/opening/${_id}`}>
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
