import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
// 👉 replace this with your own Lottie JSON file
// import NotFoundAnim from "@/assets/lotties/404.json";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
            {/* Lottie Animation */}
            <div className="w-full max-w-md">
                {/* <Lottie animationData={NotFoundAnim} loop={true} /> */}
                <h1 className="text-6xl font-bold text-center">404</h1>
            </div>

            {/* Text Content */}
            <h1 className="text-4xl font-bold text-gray-800 mt-6">Page Not Found</h1>
            <p className="text-gray-500 mt-2 max-w-md">
                Oops! The page you’re looking for doesn’t exist or may have been moved.
            </p>

            {/* Action Button */}
            <button
                onClick={() => navigate("/cvDashboard")}
                className="mt-6 px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;
