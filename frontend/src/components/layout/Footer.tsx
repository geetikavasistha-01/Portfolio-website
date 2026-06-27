import React from 'react';
import { useUIStore } from '../../store/uiStore';

export default function Footer() {
  const { setCliOpen } = useUIStore();

  const handleCliClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCliOpen(true);
  };

  return (
    <footer className="w-full max-w-[720px] mx-auto px-6 py-12 mt-12 border-t border-border relative z-10">
      {/* Top Links Row */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-xs text-text3">
        <a href="#newsletter" className="hover:text-text1 transition-colors">Newsletter</a>
        <span>·</span>
        <a href="/contact" className="hover:text-text1 transition-colors">Get in Touch</a>
        <span>·</span>
        <a href="mailto:geetika@geekykunoichi.dev" className="hover:text-text1 transition-colors">Email</a>
        <span>·</span>
        <button onClick={handleCliClick} className="hover:text-text1 transition-colors font-mono">
          CLI Console [{'>'}]
        </button>
      </div>

      {/* Bottom Copyright & Socials */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] text-text4">
        <div>
          © 2026 Geetika Vasistha. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/geetikavasisthampy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text1 transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
