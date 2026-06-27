import React from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

const shelfItems = [
  {
    id: 1,
    title: 'Sousou no Frieren',
    category: 'ANIME',
    label: 'EPISODE 28 · ON LOOP',
    caption: 'Quiet melancholy and beautiful pacing.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&h=300&q=80',
    rotate: '-4deg',
    translateX: '-20px'
  },
  {
    id: 2,
    title: 'The Gita & Krishnamurti',
    category: 'BOOK',
    label: 'READING · CH 12',
    caption: 'Dialogue on action without attachment.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&h=300&q=80',
    rotate: '0deg',
    translateX: '0px'
  },
  {
    id: 3,
    title: 'Cyberpunk Edgerunners OST',
    category: 'MUSIC',
    label: 'SPOTIFY ROTATION',
    caption: 'Melodic synths and raw emotional drive.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&h=300&q=80',
    rotate: '4deg',
    translateX: '20px'
  }
];

export default function OnLoop() {
  const { recruiterMode } = useUIStore();

  if (recruiterMode) return null;

  return (
    <div className="w-full flex justify-center items-center py-10 select-none overflow-hidden">
      <div className="flex justify-center items-center relative w-[540px] h-[360px]">
        {shelfItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ rotate: item.rotate, x: item.translateX }}
            whileHover={{
              rotate: '0deg',
              x: parseFloat(item.translateX) * 0.4 + 'px',
              scale: 1.05,
              zIndex: 30,
              transition: { duration: 0.2 }
            }}
            className="absolute bg-white text-zinc-900 border border-zinc-200 rounded-2xl w-[180px] sm:w-[200px] shadow-lg flex flex-col overflow-hidden cursor-pointer origin-bottom"
            style={{ zIndex: 10 + idx }}
          >
            {/* Poster image */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Metadata Footer */}
            <div className="p-4 flex flex-col">
              <span className="text-[9px] tracking-widest text-zinc-400 font-semibold font-mono uppercase">
                {item.category} · {item.label}
              </span>
              <h3 className="text-[13px] font-semibold text-zinc-900 mt-1 truncate">
                {item.title}
              </h3>
              <p className="text-[11px] italic text-zinc-500 mt-0.5 truncate">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
