import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import SkillsSphere from './components/SkillsSphere';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubGraph from './components/GithubGraph';
import Marquee from './components/Marquee'; 
import Contact from './components/Contact'; 
import TerminalFooter from './components/TerminalFooter'; 
import AsciiAvatar from './AsciiAvatar';

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for ultra-smooth tracking without lag
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      // Direct DOM update via motion values, bypassing React re-renders!
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#39ff14] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

// --- Cinematic Video Loader Component ---
const Loader = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      
      {/* FULL SCREEN VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src="/wolf-video.mp4" 
          autoPlay 
          muted 
          playsInline
          loop 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      </div>

      <div className="absolute inset-0 bg-[#39ff14]/10 blur-[120px] animate-pulse pointer-events-none z-10"></div>

      {/* Loading progress text and scanning bar */}
      <div className="absolute bottom-16 md:bottom-24 flex flex-col items-center gap-3 z-20">
        <span className="text-[#39ff14] font-mono text-sm tracking-[0.5em] uppercase drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] text-center">
          WELCOME
        </span>
        <div className="w-64 md:w-96 h-[2px] bg-white/20 relative overflow-hidden rounded-full backdrop-blur-md">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }} 
            onAnimationComplete={onComplete} 
            className="absolute top-0 left-0 h-full w-full bg-[#39ff14] shadow-[0_0_15px_#39ff14]"
          />
        </div>
      </div>

    </motion.div>
  );
};

// --- Main App Wrapper ---
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden cursor-none">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <main className="relative z-10">
            <Hero />
            
            {/* === INJECTED SYSTEM ARCHITECTURE SECTION === */}
            <section className="w-full max-w-7xl mx-auto py-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* LEFT NODE: The Visual Data Feed */}
              <div className="w-full rounded-lg overflow-hidden border border-gray-900 shadow-[0_0_15px_rgba(0,255,65,0.05)]">
                <AsciiAvatar imagePath="/avatar.png" />
              </div>

              {/* RIGHT NODE: Modern Bento Box Dashboard */}
              <div className="w-full flex flex-col space-y-6">
                
                {/* 1. Nice Heading */}
                <div className="border-b border-gray-800/80 pb-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tight">
                    System's in Action.
                  </h2>
                  <div className="flex items-center mt-2 font-mono text-sm">
                    <span className="text-[#39ff14] mr-2">{"<"}</span>
                    <span className="text-gray-400">Architecting scalable infrastructure & silicon logic</span>
                    <span className="text-[#39ff14] ml-2">{"/>"}</span>
                  </div>
                </div>

                {/* Grid Container for Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* 2. Current Working Projects */}
                  <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-xl hover:border-[#39ff14]/40 transition-colors group">
                    <h3 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>
                      In action
                    </h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="text-white font-medium text-sm">Opsinux</div>
                        <div className="text-gray-400 text-xs mt-1">Agentic SRE AI for K8s automated patching.</div>
                      </li>
                      <li>
                        <div className="text-white font-medium text-sm">Micro VM's</div>
                        <div className="text-gray-400 text-xs mt-1">A Mini Virtual machine on your computer.</div>
                      </li>
                      <li>
                        <div className="text-white font-medium text-sm">HPX Core</div>
                        <div className="text-gray-400 text-xs mt-1">C++ concurrency and performance optimizations.</div>
                      </li>
                    </ul>
                  </div>

                  {/* 3. Open Source Organizations */}
                  <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-xl hover:border-[#39ff14]/40 transition-colors group">
                    <h3 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      Open Source
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="text-[#39ff14] font-mono mt-0.5 mr-2">↳</div>
                        <div>
                          <div className="text-white font-medium text-sm">CNCF</div>
                          <div className="text-gray-400 text-xs mt-1">Contributions to KubeVirt & Meshery.</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-[#39ff14] font-mono mt-0.5 mr-2">↳</div>
                        <div>
                          <div className="text-white font-medium text-sm">Stellar Group</div>
                          <div className="text-gray-400 text-xs mt-1">HPX standard library infrastructure.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 4. Medium Articles */}
                <div className="bg-[#0a0a0a]/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-xl hover:border-[#39ff14]/40 transition-colors">
                  <h3 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                    My Thoughts on paper
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://medium.com/@root10xsudo/can-containers-be-the-future-vms-b116f0c046d4" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border border-transparent hover:bg-white/5 transition-all cursor-none">
                      <div className="text-sm font-medium text-gray-200 line-clamp-2">Can Containers be future VM's</div>
                      <div className="text-xs text-[#39ff14] mt-2 font-mono">Read Article →</div>
                    </a>
                    <a href="https://medium.com/@root10xsudo/how-containers-solved-one-of-software-engineerings-biggest-problems-19047502a9bc" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border border-transparent hover:bg-white/5 transition-all cursor-none">
                      <div className="text-sm font-medium text-gray-200 line-clamp-2">How Containers Solved One of Software Engineering’s Biggest Problems</div>
                      <div className="text-xs text-[#39ff14] mt-2 font-mono">Read Article →</div>
                    </a>
                  </div>
                </div>

                {/* 5. Downloadable Resume Button */}
                <div className="pt-2">
                  <a 
                    href="/SainathMandaResume.pdf" 
                    download="Sainath_Resume.pdf"
                    className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#39ff14]/10 border border-[#39ff14]/30 hover:border-[#39ff14] rounded-lg overflow-hidden transition-all duration-300 cursor-none w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-[#39ff14]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <span className="relative flex items-center text-white font-mono text-sm tracking-widest transition-colors duration-300">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download My RESUME
                    </span>
                  </a>
                </div>

              </div>
            </section>
            {/* === END INJECTED SECTION === */}

            <SkillsSphere />
            <Skills /> 
            <Projects /> 
            <Marquee /> 
            <GithubGraph />
            <Contact /> 
            <TerminalFooter /> 
          </main>
        )}
      </div>
    </ReactLenis>
  );
}

export default App;