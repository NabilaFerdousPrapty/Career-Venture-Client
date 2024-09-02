import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen">
      <section className="flex items-center h-full lg:p-16 md:p-4 p-1 ">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <img className="rounded-badge" src="https://cdn.svgator.com/images/2024/04/lava-lamp-animation-404-error-page.gif" alt="" />
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="md:mt-4 mt-1 md:mb-8 mb-2 text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to={'/'}
              className="flex items-center justify-center w-full md:p-3 p-1 font-semibold tracking-wide bg-[#ad8a54] text-gray-50 rounded-xl"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
