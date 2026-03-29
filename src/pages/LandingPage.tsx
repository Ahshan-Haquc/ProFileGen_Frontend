import Hero from "../components/landingPage/Hero";
import LandingFooter from "../layouts/LandingFooter";
import LandingNavBar from "../layouts/LandingNavBar";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <LandingNavBar />
            <main className="flex-grow">
                <Hero/>
            </main>
            <LandingFooter />
        </div>
    );
}

export default LandingPage;