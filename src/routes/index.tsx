import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManageUsers from "../pages/admin/AdminManageUsers";
import ProtectedRoute from "../context/ProtectedRoute";
import NotFoundPage from "../commonComponents/NotFoundPage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SignupAdmin from "../pages/auth/SignupAdmin";
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import CVDashboard from "@/pages/dashboard/mainPanel/CVDashboard";
import MyCVs from "@/pages/dashboard/mainPanel/MyCVs";
import PricingSection from "@/components/landingPage/PricingSection";
import Layout from "@/components/layout/LandingLayout";
import LandingLayout from "@/components/layout/LandingLayout";
import TemplatesPage from "@/pages/public/TemplatesPage";
import ResumeHelp from "@/pages/public/ResumeHelp";
import AboutPage from "@/pages/public/AboutPage";
import MyPricing from "@/pages/dashboard/mainPanel/MyPricing";
import SuccessSubscription from "@/pages/dashboard/mainPanel/SuccessSubscription";
import LandingPage from "@/pages/public/LandingPage";
import ViewCV from "@/pages/dashboard/cvMakingPanel/ViewCV";
import ViewFormalCV from "@/pages/dashboard/cvMakingPanel/ViewFormalCV";
import ViewFormalCV2 from "@/pages/dashboard/cvMakingPanel/ViewFormalCV2";
import Home from "@/pages/dashboard/cvMakingPanel/Home";
import Profile from "@/pages/dashboard/cvMakingPanel/Profile";
import Contact from "@/pages/dashboard/cvMakingPanel/Contact";
import Description from "@/pages/dashboard/cvMakingPanel/Description";
import Skills from "@/pages/dashboard/cvMakingPanel/Skills";
import Projects from "@/pages/dashboard/cvMakingPanel/Projects";
import Experience from "@/pages/dashboard/cvMakingPanel/Experience";
import Education from "@/pages/dashboard/cvMakingPanel/Education";
import Acheivements from "@/pages/dashboard/cvMakingPanel/Acheivements";
import Activities from "@/pages/dashboard/cvMakingPanel/Activities";
import Reference from "@/pages/dashboard/cvMakingPanel/Reference";
import AddSection from "@/pages/dashboard/cvMakingPanel/AddSection";

const routes = createBrowserRouter([
  //   PUBLIC ROUTES  
  {
    path : "/",
    element: <LandingLayout/>,
    children : [
      {
        index : true,
        element: <LandingPage />,
      },
      {
        path : "pricing",
        element: <PricingSection />,
      },
      {
        path : "templates",
        element: <TemplatesPage />,
      },
      {
        path : "resume-help",
        element: <ResumeHelp />,
      },
      {
        path : "about",
        element: <AboutPage />,
      }
    ]
  },
  // auth routes 
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
        path: "my-cvs",
        element: <MyCVs />,
      },
      {
        path: "my-pricing",
        element: <MyPricing />,
      },
      {
        path: "success-subscription",
        element: <SuccessSubscription />,
      },
      {
        element: <AppLayout />,
        children: [
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