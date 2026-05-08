import { NavLink } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";

export default function TemplateCard({ t }) {
    return (
        <NavLink
            to={t.to}
            className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[#ff8757]/50 hover:shadow-md"
        >
            {/* Top Gradient Accent Bar */}
            <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${t.gradient} rounded-t-2xl`} />

            {/* Icon/Visual Placeholder */}
            <div className="mb-6 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-[#210F37] transition-all duration-300 group-hover:bg-[#210F37] group-hover:text-white">
                <i className="fas fa-file-alt text-2xl"></i>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {t.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {t.hint}
                </p>
            </div>

            {/* Footer Action - Only reveals on hover */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <Sparkles className="h-4 w-4 text-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ff8757] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                    Start Building <ChevronRight className="h-4 w-4" />
                </span>
            </div>
        </NavLink>
    );
}