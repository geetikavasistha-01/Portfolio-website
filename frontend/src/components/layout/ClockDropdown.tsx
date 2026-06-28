import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { ExternalLink, Mail, Calendar } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SpotifyTrack } from '../../types';

interface ClockDropdownProps {
  time: string;
  onClose: () => void;
}

export default function ClockDropdown({ time, onClose }: ClockDropdownProps) {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return 'good morning';
    if (hour >= 12 && hour < 17) return 'good afternoon';
    if (hour >= 17 && hour < 21) return 'good evening';
    return 'good night';
  };

  const getFormattedDate = () => {
    const date = new Date();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = date.getDate();
    return `${weekday}, ${month} ${day}`;
  };

  const { data: track, isLoading, isError } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing-dropdown'],
    queryFn: async () => {
      const res = await api.get('/spotify/now-playing');
      return res.data;
    },
    refetchInterval: 30000,
  });

  const isPlaying = track?.isPlaying ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[calc(100%+8px)] left-0 w-[340px] z-[100] bg-[#1a1a1c] border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/60 text-left select-none"
    >
      {/* Section 1: Greeting + Date + Time */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">{getGreeting()}</h3>
          <p className="text-sm text-zinc-500 mt-0.5">{getFormattedDate()}</p>
        </div>
        <div className="text-xl font-semibold text-zinc-100 font-mono tabular-nums">
          {time}
        </div>
      </div>

      <hr className="border-zinc-800 my-4" />

      {/* Section 2: Spotify Last Played / Now Playing */}
      <div>
        <div className="text-[10px] tracking-[0.18em] uppercase text-zinc-500 mb-3 flex items-center">
          {isPlaying ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block mr-1.5" />
              NOW PLAYING
            </>
          ) : (
            'LAST PLAYED'
          )}
        </div>

        {isLoading || isError || !track ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-zinc-800 rounded-lg animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-32 h-3 bg-zinc-800 rounded animate-pulse" />
              <div className="w-20 h-2.5 bg-zinc-800 rounded mt-1.5 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={track.albumArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80'}
              alt={track.title}
              className="w-11 h-11 rounded-lg object-cover bg-zinc-800 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-zinc-100 truncate">{track.title}</h4>
              <p className="text-xs text-zinc-500 mt-0.5 truncate">{track.artist}</p>
            </div>
            <a
              href={track.spotifyUrl || track.url || 'https://open.spotify.com/track/2LMkwUjfZ4e6JTYYqyqu23'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4 text-green-400 hover:text-green-300 flex-shrink-0 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>

      <hr className="border-zinc-800 my-4" />

      {/* Section 3: Social Icons + Theme Toggle */}
      <div className="flex items-center justify-between">
        {/* Left Side: Socials */}
        <div className="flex gap-1">
          <a
            href="https://github.com/GeekyKunoichi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://twitter.com/geekykunoichi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FaXTwitter size={16} />
          </a>
          <a
            href="https://linkedin.com/in/geetikavasistha"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="mailto:geetika@geekykunoichi.dev"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://cal.com/geekykunoichi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Calendar size={16} />
          </a>
        </div>
      </div>

      {/* iOS sheet handle decoration */}
      <div className="w-8 h-1 bg-zinc-700 rounded-full mx-auto mt-4" />
    </motion.div>
  );
}
