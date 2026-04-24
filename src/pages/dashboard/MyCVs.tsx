// pages/MyCVs.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, FilePlus2, Star } from "lucide-react";

import DashboardNavBar from "@/layouts/DashboardNavBar";
import { useCreateCVMutation } from "@/redux/features/cv/cvApi";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi";
import toastShow from "@/utils/toastShow";
import { useCVActions } from "@/hooks/useCVActions";
import CVCard from "@/components/dashboard/CVCard";

export default function MyCVs() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("updated-desc");
    const [favoritesOnly, setFavoritesOnly] = useState(false);

    const { data } = useGetDashboardDataQuery({ favoriteOnly: false });
    const [createCV] = useCreateCVMutation();
    const { handleToggleFavorite, handleDelete } = useCVActions();

    // All CVs from the single API — filter/sort client-side
    const allCVs = data?.userCVs || [];

    const filtered = useMemo(() => {
        let list = allCVs.filter((c) =>
            c.title.toLowerCase().includes(query.trim().toLowerCase())
        );

        if (favoritesOnly) {
            list = list.filter((c) => c.isFavorite);
        }

        const [field, direction] = sortBy.split("-");
        list = [...list].sort((a, b) => {
            const av = new Date(a[`${field}At`]).getTime();
            const bv = new Date(b[`${field}At`]).getTime();
            return direction === "asc" ? av - bv : bv - av;
        });

        // Always float favorites to top
        list.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1));

        return list;
    }, [allCVs, query, sortBy, favoritesOnly]);

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
                        <h1 className="text-2xl font-bold text-gray-900">My CVs / Resumes</h1>
                        <p className="text-sm text-gray-500">
                            Manage all your CVs — create, edit, preview and download.
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

                {/* Search + Sort + Filter */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your CVs by name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Favorites toggle */}
                        <button
                            onClick={() => setFavoritesOnly((prev) => !prev)}
                            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                favoritesOnly
                                    ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <Star className="h-5 w-5" />
                            {favoritesOnly ? "Showing Favorites" : "Show Favorites"}
                        </button>

                        {/* Sort */}
                        <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm  focus:border-gray-400">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="outline-none"
                            >
                                <option value="updated-desc">Updated (new → old)</option>
                                <option value="updated-asc">Updated (old → new)</option>
                                <option value="created-desc">Created (new → old)</option>
                                <option value="created-asc">Created (old → new)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                {allCVs.length > 0 && (
                    <p className="mb-4 text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-800">{filtered.length}</span> of{" "}
                        <span className="font-medium text-gray-800">{allCVs.length}</span> CVs
                    </p>
                )}

                {/* Empty state — no CVs at all */}
                {allCVs.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                        <div className="mx-auto mb-4 w-fit rounded-full bg-gray-200 p-4">
                            <FilePlus2 className="h-7 w-7 text-gray-700" />
                        </div>
                        <div className="text-lg font-semibold text-gray-800">No CV created yet</div>
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

                {/* Empty state — no results after filter */}
                {allCVs.length > 0 && filtered.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                        <div className="text-base font-semibold text-gray-800">No CVs match your search</div>
                        <p className="text-sm text-gray-500 mt-1">Try a different name or clear the filters.</p>
                    </div>
                )}

                {/* CV Grid */}
                {filtered.length > 0 && (
                    <div className="flex gap-4 flex-wrap">
                        {filtered.map((cv) => (
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
        </div>
    );
}