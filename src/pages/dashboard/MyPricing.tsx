import DashboardNavBar from "@/layouts/DashboardNavBar";
import React from 'react';
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation, useGetCurrentSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const tiers = [
    {
        name: "Starter",
        key: "starter",
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
        key: "pro",
        price: "1",
        description: "The best value for students and grads.",
        features: ["10 CV per month", "All Premium Templates", "ATS Optimization Check", "Remove Watermark", "Priority Support"],
        buttonText: "Upgrade to Pro",
        color: "#DCA06D",
        icon: <Sparkles className="w-5 h-5" />,
        popular: true,
    },
    {
        name: "Elite",
        key: "elite",
        price: "5",
        description: "For serious professionals and career switchers.",
        features: ["50 CV per month", "Everything in Pro", "AI Cover Letter Writer", "Multi-language Support", "Custom Personal Domain"],
        buttonText: "Go Elite",
        color: "#4F1C51",
        icon: <Crown className="w-5 h-5" />,
        popular: false,
    },
];

export default function MyPricing() {
    const { data } = useGetCurrentSubscriptionQuery();
    const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
    const navigate = useNavigate();

    const currentPlan = data?.subscription?.plan || "starter";

    const handleSubscribe = async (planKey: string) => {
        // Free plan — no Stripe checkout needed
        if (planKey === "starter") {
            toast.info("You are already on the free Starter plan.");
            return;
        }

        try {
            const res = await createCheckoutSession({ plan: planKey }).unwrap();

            if (res.url) {
                window.location.href = res.url;
            } else {
                toast.error("Failed to create checkout session.");
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to create checkout session. Please try again.");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <DashboardNavBar />

            <section className="py-5 md:py-15 relative overflow-hidden">
                <div className="container mx-auto px-4">

                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-[#210F37] text-4xl md:text-5xl font-black mb-4">
                            Simple, <span className="text-[#A55B4B]">Transparent</span> Pricing
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Choose your plan and unlock more CV generation power.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {tiers.map((tier, index) => {
                            const isCurrent = currentPlan === tier.key;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 border ${isCurrent
                                            ? "border-green-500 bg-green-50 scale-105"
                                            : tier.popular
                                                ? "border-[#DCA06D] bg-[#DCA06D]/5"
                                                : " hover:border-[#DCA06D]/50 border-[#DCA06D] bg-[#DCA06D]/5"
                                        }`}
                                >
                                    {/* Current Plan Badge */}
                                    {isCurrent && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                            Current Plan
                                        </div>
                                    )}

                                    {/* Popular Badge */}
                                    {tier.popular && !isCurrent && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#DCA06D] text-[#210F37] text-xs font-bold px-4 py-1.5 rounded-full">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white"
                                            style={{ backgroundColor: tier.color }}
                                        >
                                            {tier.icon}
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#210F37]">
                                            {tier.name}
                                        </h3>

                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-4xl font-black text-[#210F37]">
                                                ${tier.price}
                                            </span>
                                            <span className="text-gray-500 font-medium">/month</span>
                                        </div>

                                        <p className="text-gray-500 text-sm mt-4">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                <Check className="w-4 h-4" style={{ color: tier.color }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* 🚀 Button Logic */}
                                    <Button
                                        disabled={isCurrent}
                                        onClick={() => handleSubscribe(tier.key)}
                                        className={`w-full py-7 rounded-2xl font-bold text-lg transition-all active:scale-95 ${isCurrent
                                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                : tier.popular
                                                    ? "bg-[#DCA06D] hover:bg-[#A55B4B] text-[#210F37]"
                                                    : "bg-[#210F37] hover:bg-[#4F1C51] text-white"
                                            }`}
                                    >
                                        {isCurrent ? "Current Plan" : tier.buttonText}
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}