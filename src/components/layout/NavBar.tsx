import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { Edit, Eye, LayoutDashboard, LogOut } from "lucide-react";
import { useSideBarVisible, useAuthUser, useUserCV } from "@/redux/hooks";
import { useLogoutUserMutation } from "../../redux/features/dashboard/dashboardApi";
import { useState, useEffect } from "react";
import { useUpdateCVTitleMutation } from "@/redux/features/cv/cvApi";
import toastShow from "@/utils/toastShow";

const NavBar = () => {
    const { setUser } = useAuthUser();
    const { userCV } = useUserCV();
    const navigate = useNavigate();
    const { cvId } = useParams();
    const [logoutUser] = useLogoutUserMutation();
    const { setIsSidebarVisible } = useSideBarVisible();
    const [isEditing, setIsEditing] = useState(false);

    const safeUserCV = userCV || {};
    const [title, setTitle] = useState(() => safeUserCV.title || "");
    const [loading, setLoading] = useState(false);
    const [updateCVTitle] = useUpdateCVTitleMutation();

    useEffect(() => {
      if (!isEditing) {
        const newTitle = safeUserCV.title || "";
        setTitle((currentTitle) => (currentTitle !== newTitle ? newTitle : currentTitle));
      }
    }, [safeUserCV.title, isEditing]);


    const logout = async () => {
        try {
            await logoutUser().unwrap();
            setUser(null);
            navigate("/login");
        } catch {
            alert("Logout unsuccessful");
        }
    };

    const handleCancel = () => {
        setTitle(safeUserCV.title || "");
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!title.trim() || title === safeUserCV.title) {
            setIsEditing(false);
            return;
        }
        try {
            setLoading(true);
            const response = await updateCVTitle({ cvId: safeUserCV._id, newTitle: title.trim() }).unwrap();
            if (response.success) toastShow(response.message, "success");
            else toastShow(response.message, "error");
        } catch {
            toastShow("Failed to update CV title", "error");
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="w-full min-h-16 relative z-40">
            {/* Main Header: White Background */}
            <header className="w-full h-16 bg-white text-[#210F37] px-4 flex justify-between items-center shadow-none md:shadow-sm border-b border-gray-100">

                {/* Left — hamburger + brand */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarVisible((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 active:scale-95"
                        aria-label="Toggle sidebar"
                    >
                        <IoMdMenu size={26} className="text-[#210F37]" />
                    </button>

                    <div className="md:hidden text-[#210F37] text-lg font-semibold">
                        Editor
                    </div>

                    <div className="hidden md:flex items-center gap-3  ">
                        <div className="flex items-center gap-3">
                                <div className="font-semibold text-gray-900">
                                    <input
                                        type="text"
                                        value={title}
                                        disabled={!isEditing}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={`w-fit overflow-hidden ${isEditing ? "py-1 px-3 border border-gray-300 rounded-md " : "bg-transparent cursor-default"}`}
                                    />
                                    {isEditing && (
                                        <>
                                            <button
                                                className="bg-gray-200 mx-2 px-2 py-1 rounded hover:bg-red-600 hover:text-white text-sm"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
                                                onClick={handleSubmit}
                                                disabled={loading}
                                            >
                                                {loading ? "Saving..." : "Rename"}
                                            </button>
                                        </>
                                    )}
                                </div>
                        </div>
                            {!isEditing && (
                                <button
                                    className="rounded-full p-2 hover:bg-gray-100"
                                    title="Rename CV"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit className="h-5 w-5 text-gray-400" />
                                </button>
                            )}
                    </div>

                    <div className=" hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 transition-all duration-300">
                        {/* Status Icon/Spinner */}
                        <div className="relative flex items-center justify-center">
                            {/* Use a simple spinner or pulse if 'isSaving', else a checkmark */}
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        {/* Status Text */}
                        <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                            Auto-saving...
                        </span>
                    </div>
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-2">
                    {/* Preview */}
                    <NavLink
                        to={`/home/${cvId}`}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs xl:text-sm 2xl:text-base font-semibold
                                   text-[#210F37]/80 hover:text-[#ff8757] hover:bg-[#ff8757]/5
                                   border border-gray-200 hover:border-[#ff8757]/30
                                   transition-all duration-200"
                        title="Preview your CV"
                    >
                        <Eye size={16} />
                        <span className="inline">Preview</span>
                    </NavLink>

                    {/* Dashboard */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs xl:text-sm 2xl:text-base font-semibold
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
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs xl:text-sm 2xl:text-base font-semibold
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