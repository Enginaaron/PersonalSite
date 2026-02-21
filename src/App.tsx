import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useFadeIn } from "./hooks/useFadeIn";

export default function App() {
    useFadeIn();

    return (
        <>
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
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
