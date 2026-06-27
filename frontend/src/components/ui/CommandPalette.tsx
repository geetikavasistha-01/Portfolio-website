import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchItem {
  title: string;
  category: 'pages' | 'projects' | 'blog';
  path: string;
  subtitle?: string;
}

const searchItems: SearchItem[] = [
  { title: 'Home', category: 'pages', path: '/' },
  { title: 'Work Experience', category: 'pages', path: '/work', subtitle: 'Internships and roles' },
  { title: 'About Geetika', category: 'pages', path: '/about', subtitle: 'Journey, skills, and philosophy' },
  { title: 'Projects Catalog', category: 'pages', path: '/projects', subtitle: 'Things I have built' },
  { title: 'Technical Journal', category: 'pages', path: '/blog', subtitle: 'Articles and writings' },
  { title: 'On Loop Shelf', category: 'pages', path: '/shelf', subtitle: 'Anime and readings recommendations' },
  { title: 'AMA Portal', category: 'pages', path: '/ama', subtitle: 'Questions and answers queue' },
  { title: 'Get In Touch', category: 'pages', path: '/contact', subtitle: 'Direct contact link' },
  // Projects
  { title: 'TokenLens', category: 'projects', path: '/projects/tokenlens', subtitle: 'token intelligence SaaS' },
  { title: 'ISRO Sentinel Pipeline', category: 'projects', path: '/projects/isro-sentinel-pipeline', subtitle: 'Copernicus NetCDF4 spatial ingestion' },
  { title: 'EthicalTwin Research', category: 'projects', path: '/projects/ethicaltwin-governance', subtitle: 'XGBoost governance model' },
  // Blogs
  { title: 'Attention Is All You Need (To Understand)', category: 'blog', path: '/blog/understanding-attention-mechanisms', subtitle: 'Transformer attention math' },
  { title: 'Spatial NetCDF4 pipelines for Sentinel-5P', category: 'blog', path: '/blog/spatial-netcdf4-sentinel-pipeline', subtitle: 'binning NetCDF files' },
  { title: 'Gait controllers for Quadruped Locomotion', category: 'blog', path: '/blog/low-latency-gait-controllers-quadrupeds', subtitle: 'Bezier trot controller loops' }
];

export default function CommandPalette() {
  const { cmdPaletteOpen, setCmdPaletteOpen } = useUIStore();
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(!cmdPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmdPaletteOpen, setCmdPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (cmdPaletteOpen) {
      setSearch('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [cmdPaletteOpen]);

  const filtered = searchItems.filter((item) => {
    const text = `${item.title} ${item.subtitle || ''} ${item.category}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((prev) => (prev - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[index];
      if (target) {
        navigate(target.path);
        setCmdPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      setCmdPaletteOpen(false);
    }
  };

  if (!cmdPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 bg-black/60 backdrop-blur-sm p-4 select-none">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={() => setCmdPaletteOpen(false)} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative bg-surface border border-border rounded-xl w-full max-w-[500px] shadow-2xl flex flex-col overflow-hidden max-h-[380px] z-10"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
            <Search size={16} className="text-text3" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search anything (pages, projects, logs...)"
              className="bg-transparent border-none outline-none text-xs text-text2 placeholder-text4 w-full"
            />
            <span className="text-[9px] font-mono border border-border rounded px-1.5 py-0.5 text-text4 flex-shrink-0">
              ESC
            </span>
          </div>

          {/* Results queue */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-xs text-text4 font-mono">
                No matching results.
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isActive = idx === index;
                return (
                  <button
                    key={item.path + idx}
                    onMouseEnter={() => setIndex(idx)}
                    onClick={() => {
                      navigate(item.path);
                      setCmdPaletteOpen(false);
                    }}
                    className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors select-none ${
                      isActive ? 'bg-surface2 text-text1' : 'text-text3'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.category === 'pages' ? (
                        <FileText size={14} className="text-text4 flex-shrink-0" />
                      ) : (
                        <Sparkles size={14} className="text-purple-400 flex-shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold truncate">
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="text-[10px] text-text4 truncate mt-0.5">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-semibold tracking-wider font-mono text-text4 border border-border px-1.5 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      {isActive && <CornerDownLeft size={10} className="text-text3" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
