// import { useState } from "react";
// import { useAuthUser } from "@/context/AuthContext";
// import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
// import toastShow from "@/utils/toastShow";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, LogOut, LayoutDashboard, FileText, CreditCard } from "lucide-react";
// import { useGetCurrentSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";

// const DashboardNavBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [logoutUser] = useLogoutUserMutation();
//     const {data} = useGetCurrentSubscriptionQuery();
//     console.log("pricing data info are :",data);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { setUser } = useAuthUser();

//     const toggleMenu = () => setIsOpen(!isOpen);

//     const logout = async () => {
//         try {
//             await logoutUser().unwrap();
//             setUser(null);
//             navigate("/login");
//         } catch (error) {
//             toastShow("Logout unsuccessful", "error");
//         }
//     };

//     const navLinks = [
//         { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
//         { name: "My CVs", path: "/my-cvs", icon: <FileText size={18} /> },
//         { name: "Pricing", path: "/my-pricing", icon: <CreditCard size={18} /> },
//     ];

//     return (
//         <nav className="relative w-full h-16 lg:h-20 bg-[#210F37] text-white px-6 md:px-14 flex justify-between items-center z-50">
//             {/* Logo Section */}
//             <div 
//                 className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity" 
//                 onClick={() => navigate("/dashboard")}
//             >
//                 <span className="text-xl md:text-2xl font-black tracking-tight">ProFileGen</span>
//                 <span className="text-[10px] uppercase tracking-widest font-medium text-gray-400 -mt-1">Dashboard</span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-2">
//                 {navLinks.map((link) => (
//                     <button
//                         key={link.path}
//                         onClick={() => navigate(link.path)}
//                         className={`h-10 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 ${
//                             location.pathname === link.path 
//                             ? "text-[#ff8757] " 
//                             : "hover:bg-white/10 text-gray-300 hover:text-white"
//                         }`}
//                     >
//                         {link.icon}
//                         <span className="font-medium">{link.name}</span>
//                     </button>
//                 ))}
                
//                 <div className="w-[1px] h-6 bg-gray-700 mx-2" />

//                 <button
//                     className="h-10 px-4 rounded-lg border border-gray-300 text-gray-300 hover:bg-[#ff8757] hover:text-white hover:border-[#ff8757] transition-all duration-300 flex items-center gap-2 font-medium"
//                     onClick={logout}
//                 >
//                     <LogOut size={18} />
//                     Log out
//                 </button>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <div className="lg:hidden">
//                 <button onClick={toggleMenu} className="p-2 text-gray-300 hover:text-white transition-colors">
//                     {isOpen ? <X size={28} /> : <Menu size={28} />}
//                 </button>
//             </div>

//             {/* Mobile Sidebar Overlay */}
//             <div className={`fixed inset-0 bg-[#210F37] transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden top-16 z-40 px-6 pt-10`}>
//                 <div className="flex flex-col gap-4">
//                     {navLinks.map((link) => (
//                         <button
//                             key={link.path}
//                             onClick={() => { navigate(link.path); setIsOpen(false); }}
//                             className="w-full h-12 px-4 rounded-xl flex items-center gap-4 bg-white/5 hover:bg-[#ff8757] transition-all"
//                         >
//                             {link.icon}
//                             <span className="text-lg font-medium">{link.name}</span>
//                         </button>
//                     ))}
                    
//                     <button
//                         className="w-full h-12 px-4 rounded-xl flex items-center gap-4 bg-red-500/10 text-red-400 border border-red-500/20 mt-4"
//                         onClick={() => { logout(); setIsOpen(false); }}
//                     >
//                         <LogOut size={18} />
//                         <span className="text-lg font-medium">Log out</span>
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default DashboardNavBar;

import { useState } from "react";
import { useAuthUser } from "@/context/AuthContext";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import toastShow from "@/utils/toastShow";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, FileText, CreditCard, Zap } from "lucide-react";
import { useGetCurrentSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";

const DashboardNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const { data } = useGetCurrentSubscriptionQuery();

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
        { name: "Pricing", path: "/my-pricing", icon: <CreditCard size={18} /> },
    ];

    const subscription = data?.subscription;
    const plan = subscription?.plan || "starter";
    const cvLimit = subscription?.cvLimit || 0;
    const cvUsed = subscription?.cvUsed || 0;
    const remaining = Math.max(cvLimit - cvUsed, 0);

    const planConfig = {
        starter: {
            label: "Starter",
            color: "from-gray-400/20 to-gray-500/20 text-gray-300 border-gray-500/30",
        },
        pro: {
            label: "Pro Plan",
            color: "from-[#DCA06D]/20 to-[#ff8757]/20 text-[#ff8757] border-[#ff8757]/30",
        },
        elite: {
            label: "Elite",
            color: "from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30",
        },
    };

    return (
        <nav className="relative w-full h-16 lg:h-20 bg-[#210F37] text-white px-6 md:px-14 flex justify-between items-center z-50 shadow-xl">
            {/* Logo Section */}
            <div 
                className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => navigate("/dashboard")}
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
                            ? "text-[#ff8757] bg-white/5" 
                            : "hover:bg-white/10 text-gray-300 hover:text-white"
                        }`}
                    >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                    </button>
                ))}
                
                <div className="w-[1px] h-6 bg-gray-700 mx-4" />

                {/* ✅ IMPROVED Subscription Info */}
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full bg-gradient-to-r border ${planConfig[plan]?.color} transition-all`}>
                    <div className="flex items-center gap-1.5">
                        <Zap size={14} className="fill-current" />
                        <span className="text-[11px] font-black uppercase tracking-wider">
                            {planConfig[plan]?.label}
                        </span>
                    </div>
                    <div className="w-[1px] h-3 bg-current opacity-30" />
                    <span className="text-xs font-medium whitespace-nowrap">
                        <span className="font-bold">{remaining}</span> CVs left
                    </span>
                </div>

                <button
                    className="ml-2 h-10 px-4 rounded-lg border border-gray-600 text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all duration-300 flex items-center gap-2 font-medium"
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

                    {/* ✅ IMPROVED Mobile Subscription Info */}
                    <div className={`w-full px-5 py-4 rounded-2xl bg-gradient-to-br border ${planConfig[plan]?.color} flex justify-between items-center shadow-lg`}>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Current Plan</span>
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="fill-current" />
                                <span className="text-lg font-bold">{planConfig[plan]?.label}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-black">{remaining}</span>
                            <p className="text-[10px] uppercase font-bold opacity-70">Credits Left</p>
                        </div>
                    </div>

                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => { navigate(link.path); setIsOpen(false); }}
                            className="w-full h-14 px-5 rounded-2xl flex items-center gap-4 bg-white/5 border border-white/5 hover:bg-[#ff8757]/10 hover:border-[#ff8757]/30 transition-all group"
                        >
                            <span className="text-gray-400 group-hover:text-[#ff8757] transition-colors">{link.icon}</span>
                            <span className="text-lg font-medium">{link.name}</span>
                        </button>
                    ))}
                    
                    <button
                        className="w-full h-14 px-5 rounded-2xl flex items-center gap-4 bg-red-500/5 text-red-400/80 border border-red-500/10 mt-4"
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