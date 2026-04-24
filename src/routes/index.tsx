import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts

import Profile from "../pages/dashboard/Profile";
import Contact from "../pages/dashboard/Contact";
import Description from "../pages/dashboard/Description";
import Skills from "../pages/dashboard/Skills";
import Projects from "../pages/dashboard/Projects";
import Experience from "../pages/dashboard/Experience";
import Education from "../pages/dashboard/Education";
import Acheivements from "../pages/dashboard/Acheivements";
import Activities from "../pages/dashboard/Activities";
import Reference from "../pages/dashboard/Reference";
import AddSection from "../pages/dashboard/AddSection";

// admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManageUsers from "../pages/admin/AdminManageUsers";

// public pages
import ViewCV from "../pages/public/ViewCV";
import ViewFormalCV from "../pages/public/ViewFormalCV";
import ViewFormalCV2 from "../pages/public/ViewFormalCV2";

// auth guard
import ProtectedRoute from "../context/ProtectedRoute";
import NotFoundPage from "../commonComponents/NotFoundPage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SignupAdmin from "../pages/auth/SignupAdmin";
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import CVDashboard from "@/pages/dashboard/CVDashboard";
import Home from "@/pages/dashboard/Home";

const routes = createBrowserRouter([
  //   PUBLIC ROUTES  
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin-signup",
    element: <SignupAdmin />,
  },

  {
    path: "/viewCV",
    element: <ViewCV />,
  },
  {
    path: "/viewFormalCV",
    element: <ViewFormalCV />,
  },
  {
    path: "/viewFormalCV2",
    element: <ViewFormalCV2 />,
  },

  //   PROTECTED AREA  
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <CVDashboard />,
      },
      {
        element: <AppLayout />,
        children: [
          // {
          //   path: "home",
          //   element: <Home />,
          // },
          {
            path: "home/:cvId",
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "description",
            element: <Description />,
          },
          {
            path: "skills",
            element: <Skills />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "experience",
            element: <Experience />,
          },
          {
            path: "education",
            element: <Education />,
          },
          {
            path: "acheivements",
            element: <Acheivements />,
          },
          {
            path: "activities",
            element: <Activities />,
          },
          {
            path: "reference",
            element: <Reference />,
          },
          {
            path: "addSection",
            element: <AddSection />,
          },
        ],
      },

      // ADMIN DASHBOARD
      {
        path: "/adminDashboard",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "adminManageUsers",
            element: <AdminManageUsers />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;