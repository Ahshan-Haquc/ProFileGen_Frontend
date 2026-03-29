import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useSideBarVisible } from '../../context/SideBarShowInPhone';
import { MdLightMode } from "react-icons/md";
import { useAuthUser } from '../../context/AuthContext';


const NavBar = () => {
    const { setUser } = useAuthUser();
    const logout = async () => {
        const res = await fetch("http://localhost:3000/userLogout", {
            method: "GET",
            credentials: "include",
        });
        if (res.status === 200) {
            setUser(null); // update context
            navigate("/login");
        } else {
            alert("Logout unsuccessful");
        }
    };

    const handleTheme = () => {
        alert("theme")
    }

    const { setIsSidebarVisible } = useSideBarVisible();
    const handleSideBar = () => { setIsSidebarVisible((prev) => !prev) }
    return (
        <div className="w-full min-h-16 relative z-1">
            <div className="w-full h-16 bg-[#210F37]  text-white p-3 flex justify-between items-center fixed top-0 left-0">
                {/* Professional Profile Generator */}
                <div className="flex justify-center items-center">
                    <IoMdMenu
                        size={40}
                        className="mr-4 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-90"
                        onClick={handleSideBar}
                    />

                    {/* <IoMdMenu size={40} className='mr-4 flex md:hidden' onClick={handleSideBar} /> */}
                    <div className="">

                        <div className="text-xl md:text-3xl font-bold">ProFileGen</div>

                    </div>
                </div>
                <div className="mr-5 flex gap-3">
                    <NavLink
                        to={"/home"}
                        className=" h-10 w-10 rounded-full hover:bg-[#ff8757] duration-500 flex justify-center items-center"
                    >
                        <i className="fa-solid fa-eye"></i>
                    </NavLink>
                    <button
                        className=" h-10 w-10 rounded-full hover:bg-[#ff8757] hover:cursor-pointer duration-500 flex justify-center items-center"
                        onClick={handleTheme}
                    >
                        <MdLightMode size={20} />
                    </button>
                    <button
                        className=" h-10 w-10 rounded-full hover:bg-[#ff8757] hover:cursor-pointer duration-500 flex justify-center items-center"
                        onClick={logout}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;