import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo2w.png";
import { useEffect, useState } from "react";
import { GiHamburger, GiNotebook, GiOfficeChair } from "react-icons/gi";
import UseRole from "../hooks/UseRole/UseRole";
import UseAuth from "./../hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { BounceLoader, RotateLoader } from "react-spinners";
import { LuLogOut } from "react-icons/lu";
import { PiListStarThin } from "react-icons/pi";
import { FaFileInvoiceDollar, FaUsersGear } from "react-icons/fa6";
import { GrOverview, GrResources } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { FcFeedback } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { FaHome, FaMoneyBillAlt } from "react-icons/fa";
import { MdAddchart, MdAssignmentAdd, MdOutlineBrowserUpdated } from "react-icons/md";
import UpperNavbar from "./UpperNavbar";
import { SiCodementor } from "react-icons/si"
import { AiOutlineTransaction } from "react-icons/ai";
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
        to={"mentors-overview"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GrOverview />
        <span className="mx-2 text-sm font-medium">Mentors Overview</span>
      </Link>
      <Link
        to={"add-job-openings"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GiOfficeChair />
        <span className="mx-2 text-sm font-medium">Add job openings</span>
      </Link>
      <Link
        to={"add-new-bootCamp"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><MdAssignmentAdd />
        <span className="mx-2 text-sm font-medium">Add
          BootCamp</span>

      </Link>

      <Link to={'transaction-overview'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><FaFileInvoiceDollar />
        <span className="mx-2 text-sm font-medium">Transaction Overview</span>
      </Link>
      <Link
        to={"my-transactions"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><AiOutlineTransaction />
        <span className="mx-2 text-sm font-medium">
          My Transactions
        </span>

      </Link>

      <Link
        to={'allJobApplications'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><TbReport />
        <span className="mx-2 text-sm font-medium">
          Job Applications
        </span>
      </Link>
      <Link
        to={'ApplyForMentor'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><SiCodementor />
        <span className="mx-2 text-sm font-medium">
          Be a mentor
        </span>
      </Link>


      <Link
        to={'profile'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><IoSettings />
        <span className="mx-2 text-sm font-medium">
          Profile
        </span>
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
        <PiListStarThin />
        <span className="mx-2 text-sm font-medium">
          Introduction
        </span>

      </Link>

      <Link
        to={"add-new-bootCamp"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><MdAssignmentAdd />
        <span className="mx-2 text-sm font-medium">Add
          BootCamp</span>

      </Link>
      <Link
        to={"add-new-resource"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GrResources />
        <span className="mx-2 text-sm font-medium">Add
          New Resource</span>

      </Link>

      <Link
        to={"manage-slots"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><MdAddchart />
        <span className="mx-2 text-sm font-medium">
          Manage Slots
        </span>

      </Link>
      <Link
        to={"my-course-trasactions"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><AiOutlineTransaction />
        <span className="mx-2 text-sm font-medium">
          My Course
        </span>

      </Link>
      <Link
        to={"my-transactions"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><AiOutlineTransaction />
        <span className="mx-2 text-sm font-medium">
          My Transactions
        </span>

      </Link>
      <Link
        to={"feedback"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><FcFeedback />
        <span className="mx-2 text-sm font-medium">
          Feedback
        </span>

      </Link>



      <Link
        to={'profile'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><MdOutlineBrowserUpdated />
        <span className="mx-2 text-sm font-medium">
          Profile
        </span>
      </Link>
      <Link to={'/'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><FaHome />
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
        <PiListStarThin />
        <span className="mx-2 text-sm font-medium">
          Introduction
        </span>

      </Link>
      <Link
        to={"my-transactions"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><AiOutlineTransaction />
        <span className="mx-2 text-sm font-medium">
          My Transactions
        </span>

      </Link>

      <Link
        to={"my-booked-slots"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GiNotebook />
        <span className="mx-2 text-sm font-medium">
          My Booked Slots
        </span>

      </Link>
      <Link
        to={"add-new-resource"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GrResources />
        <span className="mx-2 text-sm font-medium">Add
          New Resource</span>

      </Link>
      <Link
        to={"my-job-applications"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><GrResources />
        <span className="mx-2 text-sm font-medium">
          My Job Applications
        </span>

      </Link>
      <Link
        to={"ApplyForMentor"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><SiCodementor />
        <span className="mx-2 text-sm font-medium">
          Be a Mentor
        </span>

      </Link>
      <Link
        to={"feedback"}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

      ><FcFeedback />
        <span className="mx-2 text-sm font-medium">
          Feedback
        </span>

      </Link>



      <Link
        to={'profile'}
        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><MdOutlineBrowserUpdated />
        <span className="mx-2 text-sm font-medium">
          Profile
        </span>
      </Link>
      <Link to={'/'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"><FaHome />
        <span className="mx-2 text-sm font-medium">Go to Home</span>
      </Link>


    </ul>
  );
  const { user, LogOut, loading } = UseAuth();

  const [role, isLoading, refetch] = UseRole(user?.email);
  console.log(role);

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
            className={`fixed top-0 bg-gray-950 left-0 h-full w-64 p-4 overflow-y-auto transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

              </nav>
              {role.isAdmin && renderAdminLinks()}
              {role.isMentor && renderMentorLinks()}
              {role.isMember && renderMemberLinks()}
              {(!role.isMentor && !role.isAdmin && !role.isMember && !isLoading) && (
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
              {isLoading && <p><RotateLoader /></p>}
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
          <div className="flex-1 overflow-y-auto">
            <div className="h-full p-4 flex flex-col">
              {/* Button to open/close sidebar on small screens */}
              <div className="relative">
                <button
                  className="lg:hidden absolute left-0 top-0  text-xl p-2 text-gray-500 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleSidebar}
                >
                  <GiHamburger />
                </button>
                <UpperNavbar />

              </div>
              {/* Outlet for main content */}
              <div className="flex-grow overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;