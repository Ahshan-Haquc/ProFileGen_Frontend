import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Plus,
    Search,
    Filter,
    Star,
    StarOff,
    Edit,
    Eye,
    Download,
    Trash2,
    FileText,
    FilePlus2,
    Sparkles,
    BarChart3,
    Clock3,
    ChevronRight,
} from "lucide-react";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import { MdLightMode } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import toastShow from "../utils/toastShow";
import { useEffect } from "react";
import { useAuthUser } from "../context/AuthContext";

const templates = [
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

function StatCard({ icon: Icon, label, value, clickToHandle }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:cursor-pointer transition" onClick={clickToHandle}>
            <div className="rounded-lg bg-purple-100 p-3">
                <Icon className="h-6 w-6 text-gray-700" />
            </div>
            <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-xl font-semibold text-gray-900">{value}</div>
            </div>
        </div>
    );
}

function TemplateCard({ t }) {
    return (
        <NavLink
            to={t.to}
            className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition`}
        >
            <div
                className={`h-28 w-full p-3 md:p-5 bg-gradient-to-tr ${t.gradient} opacity-90 flex justify-start items-end rounded-xl `}
            >
                <i className="fas fa-file-alt text-white text-5xl"></i>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-semibold text-gray-900">
                            {t.title}
                        </div>
                        <div className="text-sm text-gray-500">{t.hint}</div>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-0.5 transition" />
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

function CVCard({ cv, onToggleFavorite, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(cv.title);
    const [loading, setLoading] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTitle(cv.title); // reset to original
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!title.trim() || title === cv.title) {
            setIsEditing(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.patch("/updateUserCvTitle", {
                cvId: cv._id,
                newTitle: title.trim(),
            });

            if (response.data.success) {
                toastShow(response.data.message, "success");
            } else {
                toastShow(response.data.message, "error");
            }
        } catch (error) {
            console.error("Error updating CV title:", error);
            toastShow("Failed to update CV title", "error");
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="relative min-w-[420px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition">
            {/* Top row */}
            <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-3">
                        <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 ">
                            <input
                                type="text"
                                value={title}
                                disabled={!isEditing}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-fit ${isEditing
                                    ? "border border-gray-300 rounded-md"
                                    : "bg-transparent cursor-default"
                                    }`}
                            />

                            {isEditing && (
                                <>
                                    <button
                                        className="bg-gray-200 mx-2 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Submit"}
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="text-xs text-gray-500">Template: All Permitted</div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {!isEditing && (
                        <button
                            className="rounded-full p-2 hover:bg-gray-100 hover:cursor-pointer"
                            title="Change Title Name"
                            onClick={handleEditClick}
                        >
                            <Edit className="h-5 w-5 text-gray-400 " />
                        </button>
                    )}
                    <button
                        onClick={() => onToggleFavorite(cv._id)}
                        className="rounded-full p-2 hover:bg-gray-100 hover:cursor-pointer"
                        title={cv.isFavorite ? "Unfavorite" : "Favorite"}
                    >
                        {cv.isFavorite ? (
                            <Star className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <StarOff className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            {/* Meta */}
            <div className="mb-4 text-xs text-gray-500">
                <div>Created: {new Date(cv.createdAt).toLocaleDateString()}</div>
                <div>Updated: {new Date(cv.updatedAt).toLocaleString()}</div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Edit className="h-4 w-4" />
                    Edit
                </NavLink>

                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Eye className="h-4 w-4" />
                    Preview
                </NavLink>

                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Download className="h-4 w-4" />
                    Download
                </NavLink>

                <button
                    onClick={() => onDelete(cv._id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#4F1C51] duration-400 px-3 py-2 text-sm font-medium text-white hover:bg-black"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default function CVDashboard() {
    const navigate = useNavigate()

    // Replace with your fetched list + setState, Alhamdulillah all working
    const [cvs, setCvs] = useState([]);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("updated-desc"); // "created-asc" | "created-desc" | "updated-asc" | "updated-desc"

    useEffect(() => {
        console.log("use effect runnig");
        const fetchDashboardData = async () => {
            try {
                const response = await axiosInstance.get('/fetchUserDashboardData')
                if (response.data.success) {
                    setCvs(response.data.userCVs);
                }
            } catch (error) {
                toastShow("Dashboard data fetch failed", "error")
            }
        }
        fetchDashboardData()
    }, [])

    // Derived stats
    const total = cvs.length;
    const favorites = cvs.filter((c) => c.isFavorite).length;
    const lastUpdated =
        cvs.length > 0
            ? new Date(
                Math.max(...cvs.map((c) => new Date(c.updatedAt).getTime()))
            ).toLocaleString()
            : "-";

    const filtered = useMemo(() => {
        let list = cvs.filter((c) =>
            c.title.toLowerCase().includes(query.trim().toLowerCase())
        );
        const [field, direction] = sortBy.split("-");
        list.sort((a, b) => {
            const av = new Date(a[`${field}At`]).getTime();
            const bv = new Date(b[`${field}At`]).getTime();
            return direction === "asc" ? av - bv : bv - av;
        });
        // show favorites first for a nice UX
        list.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1));
        return list;
    }, [cvs, query, sortBy]);

    //logout user
    const { setUser } = useAuthUser();
    const logout = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/userLogout`, {
            method: "GET",
            credentials: "include",
        });
        if (res.status === 200) {
            setUser(null); // update context
            navigate("/login");
        } else {
            toastShow("Logout unsuccessful", "error");
        }
    };

    // Handlers
    const handleToggleFavorite = async (id) => {
        try {
            const response = await axiosInstance.patch(`/toggleFavorite/${id}`)
            if (response.data.success) {
                setCvs(response.data.userCVs);
                toastShow(response.data.message, "success");
            } else {
                toastShow(response.data.message, "error");
            }
        } catch (error) {
            toastShow("Not deleted. Please try later!")
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this CV? This action cannot be undone.")) return;

        try {
            const response = await axiosInstance.delete(`/deleteUserCv/${id}`)
            if (response.data.success) {
                setCvs(response.data.userCVs);
                toastShow(response.data.message, "success");
            } else {
                toastShow(response.data.message, "error");
            }
        } catch (error) {
            toastShow("Not deleted. Please try later!", "error")
        }
    };

    const showFavoriteCVs = async () => {
        try {
            const response = await axiosInstance.get("/fetchFavoriteCVsOnly")
            if (response.data.success) {
                setCvs(response.data.userCVs);
            } else {
                toastShow("Something wrong, Please try later!", "error");
            }
        } catch (error) {
            toastShow("Not fetched your favorite cvs. Please try later!", "error")
        }
    }

    const showAllCVs = async () => {
        try {
            const response = await axiosInstance.get('/fetchUserDashboardData')
            if (response.data.success) {
                setCvs(response.data.userCVs);
            }
        } catch (error) {
            toastShow("Dashboard data fetch failed", "error")
        }
    }

    const createNewCv = async () => {
        try {
            const response = await axiosInstance.get('/createUserNewCv');
            console.log("response is : ", response);
            if (response.data.success) {
                toastShow(response.data.message, "success");
                navigate(`/home/${response.data.userCV._id}`)
            } else {
                toastShow(response.data.message, "error");
            }
        } catch (error) {
            console.log(error);
            toastShow(response.data.message, "error");
        }
    }

    return (
        <div className="flex flex-col w-full">
            {/* navbar  */}
            <div className="w-full h-16 bg-[#210F37]  text-white px-2 md:px-14 py-3 flex justify-between items-center">
                {/* Professional Profile Generator */}
                <div className="flex justify-center items-center">
                    <div className="">
                        <div className="text-xl md:text-3xl font-bold">ProFileGen</div>
                        <div className="text-[12px] font-normal text-gray-300">Dashboard</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        className=" h-10 w-10 rounded-full hover:bg-[#ff8757] hover:cursor-pointer duration-500 flex justify-center items-center"
                    >
                        <MdLightMode size={20} />
                    </button>
                    <button
                        className=" h-10 w-10 rounded-full hover:bg-[#ff8757] hover:cursor-pointer duration-500 flex justify-center items-center"
                        onClick={logout}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </div>
            {/* main content  */}
            <div className="mx-auto min-w-full max-w-7xl px-2 md:px-14 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My CVs / Resumes</h1>
                        <p className="text-sm text-gray-500">
                            Manage all your CVs in one place — create, edit, preview and
                            download.
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
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard icon={BarChart3} label="Total CVs" value={total} clickToHandle={showAllCVs} />
                    <StatCard icon={Star} label="Favorites" value={favorites} clickToHandle={showFavoriteCVs} />
                    <StatCard icon={Clock3} label="Last Updated" value={lastUpdated} />
                </div>

                {/* Search + Sort */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your CVs by name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="updated-desc">Sort: Updated (new → old)</option>
                            <option value="updated-asc">Sort: Updated (old → new)</option>
                            <option value="created-desc">Sort: Created (new → old)</option>
                            <option value="created-asc">Sort: Created (old → new)</option>
                        </select>
                    </div>
                </div>

                {/* Empty state */}
                {cvs.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                        <div className="mx-auto mb-4 w-fit rounded-full bg-gray-200 p-4">
                            <FilePlus2 className="h-7 w-7 text-gray-700" />
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            No CV created yet
                        </div>
                        <div className="mb-6 text-sm text-gray-500">
                            Click the button below to start your first CV.
                        </div>
                        <button
                            onClick={createNewCv}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#4F1C51] px-4 py-2.5 font-medium text-white hover:bg-black"
                        >
                            <Plus className="h-5 w-5" />
                            Create New CV
                        </button>
                    </div>
                )}

                {/* CV Grid */}
                {cvs.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {filtered.map((cv, index) => (
                            <CVCard
                                key={index}
                                cv={cv}
                                onToggleFavorite={handleToggleFavorite}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {/* Templates Section */}
                <div className="mt-10">
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
                        {templates.map((t) => (
                            <TemplateCard key={t.key} t={t} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
