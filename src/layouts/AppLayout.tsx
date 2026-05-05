// import { Outlet } from "react-router-dom";
// import NavBar from "../components/layout/NavBar";
// import SideBar from "../components/layout/SideBar";
// import Footer from "../components/layout/Footer";

// const AppLayout = () => {

//     return (
//         <div className="min-h-screen min-w-screen overflow-hidden">
//             <NavBar />
//             <div className="flex h-full w-full ">
//                 <SideBar />
//                 <div className="min-h-[calc(100vh-56px)] max-h-fit flex-grow relative">
//                     <div className=" p-1 lg:p-6"><Outlet /></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import SideBar from "../components/layout/SideBar";

const AppLayout = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50">
            <NavBar />
            {/* Sidebar is fixed-positioned, so main content just needs top padding */}
            <div className="flex pt-16">
                <SideBar />
                {/* Main content — no left margin needed since sidebar is fixed and spacer handles it */}
                <main className="flex-1 min-h-[calc(100vh-64px)] p-1 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
