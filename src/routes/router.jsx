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
        }
      ]

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