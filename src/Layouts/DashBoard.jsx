import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo2w.png";
import { useEffect, useState } from "react";
import { GiHamburger, GiOfficeChair } from "react-icons/gi";
import UseRole from "../hooks/UseRole/UseRole";
import UseAuth from "./../hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { BounceLoader, RotateLoader } from "react-spinners";
import { LuLogOut } from "react-icons/lu";
import { PiListStarThin } from "react-icons/pi";
import { FaFileInvoiceDollar, FaUsersGear } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { FcFeedback } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loader, setLoading] = useState(true);
  // console.log(loading);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const renderAdminLinks = () => (
    <ul className="pt-2 pb-4 space-y-3 ">
      <Link
        to={"intro"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <PiListStarThin />
        <span className="mx-2 text-sm font-medium">
          Introduction
        </span>

      </Link>

      <Link
        to={"manage-users"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      ><FaUsersGear />
        <span className="mx-2 text-sm font-medium">User Management</span>
      </Link>

      <Link
        to={"/overview"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      ><GrOverview />
        <span className="mx-2 text-sm font-medium">Overview</span>
      </Link>
      <Link
        to={"add-job-openings"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      ><GiOfficeChair />
        <span className="mx-2 text-sm font-medium">Add job openings</span>
      </Link>

      <Link to={'transaction-overview'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      ><FaFileInvoiceDollar />
        <span className="mx-2 text-sm font-medium">Transaction Overview</span>
      </Link>

      <Link
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      ><TbReport />
        <span className="mx-2 text-sm font-medium">Reports</span>
      </Link>

     
      <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><IoSettings />
        <span className="mx-2 text-sm font-medium">Setting</span>
      </Link>
      <Link to={'/'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><FaHome />
        <span className="mx-2 text-sm font-medium">Go to Home</span>
      </Link>

    </ul>
  );

  const renderMentorLinks = () => (
    <ul className="pt-2 pb-4 space-y-1 text-lg gap-4">
      <Link
        to={"intro"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Introduction
        </span>
      </Link>

      <Link
        to={"/manage-users"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Insert new bootcamp
        </span>
      </Link>

      <Link
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Insert new resources
        </span>
      </Link>

      <Link
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
       
      >
        <span className="mx-2 text-sm font-medium">
          Insert new openings
        </span>
      </Link>

      <Link
        to={"/overview"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">All booked courses</span>
      </Link>

      <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        <span className="mx-2 text-sm font-medium">Transaction History</span>
      </Link>

      <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        <span className="mx-2 text-sm font-medium">Setting</span>
      </Link>
      <Link to={'/'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        <span className="mx-2 text-sm font-medium">Go to Home</span>
      </Link>
    </ul>
  );

  const renderMemberLinks = () => (
    <ul className="pt-2 pb-4 space-y-1 text-xl gap-4">
      <Link
        to={"intro"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Introduction
        </span>
      </Link>

      <Link
        to={"/cash-in"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Booked Bootcamps
        </span>
      </Link>

      <Link
        to={"/cash-out"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
       
      >
        <span className="mx-2 text-sm font-medium">
          Applied Openings status
        </span>
      </Link>

      <Link
        to={"/send-money"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Votes on resources
        </span>
      </Link>

      <Link
        to={"/balance"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        
      >
        <span className="mx-2 text-sm font-medium">
          Transaction History
        </span>
      </Link>

      <Link
        to={"/overview"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
      >
        <span className="mx-2 text-sm font-medium">OverView</span>
      </Link>

      <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        <span className="mx-2 text-sm font-medium">
          Be a mentor
        </span>
      </Link>
      <Link to={'/'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
        <span className="mx-2 text-sm font-medium">Go to Home</span>
      </Link>
    </ul>
  );
  const { user, LogOut, loading } = UseAuth();

  const [role, isLoading, refetch] = UseRole(user?.email);
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();
    Swal.fire({
      icon: "success",
      title: "Logout",
      text: "You have been logged out successfully",
    });
    navigate("/login");
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [color, setColor] = useState("#d19945");
  return (
    <div>
      {loader ? (
        <div className="h-screen flex justify-center items-center">
          <BounceLoader
            color={color}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={override}
          />
        </div>
      ) : (
        <div className="h-screen flex">
          <div
            className={`fixed top-0 bg-gray-950 left-0 h-full w-64  p-4 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0`}
          >
            <Link to={"/"}>
              <img
                className="w-auto h-auto max-w-28 mx-auto "
                src={logo}
                alt=""
              />
            </Link>

            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav className="flex-1 -mx-3 space-y-3 ">
                <li className="lg:hidden block">
                  <button
                    className="absolute left-1 top-1"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <GiHamburger className=" fill-current text-amber-400 text-lg" />
                  </button>
                </li>
              </nav>
              {role.isAdmin && renderAdminLinks()}
              {role.isMentor && renderMentorLinks()}
              {role.isMember && renderMemberLinks()}
              {(!role.isMentor && !role.isAdmin && !role.isMember && !isLoading )&&  (
                <div>
                  <h1>
                    You are not approved by the admin please wait for approval
                  </h1>
                  <p>
                    If you are not approved by the admin within 24 hours please 
                    contact the admin
                  </p>
                 
                </div>
              )}
              {
                isLoading && <p><RotateLoader /></p>
              }
              <Link to={'/'} className="mt-1">
                <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
                  <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                    New feature available!
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We just launched a new feature for{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      all our users
                    </span>
                  </p>

                  <img
                    className="object-cover w-full h-32 mt-2 rounded-lg"
                    src="https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&h=1374&q=80"
                    alt=""
                  />
                </div>

                <div className="flex items-center justify-between mt-6">
                  <a className="flex items-center gap-x-2">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      {user?.email}
                    </span>
                  </a>

                  <button
                    onClick={handleLogout}
                    className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                  <LuLogOut />
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-4 flex flex-col justify-center items-center">
              {/* Button to open/close sidebar on small screens */}
              <button
                className="lg:hidden text-xl p-2 text-gray-500 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 "
                onClick={toggleSidebar}
              >
                <GiHamburger />
              </button>

              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
