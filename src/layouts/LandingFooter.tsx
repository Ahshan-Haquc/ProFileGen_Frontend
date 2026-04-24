
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingFooter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#212a31] text-white py-2 w-full">
        
      <div className=" mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-center md:justify-between  items-center min-h-16 w-full">

          {/* Logo */}
          <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-5">
            <div className="mr-3 md:mr-0" onClick={() => navigate("/")}>
              {/* <img src={config.assets.phoneUILogo} alt="Logo" className="h-full w-full object-contain" /> */}
                ProfileGen sdfsdf
            </div>
            <span className="hidden md:block text-[10px] md:text-xs ">Smart voice agents for your business.</span>
          </div>


          {/* Desktop Menu */}
          <div className="mb-1 flex flex-col md:flex-row items-center gap-1 md:gap-4 2xl:gap-8 text-white text-xs md:text-sm">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Services</Link>
            <Link to="/login">@ 2026 ProfileGen. All rights reserved.</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
