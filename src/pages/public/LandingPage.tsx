import StepsSection from "@/components/landingPage/StepsSection";
import PricingSection from "@/components/landingPage/PricingSection";
import TemplatesSection from "@/components/landingPage/TemplatesSection";
import FAQSection from "@/components/landingPage/FAQSection";
import Hero from "@/components/landingPage/Hero";

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