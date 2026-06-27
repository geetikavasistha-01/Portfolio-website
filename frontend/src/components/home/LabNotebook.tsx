import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const mockDrafts = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    date: '14 jun',
    title: 'Model Convergence Log'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    date: '02 jun',
    title: 'Distributed Architecture Sketch'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    date: '28 may',
    title: 'Spatial Heatmap Iteration'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80',
    date: '15 may',
    title: 'Sentinel-5P Band Math'
  }
];

export default function LabNotebook() {
  const { recruiterMode } = useUIStore();
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % mockDrafts.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + mockDrafts.length) % mockDrafts.length);
  };

  if (recruiterMode) return null;

  // Let's create a fanned/centered list of 3 visible items.
  // We align them based on the current index: index, index+1, index+2.
  const visibleItems = [
    mockDrafts[index],
    mockDrafts[(index + 1) % mockDrafts.length],
    mockDrafts[(index + 2) % mockDrafts.length]
  ];

  return (
    <div className="w-full mt-4 select-none relative">
      {/* Header controls inside title area if needed, or overlay */}
      <div className="flex gap-2 justify-end absolute -top-12 right-0">
        <button
          onClick={prev}
          className="p-1.5 rounded-full border border-border bg-surface hover:bg-surface2 text-text2 hover:text-text1 transition-colors"
          aria-label="Previous Draft"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="p-1.5 rounded-full border border-border bg-surface hover:bg-surface2 text-text2 hover:text-text1 transition-colors"
          aria-label="Next Draft"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid Peek List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface2 border border-border"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            />
            {/* Dark overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Notebook tag (bottom-left) */}
            <div className="absolute bottom-3 left-3 text-[9px] font-semibold tracking-widest text-white/90 uppercase">
              NOTEBOOK
            </div>

            {/* Date (bottom-right) */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-400">
              {item.date}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
