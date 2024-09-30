
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';

const RejectedMentors = () => {
const axiosCommon=UseAxiosCommon();
  const {
    data: rejectedMentors = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rejectedMentors"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/rejectedMentors");
      return data;
    },
  });



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Rejected Mentors
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {rejectedMentors.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block 2xl:max-w-full xl:max-w-6xl lg:max-w-3xl md:max-w-4xl max-w-xl py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
              {!rejectedMentors.length ?(
              <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400 w-full">
                No rejected mentors found
              </div>)
              :(  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Name</span>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Profile Image
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Location
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Designation
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Email
                    </th>
                  
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Skills
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {rejectedMentors.map((mentor) => (
                    <tr key={mentor._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white">{mentor.name}</h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">@{mentor.name.split(' ')[0].toLowerCase()}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <img className="object-cover w-16 h-16 rounded" src={mentor.profile_image} alt="Profile" />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{mentor.location}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{mentor.designation}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{mentor.email}</td>
                      
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <h2 className="text-sm font-normal text-emerald-500">{mentor.status}</h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap ">
                        {mentor.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 text-xs text-indigo-500 rounded-full bg-indigo-100/60 dark:bg-gray-800 mr-1">#{skill}</span>
                        ))}
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>)
              
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RejectedMentors;
