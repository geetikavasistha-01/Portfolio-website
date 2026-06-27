import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useUIStore } from '../store/uiStore';
import GlanceCard from '../components/ui/GlanceCard';
import SectionAccent from '../components/ui/SectionAccent';
import { Project, WorkExperience, BlogPost, GlanceSettings, SpotifyTrack } from '../types';
import { Sun, Moon, Calendar, Mail, ChevronDown, ChevronUp, Music, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiMedium, SiHashnode, SiPython, SiFastapi, SiScikitlearn, SiReact, SiTypescript, SiMongodb, SiDocker } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Mock generation for contributions
const generateMockTealContributions = () => {
  const weeks = [];
  const today = new Date();
  let totalContributions = 0;

  for (let w = 51; w >= 0; w--) {
    const contributionDays = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (w * 7) + d;
      const dayDate = new Date(today.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      const rand = Math.random();
      let count = 0;
      let color = '0';
      if (rand > 0.75) {
        count = Math.floor(Math.random() * 3) + 1;
        color = count.toString();
      } else if (rand > 0.95) {
        count = Math.floor(Math.random() * 6) + 4;
        color = '4';
      }
      totalContributions += count;
      contributionDays.push({ count, date: dayDate.toISOString(), color });
    }
    weeks.unshift({ contributionDays });
  }
  return { totalContributions, weeks };
};

const toolkitIconMap: { [key: string]: any } = {
  python: SiPython,
  fastapi: SiFastapi,
  scikitlearn: SiScikitlearn,
  react: SiReact,
  typescript: SiTypescript,
  mongodb: SiMongodb,
  docker: SiDocker
};

