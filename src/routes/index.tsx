import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import AppLayout from "@/layouts/AppLayout";
import AdminLayout from "@/layouts/AdminLayout";

// auth
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import SignupAdmin from "@/pages/auth/SignupAdmin";

// dashboard pages
import Home from "@/pages/dashboard/Home";
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
      // USER DASHBOARD
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <Home />,
          },
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
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "users",
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