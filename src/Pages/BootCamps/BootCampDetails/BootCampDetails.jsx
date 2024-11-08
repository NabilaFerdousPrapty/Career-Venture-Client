import { Link, useLoaderData } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import PaymentPage from "../../../../components/Payments/PaymentPage";
import { useState } from "react"; // Import useState
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import Swal from "sweetalert2";

const BootCampDetails = () => {
  const bootCampDetails = useLoaderData();
  const user = UseAuth();
  const axiosCommon = UseAxiosCommon();
  const {
    name,
    description,
    duration,
    price,
    location,
    classVideo,
    classImage,
    mentors,
  } = bootCampDetails;

  const bookingData = {
    user,
    bootCampName: name,
    bootCampPrice: price,
    bootCampMentors: mentors,
  };
  console.log("Booking Data:", bookingData);

  // State to manage payment page visibility
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  let clickTimeout; // Declare a timeout variable

  // Function to handle the button click
  const handleEnrollClick = () => {

    if (showPaymentPage) {
      setShowPaymentPage(false); // Hide payment page if it's currently shown
    } else {
      // Show payment page on first click
      setShowPaymentPage(true);
      clickTimeout = setTimeout(() => {
        clickTimeout = null; // Reset the timeout variable
      }, 300); // Adjust timeout as needed
    }
  };

  // Function to handle double click
  const handleDoubleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout); // Clear the single click timer
      setShowPaymentPage(false); // Hide payment page on double click
    }
  };
  const handleWishListClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this bootcamp to your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosCommon
          .post("/wishlist", {
            user: user,
            bootCampName: name,
            bootCampPrice: price,
            bootCampMentors: mentors,
          })
          .then((response) => {
            Swal.fire("Success!", response.data.message, "success");
          })
          .catch((error) => {
            // Check if the bootcamp is already in the wishlist
            if (error.response && error.response.data.message === "This bootcamp is already in your wishlist.") {
              Swal.fire("Already Added", "This bootcamp is already in your wishlist.", "info");
            } else {
              Swal.fire("Error!", error.response?.data?.message || "An error occurred.", "error");
            }
          });
      }
    });
  };

  // Function to extract video ID from the YouTube URL
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    );
    return match ? match[1] : "";
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
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Duration:</strong> {duration}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Price:</strong> ${price}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Location:</strong> {location}
          </p>

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
            <h3 className="text-lg font-semibold text-center text-amber-400">
              Mentors
            </h3>
            {mentors.map((mentor, index) => (
              <div key={index} className="flex items-center justify-center mt-2">
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
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {mentor.experience} - {mentor.expertise}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex items-center focus:outline-none btn bg-[#ad8a54]"
              onClick={handleEnrollClick} // Handle single click
              onDoubleClick={handleDoubleClick} // Handle double click
            >
              {showPaymentPage ? "Hide Payment Page" : "Enroll Now"}
            </button>
            <button
              type="button"
              onClick={
                handleWishListClick
              }
              className="flex items-center focus:outline-none btn bg-[#ad8a54]"
            >

              WishList

            </button>
          </div>

          {/* Conditionally render the PaymentPage */}
          {showPaymentPage && <PaymentPage bookingData={bookingData} />}
        </div>
      </div>
    </div>
  );
}

export default BootCampDetails;
