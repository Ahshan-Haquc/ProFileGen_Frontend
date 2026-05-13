// components/cv/CVCard.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FileText, Edit, Eye, Download, Trash2, Star, StarOff } from "lucide-react";
import { useUpdateCVTitleMutation } from "../../redux/features/cv/cvApi";
import toastShow from "../../utils/toastShow";

export default function CVCard({ cv, onToggleFavorite, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(cv.title);
    const [loading, setLoading] = useState(false);
    const [updateCVTitle] = useUpdateCVTitleMutation();

    const handleCancel = () => {
        setTitle(cv.title);
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!title.trim() || title === cv.title) {
            setIsEditing(false);
            return;
        }
        try {
            setLoading(true);
            const response = await updateCVTitle({ cvId: cv._id, newTitle: title.trim() }).unwrap();
            if (response.success) toastShow(response.message, "success");
            else toastShow(response.message, "error");
        } catch {
            toastShow("Failed to update CV title", "error");
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="relative min-w-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition">
            {/* Top row */}
            <div className="mb-3 flex  items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-3">
                        <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">
                            <input
                                type="text"
                                value={title}
                                disabled={!isEditing}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-fit ${isEditing ? "border border-gray-300 rounded-md px-1" : "bg-transparent cursor-default"}`}
                            />
                            {isEditing && (
                                <>
                                    <button
                                        className="bg-gray-200 mx-2 px-2 py-1 rounded hover:bg-red-600 hover:text-white text-sm"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
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

                <div className="flex items-center gap-1 md:gap-2">
                    {!isEditing && (
                        <button
                            className="rounded-full p-2 hover:bg-gray-100"
                            title="Rename CV"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit className="h-5 w-5 text-gray-400" />
                        </button>
                    )}
                    <button
                        onClick={() => onToggleFavorite(cv._id)}
                        className="rounded-full p-2 hover:bg-gray-100"
                        title={cv.isFavorite ? "Unfavorite" : "Favorite"}
                    >
                        {cv.isFavorite
                            ? <Star className="h-5 w-5 text-yellow-500" />
                            : <StarOff className="h-5 w-5 text-gray-400" />}
                    </button>
                </div>
            </div>

            {/* Meta */}
            {/* <div className="mb-4 text-xs text-gray-500">
                <div>Created: {new Date(cv.createdAt).toLocaleDateString()}</div>
                <div>Updated: {new Date(cv.updatedAt).toLocaleString()}</div>
            </div> */}
            {/* Improved Meta Section */}
            <div className="mb-6 flex items-center justify-between border-t border-gray-100 pt-4">

                {/* Updated Date */}
                <div className="flex items-center gap-2 ">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCA06D]/10 text-[#4F1C51]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 0-9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /><path d="M12 7v5l2 2" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none">Last Edit</span>
                        <span className="text-xs font-semibold text-[#4F1C51]">
                            {new Date(cv.updatedAt).toLocaleDateString()}
                        </span>
                    </div>

                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-gray-100" />

                {/* Created Date */}
                <div className="flex items-center gap-2">

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none">Created</span>
                        <span className="text-xs font-semibold text-[#210F37]">
                            {new Date(cv.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A55B4B]/5 text-[#A55B4B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Edit className="h-4 w-4" /> Edit
                </NavLink>
                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Eye className="h-4 w-4" /> Preview
                </NavLink>
                <NavLink
                    to={`/home/${cv._id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Download className="h-4 w-4" /> Download
                </NavLink>
                <button
                    onClick={() => onDelete(cv._id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#4F1C51] px-3 py-2 text-sm font-medium text-white hover:bg-black transition duration-300"
                >
                    <Trash2 className="h-4 w-4" /> Delete
                </button>
            </div>
        </div>
    );
}