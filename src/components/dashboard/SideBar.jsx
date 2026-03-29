import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="min-h-full max-h-fit min-w-[250px]" >
      <div className="h-full min-w-[250px] bg-[#4F1C51] pb-6 shadow-lg border-r border-gray-200 fixed  left-0 overflow-y-scroll"> {/* Added shadow and subtle border to the sidebar itself */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-black shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-home mr-3 text-xl"></i> {/* Increased icon size slightly */}
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-user mr-3 text-xl"></i>
          Your Profile
        </NavLink>
        <NavLink
          to="/description"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-align-left mr-3 text-xl"></i>
          Description
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-address-book mr-3 text-xl"></i> {/* Changed icon for contact */}
          Contact
        </NavLink>
        <NavLink
          to="/skills"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-tools mr-3 text-xl"></i>
          Skills
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-tasks mr-3 text-xl"></i>
          Projects
        </NavLink>
        <NavLink
          to="/experience"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-briefcase mr-3 text-xl"></i>
          Experience
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-graduation-cap mr-3 text-xl"></i>
          Education
        </NavLink>
        <NavLink
          to="/acheivements"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-trophy mr-3 text-xl"></i>
          Achievements
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-running mr-3 text-xl"></i> {/* Changed icon for activities */}
          Activities
        </NavLink>
        <NavLink
          to="/reference"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fas fa-user-tie mr-3 text-xl"></i> {/* Changed icon for reference */}
          Reference
        </NavLink>
        <NavLink
          to="/addSection"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fa-solid fa-plus mr-3 text-xl"></i> {/* Changed icon for reference */}
          New Section
        </NavLink>
        <NavLink
          to="/gsdt"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-white text-lg font-medium rounded-md mx-2 my-1
           transition-colors duration-200 ease-in-out
           ${isActive ? "bg-[#A55B4B] text-white shadow-md" : "hover:bg-[#A55B4B]"}`
          }
        >
          <i className="fa-solid fa-plus mr-3 text-xl"></i> {/* Changed icon for reference */}
          New Section2
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;