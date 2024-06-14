import React from 'react';
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from '../Layouts/MainLayout';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>
    },
  ]);

export default router;