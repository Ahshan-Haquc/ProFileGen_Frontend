import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Users, FileText, Layout } from "lucide-react";
import { MdOutlineDashboard } from "react-icons/md";


const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axiosInstance.get("/admin/dashboard");
                if (response.data.success) {
                    setDashboardData(response.data);
                } else {
                    alert("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                alert("Error fetching dashboard");
            }
        };

        fetchDashboard();
    }, []);

    return (
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-[#4F1C51] mb-8 flex gap-4">
                <MdOutlineDashboard size={40} /> Admin Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
                        <Users size={28} />
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Total Users</h2>
                        <p className="text-3xl font-bold">{dashboardData.usersCount}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
                    <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                        <FileText size={28} />
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">CVs Generated</h2>
                        <p className="text-3xl font-bold">{dashboardData.totalCVs}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                        <Layout size={28} />
                    </div>
                    <div>
                        <h2 className="text-gray-500 text-sm">Templates</h2>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        New Registered Users <span className="text-gray-400 text-sm">(Last 30 days)</span>
                    </h2>

                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-purple-50 text-gray-700">
                                <th className="p-3 text-sm">Name</th>
                                <th className="p-3 text-sm">Email</th>
                                <th className="p-3 text-sm">Status</th>
                                <th className="p-3 text-sm text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentUsers?.length > 0 ? (
                                dashboardData.recentUsers.map((user, index) =>
                                    user.role === "user" && (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3 font-medium text-gray-700">{user.name || "John Doe"}</td>
                                            <td className="p-3 text-gray-600">{user.email}</td>
                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "active"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-6 text-center text-gray-500">
                                        No recent users
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
