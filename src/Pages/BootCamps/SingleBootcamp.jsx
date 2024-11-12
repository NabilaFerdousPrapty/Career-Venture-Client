import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import PropTypes from 'prop-types'

const SingleBootcamp = ({ bootCamp, index }) => {
    const {
        _id,
        name,
        description,
        duration,
        price,
        location,
        rating,
        mentors,
        classImage,
    } = bootCamp

    return (
        <div
            key={_id}
            className="flex flex-col bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <img
                src={classImage}
                alt={name}
                className="object-cover w-full h-60 rounded-t-lg"
            />
            <div className="lg:p-4 p-1 flex flex-col flex-grow items-center">
                <h2 className="text-2xl font-bold text-gray-50 mb-2">{name}</h2>
                <p className="text-sm text-gray-400 mb-4">
                    {description.slice(0, 80)}...
                </p>

                <div className="flex flex-col justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-50">
                        Duration: {duration} weeks
                    </span>
                    <span className="text-lg font-semibold text-gray-50">
                        Price: <span className="text-2xl">৳</span>{price}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                    Location: {location}
                </p>

                <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-400 mr-2">Rating: {rating}</span>
                    <div className="flex">
                        {[...Array(Math.round(rating))].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-50 text-center">Mentors:</h3>
                    <ul className="text-gray-300 text-sm list-inside">
                        {mentors.map((mentor, index) => (
                            <li className="list-none" key={index}>
                                {mentor.name} - {mentor.experience} ({mentor.expertise})
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto w-full">
                    <Link to={`/LearnAboutBootCamp/${_id}`}>
                        <button
                            type="button"
                            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide bg-[#ad8a54] text-gray-50 rounded-xl hover:bg-[#a07644] transition-colors"
                        >
                            Learn more
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

SingleBootcamp.propTypes = {
    bootCamp: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        mentors: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                experience: PropTypes.string.isRequired,
                expertise: PropTypes.string.isRequired,
            })
        ).isRequired,
        classImage: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
}

export default SingleBootcamp
