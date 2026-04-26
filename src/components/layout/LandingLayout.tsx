import LandingFooter from "@/layouts/LandingFooter";
import LandingNavBar from "@/layouts/LandingNavBar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <LandingNavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <LandingFooter />
        </div>
    );
}

export default LandingLayout;