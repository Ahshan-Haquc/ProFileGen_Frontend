import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import CommonWrapper from "../commonComponents/CommonWrapper";

const LandingNavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Change background on scroll for better readability
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Resume Help", href: "/blog" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" 
                : "bg-transparent"
            }`}
        >
            <CommonWrapper className="!py-0">
                <div className="flex items-center justify-between h-16 md:h-20">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-[#210F37] p-1.5 rounded-lg group-hover:bg-[#4F1C51] transition-colors">
                            <Sparkles className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#210F37] tracking-tight">
                            Profile<span className="text-[#A55B4B]">Gen</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm md:text-base font-medium text-[#210F37]/80 hover:text-[#4F1C51] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost" className="text-[#210F37] text-sm md:text-base font-medium hover:bg-[#DCA06D]/10">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-[#210F37] hover:bg-[#4F1C51] text-white px-6 py-6 text-sm md:text-base rounded-full shadow-lg transition-transform active:scale-95">
                                Build My Resume
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#210F37] p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </CommonWrapper>

            {/* Mobile Menu Overlay */}
            <div
                className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="flex flex-col p-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-semibold text-[#210F37] py-2 border-b border-gray-50"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full border-[#DCA06D] text-[#A55B4B]">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-[#4F1C51] text-white">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavBar;