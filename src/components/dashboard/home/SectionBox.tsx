import { Trash2 } from "lucide-react";

const SectionBox = ({ sectionName, order, onDelete, onOrderChange }) => {
    return (
        <div className="relative min-w-48 max-w-fit min-h-[100px] p-4 border border-gray-300 rounded-lg shadow bg-white flex flex-col justify-between hover:bg-gray-100">
            {/* Top: Title + Delete */}
            <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800 mr-2">{sectionName}</span>
                <button
                    onClick={() => onDelete(sectionName)}
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer transition"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom: Order input */}
            <div className="flex items-center justify-center mt-4">
                <label className="text-sm text-gray-500 mr-2">Order:</label>
                <input
                    type="number"
                    placeholder={order}
                    onChange={(e) => onOrderChange?.(parseInt(e.target.value))}
                    className="w-12 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
        </div>
    );
};

export default SectionBox;
