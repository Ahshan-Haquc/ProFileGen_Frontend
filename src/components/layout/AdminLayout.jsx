import React from 'react';
import AdminSideBar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <AdminSideBar />
            <Outlet />
        </div>
    );
};

export default AdminLayout;