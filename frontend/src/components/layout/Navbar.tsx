import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/utils';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ClockDropdown from './ClockDropdown';

const getFormattedTime = () => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date()).toLowerCase();
};

function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function Navbar() {
  const location = useLocation();

  // Exclude main navbar from glance and human pages
  if (location.pathname === '/glance' || location.pathname === '/human') {
    return null;
  }

  const { theme, toggleTheme, recruiterMode } = useUIStore();
  const [time, setTime] = useState(getFormattedTime());
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close clock dropdown on outside click
  useOnClickOutside(clockRef, () => setIsClockOpen(false));

  // Close clock dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsClockOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    ...(!recruiterMode ? [{ label: 'Shelf', path: '/shelf' }] : []),
    { label: 'AMA', path: '/ama' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 select-none">
        <div className="inline-flex items-center gap-1 px-2 py-2 rounded-full bg-[#111113]/80 backdrop-blur-md border border-zinc-800 shadow-lg">
          
          {/* Clock Pill with Dropdown */}
          <div className="relative" ref={clockRef}>
            <button
              onClick={() => setIsClockOpen(prev => !prev)}
              className={cn(
                "px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700",
                "text-sm text-zinc-300 font-mono cursor-pointer transition-all",
                isClockOpen && "ring-2 ring-blue-500 ring-offset-1 ring-offset-[#111113]"
              )}
            >
              {time}
            </button>
            
            <AnimatePresence>
              {isClockOpen && (
                <ClockDropdown time={time} onClose={() => setIsClockOpen(false)} />
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1 rounded-full text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all duration-200",
                    isActive && "bg-zinc-800 text-zinc-100 font-medium"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1">
            {/* Recruiter indicator */}
            {recruiterMode && (
              <span className="hidden sm:inline text-[9px] font-mono uppercase bg-amber/10 border border-amber/30 text-amber px-2 py-1 rounded-full ml-1">
                Recruiter
              </span>
            )}

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex w-8 h-8 rounded-full items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="md:hidden mt-2 p-4 rounded-2xl border border-zinc-800 bg-[#111113]/90 backdrop-blur-lg shadow-xl flex flex-col gap-1 w-[240px] absolute right-0"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-xs px-3 py-2 rounded-xl text-zinc-400 transition-all hover:text-zinc-100 hover:bg-white/5 flex items-center justify-between",
                      isActive && "text-zinc-100 bg-zinc-800 font-medium"
                    )
                  }
                >
                  {item.label}
                  {location.pathname === item.path && <span className="w-1 h-1 rounded-full bg-zinc-100"></span>}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
