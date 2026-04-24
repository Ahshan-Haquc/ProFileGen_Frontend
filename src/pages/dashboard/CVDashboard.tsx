// pages/Dashboard.jsx
import { useNavigate, NavLink } from "react-router-dom";
import { Plus, BarChart3, Star, Clock3, FilePlus2, ChevronRight } from "lucide-react";

import DashboardNavBar from "@/layouts/DashboardNavBar";
import { useCreateCVMutation } from "@/redux/features/cv/cvApi";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi";
import toastShow from "@/utils/toastShow";
import { useCVActions } from "@/hooks/useCVActions";
import StatCard from "@/components/dashboard/StatCard";
import CVCard from "@/components/dashboard/CVCard";
import TemplateCard from "@/components/dashboard/TemplateCard";

const TEMPLATES = [
    {
        key: "Formal",
        title: "Formal CV",
        gradient: "from-[#4F1C51] to-[#A55B4B]",
        hint: "Clean & ATS-friendly",
        to: "/create?template=formal",
    },
    {
        key: "OneColumn",
        title: "One Column",
        gradient: "from-[#4F1C51] to-[#A55B4B]",
        hint: "Minimal & focused",
        to: "/create?template=one-column",
    },
    {
        key: "Modern",
        title: "Modern CV",
        gradient: "from-[#4F1C51] to-[#A55B4B]",
        hint: "Vibrant & visual",
        to: "/create?template=modern",
    },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { data } = useGetDashboardDataQuery({ favoriteOnly: false });
    const [createCV] = useCreateCVMutation();
    const { handleToggleFavorite, handleDelete } = useCVActions();

    // All CVs from the single API, filter favorites client-side
    const allCVs = data?.userCVs || [];
    const favoriteCVs = allCVs.filter((cv) => cv.isFavorite);

    const total = allCVs.length;
    const favCount = favoriteCVs.length;
    const lastUpdated =
        allCVs.length > 0
            ? new Date(Math.max(...allCVs.map((c) => new Date(c.updatedAt).getTime()))).toLocaleString()
            : "-";

    const createNewCv = async () => {
        try {
            const response = await createCV().unwrap();
            if (response.success) {
                toastShow(response.message, "success");
                navigate(`/home/${response.userCV._id}`);
            } else {
                toastShow(response.message, "error");
            }
        } catch {
            toastShow("Failed to create CV. Please try later.", "error");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <DashboardNavBar />

            <div className="mx-auto min-w-full max-w-7xl px-2 md:px-14 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500">
                            Welcome back! Here's an overview of your CVs.
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-xl bg-[#4F1C51] duration-300 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-black"
                        onClick={createNewCv}
                    >
                        <Plus className="h-5 w-5" />
                        Create New CV
                    </button>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard
                        icon={BarChart3}
                        label="Total CVs"
                        value={total}
                        onClick={() => navigate("/my-cvs")}
                    />
                    <StatCard
                        icon={Star}
                        label="Favorites"
                        value={favCount}
                        onClick={() => navigate("/my-cvs")}
                    />
                    <StatCard
                        icon={Clock3}
                        label="Last Updated"
                        value={lastUpdated}
                        onClick={() => navigate("/my-cvs")}
                    />
                </div>

                {/* Favorite CVs Section */}
                <div className="mb-10">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Favorite CVs
                        </h2>
                        <NavLink
                            to="/my-cvs"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                        >
                            View all CVs <ChevronRight className="h-4 w-4" />
                        </NavLink>
                    </div>

                    {favoriteCVs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                            <div className="mx-auto mb-3 w-fit rounded-full bg-gray-200 p-4">
                                <Star className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="text-base font-semibold text-gray-800">No favorites yet</div>
                            <p className="text-sm text-gray-500 mt-1">
                                Star a CV from{" "}
                                <NavLink to="/my-cvs" className="text-[#4F1C51] underline underline-offset-2">
                                    My CVs
                                </NavLink>{" "}
                                to pin it here.
                            </p>
                        </div>
                    ) : (
                        <div className="flex gap-4 flex-wrap">
                            {favoriteCVs.map((cv) => (
                                <CVCard
                                    key={cv._id}
                                    cv={cv}
                                    onToggleFavorite={handleToggleFavorite}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Templates Section */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Start from a Template</h2>
                        <NavLink
                            to="/templates"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            View all templates →
                        </NavLink>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {TEMPLATES.map((t) => (
                            <TemplateCard key={t.key} t={t} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}