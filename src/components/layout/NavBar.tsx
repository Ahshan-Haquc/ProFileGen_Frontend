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
            {/* Main Header: White Background */}
            <header className="w-full h-16 bg-white text-[#210F37] px-4 flex justify-between items-center shadow-sm border-b border-gray-100">

                {/* Left — hamburger + brand */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarVisible((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 active:scale-95"
                        aria-label="Toggle sidebar"
                    >
                        <IoMdMenu size={26} className="text-[#210F37]" />
                    </button>

                    <NavLink to="/dashboard" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-[#210F37] group-hover:text-[#ff8757] transition-colors duration-200">
                            {userCV.title}
                        </span>
                    </NavLink>

                    {/* CV title pill — Subtle gray theme for white background */}
                    {/* {userCV?.title && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs  max-w-[180px] text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            <span className="truncate">{userCV.title}</span>
                        </div>
                    )} */}

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 transition-all duration-300">
                        {/* Status Icon/Spinner */}
                        <div className="relative flex items-center justify-center">
                            {/* Use a simple spinner or pulse if 'isSaving', else a checkmark */}
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        {/* Status Text */}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            Auto-saving...
                        </span>
                    </div>
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-2">
                    {/* Preview */}
                    <NavLink
                        to={`/home/${cvId}`}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold
                                   text-[#210F37]/80 hover:text-[#ff8757] hover:bg-[#ff8757]/5
                                   border border-gray-200 hover:border-[#ff8757]/30
                                   transition-all duration-200"
                        title="Preview your CV"
                    >
                        <Eye size={16} />
                        <span className="hidden sm:inline">Preview</span>
                    </NavLink>

                    {/* Dashboard */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold
                                   text-[#210F37]/80 hover:text-[#ff8757] hover:bg-[#ff8757]/5
                                   border border-gray-200 hover:border-[#ff8757]/30
                                   transition-all duration-200"
                        title="Go to dashboard"
                    >
                        <LayoutDashboard size={16} />
                        <span className="hidden sm:inline">Dashboard</span>
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold
                                   text-gray-500 hover:text-red-600 hover:bg-red-50
                                   border border-transparent hover:border-red-100
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