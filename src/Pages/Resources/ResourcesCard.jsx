import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosCommon from './../../hooks/UseAxiosCommon/UseAxiosCommon';
import UseAuth from './../../hooks/UseAuth/UseAuth';
import propTypes from 'prop-types';
const ResourcesCard = ({ resource, refetch }) => {
  const axiosCommon = UseAxiosCommon();
  const { user } = UseAuth();
  const {
    _id,
    name,
    description,
    author,
    date,

    upvote,
    downvote,
    imageLink,
    tags,
    resourceLink,
    comments
  } = resource;
  const handleUpVote = (id) => {
    axiosCommon
      .patch(`/resources/upvote/${id}`)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Upvoted successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        refetch();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handleDownVote = (id) => {
    axiosCommon
      .patch(`/resources/downvote/${id}`)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Downvoted successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        refetch();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  const handleVoteClick = (type, id) => {
    if (!user) {
      Swal.fire({
        title: "Error",
        text: "Please login to vote",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (type === "up") {
      handleUpVote(id);
    } else {
      handleDownVote(id);
    }
  };

  return (

    <div className="max-w-3xl overflow-hidden bg-accent text-primary rounded-lg shadow-md  h-[590px] flex flex-col ">
      {/* Use the imageLink from the fetched data */}
      <img
        className="object-cover w-full h-64"
        src={imageLink || "https://via.placeholder.com/500"}
        alt={name}
      />

      <div className="p-6 flex flex-col flex-1">
        <div>
          {/* Dynamically display the resource name */}
          <span className="text-xs font-medium text-blue-600 uppercase ">
            {
              tags.map((tag) => (
                <span key={tag} className="mr-1">
                  #{tag}
                </span>))
            }
          </span>

          {/* Resource name as the title */}
          <a
            href={resourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-xl font-semibold  transition-colors duration-300 text-primary hover:text-blue-500 hover:underline"
            tabIndex="0"
            role="link"
          >
            {name}
          </a>

          {/* Resource description */}
          <p className="mt-2 text-sm text-primary">
            {description.slice(0, 100) + "..." || "No description available."}
          </p>
        </div>
        <div className="flex-grow"></div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Author's avatar (if available, placeholder otherwise) */}
              <img
                className="object-cover h-10 rounded-full"
                src={author?.a_image || "https://via.placeholder.com/150"}
                alt={author}
              />
              <span className="mx-2 font-semibold text-primary">
                {author.name || "Unknown Author"}
              </span>
            </div>

            {/* Display the creation date */}
            <span className="mx-1 text-xs text-primary">
              {date}
            </span>
          </div>
        </div>

        {/* Additional details like upvotes/downvotes can be shown here */}
        <div className="mt-4 flex justify-between text-primary">
          <div>
            <span><button onClick={() => handleVoteClick("up", _id)}>👍</button> {upvote || 0}</span>
            <span><button onClick={() => handleVoteClick("down", _id)}>👎</button> {downvote || 0}</span>
          </div>
          <div>
            <Link to={`/resources/${resource._id}`}>
              <button className="px-4 py-2 text-sm font-medium leading-5 text-center text-white capitalize bg-amber-500 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
                Read More
              </button>
            </Link>
          </div>
          <div >
            {/* Comments count */}
            <span className='text-primary'>{comments ? comments.length : 0} Comments</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ResourcesCard;

ResourcesCard.propTypes = {

  resource: propTypes.object.isRequired,
  refetch: propTypes.func.isRequired,
};