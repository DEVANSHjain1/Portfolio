import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import BlogSection from '../components/BlogSection';
import TestimonialPreview from '../components/TestimonialPreview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Education from '../components/Education';

interface HomeProps {
  startAnimation?: boolean;
}

const Home: React.FC<HomeProps> = ({ startAnimation = false }) => {
  const location = useLocation();

  useEffect(() => {
    // This effect handles scrolling when the user navigates to the homepage.
    const scrollTimeout = setTimeout(() => {
      const sectionId = location.state?.scrollTo;
      if (sectionId) {
        // If a specific section is requested (e.g., from a footer link)
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If just navigating to Home, scroll to the top.
        // This handles the "HOME" link case.
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 500); // Delay to allow page transition to complete.

    // Cleanup the timeout if the component unmounts or location changes again quickly.
    return () => clearTimeout(scrollTimeout);
  }, [location]);

  return (
    <div className="relative overflow-x-hidden">
      <Hero startAnimation={startAnimation} />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Timeline />
      <BlogSection />
      {/* <TestimonialPreview /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;