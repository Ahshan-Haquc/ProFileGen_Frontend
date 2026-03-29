import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
    {
        title: "Step 1: Start Your CV",
        description: "Begin by creating a new CV or resume using your personal details and job preferences.",
        image: "https://cdn-icons-png.flaticon.com/512/3033/3033143.png",
        tips: [
            "Gather all your personal info before starting.",
            "Think about your career goals."
        ],
    },
    {
        title: "Step 2: Choose a Template",
        description: "Pick from formal or modern templates to suit your style.",
        image: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
        tips: [
            "Preview templates before selecting.",
            "Choose a template that matches your industry."
        ],
    },
    {
        title: "Step 3: Fill Your Information",
        description: "Add your education, experience, skills, projects, references and other custom info to build your CV.",
        image: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
        tips: [
            "Highlight achievements, not just duties.",
            "Use action verbs for impact."
        ],
    },
    {
        title: "Step 4: Preview Your CV / Resume",
        description: "See a real-time preview of your CV / Resume in the selected template format.",
        image: "https://cdn-icons-png.flaticon.com/512/4761/4761172.png",
        tips: [
            "Check for formatting issues.",
            "Ensure all sections are complete."
        ],
    },
    {
        title: "Step 5: Download & Share",
        description: "Download your CV as PDF or share it online with one click.",
        image: "https://cdn-icons-png.flaticon.com/512/5954/5954441.png",
        tips: [
            "Save a backup copy.",
            "Share your CV with recruiters easily."
        ],
    },
];

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const OnboardingSteps = () => {
    // for animation 
    useEffect(() => {
        AOS.init({ duration: 1000 }); // animation speed (ms)
    }, []);
    return (
        <div className="w-full max-w-4xl mx-auto my-10 px-4 hidden md:block" >
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-[#4F1C51] via-[#7B2FF2] to-[#F357A8] bg-clip-text text-transparent" data-aos="zoom-in" data-aos-delay="200">
                How to Use ProFileGen
            </h2>
            <Carousel
                responsive={responsive}
                autoPlay
                autoPlaySpeed={3500}
                infinite
                showDots={true}
                arrows={false}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 md:p-12  border border-gray-100 rounded-2xl flex flex-col items-center text-center transition-all duration-500 relative"
                        data-aos="fade-up"
                    >
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                            {`Step ${index + 1}`}
                        </div>
                        {step.image && (
                            <div className="bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 rounded-full p-4 mb-6 shadow-lg">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-32 h-32 object-contain"
                                />
                            </div>
                        )}
                        <h3 className="text-2xl font-bold text-[#4F1C51] mb-3">{step.title}</h3>
                        <p className="text-gray-700 mb-4">{step.description}</p>
                        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-xl p-4 mt-2 w-full max-w-md mx-auto">
                            <h4 className="text-lg font-semibold text-[#7B2FF2] mb-2">Tips:</h4>
                            <ul className="list-disc list-inside text-gray-600 text-left">
                                {step.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default OnboardingSteps;
