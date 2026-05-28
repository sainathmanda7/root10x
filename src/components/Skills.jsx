import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiC, SiCplusplus, SiGo, SiPython,
  SiMysql, SiGit, SiDocker, SiLinux, SiKubernetes, SiReact, SiHtml5,
  SiMongodb, SiRedis, SiNginx, SiTerraform, SiPrometheus, SiGrafana,
  SiGithubactions, SiPostman,
} from 'react-icons/si';
import { RiJavaLine, RiCss3Line, RiNodejsLine } from 'react-icons/ri';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Cloud } from 'lucide-react';

/* ─── data ─────────────────────────────────────────────────── */

const categories = [
  {
    id: 'cloud',
    label: 'Cloud & Orchestration',
    dotColor: '#39ff14',
    barColor: '#39ff14',
    skills: [
      { name: 'AWS',       icon: <FaAws />,         pct: 88 },
      { name: 'Kubernetes',icon: <SiKubernetes />,   pct: 82 },
      { name: 'Docker',    icon: <SiDocker />,       pct: 90 },
      { name: 'CI/CD',     icon: <SiGithubactions />,pct: 85 },
      { name: 'Linux/Unix',icon: <SiLinux />,        pct: 92 },
      { name: 'CDN',       icon: <Cloud size={13} />,pct: 75 },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Backend',
    dotColor: '#9b59b6',
    barColor: '#9b59b6',
    skills: [
      { name: 'Golang', icon: <SiGo />,        pct: 91 },
      { name: 'C++',    icon: <SiCplusplus />, pct: 87 },
      { name: 'C',      icon: <SiC />,         pct: 85 },
      { name: 'Java',   icon: <RiJavaLine />,  pct: 80 },
      { name: 'Python', icon: <SiPython />,    pct: 78 },
      { name: 'SQL',    icon: <SiMysql />,     pct: 83 },
    ],
  },
  {
    id: 'web',
    label: 'Web & Tooling',
    dotColor: '#3498db',
    barColor: '#3498db',
    skills: [
      { name: 'React',   icon: <SiReact />,     pct: 79 },
      { name: 'Node.js', icon: <RiNodejsLine />,pct: 77 },
      { name: 'HTML5',   icon: <SiHtml5 />,     pct: 82 },
      { name: 'CSS3',    icon: <RiCss3Line />,  pct: 80 },
      { name: 'Git',     icon: <SiGit />,       pct: 93 },
      { name: 'VS Code', icon: <VscVscode />,   pct: 95 },
    ],
  },
];

const alsoIn = [
  { name: 'MySQL',          icon: <SiMysql /> },
  { name: 'MongoDB',        icon: <SiMongodb /> },
  { name: 'Redis',          icon: <SiRedis /> },
  { name: 'gRPC',           icon: null },
  { name: 'REST',           icon: null },
  { name: 'Nginx',          icon: <SiNginx /> },
  { name: 'Terraform',      icon: <SiTerraform /> },
  { name: 'Prometheus',     icon: <SiPrometheus /> },
  { name: 'Grafana',        icon: <SiGrafana /> },
  { name: 'GitHub Actions', icon: <SiGithubactions /> },
  { name: 'Bash',           icon: null },
  { name: 'Postman',        icon: <SiPostman /> },
];

const logs = [
  { ts: '[init]', path: 'golang/microservices',   status: '✓ RUNNING' },
  { ts: '[pod] ', path: 'k8s/cluster-hyd-01',     status: '✓ HEALTHY' },
  { ts: '[svc] ', path: 'aws/ec2 + rds',           status: '✓ DEPLOYED' },
  { ts: '[build]', path: 'ci/cd pipeline',         status: '✓ PASSING' },
  { ts: '[mem] ', path: 'c++ allocator',           status: '✓ OPTIMIZED' },
];

const tickerItems = [
  'GOLANG','C++','KUBERNETES','AWS','DOCKER','LINUX',
  'JAVA','PYTHON','REACT','CI/CD','MERN STACK','HYDERABAD',
];

/* ─── sub-components ────────────────────────────────────────── */

const SkillBar = ({ pct, color, animate }) => (
  <div className="relative h-[5px] w-24 rounded-sm overflow-hidden bg-[#2a2a2a] flex-shrink-0">
    <div
      className="absolute inset-y-0 left-0 rounded-sm transition-all duration-[1200ms] ease-out"
      style={{
        width: animate ? `${pct}%` : '0%',
        background: color,
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
      }}
    />
  </div>
);

const CategoryCell = ({ cat, animate }) => (
  <div className="bg-[#141414] p-6">
    <div className="flex items-center gap-2 mb-5">
      <div
        className="w-[8px] h-[8px] rounded-full flex-shrink-0"
        style={{ background: cat.dotColor }}
      />
      <span className="font-mono text-sm tracking-[0.18em] text-[#aaa] uppercase">
        {cat.label}
      </span>
    </div>
    <div className="flex flex-col gap-0">
      {cat.skills.map((sk) => (
        <div
          key={sk.name}
          className="flex items-center gap-3 py-[7px] border-b border-[#1c1c1c] last:border-0 group"
        >
          <span className="text-[#555] text-base group-hover:text-[#888] transition-colors">
            {sk.icon}
          </span>
          <span className="flex-1 font-mono text-sm tracking-[0.04em] text-[#ccc] group-hover:text-white transition-colors">
            {sk.name}
          </span>
          <SkillBar pct={sk.pct} color={cat.barColor} animate={animate} />
          <span className="font-mono text-xs text-[#666] w-9 text-right flex-shrink-0">
            {sk.pct}%
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── main component ─────────────────────────────────────────── */

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto z-10"
    >
      {/* ── container ── */}
      <div className="bg-[#0a0a0a] overflow-hidden" style={{ position: 'relative' }}>

        {/* scan lines overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.22) 3px,rgba(0,0,0,0.22) 4px)',
          }}
        />

        <div className="relative z-10 p-8 md:p-10">

          {/* ── header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 border-b border-[#1c1c1c] pb-6"
          >
            <div>
              <p className="font-mono text-sm text-[#39ff14] tracking-[0.25em] mb-2">
                // 01 &nbsp;&nbsp; TECHNICAL_ARSENAL
              </p>
              <h2
                className="text-[52px] sm:text-[60px] leading-none text-white tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                TOOLS OF THE TRADE
                <BlinkCursor />
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pb-1">
              <StatusPill active>● ACTIVE</StatusPill>
              <StatusPill>HYD / IND</StatusPill>
              <StatusPill>BACKEND ENG</StatusPill>
            </div>
          </motion.div>

          {/* ── three columns ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#1c1c1c] border border-[#1c1c1c]"
          >
            {categories.map((cat) => (
              <CategoryCell key={cat.id} cat={cat} animate={inView} />
            ))}
          </motion.div>

          {/* ── bottom panels ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1c1c1c] border border-[#1c1c1c] mt-[1px]"
          >
            {/* also in the stack */}
            <div className="bg-[#141414] p-5">
              <p className="font-mono text-sm text-[#39ff14] tracking-[0.2em] uppercase mb-4 flex items-center gap-1">
                <span className="text-[#2bbd0e]">&gt;</span> Also in the stack
              </p>
              <div className="flex flex-wrap gap-[6px]">
                {alsoIn.map((t) => (
                  <span
                    key={t.name}
                    className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-[#2a2a2a] text-[#777] tracking-wider hover:border-[#1a7a08] hover:text-[#39ff14] transition-colors cursor-default"
                  >
                    {t.icon && <span className="text-sm">{t.icon}</span>}
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* system log */}
            <div className="bg-[#141414] p-5">
              <p className="font-mono text-sm text-[#39ff14] tracking-[0.2em] uppercase mb-4 flex items-center gap-1">
                <span className="text-[#2bbd0e]">&gt;</span> System log
              </p>
              <div className="flex flex-col gap-[2px]">
                {logs.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="font-mono text-sm leading-[2]"
                  >
                    <span className="text-[#333]">{l.ts}</span>{' '}
                    <span className="text-[#5dade2]">{l.path}</span>{' '}
                    <span className="text-[#39ff14]">{l.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── ticker ── */}
          <div className="overflow-hidden border-t border-[#1c1c1c] mt-[1px] py-[6px]">
            <div
              className="whitespace-nowrap inline-block"
              style={{ animation: 'skillsTicker 28s linear infinite' }}
            >
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="font-mono text-xs text-[#444] tracking-[0.15em] mr-12">
                  {item} <span className="text-[#2bbd0e]">■</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ticker keyframe — inject once */}
      <style>{`
        @keyframes skillsTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

/* ─── tiny helpers ───────────────────────────────────────────── */

const BlinkCursor = () => (
  <span
    className="inline-block ml-1 align-baseline"
    style={{
      color: '#39ff14',
      animation: 'blink 1.1s step-end infinite',
      fontSize: '0.9em',
    }}
  >
    _
    <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
  </span>
);

const StatusPill = ({ children, active }) => (
  <span
    className="font-mono text-xs px-3 py-1.5 tracking-[0.1em] uppercase"
    style={
      active
        ? {
            background: 'rgba(57,255,20,0.10)',
            color: '#39ff14',
            border: '1px solid #1a7a08',
          }
        : {
            background: 'rgba(255,255,255,0.03)',
            color: '#555',
            border: '1px solid #1c1c1c',
          }
    }
  >
    {children}
  </span>
);

export default Skills;
