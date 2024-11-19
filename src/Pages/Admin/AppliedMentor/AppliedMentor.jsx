
import UseAxiosSecure from '../../../hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon/UseAxiosCommon';

const AppliedMentor = () => {
  const axiosCommon = UseAxiosCommon();
  const [currentId, setCurrentId] = useState(null);
  // Fetch pending members using react-query
  const {
    data: pendingMembers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingMentors"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/pendingMentors");
      return data;
    },
  });

  const handleApprove = (id, email) => {
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve him!",
    })
      .then((result) => {
        // If the confirmation is accepted, proceed with approval
        if (result.isConfirmed) {
          // Execute both PATCH requests simultaneously using Promise.all
          Promise.all([
            axiosCommon.patch(`/mentors/approve/${id}`),
            axiosCommon.patch(`/user/mentor/approve/${email}`),
          ])
            .then(([response1, response2]) => {

              const modifiedCount1 = response1.data.modifiedCount;
              const modifiedCount2 = response2.data.modifiedCount;
              console.log(response2);

              // Check if both modifications were successful
              if (modifiedCount1 > 0 && modifiedCount2 > 0) {
                Swal.fire({
                  title: "Approved!",
                  text: "Your trainer has been approved.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500, // Automatically close after 1.5 seconds
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Could not approve.",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              // Refresh the data to reflect changes
              refetch();
            })
            .catch((error) => {
              // Log detailed error information for debugging
              console.error("Error approving trainer:", error);
              Swal.fire({
                title: "An error occurred!",
                text: "Unable to complete the approval.",
                icon: "error",
                showConfirmButton: true,
              });
              refetch();
            });
        }
      })
      .catch((error) => {
        // Handle errors that occur with SweetAlert itself
        console.error("Error with Swal confirmation:", error);
      });
  };



  // Function to handle mentor rejection
  const handleReject = (id) => {
    Swal.fire({
      title: "Do you want to reject this mentor?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Reject`,
      denyButtonText: `Think again`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosCommon
          .patch(`/mentors/reject/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Rejected!", "", "success");
              refetch();

            } else {
              Swal.fire("Rejection Failed", "", "error");
            }
          })
          .catch((error) => {
            console.error('Error during rejection:', error);
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Kept Pending", "", "info");
      }
    });
  };


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
            Pending Mentors
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {pendingMembers.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block 2xl:max-w-full xl:max-w-6xl lg:max-w-3xl md:max-w-4xl max-w-xl py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
                {
                  !pendingMembers.length ? (
                    <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400 w-full">
                      No pending mentors found
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                        {pendingMembers.map((mentor) => (
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
                              {mentor?.skills && mentor?.skills?.map((skill) => (
                                <span key={skill} className="px-2 py-1 text-xs text-indigo-500 rounded-full bg-indigo-100/60 dark:bg-gray-800 mr-1">#{skill}</span>
                              ))}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button onClick={() => handleApprove(mentor._id, mentor.email)} className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none border border-[#ad8a54] py-1 px-2 rounded-xl ">
                                  Approve
                                </button>
                                <button onClick={() => handleReject(mentor._id)} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none border border-[#ad8a54] py-1 px-2 rounded-xl ">
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppliedMentor;
