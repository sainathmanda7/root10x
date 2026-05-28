import React from 'react';
import { motion } from 'framer-motion';
// 👇 Added curly braces here!
import { GitHubCalendar } from 'react-github-calendar'; 

const GithubGraph = () => {
  // Customizing the contribution colors to match your premium neon green theme
  const customTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39ff14'],
    dark: ['#161b22', '#01311f', '#034525', '#0f6d3b', '#39ff14'],
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <p className="text-[#39ff14] font-mono text-sm tracking-[0.2em] uppercase mb-4">
          03. Open Source
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Days I code.
        </h2>
      </motion.div>

      {/* Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md w-full shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      >
        {/* Scrollable wrapper so it doesn't break mobile screens */}
        <div className="w-full overflow-x-auto flex justify-center pb-8 border-b border-white/5">
          <GitHubCalendar 
            username="sainathmanda7" 
            colorScheme="dark"
            theme={customTheme}
            blockSize={14}
            blockMargin={6}
            fontSize={14}
          />
        </div>

        {/* Extra Stats Container - Vertical Stacking */}
        <div className="flex flex-col gap-8 mt-8 w-full">
          {/* Log Stats */}
          <div className="flex flex-col items-center p-8 rounded-2xl bg-black/20 border border-white/5 transition-colors hover:bg-black/40 w-full">
            <h3 className="text-[#39ff14] font-mono text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></span>
              Log Stats
            </h3>
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api?username=sainathmanda7&show_icons=true&hide_border=true&bg_color=000000&title_color=39ff14&icon_color=39ff14&text_color=9ca3af" 
              alt="GitHub Stats" 
              className="w-full max-w-2xl object-contain filter drop-shadow-lg"
            />
          </div>

          {/* Activity Graph */}
          <div className="flex flex-col items-center p-8 rounded-2xl bg-black/20 border border-white/5 transition-colors hover:bg-black/40 w-full">
            <h3 className="text-[#39ff14] font-mono text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></span>
              Activity Graph
            </h3>
            <img 
              src="https://github-readme-activity-graph.vercel.app/graph?username=sainathmanda7&bg_color=transparent&color=9ca3af&line=8b5cf6&point=ffffff&area=true&hide_border=true" 
              alt="GitHub Activity Graph" 
              className="w-full max-w-4xl object-contain filter drop-shadow-lg"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GithubGraph;