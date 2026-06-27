import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Video } from '../../types';

const defaultVideos: Video[] = [
  {
    title: 'Locomotion Gaits for Quadrupeds',
    description: 'Locomotion control testing using Bezier curves and trot gaits for quadruped robots in our SRM labs.',
    category: 'ROBOTICS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&h=100&q=80',
    youtubeUrl: 'https://youtube.com',
    order: 1
  },
  {
    title: 'Sentinel-5P Ingestion Pipeline Walkthrough',
    description: 'Quick walkthrough showing how we ingest and spatial-bin sentinel NetCDF4 files in real-time.',
    category: 'DATA SCIENCE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&h=100&q=80',
    youtubeUrl: 'https://youtube.com',
    order: 2
  }
];

export default function Videos() {
  const { data: videos } = useQuery<Video[]>({
    queryKey: ['videos-featured'],
    queryFn: async () => {
      try {
        const res = await api.get('/videos');
        return res.data;
      } catch {
        return defaultVideos;
      }
    },
    initialData: defaultVideos
  });

  return (
    <div className="w-full mt-6 select-none flex flex-col gap-4">
      {videos.slice(0, 2).map((video, idx) => (
        <a
          key={video._id || idx}
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 p-2 rounded-xl hover:bg-surface2/40 transition-colors duration-300 w-full"
        >
          {/* Thumbnail */}
          <div className="w-[96px] h-[64px] rounded-md overflow-hidden bg-surface2 border border-border flex-shrink-0">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-mono tracking-widest text-text3 uppercase">
              {video.category}
            </span>
            <h4 className="text-sm font-semibold text-text1 truncate mt-0.5">
              {video.title}
            </h4>
            <p className="text-xs text-text3 truncate mt-0.5">
              {video.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
