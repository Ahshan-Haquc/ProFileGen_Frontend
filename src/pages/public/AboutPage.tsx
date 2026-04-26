import React from "react";
import { Users, Target, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import DashboardNavBar from "@/layouts/DashboardNavBar";
import LandingFooter from "@/layouts/LandingFooter"; // Assuming you use the footer we built

const values = [
    {
        icon: Target,
        title: "Precision Built",
        desc: "Our algorithms ensure every line of your resume is optimized for both humans and machines."
    },
    {
        icon: ShieldCheck,
        title: "Privacy First",
        desc: "Your professional data is yours alone. We use industry-leading encryption to keep it that way."
    },
    {
        icon: Rocket,
        title: "Career Growth",
        desc: "We don't just build resumes; we build tools that help you land the interview and the job."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <DashboardNavBar />

            <main>
                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-6 md:px-14 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#ff8757] font-bold uppercase tracking-[0.2em] text-xs">Our Story</span>
                            <h1 className="text-5xl lg:text-7xl font-black text-[#210F37] leading-[1.1] mt-4 mb-8">
                                We help you <br />
                                <span className="text-gray-300">get hired.</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                ProFileGen was born out of a simple observation: the bridge between talent and opportunity is often a single document. We’ve automated the struggle so you can focus on the work.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gray-50 rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
                                {/* Abstract Branding Element */}
                                <div className="relative w-full h-full border-2 border-[#210F37]/5 rounded-2xl flex items-center justify-center">
                                    <div className="text-[12rem] font-black text-[#210F37]/5 select-none italic">PFG</div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-32 w-32 bg-[#ff8757] rounded-full blur-[80px] opacity-20 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-[#210F37] py-24 text-white">
                    <div className="mx-auto max-w-7xl px-6 md:px-14">
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold">Why ProFileGen?</h2>
                            <div className="h-1 w-20 bg-[#ff8757] mt-4" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {values.map((v, i) => (
                                <div key={i} className="group">
                                    <div className="mb-6 inline-block p-4 rounded-2xl bg-white/5 group-hover:bg-[#ff8757] transition-all duration-300">
                                        <v.icon size={28} className="group-hover:text-white text-[#ff8757]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {v.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mx-auto max-w-7xl px-6 md:px-14 py-24">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Resumes Built", val: "50k+" },
                            { label: "Success Rate", val: "94%" },
                            { label: "Templates", val: "20+" },
                            { label: "Active Users", val: "12k" },
                        ].map((s, i) => (
                            <div key={i} className="text-center lg:text-left">
                                <div className="text-4xl font-black text-[#210F37] mb-1">{s.val}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mx-auto max-w-7xl px-6 md:px-14 pb-32">
                    <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 flex flex-col items-center text-center">
                        <Users className="text-[#210F37] mb-6" size={48} />
                        <h2 className="text-3xl lg:text-4xl font-black text-[#210F37] mb-6">
                            Join the next generation <br /> of job seekers.
                        </h2>
                        <button className="flex items-center gap-2 bg-[#210F37] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#ff8757] transition-all duration-300">
                            Build Your Resume Now <ArrowRight size={20} />
                        </button>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
}