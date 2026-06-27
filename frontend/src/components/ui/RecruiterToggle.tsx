import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Briefcase } from 'lucide-react';

export default function RecruiterToggle() {
  const { recruiterMode, toggleRecruiterMode } = useUIStore();

  return (
    <button
      onClick={toggleRecruiterMode}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 select-none ${
        recruiterMode
          ? 'bg-amber border-amber text-zinc-950 hover:bg-amber/90'
          : 'bg-surface border-border text-text2 hover:text-text1 hover:bg-surface2'
      }`}
    >
      <Briefcase size={12} />
      <span>{recruiterMode ? 'Recruiter Active' : 'Recruiter Mode'}</span>
    </button>
  );
}
