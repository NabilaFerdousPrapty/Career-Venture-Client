import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const ApprovedMentors = () => {
  const axiosCommon = UseAxiosCommon();

  const {
    data: { mentors: approvedMentors = [], currentPage, totalPages } = {}, // Destructure mentors, currentPage, and totalPages
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["approvedMentors"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/approvedMentors");
      return data; // This should return { mentors, currentPage, totalPages }
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
        <div className="flex items-center gap-x-3 max-w-md mx-auto my-4">
          <h2 className="text-lg font-medium text-primary">
            Approved Mentors
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {approvedMentors.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block 2xl:max-w-full xl:max-w-6xl lg:max-w-3xl md:max-w-4xl max-w-xl py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-3">
                          <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                          <span>Name</span>
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Profile Image
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Location
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Designation
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Email
                      </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                        Skills
                      </th>

                    </tr>
                  </thead>

                  <tbody className="bg-accent divide-y divide-gray-200 dark:divide-gray-700 ">
                    {approvedMentors.map((mentor) => (
                      <tr key={mentor._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap border border-gray-800 ">
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
                        <td className="px-4 py-4 text-sm whitespace-nowrap border border-gray-800">
                          <img className="object-cover w-16 h-16 rounded" src={mentor.profile_image} alt="Profile" />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap border border-gray-800">{mentor.location}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap border border-gray-800">{mentor.designation}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap border border-gray-800">{mentor.email}</td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap border border-gray-800">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            <h2 className="text-sm font-normal text-emerald-500">{mentor.status}</h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap border border-gray-800">
                          {mentor?.skills && mentor?.skills?.map((skill) => (
                            <span key={skill} className="px-2 py-1 text-xs text-indigo-500 rounded-full bg-indigo-100/60 dark:bg-gray-800 mr-1">#{skill}</span>
                          ))}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApprovedMentors;
