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
          path:'/mentors',
          element:<Mentors/>,

        },{
          path:'/openings',
          element:<Openings/>
        },{
          path:'/resources',
          element:<Resources/>
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
        <Dashboard/>
     ,
      children:[
        {
          path:'home',
          element:<DashboardHome/>
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