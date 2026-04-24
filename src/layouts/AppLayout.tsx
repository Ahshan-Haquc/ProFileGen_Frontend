import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";

const AppLayout = () => {

    return (
        <div className="min-h-screen min-w-screen overflow-hidden">
            <NavBar />
            <div className="flex h-full w-full ">
                <SideBar />
                <div className="min-h-[calc(100vh-56px)] max-h-fit flex-grow relative">
                    <div className=" p-1 lg:p-6"><Outlet /></div>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