export default function Glance() {
  const { theme, toggleTheme } = useUIStore();
  const [expandedWorkId, setExpandedWorkId] = useState<string | null>(null);
  const [showMoreSocials, setShowMoreSocials] = useState(false);
  const [hoveredContrDay, setHoveredContrDay] = useState<{ count: number; date: string } | null>(null);

  // Queries
  const { data: settings } = useQuery<GlanceSettings>({
    queryKey: ['glance-settings'],
    queryFn: async () => {
      const res = await api.get('/glance/settings');
      return res.data;
    }
  });

  const { data: experiences = [] } = useQuery<WorkExperience[]>({
    queryKey: ['glance-work'],
    queryFn: async () => {
      const res = await api.get('/glance/work');
      return res.data;
    }
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['glance-projects'],
    queryFn: async () => {
      const res = await api.get('/glance/projects');
      return res.data;
    }
  });

  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['glance-posts'],
    queryFn: async () => {
      const res = await api.get('/glance/posts');
      return res.data;
    }
  });

  const { data: spotify } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing-glance'],
    queryFn: async () => {
      const res = await api.get('/spotify/now-playing');
      return res.data;
    },
    refetchInterval: 30000
  });

  const contributions = generateMockTealContributions();

  const tealColors = [
    'bg-zinc-900 border border-zinc-800/40',
    'bg-[#0d3d3d] border border-[#0d3d3d]/10',
    'bg-[#006d6d] border border-[#006d6d]/10',
    'bg-[#00a0a0] border border-[#00a0a0]/10',
    'bg-[#00d4d4] border border-[#00d4d4]/10'
  ];

  const handleToggleAccordion = (id: string) => {
    setExpandedWorkId(expandedWorkId === id ? null : id);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-bg text-text1 py-12 px-4 select-none relative">
      <div className="max-w-[900px] mx-auto flex flex-col">
        
        {/* CARD 1: HERO */}
        <GlanceCard className="relative overflow-visible p-0 pb-6 border-zinc-800/40">
          {/* Banner Container */}
          <div className="relative w-full h-[180px] rounded-t-2xl overflow-hidden bg-zinc-800">
            {settings?.bannerUrlTech ? (
              <img src={settings.bannerUrlTech} alt="Technical Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-zinc-900 to-zinc-800" />
            )}
            
            {/* Standalone Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Avatar overlapping */}
            <img
              src="/illustration - about page Background Removed.png"
              alt="Avatar"
              className="absolute bottom-[-40px] left-5 w-[80px] h-[80px] rounded-xl border-[3px] border-[#111115] bg-[#1a1a1c] object-cover shadow-lg"
            />
          </div>

          {/* Details below banner */}
          <div className="mt-14 px-6 flex flex-col">
            <div className="flex items-baseline">
              <h1 className="text-2xl font-semibold text-text1">Geetika Vasistha</h1>
              <span className="text-sm text-text3 ml-2">@geekykunoichi</span>
            </div>

            <p className="text-sm text-text3 mt-1 font-medium">
              ML Engineer · Data Scientist · Builder
            </p>

            <p className="text-sm text-zinc-300 mt-3 leading-relaxed max-w-[700px]">
              {settings?.bioTech || 'Building quadruped navigation controllers and robust ML pipelines. Driven by data systems, latency tuning, and clean software architecture.'}
            </p>

            {/* CTA buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://cal.com/geekykunoichi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                <Calendar size={14} />
                Let's talk
              </a>
              <a
                href="mailto:geetika@geekykunoichi.dev"
                className="border border-zinc-700 hover:border-zinc-500 text-text2 hover:text-text1 rounded-full px-5 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail size={14} />
                Drop a mail
              </a>
            </div>

            {/* Social pills */}
            <div className="mt-6">
              <span className="text-sm text-text3">
                Find me on the <strong className="text-text1 font-semibold">internet</strong>
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href="https://github.com/geetikavasistha-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaGithub size={13} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/geetikavasisthampy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaLinkedin size={13} />
                  LinkedIn
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                >
                  <FaXTwitter size={13} />
                  Twitter
                </a>

                {/* More/Less toggle */}
                <button
                  onClick={() => setShowMoreSocials(!showMoreSocials)}
                  className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                >
                  {showMoreSocials ? '≡ Less' : '≡ More'}
                </button>

                <AnimatePresence>
                  {showMoreSocials && (
                    <>
                      <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        href="https://medium.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                      >
                        <SiMedium size={13} />
                        Medium
                      </motion.a>
                      <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        href="https://hashnode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 bg-surface/30 rounded-full px-4 py-2 text-xs text-text2 hover:text-text1 transition-all"
                      >
                        <SiHashnode size={13} />
                        Hashnode
                      </motion.a>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Listening widget */}
            <div className="mt-6">
              <span className="text-sm text-text3">
                Recently <strong className="text-text1 font-semibold">listening</strong>
              </span>
              <div className="bg-surface2 rounded-xl p-4 flex items-center gap-3 mt-3 border border-border/40 relative overflow-hidden max-w-[450px]">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 flex items-center justify-center">
                  <img src={spotify?.albumArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80'} alt="Album Art" className="w-full h-full object-cover" />
                  {spotify?.isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="flex gap-0.5 items-end justify-center h-4 w-4">
                        <span className="w-0.5 h-2.5 bg-green-400 animate-bounce [animation-delay:0.1s]" />
                        <span className="w-0.5 h-3.5 bg-green-400 animate-bounce [animation-delay:0.3s]" />
                        <span className="w-0.5 h-2 bg-green-400 animate-bounce [animation-delay:0.5s]" />
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Music size={11} className={spotify?.isPlaying ? "text-green-400" : "text-text3"} />
                    <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-semibold">
                      {spotify?.isPlaying ? 'Now Playing' : 'Last Played'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-text1 truncate mt-0.5">{spotify?.title || 'White Ferrari'}</h4>
                  <p className="text-xs text-text3 truncate">{spotify?.artist || 'Frank Ocean'}</p>
                </div>
                <a
                  href={spotify?.spotifyUrl || spotify?.url || 'https://spotify.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text3 hover:text-text1 transition-colors p-1"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Toolkit */}
            <div className="mt-6">
              <span className="text-sm text-text3">
                My everyday <strong className="text-text1 font-semibold">toolkit</strong>
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {settings?.toolkitItems.map((item) => {
                  const IconComponent = toolkitIconMap[item.iconSlug.toLowerCase()];
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 bg-surface2 border border-border/60 rounded-full px-4 py-2 text-xs text-text2 font-mono"
                    >
                      {IconComponent && <IconComponent size={14} className="text-text3" />}
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </GlanceCard>

        {/* CARD 2: CONTRIBUTIONS */}
        <GlanceCard className="border-zinc-800/40">
          <div className="flex items-center gap-2 mb-4 text-base font-semibold text-text1">
            <FaGithub size={16} />
            <span>Contributions @geekykunoichi</span>
          </div>

          <div className="overflow-x-auto w-full pb-2">
            <div className="flex gap-[3px] min-w-[700px]">
              {contributions.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dIdx) => {
                    const level = Math.min(Math.max(parseInt(day.color || '0'), 0), 4);
                    return (
                      <div
                        key={dIdx}
                        className={`w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 cursor-pointer ${tealColors[level]}`}
                        onMouseEnter={() => setHoveredContrDay({ count: day.count, date: day.date })}
                        onMouseLeave={() => setHoveredContrDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-text3 font-mono mt-3">
            <div>
              {contributions.totalContributions} contributions in the last year
            </div>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-900 border border-zinc-800/40" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-[#0d3d3d]" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-[#006d6d]" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00a0a0]" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00d4d4]" />
              <span>More</span>
            </div>
          </div>

          {hoveredContrDay && (
            <div className="absolute bg-surface2 border border-border text-[10px] font-mono text-text1 px-2.5 py-1 rounded-md shadow-md z-20 mt-1">
              {hoveredContrDay.count} contribution{hoveredContrDay.count !== 1 && 's'} · {formatDate(hoveredContrDay.date)}
            </div>
          )}
        </GlanceCard>

        {/* CARD 3: WHERE I'VE WORKED */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="Where I've worked" color="blue" />

          <div className="flex flex-col gap-2 mt-4">
            {experiences.map((exp) => {
              const isExpanded = expandedWorkId === exp._id;
              const dateString = exp.endDate
                ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) + ' – ' + new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) + ' – PRESENT';

              return (
                <div key={exp._id} className="bg-surface2/60 border border-border/30 rounded-xl overflow-hidden">
                  <div
                    onClick={() => handleToggleAccordion(exp._id || '')}
                    className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-surface2 transition-all select-none"
                  >
                    <div>
                      <span className="text-base font-semibold text-text1">{exp.company}</span>
                      <span className="text-[10px] border border-zinc-700 rounded-full px-2.5 py-0.5 text-text3 ml-2 capitalize font-mono">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right hidden sm:block mr-2">
                        <span className="text-sm text-text3">{dateString}</span>
                        <div className="text-[10px] text-text4">{exp.location}</div>
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-text3" /> : <ChevronDown size={16} className="text-text3" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-border/20">
                          <ul className="space-y-2 mt-3 text-xs leading-relaxed text-text2">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-text3">—</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {exp.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] bg-zinc-800 border border-zinc-700/50 rounded-md px-2 py-0.5 text-zinc-300 font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <a
            href="/work"
            className="mx-auto block mt-6 border border-zinc-700 hover:border-zinc-500 rounded-full px-6 py-2 text-sm text-text2 hover:text-text1 text-center max-w-[220px] transition-all"
          >
            View full experience ↗
          </a>
        </GlanceCard>

        {/* CARD 4: THINGS I'VE BUILT */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="Things I've built" color="green" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {projects.map((project) => (
              <div key={project._id} className="bg-surface2/60 border border-border/40 rounded-xl overflow-hidden flex flex-col h-full hover:scale-[1.02] transition-all">
                <div className="w-full h-[150px] overflow-hidden bg-zinc-900 border-b border-border/20">
                  <img
                    src={project.featuredImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=200&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base font-mono font-bold text-text1">{project.title}</h3>
                    <p className="text-xs text-text3 mt-1 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={`/projects/${project.slug}`}
                      className="text-xs text-teal-400 hover:text-teal-300 font-medium hover:underline flex items-center gap-0.5"
                    >
                      View Project ↗
                    </a>
                    <div className="flex gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[8px] bg-zinc-800 border border-zinc-700/50 rounded px-1.5 py-0.5 text-zinc-400 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlanceCard>

        {/* CARD 5: THOUGHTS & WRITING */}
        <GlanceCard className="border-zinc-800/40">
          <SectionAccent title="Thoughts & Writing" color="purple" />

          <div className="flex flex-col mt-4">
            {posts.map((post) => (
              <a
                key={post._id}
                href={`/blog/${post.slug}`}
                className="flex gap-4 items-start py-4 border-b border-border last:border-0 hover:bg-surface2/30 px-2 rounded-lg transition-colors group"
              >
                <img
                  src={post.coverImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&h=150&q=80'}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-800 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-text1 leading-snug group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h4>
                  <div className="text-[10px] text-text3 mt-1 flex items-center gap-1.5 font-mono">
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'June 19, 2026'}</span>
                    <span>·</span>
                    <span>🕐 {post.readTime || 5} min</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[8px] border border-zinc-800 rounded-full px-2 py-0.5 text-text3 uppercase font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-text4 group-hover:text-text2 group-hover:translate-x-0.5 transition-all text-xs">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <a
            href="/blog"
            className="mx-auto block mt-6 border border-zinc-700 hover:border-zinc-500 rounded-full px-6 py-2 text-sm text-text2 hover:text-text1 text-center max-w-[220px] transition-all"
          >
            Read all posts ↗
          </a>
        </GlanceCard>

        {/* ORNAMENTAL DIVIDER */}
        <div className="flex items-center gap-3 my-8 justify-center select-none">
          <div className="w-12 h-px bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="w-12 h-px bg-zinc-800" />
        </div>

        {/* QUOTE */}
        <div className="text-center italic font-display text-text3 text-lg">
          "{settings?.latestQuoteTech || 'precision finds pattern'}"
        </div>

        {/* CTA BLOCK */}
        <div className="text-center mt-6 flex flex-col items-center">
          <span className="text-[9px] font-mono tracking-widest text-text4 uppercase">
            EXPLORE THE FULL EXPERIENCE
          </span>
          <a
            href="/"
            className="bg-zinc-800 hover:bg-zinc-700 text-text1 rounded-full px-8 py-3 text-sm font-medium mt-3 inline-flex items-center gap-1.5 transition-all"
          >
            Full Portfolio ↗
          </a>
          <a
            href="/human"
            className="text-xs text-text3 hover:text-text1 mt-3 transition-colors underline"
          >
            or see the non-code side ↗
          </a>
        </div>

        {/* PAGE FOOTER */}
        <div className="text-center text-[10px] text-text4 mt-12 font-mono">
          crafted with curiosity —{' '}
          <a href="https://github.com/geetikavasistha-01" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            @geekykunoichi
          </a>
        </div>

      </div>
    </div>
  );
}
