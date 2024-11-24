import React from 'react';
import { useForm } from 'react-hook-form';
import { FaCut } from 'react-icons/fa';

const Hero = ({ onSearch }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const searchValue = watch('tag'); // Watch the 'tag' field to update the input dynamically

  // Function to handle form submission
  const onSubmit = (data) => {
    onSearch(data.tag); // Pass the search tag to the parent component
    reset(); // Optional: Reset the form after submission
  };

  // Function to clear the search input when the cross icon is clicked
  const handleClearSearch = () => {
    console.log('Clear search');

    setValue('tag', ''); // Set the value of 'tag' to an empty string
    onSearch(''); // Call onSearch with an empty string to show all data again
    console.log(searchValue); // Should be an empty string
  };

  return (
    <div>
      <div className="container lg:px-6 md:px-2 px-1 py-16 mx-auto">
        <div className="items-center lg:flex border border-amber-400 rounded-xl">
          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full max-w-md rounded-xl "
              src="https://i.ibb.co.com/2866CpT/43fdc93b807eaf0007e23d3392f9cf3f-removebg-preview.png"
              alt="email illustration vector art"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg px-2">
              <h1 className="text-3xl font-semibold   lg:text-4xl">
                Search for Specific
                <span className="text-blue-500 mx-2">Resources</span>
              </h1>

              <p className="mt-3  dark:text-gray-400">
                Here you can find all the resources you need to get started with your career in tech.
                <span className="font-medium text-blue-500 mx-1">Search your future</span>
                now and get started.
              </p>

              {/* Form using react-hook-form */}
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <div className="relative w-full">
                  <input
                    {...register('tag', { required: true })}
                    id="text"
                    type="text"
                    value={searchValue || ''} // Watch and control the input value
                    onChange={(e) => setValue('tag', e.target.value)} // Manually set the value
                    className="w-full px-4 py-2 text-gray-700 border rounded-md bg-accent dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Resource tag"
                  />

                  {/* Cross icon to clear the search input */}

                  <div
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  >
                    <FaCut className="text-gray-500 hover:text-gray-700" />
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
