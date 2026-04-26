import StepsSection from "@/components/landingPage/StepsSection";
import Hero from "../components/landingPage/Hero";
import PricingSection from "@/components/landingPage/PricingSection";
import TemplatesSection from "@/components/landingPage/TemplatesSection";
import FAQSection from "@/components/landingPage/FAQSection";

const LandingPage = () => {
    return (
        <div>
            <Hero />
            <StepsSection />
            <PricingSection />
            <TemplatesSection />
            <FAQSection />
        </div>
    );
}

export default LandingPage;