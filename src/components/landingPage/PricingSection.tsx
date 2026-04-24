import React from 'react';
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for a quick job application.",
    features: ["3 Premium CV Generations", "Basic PDF Export", "Mobile Responsive Editor", "Email Support"],
    buttonText: "Get Started",
    color: "#210F37",
    icon: <Zap className="w-5 h-5" />,
    popular: false,
  },
  {
    name: "Pro",
    price: "1",
    description: "The best value for students and grads.",
    features: ["Unlimited CV Generations", "All Premium Templates", "ATS Optimization Check", "Remove Watermark", "Priority Support"],
    buttonText: "Upgrade to Pro",
    color: "#DCA06D",
    icon: <Sparkles className="w-5 h-5" />,
    popular: true,
  },
  {
    name: "Elite",
    price: "5",
    description: "For serious professionals and career switchers.",
    features: ["Everything in Pro", "AI Cover Letter Writer", "Multi-language Support", "Custom Personal Domain", "Dedicated Career Coach Chat"],
    buttonText: "Go Elite",
    color: "#4F1C51",
    icon: <Crown className="w-5 h-5" />,
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#210F37] text-4xl md:text-5xl font-black mb-4">
            Simple, <span className="text-[#A55B4B]">Transparent</span> Pricing
          </h2>
          <p className="text-gray-500 text-lg">
            Whether you're just starting out or leading a department, we have a plan that fits your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] hover:scale-103 transition-all duration-500 border ${
                tier.popular 
                ? "border-[#DCA06D] bg-[#DCA06D]/5 shadow-2xl scale-105 hover:scale-107 z-10" 
                : "border-gray-100 bg-white hover:border-[#DCA06D]/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#DCA06D] text-[#210F37] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-inner"
                  style={{ backgroundColor: tier.color }}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#210F37]">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black text-[#210F37]">${tier.price}</span>
                  <span className="text-gray-500 font-medium">/month</span>
                </div>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-4 h-4" style={{ color: tier.color }} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-7 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                  tier.popular 
                  ? "bg-[#DCA06D] hover:bg-[#A55B4B] text-[#210F37]" 
                  : "bg-[#210F37] hover:bg-[#4F1C51] text-white"
                }`}
              >
                {tier.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default PricingSection;