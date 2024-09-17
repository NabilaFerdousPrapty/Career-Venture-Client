import { FaFacebookSquare, FaGithub, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from 'react';
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { BsWhatsapp } from "react-icons/bs";

const ContactUs = () => {
  const form = useRef();
 const {user}=UseAuth();
  const sendEmail = (e) => {
    e.preventDefault();

    if (user) {
        Swal.fire({
            title: "Do you want to send the message?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Send",
            denyButtonText: `Don't send`,
          }).then((result) => {
            if (result.isConfirmed) {
              emailjs
                .sendForm('service_1k1sydd', 'template_ge6ytd6', e.target, 'GM4bCJGbRZE0Yae_n')
                .then(
                  (result) => {
                    console.log(result.text);
                    Swal.fire("Sent!", "Your message has been sent successfully.", "success");
                  },
                  (error) => {
                    console.log(error.text);
                    Swal.fire("Error", "An error occurred while sending your message. Please try again.", "error");
                  }
                );
            } else if (result.isDenied) {
              Swal.fire("Message not sent", "", "info");
            }
          });
    }else{
        Swal.fire("You have to login first", "", "info");
    }
  };

  return (
    <div id="contact">
      <section className="min-h-screen rounded-xl shadow-inner border border-blue-400 mb-2">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:flex lg:items-center lg:-mx-10">
            <div className="lg:w-1/2 lg:mx-10">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
                Contact Career Venture
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Have a question, suggestion, or inquiry? We’d love to hear from you! Feel free to reach out, and we’ll respond as quickly as possible.
              </p>

              <form ref={form} onSubmit={sendEmail} className="mt-12">
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="your.email@example.com"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                  <textarea
                    name="message"
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Send Message
                </button>
              </form>
            </div>

            <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
              <img
                className="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-[400px] h-[400px]"
                src="https://e7.pngegg.com/pngimages/797/306/png-clipart-eventloop-service-information-machining-marketing-contact-us-miscellaneous-blue-thumbnail.png"
                alt="Contact Us"
              />

              <div className="mt-6 space-y-8 md:mt-8">
                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    123 Career Venture Street, Job City
                  </span>
                </p>

                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    +123 456 7890
                  </span>
                </p>

                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    info@career-venture.com
                  </span>
                </p>
              </div>

              <div className="mt-6 w-80 md:mt-8">
                <h3 className="text-gray-600 dark:text-gray-300">Follow Career Venture</h3>
                <div className="flex mt-4 -mx-1.5 justify-between">
                  <Link
                    to="https://github.com/NabilaFerdousPrapty"
                    target="_blank"
                    className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FaGithub className="w-8 h-8" />
                  </Link>
                  <Link
                    
                    target="_blank"
                    className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FaFacebookSquare className="w-8 h-8"  />
                  </Link>
                  <Link
                 
                    target="_blank"
                    className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-gray-500 dark:hover:text-gray-300"
                  >
                   <BsWhatsapp className="w-8 h-8"  />
                  </Link>
                  <Link
                    
                    target="_blank"
                    className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-gray-500 dark:hover:text-gray-300"
                  >
                   <FaTwitter className="w-8 h-8"/>
                  </Link>
                  <Link
                    
                    target="_blank"
                    className="mx-1.5 text-gray-400 transition-colors duration-300 transform hover:text-gray-500 dark:hover:text-gray-300"
                  >
                   <FaInstagramSquare className="w-8 h-8" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
