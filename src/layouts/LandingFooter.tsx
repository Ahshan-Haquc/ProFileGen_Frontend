
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const LandingFooter: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <footer className="bg-[#212a31] text-white py-2 w-full">
        
//       <div className=" mx-auto px-4 md:px-10">
//         <div className="flex flex-col md:flex-row justify-center md:justify-between  items-center min-h-16 w-full">

//           {/* Logo */}
//           <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-5">
//             <div className="mr-3 md:mr-0" onClick={() => navigate("/")}>
//               {/* <img src={config.assets.phoneUILogo} alt="Logo" className="h-full w-full object-contain" /> */}
//                 ProfileGen sdfsdf
//             </div>
//             <span className="hidden md:block text-[10px] md:text-xs ">Smart voice agents for your business.</span>
//           </div>


//           {/* Desktop Menu */}
//           <div className="mb-1 flex flex-col md:flex-row items-center gap-1 md:gap-4 2xl:gap-8 text-white text-xs md:text-sm">
//             <Link to="/privacy-policy">Privacy Policy</Link>
//             <Link to="/terms">Terms of Services</Link>
//             <Link to="/login">@ 2026 ProfileGen. All rights reserved.</Link>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

// export default LandingFooter;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const LandingFooter: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#210F37] text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-4">
            <div 
              className="cursor-pointer group w-fit" 
              onClick={() => navigate("/")}
            >
              <h2 className="text-2xl font-black tracking-tight group-hover:text-[#ff8757] transition-colors">
                ProFileGen
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">
                Empowering professionals with AI-driven resume generation and career management tools.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {[Twitter, Github, Linkedin, Mail].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-[#ff8757] hover:text-white transition-all text-gray-400">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#ff8757]">Product</h4>
              <Link to="/templates" className="text-gray-400 hover:text-white transition-colors text-sm">Resume Templates</Link>
              <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing Plans</Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">User Dashboard</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#ff8757]">Support</h4>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} ProFileGen. Built with precision for modern careers.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;