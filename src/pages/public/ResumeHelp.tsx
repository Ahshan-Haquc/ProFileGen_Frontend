import React, { useState } from "react";
import { 
    Search, 
    BookOpen, 
    CheckCircle2, 
    XCircle, 
    HelpCircle, 
    ChevronDown, 
    ChevronUp,
    Lightbulb,
    FileSearch,
    MessageCircle
} from "lucide-react";
import DashboardNavBar from "@/layouts/DashboardNavBar";

const faqs = [
    {
        question: "How long should my resume be?",
        answer: "For most professionals, a 1-page resume is ideal. If you have 10+ years of relevant experience, a 2-page resume is acceptable. The goal is to be concise and impactful."
    },
    {
        question: "What is an ATS and why does it matter?",
        answer: "ATS stands for Applicant Tracking System. It is software used by employers to scan resumes for keywords. Our templates are specifically designed to be 'ATS-friendly' to ensure your resume gets seen."
    },
    {
        question: "Should I include a professional summary or a goal?",
        answer: "Modern resumes favor a 'Professional Summary.' Instead of saying what you want (a goal), summarize what you bring to the table in 3-4 powerful sentences."
    }
];

const guideSteps = [
    { icon: FileSearch, title: "Pick a Template", desc: "Choose based on your industry. Formal for Finance/Law, Modern for Tech/Design." },
    { icon: Lightbulb, title: "Highlight Results", desc: "Instead of listing duties, list achievements. Use numbers (e.g., 'Increased sales by 20%')." },
    { icon: CheckCircle2, title: "Proofread Twice", desc: "A single typo can disqualify you. Use our preview tool to check alignment and spelling." },
];

export default function ResumeHelp() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">

            <main className="mx-auto max-w-7xl px-6 md:px-14 py-16 xl:py-28">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-[#ff8757] text-xs font-bold uppercase tracking-widest mb-4">
                        Expert Support
                    </span>
                    <h1 className="text-4xl font-black text-[#210F37] mb-4">How can we help you today?</h1>
                    <div className="relative max-w-xl mx-auto mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for tips, guides, or FAQs..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#ff8757]/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Quick Guide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {guideSteps.map((step, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-[#210F37]/5 flex items-center justify-center text-[#210F37] mb-6">
                                <step.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#210F37] mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Dos and Don'ts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-green-50/50 rounded-[2rem] p-8 border border-green-100">
                        <h3 className="flex items-center gap-2 text-green-700 font-bold mb-6">
                            <CheckCircle2 size={20} /> Resume Dos
                        </h3>
                        <ul className="space-y-4">
                            {["Use reverse chronological order", "Quantify your achievements", "Use strong action verbs", "Keep it to 1-2 pages"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-green-800/80">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-50/50 rounded-[2rem] p-8 border border-red-100">
                        <h3 className="flex items-center gap-2 text-red-700 font-bold mb-6">
                            <XCircle size={20} /> Resume Don'ts
                        </h3>
                        <ul className="space-y-4">
                            {["Include a photo (unless requested)", "Use an unprofessional email", "List irrelevant hobbies", "Write in the first person ('I')"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-red-800/80">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-black text-[#210F37] mb-8 flex items-center gap-2">
                        <HelpCircle className="text-[#ff8757]" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                className="border border-gray-200 rounded-2xl overflow-hidden bg-white cursor-pointer"
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            >
                                <div className="flex justify-between items-center p-5 hover:bg-gray-50 transition-colors">
                                    <span className="font-bold text-[#210F37]">{faq.question}</span>
                                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                {openFaq === idx && (
                                    <div className="p-5 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <div className="bg-[#210F37] rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <MessageCircle size={120} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Our career experts are available to review your resume and provide personalized feedback.</p>
                    <button className="bg-[#ff8757] hover:bg-white hover:text-[#210F37] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20">
                        Contact Support
                    </button>
                </div>
            </main>
        </div>
    );
}