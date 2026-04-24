import { useState } from "react";
import { useAuthUser } from "@/context/AuthContext";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import toastShow from "@/utils/toastShow";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, FileText, CreditCard } from "lucide-react";

const DashboardNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuthUser();

    const toggleMenu = () => setIsOpen(!isOpen);

    const logout = async () => {
        try {
            await logoutUser().unwrap();
            setUser(null);
            navigate("/login");
        } catch (error) {
            toastShow("Logout unsuccessful", "error");
        }
    };

    const navLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "My CVs", path: "/my-cvs", icon: <FileText size={18} /> },
        { name: "Pricing", path: "/pricing", icon: <CreditCard size={18} /> },
    ];

    return (
        <nav className="relative w-full h-16 lg:h-20 bg-[#210F37] text-white px-6 md:px-14 flex justify-between items-center z-50">
            {/* Logo Section */}
            <div 
                className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => navigate("/")}
            >
                <span className="text-xl md:text-2xl font-black tracking-tight">ProFileGen</span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-gray-400 -mt-1">Dashboard</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                    <button
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className={`h-10 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                            location.pathname === link.path 
                            ? "text-[#ff8757] " 
                            : "hover:bg-white/10 text-gray-300 hover:text-white"
                        }`}
                    >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                    </button>
                ))}
                
                <div className="w-[1px] h-6 bg-gray-700 mx-2" />

                <button
                    className="h-10 px-4 rounded-lg border border-gray-300 text-gray-300 hover:bg-[#ff8757] hover:text-white hover:border-[#ff8757] transition-all duration-300 flex items-center gap-2 font-medium"
                    onClick={logout}
                >
                    <LogOut size={18} />
                    Log out
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="p-2 text-gray-300 hover:text-white transition-colors">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 bg-[#210F37] transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden top-16 z-40 px-6 pt-10`}>
                <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => { navigate(link.path); setIsOpen(false); }}
                            className="w-full h-12 px-4 rounded-xl flex items-center gap-4 bg-white/5 hover:bg-[#ff8757] transition-all"
                        >
                            {link.icon}
                            <span className="text-lg font-medium">{link.name}</span>
                        </button>
                    ))}
                    
                    <button
                        className="w-full h-12 px-4 rounded-xl flex items-center gap-4 bg-red-500/10 text-red-400 border border-red-500/20 mt-4"
                        onClick={() => { logout(); setIsOpen(false); }}
                    >
                        <LogOut size={18} />
                        <span className="text-lg font-medium">Log out</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavBar;