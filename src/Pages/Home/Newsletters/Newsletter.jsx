import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import UseAuth from "./../../../hooks/UseAuth/UseAuth";

const Newsletter = () => {
  const axiosCommon = UseAxiosCommon();
  const navigate = useNavigate();
  const { user } = UseAuth();  // This is the user from authentication
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const { submittedEmail } = data;

    // Check if the user is logged in (user.email from UseAuth())
    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: "Please login to subscribe to our newsletter",
      });
      return;  // Stop the function if user is not logged in
    }

    // If user is logged in, use their email for the subscription
    const subscriber = {
      email: user.email,  // Use the logged-in user's email, not the form data
      role: "member",
    };

    // Send the subscriber data to the server
    axiosCommon.post("/newsletterSubscribers", subscriber).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Congratulations",
          text: "You will receive regular updates from us!",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        reset();
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Subscription Error",
          text: `${res.data.message}`,
        });
      }
    });

    console.log("Form submitted");
  };

  return (
    <div className="py-7">
      <div
        className="w-full py-3 bg-gray-500 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/career-businessman-on-blurred-abstract-260nw-1152345887.jpg')",
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
        }}
      >
        <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
          <h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-100">
            Subscribe to our Newsletter
          </h1>
          <p className="pt-2 pb-8 text-xl antialiased text-center text-gray-100">
            Get career advice, job search tips, and more! What are you waiting for? Land in your dream job!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
            <input
              type="text"
              {...register("submittedEmail", { required: true })}
              placeholder="Enter your email"
              className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
            />
            <button
              type="submit"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 text-white bg-[#ad8a54]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
