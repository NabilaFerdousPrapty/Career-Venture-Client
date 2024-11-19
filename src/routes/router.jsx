import React from 'react';
import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import BootCamps from './../Pages/BootCamps/BootCamps';
import Mentors from '../Pages/Mentors/Mentors';
import Openings from './../Pages/Openings/Openings';
import Resources from '../Pages/Resources/Resources';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import Dashboard from '../Layouts/DashBoard';
import DashboardHome from '../Pages/DashboardHome/DashboardHome';
import ErrorPage from '../Pages/Error/ErrorPage';
import BootCampDetails from '../Pages/BootCamps/BootCampDetails/BootCampDetails';
import { axiosSecure } from './../hooks/UseAxiosSecure/UseAxiosSecure';
import UseAxiosCommon from '../hooks/UseAxiosCommon/UseAxiosCommon';
import PrivateRoute from './Private/PrivateRoute';
import MentorDetails from '../Pages/MentorDetails/MentorDetails';
import ResourceDetail from '../Pages/ResourceDetail/ResourceDetail';
import UserManagement from '../Pages/Admin/UserManagement/UserManagement';
import AddJobOpening from '../Pages/Admin/AddJobOpening/AddJobOpening';
import TransactionOverview from '../Pages/Admin/Transactions/TransactionOverview';
import AppliedMentor from '../Pages/Admin/AppliedMentor/AppliedMentor';
import MentorsOverview from '../Pages/Admin/MentorsOverview/MentorsOverview';
import PaymentPage from '../../components/Payments/PaymentPage';
import OpenningDetails from '../Pages/OpenningDetails/OpenningDetails';
import AllJobApplications from '../Pages/Admin/AllJobApplications/AllJobApplications';
import PricingPlans from '../Pages/MentorDetails/PricingPlans/PricingPlans';
import TestimonialDetails from '../Pages/Home/Testimonials/TestimonialDetails/TestimonialDetails';
import AddBootCamp from '../Pages/Admin/AddBootCamp/AddBootCamp';
import BeAMentor from '../Pages/User/BeAMentor/BeAMentor';
import ApplicationDetails from '../Pages/Admin/AllJobApplications/ApplicationDetails';
import Profile from '../Pages/User/Profile/Profile';
import AddNewResource from '../Pages/AddNewResource/AddNewResource';
import AboutUs from '../Pages/AboutUs/AboutUsPage';
import AboutUsPage from '../Pages/AboutUs/AboutUsPage';
import ManageSlots from '../Pages/MentorDashboard/ManageSlots/ManageSlots';
import MyCourseTransactions from '../Pages/MentorDashboard/MyWork/MyCourseTransactions';
import MyTransactions from '../Pages/MemberDashboard/MyTransactions/MyTransactions';
import Feedback from '../Pages/MemberDashboard/Feedback/Feedback';
const axiosCommon = UseAxiosCommon();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {

        path: '/testimonial/:id',
        element: <PrivateRoute>
          <TestimonialDetails />
        </PrivateRoute>
      }, {
        path: '/bootCamps',
        element: <BootCamps />
      }, {
        path: '/Enroll',
        element: <PrivateRoute>
          <PaymentPage />
        </PrivateRoute>
      }, {
        path: '/mentors',
        element: <Mentors />,

      }, {
        path: '/mentor/:id',
        element: <PrivateRoute>
          <MentorDetails />
        </PrivateRoute>
      },
      {
        path: '/learnAboutMentors/:id',
        element: <PrivateRoute>
          <MentorDetails />
        </PrivateRoute>
      },
      {
        path: '/openings',
        element: <Openings />
      }, {
        path: '/opening/:id',
        element: <PrivateRoute>
          <OpenningDetails />
        </PrivateRoute>
      }, {
        path: '/resources',
        element: <Resources />
      }, {
        path: '/resources/:id',
        element: <PrivateRoute>
          <ResourceDetail />
        </PrivateRoute>
      }, {
        path: '/LearnAboutBootCamp/:id',
        element: <PrivateRoute>
          <BootCampDetails />
        </PrivateRoute>
        ,
        loader: async ({ params }) => {
          try {
            const response = await axiosCommon.get(`/LearnAboutBootCamp/${params.id}`);
            return response.data;
          } catch (error) {
            console.error('Error loading item:', error);
            throw new Error('Failed to load item data');
          }
        }
      }, {
        path: "/pricingPlans",
        element:
          < PrivateRoute >
            <PricingPlans />
          </ PrivateRoute>
      }, {
        path: '/aboutUs',
        element: <AboutUsPage />
      }



    ],
    errorElement: <ErrorPage />


  }, {
    path: '/dashboard',
    element:
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ,
    children: [
      {
        path: 'intro',
        element: <DashboardHome />
      }, {
        path: 'manage-users',
        element: <UserManagement />
      }, {
        path: 'add-job-openings',
        element: <AddJobOpening />
      }, {

        path: 'allJobApplications',
        element: <AllJobApplications />
      }, {
        path: 'transaction-overview',
        element: <TransactionOverview />
      }, {
        path: 'mentors-overview',
        element: <MentorsOverview />
      }, {
        path: 'add-new-bootCamp',
        element: <AddBootCamp />
      }, {
        path: 'ApplyForMentor',
        element: <BeAMentor />
      }, {
        path: 'application/:jobId/:id',
        element: <ApplicationDetails />
      },
      {
        path: 'profile',
        element: <Profile />
      }, {
        path: 'add-new-resource',
        element: <AddNewResource />
      }, {
        path: 'manage-slots',
        element: <ManageSlots />
      }, {
        path: 'my-course-trasactions',
        element: <MyCourseTransactions />
      }, {
        path: 'my-transactions',
        element: <MyTransactions />
      }, {
        path: 'feedback',
        element: <Feedback />
      }

    ],
    errorElement: <ErrorPage />

  },
  {
    path: "/login",
    element: <Login />

  }, {
    path: '/signUp',
    element: <SignUp />
  }
]);

export default router;