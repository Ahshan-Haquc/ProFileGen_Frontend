// // components/layout/SideBar.jsx
// import { NavLink, useParams } from "react-router-dom";
// import { useSideBarVisible } from "../../context/SideBarShowInPhone";
// import { useUserCV } from "../../context/UserCVContext";
// import {
//     Home,
//     User,
//     FileText,
//     Phone,
//     Wrench,
//     FolderKanban,
//     Briefcase,
//     GraduationCap,
//     Trophy,
//     Activity,
//     UserCheck,
//     Plus,
//     ChevronRight,
//     Layers,
// } from "lucide-react";

// // Each nav item definition
// const buildNavItems = (cvId) => [
//     {
//         label: "Home",
//         to: `/home/${cvId}`,
//         icon: Home,
//         alwaysActive: true,
//     },
//     {
//         label: "Profile",
//         to: `/profile`,
//         icon: User,
//         alwaysActive: true,
//     },
//     {
//         label: "Description",
//         to: `/description`,
//         icon: FileText,
//         alwaysActive: true,
//     },
//     {
//         label: "Contact",
//         to: `/contact`,
//         icon: Phone,
//         alwaysActive: true,
//     },
//     {
//         label: "Skills",
//         to: `/skills`,
//         icon: Wrench,
//         alwaysActive: true,
//     },
//     {
//         label: "Projects",
//         to: `/projects`,
//         icon: FolderKanban,
//         field: "projects",
//     },
//     {
//         label: "Experience",
//         to: `/experience`,
//         icon: Briefcase,
//         field: "experience",
//     },
//     {
//         label: "Education",
//         to: `/education`,
//         icon: GraduationCap,
//         field: "education",
//     },
//     {
//         label: "Achievements",
//         to: `/acheivements`,
//         icon: Trophy,
//         field: "achievement",
//     },
//     {
//         label: "Activities",
//         to: `/activities`,
//         icon: Activity,
//         field: "activities",
//     },
//     {
//         label: "Reference",
//         to: `/reference`,
//         icon: UserCheck,
//         field: "reference",
//     },
//     {
//         label: "New Section",
//         to: `/addSection`,
//         icon: Plus,
//         alwaysActive: true,
//     },
// ];

// function SideBarItem({ item, hasContent }) {
//     const isActive = item.alwaysActive || hasContent;

//     return (
//         <NavLink
//             to={item.to}
//             className={({ isActive: routeActive }) => {
//                 const base =
//                     "group relative flex items-center gap-3 px-4 py-2.5 rounded-lg mx-3 my-0.5 text-sm font-medium transition-all duration-200";

//                 if (routeActive) {
//                     return `${base} bg-white/15 text-white shadow-sm border-l-2 border-[#f4a261]`;
//                 }
//                 if (isActive) {
//                     return `${base} text-white/80 hover:bg-white/10 hover:text-white`;
//                 }
//                 // Inactive (empty array)
//                 return `${base} text-white/30 hover:bg-white/5 hover:text-white/50`;
//             }}
//         >
//             {({ isActive: routeActive }) => (
//                 <>
//                     {/* Icon */}
//                     <span
//                         className={`flex-shrink-0 transition-all duration-200 ${
//                             routeActive
//                                 ? "text-[#f4a261]"
//                                 : isActive
//                                 ? "text-white/70 group-hover:text-white"
//                                 : "text-white/25 group-hover:text-white/40"
//                         }`}
//                     >
//                         <item.icon size={17} />
//                     </span>

//                     {/* Label */}
//                     <span className="flex-1 truncate">{item.label}</span>

//                     {/* Right indicator */}
//                     {routeActive ? (
//                         <ChevronRight size={14} className="text-[#f4a261] opacity-80" />
//                     ) : !isActive ? (
//                         <span
//                             className="flex-shrink-0 flex items-center gap-1 text-[10px] text-white/35 
//                                        group-hover:text-white/50 transition-colors"
//                             title="Add content to activate"
//                         >
//                             <Plus size={10} />
//                             Add
//                         </span>
//                     ) : null}

//                     {/* Active dot for populated sections */}
//                     {isActive && !item.alwaysActive && !routeActive && (
//                         <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-70" />
//                     )}
//                 </>
//             )}
//         </NavLink>
//     );
// }

