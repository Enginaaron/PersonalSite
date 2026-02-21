import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { useFadeIn } from "./hooks/useFadeIn";

export default function App() {
    useFadeIn();

    return (
        <>
            <CustomCursor />

            {/* Animated starfield background */}
            <div className="starfield" aria-hidden="true">
                <div className="layer layer-1" />
                <div className="layer layer-2" />
            </div>

            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Gallery />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
