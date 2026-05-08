import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Map } from "lucide-react";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FB] px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#ff8757]/5 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#210F37]/5 blur-[120px]" />

            <div className="max-w-2xl w-full text-center z-10">
                {/* Large Stylized 404 */}
                <div className="relative inline-block">
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-[#210F37]/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(33,15,55,0.1)] border border-gray-100">
                            <Map className="w-16 h-16 text-[#ff8757] animate-bounce" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="mt-12">
                    <h2 className="text-4xl font-black text-[#210F37] tracking-tight">
                        You've drifted into <span className="text-[#ff8757]">unknown space.</span>
                    </h2>
                    <p className="text-gray-500 mt-4 text-lg max-w-md mx-auto leading-relaxed">
                        The page you are looking for has been moved, deleted, or perhaps never existed in this dimension.
                    </p>
                </div>

                {/* Primary Action */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#210F37] text-white font-bold shadow-xl shadow-[#210F37]/20 hover:bg-[#ff8757] hover:shadow-[#ff8757]/20 transition-all duration-300 group"
                    >
                        <Home size={20} />
                        Back to Dashboard
                        <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>

                {/* Quick Help Links */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Useful Links</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-[#210F37]/60">
                        <button onClick={() => navigate("/templates")} className="hover:text-[#ff8757] transition-colors">Resume Templates</button>
                        <button onClick={() => navigate("/help")} className="hover:text-[#ff8757] transition-colors">Help Center</button>
                        <button onClick={() => navigate("/pricing")} className="hover:text-[#ff8757] transition-colors">Pricing</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;