// const SideBar = () => {
//     const { isSideBarVisible } = useSideBarVisible();
//     const { userCV } = useUserCV();
//     const { cvId } = useParams();

//     const navItems = buildNavItems(cvId);

//     // Count how many array sections have content
//     const arrayFields = ["projects", "experience", "education", "achievement", "activities", "reference", "otherSection"];
//     const filledCount = arrayFields.filter(f => userCV?.[f]?.length > 0).length;

//     return (
//         <>
//             {/* Overlay for mobile */}
//             {isSideBarVisible && (
//                 <div
//                     className="fixed inset-0 bg-black/40 z-20 lg:hidden"
//                     onClick={() => {}} // close on overlay click if desired
//                 />
//             )}

//             {/* Sidebar spacer (keeps layout stable on desktop) */}
//             <div
//                 className={`flex-shrink-0 transition-all duration-300 ${
//                     isSideBarVisible ? "w-[240px]" : "w-0"
//                 } hidden lg:block`}
//             />

//             {/* Sidebar panel */}
//             <aside
//                 className={`
//                     fixed top-16 left-0 bottom-0 z-30 w-[240px]
//                     bg-gradient-to-b from-[#2a0f2e] via-[#1e0b22] to-[#170819]
//                     border-r border-white/5
//                     flex flex-col
//                     transition-transform duration-300 ease-in-out
//                     overflow-hidden
//                     ${isSideBarVisible ? "translate-x-0" : "-translate-x-full"}
//                 `}
//             >
//                 {/* Header strip */}
//                 <div className="px-4 py-4 border-b border-white/8">
//                     <div className="flex items-center gap-2.5">
//                         <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f4a261] to-[#e76f51] flex items-center justify-center shadow">
//                             <Layers size={15} className="text-white" />
//                         </div>
//                         <div>
//                             <div className="text-xs font-semibold text-white/90 leading-tight">CV Editor</div>
//                             <div className="text-[10px] text-white/40 leading-tight truncate max-w-[140px]">
//                                 {userCV?.title || "Untitled CV"}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Progress indicator */}
//                     <div className="mt-3">
//                         <div className="flex justify-between items-center mb-1">
//                             <span className="text-[10px] text-white/40">Sections filled</span>
//                             <span className="text-[10px] text-white/60 font-medium">{filledCount}/{arrayFields.length}</span>
//                         </div>
//                         <div className="h-1 rounded-full bg-white/10">
//                             <div
//                                 className="h-1 rounded-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] transition-all duration-500"
//                                 style={{ width: `${(filledCount / arrayFields.length) * 100}%` }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Nav items */}
//                 <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//                     {/* Always-active section label */}
//                     <div className="px-4 mb-1 mt-1">
//                         <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
//                             General
//                         </span>
//                     </div>
//                     {navItems.filter(i => i.alwaysActive && i.label !== "New Section").map((item) => (
//                         <SideBarItem
//                             key={item.label}
//                             item={item}
//                             hasContent={true}
//                         />
//                     ))}

//                     {/* Dynamic sections label */}
//                     <div className="px-4 mt-4 mb-1">
//                         <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
//                             Sections
//                         </span>
//                     </div>
//                     {navItems.filter(i => i.field).map((item) => (
//                         <SideBarItem
//                             key={item.label}
//                             item={item}
//                             hasContent={userCV?.[item.field]?.length > 0}
//                         />
//                     ))}

//                     {/* Add section */}
//                     <div className="px-4 mt-4 mb-1">
//                         <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
//                             Customize
//                         </span>
//                     </div>
//                     {navItems.filter(i => i.label === "New Section").map((item) => (
//                         <SideBarItem key={item.label} item={item} hasContent={true} />
//                     ))}
//                 </nav>

//                 {/* Bottom legend */}
//                 <div className="px-4 py-3 border-t border-white/8">
//                     <div className="flex items-center gap-3 text-[10px] text-white/30">
//                         <span className="flex items-center gap-1">
//                             <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
//                             Has content
//                         </span>
//                         <span className="flex items-center gap-1">
//                             <span className="h-1.5 w-1.5 rounded-full bg-white/20 inline-block" />
//                             Empty
//                         </span>
//                     </div>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default SideBar;


