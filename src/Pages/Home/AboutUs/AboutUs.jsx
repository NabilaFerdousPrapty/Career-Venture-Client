import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="mockup-window bg-base-300 border my-4">
        <div className="bg-amber-200 flex justify-center px-4 py-16 rounded-md">
          <section className="bg-[#130b30] p-3 rounded-2xl">
            <div className="container px-6 py-10 mx-auto">
              <div className="lg:flex lg:items-center">
                <div className="w-full space-y-12 lg:w-1/2 ">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white font-play">
                      About Us
                    </h1>
                    <div className="mt-2">
                      <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                      <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                      <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
                    </div>
                  </div>
                  <div className="md:flex md:items-start md:-mx-4">
                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </span>
                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                        Our Mission
                      </h1>
                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        Our mission is to empower individuals by providing the
                        resources and guidance needed to achieve their career
                        goals and excel in their professional lives.
                      </p>
                    </div>
                  </div>
                  <div className="md:flex md:items-start md:-mx-4">
                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </span>
                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                        Our Vision
                      </h1>
                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        We envision a world where everyone has access to the
                        opportunities and tools they need to succeed in their
                        careers, regardless of their background or
                        circumstances.
                      </p>
                    </div>
                  </div>
                  <div className="md:flex md:items-start md:-mx-4">
                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                        />
                      </svg>
                    </span>
                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                        Our Values
                      </h1>
                      <p className="mt-3 text-gray-500 dark:text-gray-300">
                        We are committed to integrity, inclusivity, and
                        innovation. We strive to create a supportive community
                        where everyone can grow and succeed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
                  <img
                    className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
                    src="https://i.ibb.co/7W3s79j/we-are-hiring-digital-collage-1.jpg"
                    alt="Our Team"
                  />
                </div>
              </div>
              <hr className="my-12 border-gray-200 dark:border-gray-700" />
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white font-play">
                  Join Us{" "}
                </h1>
                <div className="mt-2">
                  <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Join our community of passionate individuals dedicated to
                  advancing their careers and making a difference. Explore
                  opportunities for growth and collaboration.
                </p>
                <button className="mt-6 px-6 py-3 bg-amber-200 font-bold text-slate-900 rounded-lg hover:bg-amber-400 transition duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
