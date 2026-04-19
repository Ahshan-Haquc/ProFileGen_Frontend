import React from 'react';
import { Star, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from '../ui/button';

const Hero = () => {
  // Color Palette Reference:
  // Primary Dark: #210F37 (Text/Buttons)
  // Deep Purple: #4F1C51 (Accents)
  // Muted Rose: #A55B4B (Highlights)
  // Warm Sand: #DCA06D (Secondary Buttons/Accents)

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-white px-4 py-22 md:py-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#DCA06D]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#4F1C51]/5 blur-3xl" />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-[#4F1C51]/10 text-[#4F1C51] px-4 py-1.5 rounded-full w-fit">
            <span className="text-xs font-bold uppercase tracking-wider">Free Online Resume Builder</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#210F37] leading-[1.1]">
            Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F1C51] to-[#A55B4B]">job-winning</span> resume for free
          </h1>

          <div className="space-y-4">
            <p className="text-lg text-gray-600 max-w-lg">
              Your first resume is 100% free forever. Unlimited downloads. No hidden fees. <span className="font-semibold text-[#A55B4B]">Yes, really <Rocket className="inline h-5 w-5 ml-1" /></span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-[#210F37] hover:bg-[#4F1C51] text-white px-8 py-7 text-lg rounded-xl transition-all hover:scale-105 shadow-xl">
                Get started for free ✨
              </Button>
              <Button variant="outline" size="lg" className="border-[#DCA06D] text-[#A55B4B] hover:bg-[#DCA06D]/10 px-8 py-7 text-lg rounded-xl transition-all">
                View Templates
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center space-x-4 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-[#210F37]/70">
              Trusted by <span className="font-bold text-[#210F37]">5.3 million</span> users
            </p>
          </div>
        </motion.div>

        {/* Right Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Resume Placeholder Image */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500 w-fit">
            <img 
              src="/sampleCV.webp" 
              alt="Resume Sample" 
              className="rounded-xl w-fit max-h-[70vh]"
            />
          </div>

          {/* Floating Element 1: Review */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-4 max-w-[220px]"
          >
            <div className="bg-[#DCA06D] p-2 rounded-full">
              <Star className="text-white h-5 w-5 fill-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#210F37]">Andrew Irwin</p>
              <p className="text-[10px] text-gray-500">Product Manager</p>
              <div className="flex text-yellow-400 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2: TikTok/Viral Proof */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -right-4 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 flex flex-col space-y-2"
          >
            <div className="flex items-center justify-between">
               <p className="text-[11px] font-semibold text-gray-600">Powerful websites I wish I knew earlier:</p>
               <span className="text-sm">🤩</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
                <div className="h-6 w-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">d</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold">@maedeh.davami</span>
                  <span className="text-[8px] text-gray-400">1.8 million views</span>
                </div>
                <ArrowRight size={12} className="text-[#4F1C51]" />
            </div>
          </motion.div>

          {/* Floating Element 3: Success Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-1/2 -left-12 z-30 bg-[#210F37] text-white p-3 rounded-xl shadow-lg flex items-center space-x-3"
          >
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold">ATS Friendly</p>
              <p className="text-[10px] opacity-80">98% Success Rate</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;