// components/layout/SideBar.jsx
import { NavLink, useParams } from "react-router-dom";
import { useSideBarVisible } from "../../context/SideBarShowInPhone";
import { useUserCV } from "../../context/UserCVContext";
import {
    Home,
    User,
    FileText,
    Phone,
    Wrench,
    FolderKanban,
    Briefcase,
    GraduationCap,
    Trophy,
    Activity,
    UserCheck,
    Plus,
    ChevronRight,
    Layers,
    BookOpen,
} from "lucide-react";

// Each nav item definition
const buildNavItems = (cvId) => [
    {
        label: "Home",
        to: `/home/${cvId}`,
        icon: Home,
        alwaysActive: true,
    },
    {
        label: "Profile",
        to: `/profile`,
        icon: User,
        alwaysActive: true,
    },
    {
        label: "Description",
        to: `/description`,
        icon: FileText,
        alwaysActive: true,
    },
    {
        label: "Contact",
        to: `/contact`,
        icon: Phone,
        alwaysActive: true,
    },
    {
        label: "Skills",
        to: `/skills`,
        icon: Wrench,
        alwaysActive: true,
    },
    {
        label: "Projects",
        to: `/projects`,
        icon: FolderKanban,
        field: "projects",
    },
    {
        label: "Experience",
        to: `/experience`,
        icon: Briefcase,
        field: "experience",
    },
    {
        label: "Education",
        to: `/education`,
        icon: GraduationCap,
        field: "education",
    },
    {
        label: "Achievements",
        to: `/acheivements`,
        icon: Trophy,
        field: "achievement",
    },
    {
        label: "Activities",
        to: `/activities`,
        icon: Activity,
        field: "activities",
    },
    {
        label: "Reference",
        to: `/reference`,
        icon: UserCheck,
        field: "reference",
    },
    {
        label: "New Section",
        to: `/addSection`,
        icon: Plus,
        alwaysActive: true,
    },
];

function SideBarItem({ item, hasContent }) {
    const isActive = item.alwaysActive || hasContent;

    return (
        <NavLink
            to={item.to}
            className={({ isActive: routeActive }) => {
                const base =
                    "group relative flex items-center gap-3 px-4 py-2.5 rounded-lg mx-3 my-0.5 text-sm font-medium transition-all duration-200";

                if (routeActive) {
                    return `${base} bg-white/15 text-white shadow-sm border-l-2 border-[#f4a261]`;
                }
                if (isActive) {
                    return `${base} text-white/80 hover:bg-white/10 hover:text-white`;
                }
                // Inactive (empty array)
                return `${base} text-white/30 hover:bg-white/5 hover:text-white/50`;
            }}
        >
            {({ isActive: routeActive }) => (
                <>
                    {/* Icon */}
                    <span
                        className={`flex-shrink-0 transition-all duration-200 ${
                            routeActive
                                ? "text-[#f4a261]"
                                : isActive
                                ? "text-white/70 group-hover:text-white"
                                : "text-white/25 group-hover:text-white/40"
                        }`}
                    >
                        <item.icon size={17} />
                    </span>

                    {/* Label */}
                    <span className="flex-1 truncate">{item.label}</span>

                    {/* Right indicator */}
                    {routeActive ? (
                        <ChevronRight size={14} className="text-[#f4a261] opacity-80" />
                    ) : !isActive ? (
                        <span
                            className="flex-shrink-0 flex items-center gap-1 text-[10px] text-white/35 
                                       group-hover:text-white/50 transition-colors"
                            title="Add content to activate"
                        >
                            <Plus size={10} />
                            Add
                        </span>
                    ) : null}

                    {/* Active dot for populated sections */}
                    {isActive && !item.alwaysActive && !routeActive && (
                        <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-70" />
                    )}
                </>
            )}
        </NavLink>
    );
}

