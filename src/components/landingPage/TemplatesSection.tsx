import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // 1. Import Autoplay
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CornerDownRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const templatesData = [
  { id: 1, name: "The Executive", style: "Minimalist & Bold", category: "Corporate" },
  { id: 2, name: "The Modernist", style: "Creative & Fluid", category: "Startup" },
  { id: 3, name: "The Scholar", style: "Academic & Detailed", category: "Education" },
  { id: 4, name: "The Artisan", style: "Visual & Unique", category: "Design" },
  { id: 5, name: "The Catalyst", style: "High-Impact & Modern", category: "Tech" },
  { id: 6, name: "The Financier", style: "Structured & Clean", category: "Banking" },
];

const CompactAutoTemplates = () => {
  // Color Palette Reference:
  // Primary Dark: #210F37 (Text/Icons)
  // Deep Purple: #4F1C51 (Secondary/Accent)
  // Warm Sand: #DCA06D (Primary Accent/Hover)

  // 2. Initialize Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      loop: true,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })] // 3. Use Autoplay plugin
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      {/* Dynamic Background Blur */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-[#DCA06D]/5 blur-[120px] rounded-full -translate-y-1/2 select-none pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-16 gap-6 max-w-6xl mx-auto">
          <div className="max-w-xl text-left">
            <h2 className="text-[#210F37] text-4xl md:text-5xl font-black tracking-tight mb-4">
              Explore Our <span className="text-[#A55B4B]">Curated</span> Designs
            </h2>
            <p className="text-gray-500 text-lg">
              Find the perfect aesthetic for your professional profile with our automated showcase.
            </p>
          </div>

          <div className="flex items-center gap-3">
             <Button size="lg" className="bg-[#210F37] hover:bg-[#4F1C51] text-white px-8 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 gap-2">
                Create My Resume <CornerDownRight size={18} />
             </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-6xl mx-auto">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 gap-4 py-4">
              {templatesData.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4" // 4. Smaller slides (25% on desktop)
                >
                  <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-[0_10px_30px_rgba(33,15,55,0.03)] hover:shadow-[0_20px_50px_rgba(79,28,81,0.08)] transition-all duration-500 transform hover:-translate-y-1.5 group relative">
                    
                    {/* CV Image Container */}
                    <div className="relative aspect-[3/4.5] rounded-xl overflow-hidden mb-5 border border-gray-50 group-hover:border-[#DCA06D]/10 transition-all duration-300">
                      <img
                        src="/sampleCV.webp"
                        alt={`Sample CV Template - ${template.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-2.5 right-2.5 bg-white/70 backdrop-blur-sm text-[#210F37] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                         {template.category}
                      </div>

                      {/* Over-image Call to Action */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <Button className="bg-[#DCA06D] text-[#210F37] rounded-full font-bold px-5 py-2 hover:bg-[#A55B4B] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                          Use This Style
                        </Button>
                      </div>
                    </div>

                    {/* Compact Content */}
                    <div className="space-y-1.5 px-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h3 className="text-lg font-bold text-[#210F37] truncate group-hover:text-[#4F1C51] transition-colors">
                          {template.name}
                        </h3>
                         <Zap className="text-[#DCA06D] h-4 w-4 flex-shrink-0 fill-[#DCA06D]" />
                      </div>
                      <p className="text-xs text-gray-500 truncate leading-tight">{template.style}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 left-0 right-0 z-10 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-[#210F37] hover:bg-white hover:text-[#4F1C51] transition-all"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-[#210F37] hover:bg-white hover:text-[#DCA06D] transition-all"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Pagination Dot Indicator (Optional, but elegant for autoplay) */}
        <div className="mt-14 flex justify-center items-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? "w-8 bg-[#4F1C51]" : "w-1.5 bg-gray-200"}`} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CompactAutoTemplates;