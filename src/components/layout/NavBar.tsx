// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { IoMdMenu } from "react-icons/io";
// import { useSideBarVisible } from '../../context/SideBarShowInPhone';
// import { MdLightMode } from "react-icons/md";
// import { useAuthUser } from '../../context/AuthContext';
// import { useLogoutUserMutation } from '../../redux/features/dashboard/dashboardApi';

// const NavBar = () => {
//     const { setUser } = useAuthUser();
//     const navigate = useNavigate();
//     const [logoutUser] = useLogoutUserMutation();

//     const logout = async () => {
//         try {
//             await logoutUser().unwrap();
//             setUser(null);
//             navigate("/login");
//         } catch (error) {
//             alert("Logout unsuccessful");
//         }
//     };

//     const handleTheme = () => {
//         alert("theme")
//     }

//     const { setIsSidebarVisible } = useSideBarVisible();
//     const handleSideBar = () => { setIsSidebarVisible((prev) => !prev) }
//     return (
//         <div className="w-full min-h-16 relative z-1">
//             <div className="w-full h-16 bg-[#210F37]  text-white p-3 flex justify-between items-center fixed top-0 left-0">
//                 {/* Professional Profile Generator */}
//                 <div className="flex justify-center items-center">
//                     <IoMdMenu
//                         size={40}
//                         className="mr-4 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-90"
//                         onClick={handleSideBar}
//                     />

//                     {/* <IoMdMenu size={40} className='mr-4 flex md:hidden' onClick={handleSideBar} /> */}
//                     <div className="">

//                         <div className="text-xl md:text-3xl font-bold">ProFileGen</div>

//                     </div>
//                 </div>
//                 <div className="mr-5 flex gap-3">
//                     <NavLink
//                         to={"/home"}
//                         className=" h-10 w-10 rounded-full hover:bg-[#ff8757] duration-500 flex justify-center items-center"
//                     >
//                         <i className="fa-solid fa-eye"></i> Preview
//                     </NavLink>
//                     <button
//                         className=" h-10 w-10 rounded-full hover:bg-[#ff8757] hover:cursor-pointer duration-500 flex justify-center items-center"
//                         onClick={()=>{navigate("/dashboard")}}
//                     >
//                         <i className="fa-solid fa-arrow-right-from-bracket"></i> Dashboard
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NavBar;

// components/layout/NavBar.jsx
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { Eye, LayoutDashboard, LogOut } from "lucide-react";
import { useSideBarVisible } from "../../context/SideBarShowInPhone";
import { useAuthUser } from "../../context/AuthContext";
import { useLogoutUserMutation } from "../../redux/features/dashboard/dashboardApi";
import { useUserCV } from "../../context/UserCVContext";

const NavBar = () => {
    const { setUser } = useAuthUser();
    const { userCV } = useUserCV();
    const navigate = useNavigate();
    const { cvId } = useParams();
    const [logoutUser] = useLogoutUserMutation();
    const { setIsSidebarVisible } = useSideBarVisible();

    const logout = async () => {
        try {
            await logoutUser().unwrap();
            setUser(null);
            navigate("/login");
        } catch {
            alert("Logout unsuccessful");
        }
    };

    return (
        <div className="w-full min-h-16 relative z-40">
            <header className="w-full h-16 bg-[#210F37] text-white px-4 flex justify-between items-center fixed top-0 left-0 shadow-md border-b border-white/8">

                {/* Left — hamburger + brand */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarVisible((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 active:scale-95"
                        aria-label="Toggle sidebar"
                    >
                        <IoMdMenu size={26} />
                    </button>

                    <NavLink to="/dashboard" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#f4a261] transition-colors duration-200">
                            ProFileGen
                        </span>
                    </NavLink>

                    {/* CV title pill — shows current CV name */}
                    {userCV?.title && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/12 text-xs text-white/60 max-w-[180px]">
                            <span className="truncate">{userCV.title}</span>
                        </div>
                    )}
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-2">
                    {/* Preview */}
                    <NavLink
                        to={`/viewFormalCV`}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium
                                   text-white/80 hover:text-white hover:bg-white/10
                                   border border-white/10 hover:border-white/20
                                   transition-all duration-200"
                        title="Preview your CV"
                    >
                        <Eye size={16} />
                        <span className="hidden sm:inline">Preview</span>
                    </NavLink>

                    {/* Dashboard */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium
                                   text-white/80 hover:text-white hover:bg-white/10
                                   border border-white/10 hover:border-white/20
                                   transition-all duration-200"
                        title="Go to dashboard"
                    >
                        <LayoutDashboard size={16} />
                        <span className="hidden sm:inline">Dashboard</span>
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-white/15 mx-1 hidden sm:block" />

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium
                                   text-white/60 hover:text-white hover:bg-red-500/20
                                   border border-white/10 hover:border-red-500/30
                                   transition-all duration-200"
                        title="Logout"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default NavBar;