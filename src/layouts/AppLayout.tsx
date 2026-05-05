import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import SideBar from "../components/layout/SideBar";

const AppLayout = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50 flex w-full">
                <SideBar />
            <div className="flex flex-col flex-1">
            <NavBar />
                {/* Main content — no left margin needed since sidebar is fixed and spacer handles it */}
                <main className="flex-1 min-h-[calc(100vh-64px)] p-1 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
