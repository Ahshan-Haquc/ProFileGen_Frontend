import React from 'react';
import { motion } from "framer-motion";
import { Plus, UserCircle2, Layout, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Initiate",
    subtitle: "Quick Start",
    description: "Launch your workspace with a single click. Our AI-ready dashboard prepares your canvas for a high-impact professional profile.",
    icon: <Plus className="w-6 h-6" />,
    color: "#210F37",
    shadow: "shadow-[0_20px_50px_rgba(33,15,55,0.1)]",
  },
  {
    title: "Curate",
    subtitle: "Smart Input",
    description: "Input your journey. Our system guides you through sections designed to highlight your strengths and pass ATS filters effortlessly.",
    icon: <UserCircle2 className="w-6 h-6" />,
    color: "#4F1C51",
    shadow: "shadow-[0_20px_50px_rgba(79,28,81,0.1)]",
  },
  {
    title: "Design",
    subtitle: "Visual Style",
    description: "Browse our premium template gallery. Switch styles instantly with a live preview that respects your brand and aesthetic.",
    icon: <Layout className="w-6 h-6" />,
    color: "#A55B4B",
    shadow: "shadow-[0_20px_50px_rgba(165,91,75,0.1)]",
  },
  {
    title: "Deploy",
    subtitle: "Export PDF",
    description: "Generate a pixel-perfect, job-ready resume. Download in high-definition and start your journey to your dream career.",
    icon: <Download className="w-6 h-6" />,
    color: "#DCA06D",
    shadow: "shadow-[0_20px_50px_rgba(220,160,109,0.1)]",
  },
];

const AttractiveSteps = () => {
  return (
    <section className="py-24  relative overflow-hidden">
      {/* Cinematic Background Blobs */}


      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#210F37] text-4xl md:text-6xl font-black tracking-tight mb-4">
              Your dream job <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F1C51] to-[#A55B4B]">starts in 4 steps.</span>
            </h2>
            <p className="text-gray-500 text-lg">
              We've refined the complex process of resume building into a seamless, 
              intuitive flow that prioritizes your time and results.
            </p>
          </div>
          <div className="hidden lg:block pb-2">
             <div className="flex items-center gap-2 text-[#210F37] font-bold border-b-2 border-[#DCA06D]">
                <span>How it works</span>

             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`group relative bg-white border border-gray-100 p-8 rounded-[2rem] transition-all duration-500 ${step.shadow}`}
            >
              {/* Step Counter Overlay */}
              <span className="absolute top-6 right-8 text-5xl font-black text-gray-50 group-hover:text-gray-100 transition-colors">
                0{index + 1}
              </span>

              {/* Icon & Subtitle */}
              <div className="relative mb-10">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-500"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                <div className="absolute -bottom-6 left-0">
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: step.color }}>
                      {step.subtitle}
                   </p>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#210F37] mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Bottom Decorative Bar */}
              <div 
                className="w-0 group-hover:w-full h-1.5 rounded-full transition-all duration-700 ease-out"
                style={{ backgroundColor: step.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Connector Track (Desktop Only) */}
        <div className="hidden lg:flex justify-between px-16 mt-8">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                  <div className="flex-1 border-t-2 border-dashed border-gray-100 mx-2" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
               </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AttractiveSteps;
