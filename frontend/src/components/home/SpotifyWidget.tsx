import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Music, Heart } from 'lucide-react';
import { SpotifyTrack } from '../../types';

const defaultTrack: SpotifyTrack = {
  title: 'White Ferrari',
  artist: 'Frank Ocean',
  albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80',
  url: 'https://spotify.com',
  isPlaying: false
};

const rotationTracks = [
  { title: 'Nikes', artist: 'Frank Ocean' },
  { title: 'Introvert', artist: 'Little Simz' },
  { title: 'Space Song', artist: 'Beach House' }
];

export default function SpotifyWidget() {
  const { data: track, isLoading } = useQuery<SpotifyTrack>({
    queryKey: ['spotify-now-playing'],
    queryFn: async () => {
      try {
        const res = await api.get('/spotify/now-playing');
        return res.data;
      } catch {
        return defaultTrack;
      }
    },
    refetchInterval: 30000, // every 30 seconds
    initialData: defaultTrack
  });

  return (
    <div className="w-full mt-10 p-5 rounded-2xl border border-border bg-surface flex flex-col gap-6 select-none">
      
      {/* Currently Playing / Last Played */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="relative w-[52px] h-[52px] rounded-md overflow-hidden bg-surface2 border border-border flex-shrink-0 flex items-center justify-center">
            {isLoading ? (
              <div className="w-full h-full bg-surface2 animate-pulse" />
            ) : (
              <img
                src={track?.albumArt || defaultTrack.albumArt}
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            )}
            {track?.isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="flex gap-0.5 items-end justify-center h-4 w-4">
                  <span className="w-0.5 h-3 bg-green animate-bounce [animation-delay:0.1s]" />
                  <span className="w-0.5 h-4 bg-green animate-bounce [animation-delay:0.3s]" />
                  <span className="w-0.5 h-2 bg-green animate-bounce [animation-delay:0.5s]" />
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-text3 uppercase flex items-center gap-1">
              <Music size={10} className={track?.isPlaying ? "text-green" : ""} />
              {track?.isPlaying ? 'Now Playing' : 'Last Played'}
            </span>
            <a
              href={track?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] font-semibold text-text1 hover:underline truncate max-w-[280px] sm:max-w-[400px] mt-1"
            >
              {track?.title}
            </a>
            <span className="text-xs text-text3 truncate max-w-[280px] sm:max-w-[400px] mt-0.5">
              {track?.artist}
            </span>
          </div>
        </div>
      </div>

      {/* On Rotation Section */}
      <div className="border-t border-border/60 pt-4 flex flex-col gap-2">
        <span className="text-[9px] font-mono tracking-widest text-text4 uppercase flex items-center gap-1">
          <Heart size={10} className="text-rose" />
          On Rotation
        </span>
        <div className="flex flex-col gap-2">
          {rotationTracks.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs text-text3">
              <span className="font-medium hover:text-text1 transition-colors cursor-pointer">
                {item.title}
              </span>
              <span className="text-text4 font-mono text-[10px]">
                {item.artist}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
