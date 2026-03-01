import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

// Import all necessary components and providers
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Loader from './components/Loader';

import CustomCursor from './components/CustomCursor';
import ThemeProvider from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import { TransitionProvider } from './context/TransitionContext';
import Transition from './components/Transition';

gsap.registerPlugin(ScrollTrigger);

// This component handles scrolling to a section when navigating from another page.
const ScrollToSection = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Increased timeout to allow for page transition animations
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    } else {
      // If no hash, scroll to top on path change
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Rerun effect if path or hash changes

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // This effect sets up the Lenis smooth scroll library
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Disable browser's native scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  // Handler for when loader animation completes
  const handleLoaderComplete = () => {
    setShowContent(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <ThemeProvider>
      <MusicProvider>
        <Router>
          <ScrollToSection />
          <TransitionProvider>
            <div className="relative bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden">
              <AnimatePresence mode="wait">
                {loading && <Loader key="loader" onComplete={handleLoaderComplete} />}
              </AnimatePresence>

              <div
                className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ visibility: showContent ? 'visible' : 'hidden' }}
              >
                <CustomCursor />
                <Navigation />
                <Transition />

                <Routes>
                  <Route path="/" element={<Home startAnimation={showContent} />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                </Routes>
              </div>
            </div>
          </TransitionProvider>
        </Router>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;