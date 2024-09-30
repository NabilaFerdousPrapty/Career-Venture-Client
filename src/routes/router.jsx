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
const axiosCommon = UseAxiosCommon();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },{
          path:'/bootCamps',
          element:<BootCamps/>
        },{
          path:'/Enroll',
          element:<PrivateRoute>
            <PaymentPage/>
          </PrivateRoute>
        },{
          path:'/mentors',
          element:<Mentors/>,

        },{
          path:'/learnAboutMentors/:id',
          element:<PrivateRoute>
            <MentorDetails/>
          </PrivateRoute>
        },
          {
          path:'/openings',
          element:<Openings/>
        },{
          path:'/resources',
          element:<Resources/>
        },{
          path:'/resources/:id',
          element:<PrivateRoute>
            <ResourceDetail/>
          </PrivateRoute>
        },{
          path:'/LearnAboutBootCamp/:id',
          element:<PrivateRoute>
            <BootCampDetails/>
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
        }
      ],
      errorElement:<ErrorPage/>


    },{
      path:'/dashboard',
      element:
      <PrivateRoute>
        <Dashboard/>
      </PrivateRoute>
     ,
      children:[
        {
          path:'intro',
          element:<DashboardHome/>
        },{
          path:'manage-users',
          element:<UserManagement/>
        },{
          path:'add-job-openings',
          element:<AddJobOpening/>
        },{
          path:'transaction-overview',
          element:<TransactionOverview/>
        },{
          path:'mentors-overview',
          element:<MentorsOverview/>
        }
      ],
      errorElement:<ErrorPage/>
      
    },
    {
      path: "/login",
      element:<Login/>

    },{
      path:'/signUp',
      element:<SignUp/>
    }
  ]);

export default router;