import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleToggleRole = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the role to ${newRole}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/admin-toggle/${email}`, { role: newRole });
        // Update state after successful role update
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, role: newRole } : user
          )
        );
        Swal.fire("Changed!", "The user's role has been updated.", "success");
      } catch (error) {
        console.error("Error toggling role:", error);
        Swal.fire("Error!", "Failed to change the role. Please try again.", "error");
      }
    }
  };

  const handleToggleStatus = async (email, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the status to ${newStatus}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/toggleStatus/${email}`, { status: newStatus });
        // Update state after successful status update
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, status: newStatus } : user
          )
        );
        Swal.fire("Changed!", "The user's status has been updated.", "success");
      } catch (error) {
        console.error("Error toggling status:", error);
        Swal.fire("Error!", "Failed to change the status. Please try again.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold my-5 text-center text-primary">User Management</h1>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col  ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden xl:max-w-5xl lg:max-w-3xl md:max-w-2xl overflow-x-scroll max-w-sm border border-gray-200 dark:border-gray-700 bg-accent md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-amber-400 hover:bg-amber-600 ">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-primary">
                        Index
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Name
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Email
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Photo
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Role
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Role Actions
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-primary">
                        Status Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-accent">
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <img
                            className="object-cover w-12 h-12 rounded-full"
                            src={user.photo}
                            alt="User"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.status}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.role !== "mentor" && (
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                              onClick={() => handleToggleRole(user.email, user.role)}
                            >
                              Toggle Role
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.role !== "admin" && (
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                              onClick={() => handleToggleStatus(user.email, user.status)}
                            >
                              Toggle Status
                            </button>
                          )}
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

export default UserManagement;
