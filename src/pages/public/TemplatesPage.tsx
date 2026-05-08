

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Layout, CheckCircle2, ArrowRight, Zap, Award, Target } from "lucide-react";
import DashboardNavBar from "@/layouts/DashboardNavBar";

const categories = ["All", "Professional", "Creative", "Minimalist", "Executive", "Academic"];

const templateList = [
    { id: "formal-1", title: "The Executive", category: "Executive", gradient: "from-slate-700 to-slate-900", description: "Structured for high-level leadership roles.", to: "/create?template=formal", tag: "Premium" },
    { id: "modern-1", title: "Modern Edge", category: "Creative", gradient: "from-[#4F1C51] to-[#210F37]", description: "Dynamic layout with bold sidebar accents.", to: "/create?template=modern", tag: "Trending" },
    { id: "minimal-1", title: "Clean Slate", category: "Minimalist", gradient: "from-gray-400 to-gray-600", description: "Focus on typography and white space.", to: "/create?template=one-column", tag: "ATS Friendly" },
    { id: "prof-1", title: "Corporate Pro", category: "Professional", gradient: "from-blue-600 to-blue-800", description: "Standard industry-standard layout for any field.", to: "/create?template=formal", tag: "Popular" },
    { id: "creative-1", title: "Artist Portfolio", category: "Creative", gradient: "from-rose-400 to-orange-500", description: "Visual-heavy for designers and artists.", to: "/create?template=modern", tag: "Vibrant" },
    { id: "exec-2", title: "Harvard Classic", category: "Academic", gradient: "from-red-900 to-black", description: "Traditional academic CV format for researchers.", to: "/create?template=formal", tag: "Standard" },
    { id: "min-2", title: "Lite Air", category: "Minimalist", gradient: "from-emerald-400 to-cyan-500", description: "Simplified sections for entry-level roles.", to: "/create?template=one-column", tag: "New" },
    { id: "prof-2", title: "Global Consultant", category: "Professional", gradient: "from-indigo-600 to-purple-700", description: "Ideal for business analysts and consultants.", to: "/create?template=formal", tag: "Top Rated" },
    { id: "creative-2", title: "The Maverick", category: "Creative", gradient: "from-amber-400 to-orange-600", description: "Unconventional layout to stand out.", to: "/create?template=modern", tag: "Bold" },
    { id: "exec-3", title: "Silicon Valley", category: "Professional", gradient: "from-sky-400 to-blue-600", description: "Modern tech-focused resume layout.", to: "/create?template=modern", tag: "Tech Choice" },
    { id: "acad-2", title: "The Scholar", category: "Academic", gradient: "from-stone-600 to-stone-800", description: "Detailed multi-page support for publications.", to: "/create?template=formal", tag: "Detailed" },
    { id: "min-3", title: "Essential", category: "Minimalist", gradient: "from-zinc-400 to-zinc-600", description: "The bare essentials done perfectly.", to: "/create?template=one-column", tag: "Fast" },
    { id: "prof-3", title: "Legal Eagle", category: "Professional", gradient: "from-navy-800 to-blue-900", description: "Sophisticated and conservative for law.", to: "/create?template=formal", tag: "Sober" },
    { id: "creative-3", title: "Prism", category: "Creative", gradient: "from-fuchsia-500 to-pink-500", description: "Playful colors for marketing experts.", to: "/create?template=modern", tag: "Unique" },
    { id: "exec-4", title: "Fortune 500", category: "Executive", gradient: "from-yellow-600 to-amber-800", description: "Designed for C-suite and VP level.", to: "/create?template=formal", tag: "Gold" },
    { id: "min-4", title: "Tokyo", category: "Minimalist", gradient: "from-gray-100 to-gray-300", description: "Japanese-inspired minimalist perfection.", to: "/create?template=one-column", tag: "Zen" },
];

export default function TemplatesPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTemplates = useMemo(() => {
        return templateList.filter(t => {
            const matchesTab = activeTab === "All" || t.category === activeTab;
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <div className="min-h-screen bg-[#F8F9FB]">

            <main className="mx-auto max-w-7xl px-6 md:px-14 py-12 xl:py-30">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="text-[#ff8757]" size={20} />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Library v2.0</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#210F37] tracking-tight">
                            Resume <span className="text-[#ff8757]">Templates</span>
                        </h1>
                    </div>
                    
                    {/* Real-time Counter */}
                    <div className="flex gap-4">
                        <div className="bg-white px-5 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <span className="text-2xl font-black text-[#210F37]">{templateList.length}</span>
                            <span className="text-xs font-medium text-gray-500 leading-tight">Templates<br/>Available</span>
                        </div>
                    </div>
                </header>

                {/* Filters */}
                <div className="sticky top-4 z-30 flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white/40 backdrop-blur-md p-3 rounded-3xl border border-white/50 shadow-sm">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                                    activeTab === cat
                                        ? "bg-[#210F37] text-white"
                                        : "text-gray-500 hover:bg-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find your style..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-transparent bg-white focus:bg-white focus:ring-2 focus:ring-[#ff8757]/20 outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
                    {filteredTemplates.map((t) => (
                        <div 
                            key={t.id}
                            className="group bg-white rounded-[2rem] border border-gray-100 hover:border-[#ff8757] p-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                        >
                            {/* Visual Preview */}
                            <div className={`relative h-56 rounded-[1.6rem] bg-gradient-to-br ${t.gradient} overflow-hidden flex items-center justify-center p-6`}>
                                <div className="absolute top-3 right-3 flex gap-1">
                                    <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg border border-white/20 text-white">
                                        <CheckCircle2 size={12} />
                                    </div>
                                </div>
                                
                                {/* Abstract Resume Shape */}
                                <div className="w-full max-w-[120px] h-40 bg-white rounded-lg shadow-xl translate-y-6 group-hover:translate-y-2 transition-transform duration-500 p-3 space-y-2">
                                    <div className="h-2 w-full bg-gray-100 rounded" />
                                    <div className="h-1.5 w-2/3 bg-gray-50 rounded" />
                                    <div className="pt-2 space-y-1">
                                        <div className="h-1 w-full bg-gray-50 rounded" />
                                        <div className="h-1 w-full bg-gray-50 rounded" />
                                        <div className="h-1 w-full bg-gray-50 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black uppercase text-[#ff8757] tracking-widest">{t.category}</span>
                                    <span className="h-1 w-1 bg-gray-200 rounded-full" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.tag}</span>
                                </div>
                                <h3 className="text-lg font-black text-[#210F37] mb-2">{t.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                                    {t.description}
                                </p>
                                
                                <button 
                                    onClick={() => navigate(t.to)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 group-hover:bg-[#210F37] text-[#210F37] group-hover:text-white font-bold text-xs transition-all"
                                >
                                    Select Template <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}