import { Outlet, useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/AuthContext";
import { useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";


const AppLayout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthUser();
    useEffect(() => {
        document.title = "Dashboard";
        navigate("/home");
    }, []);


    return (
        <div className="min-h-screen min-w-screen overflow-hidden">
            <NavBar />
            <div className="flex h-full w-full ">
                <SideBar />
                <div className="min-h-[calc(100vh-56px)] max-h-fit flex-grow relative">
                    <div className=" p-1 lg:p-6"><Outlet /></div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
