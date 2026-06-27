import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function GitHubHeatmap() {
  const { data } = useQuery<{ totalContributions: number }>({
    queryKey: ['github-contributions-count'],
    queryFn: async () => {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/geetikavasistha-01');
        if (!res.ok) throw new Error('API request failed');
        const json = await res.json();
        
        // Calculate contributions in the last 365 days
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        
        let total = 0;
        if (json && Array.isArray(json.contributions)) {
          json.contributions.forEach((day: { date: string; count: number }) => {
            const dayDate = new Date(day.date);
            if (dayDate >= oneYearAgo && dayDate <= today) {
              total += day.count;
            }
          });
        }
        return { totalContributions: total || 469 };
      } catch (err) {
        console.error('Error fetching live GitHub contributions:', err);
        return { totalContributions: 469 }; // Fallback
      }
    },
    initialData: { totalContributions: 469 }
  });

  return (
    <div className="w-full mt-6 select-none relative">
      <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d1117] flex flex-col gap-4">
        {/* Live GitHub Stats Cards Grid */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-center items-center bg-[#0d1117] p-2.5 rounded-xl border border-zinc-800 shadow-inner hover:border-blue-500/50 transition-all duration-300">
              <img
                src="https://github-readme-stats.vercel.app/api?username=geetikavasistha-01&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=3B82F6&icon_color=3B82F6&text_color=94A3B8"
                alt="GitHub Stats Card"
                className="w-full max-h-[195px] object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="flex justify-center items-center bg-[#0d1117] p-2.5 rounded-xl border border-zinc-800 shadow-inner hover:border-blue-500/50 transition-all duration-300">
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=geetikavasistha-01&layout=compact&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=3B82F6&text_color=94A3B8"
                alt="Top Languages Card"
                className="w-full max-h-[195px] object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex justify-center items-center bg-[#0d1117] p-2.5 rounded-xl border border-zinc-800 shadow-inner hover:border-blue-500/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <img
                src="https://streak-stats.demolab.com?user=geetikavasistha-01&theme=github-dark-blue&hide_border=true&background=0d1117&dates=475569&ring=3B82F6&fire=3B82F6&currStreakLabel=94A3B8&sideLabels=475569&currStreakNum=94A3B8&sideNums=94A3B8"
                alt="GitHub Streak Card"
                className="w-full max-h-[195px] object-contain"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="flex justify-center items-center bg-[#0d1117] p-2.5 rounded-xl border border-zinc-800 shadow-inner w-full hover:border-blue-500/50 transition-all duration-300">
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=geetikavasistha-01&bg_color=0d1117&color=475569&line=3B82F6&point=94A3B8&area=true&area_color=1e3a5f&hide_border=true"
              alt="GitHub Activity Graph"
              className="w-full h-auto min-h-[180px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Heatmap Footer Legend / Monospace Label */}
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono border-t border-zinc-800/60 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>
              {data?.totalContributions ?? 469} contributions in the last year
            </span>
          </div>
          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <span>@geetikavasistha-01</span>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
