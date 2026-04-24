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
        <div className="relative min-w-[420px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition">
            {/* Top row */}
            <div className="mb-3 flex items-start justify-between">
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

                <div className="flex items-center gap-2">
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
            <div className="mb-4 text-xs text-gray-500">
                <div>Created: {new Date(cv.createdAt).toLocaleDateString()}</div>
                <div>Updated: {new Date(cv.updatedAt).toLocaleString()}</div>
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
                    to={`/home/${cv._id}/preview`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Eye className="h-4 w-4" /> Preview
                </NavLink>
                <NavLink
                    to={`/home/${cv._id}/download`}
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