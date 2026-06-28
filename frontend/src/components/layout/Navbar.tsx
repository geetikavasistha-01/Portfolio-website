import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/utils';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ClockDropdown from './ClockDropdown';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { SpotifyTrack } from '../../types';
import { useDarkModeRipple } from '../../hooks/useDarkModeRipple';

interface NavbarProps {
  rootRef: React.RefObject<HTMLElement>;
}

const getFormattedTime = () => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date()).toLowerCase();
};

const getDelhiTime = () => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date());
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

export default function Navbar({ rootRef }: NavbarProps) {
  const location = useLocation();

  // Exclude main navbar from glance and human pages
  if (location.pathname === '/glance' || location.pathname === '/human') {
    return null;
  }

  const { theme, recruiterMode } = useUIStore();
  const { toggle: toggleThemeAnimation } = useDarkModeRipple(rootRef);
  const [time, setTime] = useState(getFormattedTime());
  const [delhiTime, setDelhiTime] = useState(getDelhiTime());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  // Update original clock time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update Delhi local time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDelhiTime(getDelhiTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Spotify status
  const { data: spotifyTrack } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing-nav'],
    queryFn: async () => {
      try {
        const res = await api.get('/spotify/now-playing');
        return res.data;
      } catch (err) {
        console.error('Error fetching navbar Spotify status:', err);
        return null;
      }
    },
    refetchInterval: 30000
  });

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
        <div 
          className={cn(
            "inline-flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 shadow-lg",
            isScrolled 
              ? (theme === 'dark' ? 'border-zinc-800' : 'border-zinc-300') 
              : 'border-transparent shadow-none'
          )}
          style={{
            background: isScrolled
              ? (theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.6)')
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease'
          }}
        >
          
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
          <div className="flex items-center gap-1.5">
            {/* Spotify Now Playing Link */}
            {spotifyTrack && spotifyTrack.isPlaying && (
              <a
                href={spotifyTrack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-green hover:underline max-w-[100px] sm:max-w-[140px] transition-all duration-200 flex-shrink-0 ml-1"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" className="text-green flex-shrink-0 animate-pulse">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.076-.336.136-.668.47-.744 3.856-.88 7.15-.506 9.82.1.295.18.387.563.207.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.182-.413.125-.847-.11-.972-.522-.125-.413.11-.847.522-.972 3.666-1.112 8.24-.57 11.35 1.344.366.226.486.708.26 1.072zm.106-2.833C14.737 8.922 9.475 8.747 6.423 9.673c-.466.14-.96-.12-.1-.587-.14-.465.12-.96.587-1.1 3.518-1.07 9.324-.87 12.98 1.3 0.42.25.56.79.31 1.21-.25.42-.79.56-1.21.31z"/>
                </svg>
                <span className="truncate">{spotifyTrack.title}</span>
              </a>
            )}

            {/* Delhi Time */}
            <span className="text-xs text-zinc-400 font-mono select-none px-2 flex-shrink-0">
              {delhiTime}
            </span>

            {/* Recruiter indicator */}
            {recruiterMode && (
              <span className="hidden sm:inline text-[9px] font-mono uppercase bg-amber/10 border border-amber/30 text-amber px-2 py-1 rounded-full ml-1">
                Recruiter
              </span>
            )}

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleThemeAnimation}
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