const SideBar = () => {
    const { isSideBarVisible } = useSideBarVisible();
    const { userCV } = useUserCV();
    const { cvId } = useParams();

    const navItems = buildNavItems(cvId);

    // Count how many array sections have content
    const arrayFields = ["projects", "experience", "education", "achievement", "activities", "reference", "otherSection"];
    const filledCount = arrayFields.filter(f => userCV?.[f]?.length > 0).length;

    return (
        <>
            {/* Overlay for mobile */}
            {isSideBarVisible && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => {}} // close on overlay click if desired
                />
            )}

            {/* Sidebar spacer (keeps layout stable on desktop) */}
            <div
                className={`flex-shrink-0 transition-all duration-300 ${
                    isSideBarVisible ? "w-[240px]" : "w-0"
                } hidden lg:block`}
            />

            {/* Sidebar panel */}
            <aside
                className={`
                    fixed top-0 left-0 bottom-0 z-30 w-[240px]
                    bg-gradient-to-b from-[#2a0f2e] via-[#1e0b22] to-[#170819]
                    border-r border-white/5
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    overflow-hidden
                    ${isSideBarVisible ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header strip */}
                <div className="px-4 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f4a261] to-[#e76f51] flex items-center justify-center shadow">
                            <Layers size={15} className="text-white" />
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-white/90 leading-tight">CV Editor</div>
                            <div className="text-[10px] text-white/40 leading-tight truncate max-w-[140px]">
                                {userCV?.title || "Untitled CV"}
                            </div>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-white/40">Sections filled</span>
                            <span className="text-[10px] text-white/60 font-medium">{filledCount}/{arrayFields.length}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/10">
                            <div
                                className="h-1 rounded-full bg-gradient-to-r from-[#f4a261] to-[#e76f51] transition-all duration-500"
                                style={{ width: `${(filledCount / arrayFields.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Always-active section label */}
                    <div className="px-4 mb-1 mt-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                            General
                        </span>
                    </div>
                    {navItems.filter(i => i.alwaysActive && i.label !== "New Section").map((item) => (
                        <SideBarItem
                            key={item.label}
                            item={item}
                            hasContent={true}
                        />
                    ))}

                    {/* Dynamic sections label */}
                    <div className="px-4 mt-4 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                            Sections
                        </span>
                    </div>
                    {navItems.filter(i => i.field).map((item) => (
                        <SideBarItem
                            key={item.label}
                            item={item}
                            hasContent={userCV?.[item.field]?.length > 0}
                        />
                    ))}

                    

                    {/* Custom sections — only shown if user has created any */}
                    {userCV?.otherSection?.length > 0 && (
                        <>
                            <div className="px-4 mt-4 mb-1 flex items-center justify-between">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                                    My Sections
                                </span>
                                <span className="text-[10px] text-white/25 font-medium">
                                    {userCV.otherSection.length}
                                </span>
                            </div>
                            {userCV.otherSection.map((section) => (
                                <NavLink
                                    key={section.sectionName}
                                    to={`/addSection?section=${encodeURIComponent(section.sectionName)}`}
                                    className={({ isActive: routeActive }) => {
                                        const base =
                                            "group flex items-center gap-3 px-4 py-2.5 rounded-lg mx-3 my-0.5 text-sm font-medium transition-all duration-200";
                                        return routeActive
                                            ? `${base} bg-white/15 text-white shadow-sm border-l-2 border-[#f4a261]`
                                            : `${base} text-white/80 hover:bg-white/10 hover:text-white`;
                                    }}
                                >
                                    {({ isActive: routeActive }) => (
                                        <>
                                            {/* Icon */}
                                            <span className={`flex-shrink-0 transition-colors duration-200 ${
                                                routeActive ? "text-[#f4a261]" : "text-white/70 group-hover:text-white"
                                            }`}>
                                                <BookOpen size={17} />
                                            </span>

                                            {/* Section name */}
                                            <span className="flex-1 truncate">{section.sectionName}</span>

                                            {/* Value count badge */}
                                            {section.sectionValues?.length > 0 && (
                                                <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-colors ${
                                                    routeActive
                                                        ? "bg-[#f4a261]/20 text-[#f4a261]"
                                                        : "bg-white/10 text-white/40 group-hover:bg-white/15 group-hover:text-white/60"
                                                }`}>
                                                    {section.sectionValues.length}
                                                </span>
                                            )}

                                            {routeActive && (
                                                <ChevronRight size={14} className="text-[#f4a261] opacity-80 flex-shrink-0" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </>
                    )}

                    {/* Add section */}
                    <div className="px-4 mt-4 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                            Customize
                        </span>
                    </div>
                    {navItems.filter(i => i.label === "New Section").map((item) => (
                        <SideBarItem key={item.label} item={item} hasContent={true} />
                    ))}
                </nav>

                {/* Bottom legend */}
                <div className="px-4 py-3 border-t border-white/8">
                    <div className="flex items-center gap-3 text-[10px] text-white/30">
                        <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                            Has content
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20 inline-block" />
                            Empty
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;