import { CheckCircle, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const features = [
    {
        title: "Professional CV / Resume Generation",
        description: "Create polished resumes and CVs tailored for any industry.",
    },
    {
        title: "Multiple Templates",
        description: "Choose from a variety of modern and classic templates.",
    },
    {
        title: "Easy Customization",
        description: "Effortlessly edit sections, colors, and fonts to match your style.",
    },
    {
        title: "Download Options",
        description: "Export your CV / resume in PDF formats instantly.",
    },
    {
        title: "User-Friendly Interface",
        description: "Intuitive design for a seamless CV / resume-building experience.",
    },
    {
        title: "AI-Powered Suggestions",
        description: "Get smart tips and content suggestions to improve your CV / resume.",
    },
];

const Features = () => {
    // for animation 
    useEffect(() => {
        AOS.init({ duration: 1000 }); // animation speed (ms)
    }, []);
    return (
        <section className="w-full max-w-7xl px-4 py-10 mx-auto my-12 bg-gradient-to-br from-purple-50 via-white to-indigo-100 rounded-3xl  border border-purple-100">
            <div className="flex flex-col items-center mb-10" data-aos="zoom-in" data-aos-delay="400">
                <span className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full p-3 mb-3">
                    <Sparkles className="text-white w-8 h-8" />
                </span>
                <h2 className="text-indigo-900 text-3xl sm:text-4xl font-extrabold mb-2 text-center drop-shadow">
                    Key Features
                </h2>
                <p className="text-gray-600 text-lg text-center max-w-xl">
                    Everything you need to build a standout resume and land your dream job.
                </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {features.map((feature, idx) => (
                    <li
                        key={idx}
                        className="flex flex-col items-start bg-white/90 hover:scale-[1.03] hover:shadow-xl transition duration-300 ease-in-out p-6 rounded-xl shadow-md border border-purple-100"
                        data-aos="flip-left" data-aos-delay={idx * 300}
                    >
                        <div className="flex items-center mb-3">
                            <CheckCircle className="text-purple-600 w-6 h-6 mr-2" />
                            <span className="text-indigo-800 font-semibold text-lg">{feature.title}</span>
                        </div>
                        <p className="text-gray-700 text-base pl-8">{feature.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Features;
