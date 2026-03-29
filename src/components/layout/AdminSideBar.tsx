import React from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
} from "lucide-react";
import { useAuthUser } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const AdminSideBar = () => {
    const { setUser } = useAuthUser();
    const navigate = useNavigate();
    const logout = async () => {
        const res = await axiosInstance.get('/userLogout');
        if (res) {
            setUser(null); // update context
            navigate("/login");
        } else {
            alert("Logout unsuccessful");
        }
    };
    return (
        <aside className="min-w-64 bg-[#210F37] text-white flex flex-col">
            <div className="p-6 text-2xl font-bold text-[#A55B4B]">
                ProFileGen <br /><span className='text-lg font-normal text-white'>Admin Panel</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink
                    to="/adminDashboard"
                    end
                    className={({ isActive }) =>
                        `${isActive ? "bg-[#4F1C51] text-white" : ""} 
     flex items-center p-2 rounded-lg hover:bg-[#4F1C51] hover:text-white transition`
                    }
                >
                    <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                </NavLink>
                <NavLink
                    to="/adminDashboard/adminManageUsers"
                    className={({ isActive }) =>
                        `${isActive ? "bg-[#4F1C51] text-white" : ""} 
     flex items-center p-2 rounded-lg hover:bg-[#4F1C51] hover:text-white transition`
                    }
                >
                    <Users className="mr-2 h-5 w-5" /> Manage Users
                </NavLink>
                <p
                    className="flex items-center p-2 rounded-lg hover:bg-[#4F1C51]"
                >
                    <FileText className="mr-2 h-5 w-5" /> CV Templates
                </p>
                <p
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-[#4F1C51]"
                >
                    <Settings className="mr-2 h-5 w-5" /> Settings
                </p>
            </nav>
            <div className="p-4">
                <button className="flex items-center w-full p-2 rounded-lg hover:bg-[#4F1C51]" onClick={logout}>
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                </button>
            </div>
        </aside >
    );
};

export default AdminSideBar;