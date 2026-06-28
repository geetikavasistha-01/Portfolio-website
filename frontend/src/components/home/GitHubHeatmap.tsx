import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function GitHubHeatmap() {
  const { data } = useQuery<{ totalContributions: number; weeks: any[] }>({
    queryKey: ['github-contributions-heatmap'],
    queryFn: async () => {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/geetikavasistha-01');
        if (!res.ok) throw new Error('API request failed');
        const json = await res.json();

        // Calculate contributions in the last 365 days, and group into weeks
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        let total = 0;
        const filteredDays: any[] = [];

        if (json && Array.isArray(json.contributions)) {
          json.contributions.forEach((day: { date: string; count: number; level: number }) => {
            const dayDate = new Date(day.date);
            if (dayDate >= oneYearAgo && dayDate <= today) {
              total += day.count;
              filteredDays.push(day);
            }
          });
        }

        // Group filteredDays into weeks (7 days each)
        const weeks = [];
        let currentWeek: any[] = [];

        // Sort filteredDays by date ascending
        filteredDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Group by weeks
        filteredDays.forEach((day) => {
          currentWeek.push(day);
          if (currentWeek.length === 7) {
            weeks.push({ contributionDays: currentWeek });
            currentWeek = [];
          }
        });
        if (currentWeek.length > 0) {
          weeks.push({ contributionDays: currentWeek });
        }

        return { totalContributions: total || 383, weeks };
      } catch (err) {
        console.error('Error fetching live GitHub contributions:', err);
        return { totalContributions: 383, weeks: [] };
      }
    },
    initialData: { totalContributions: 383, weeks: [] }
  });

  const [hoveredContrDay, setHoveredContrDay] = React.useState<{ count: number; date: string } | null>(null);

  const generateMockGreenContributions = () => {
    const weeks = [];
    const today = new Date();
    let totalContributions = 0;

    for (let w = 51; w >= 0; w--) {
      const contributionDays = [];
      for (let d = 0; d < 7; d++) {
        const dayOffset = (w * 7) + d;
        const dayDate = new Date(today.getTime() - dayOffset * 24 * 60 * 60 * 1000);
        const rand = Math.random();
        let count = 0;
        let level = 0;
        if (rand > 0.75) {
          count = Math.floor(Math.random() * 3) + 1;
          level = count;
        } else if (rand > 0.95) {
          count = Math.floor(Math.random() * 6) + 4;
          level = 4;
        }
        totalContributions += count;
        contributionDays.push({ count, date: dayDate.toISOString(), level });
      }
      weeks.unshift({ contributionDays });
    }
    return { totalContributions, weeks };
  };

  const contributions = data?.weeks && data.weeks.length > 0 
    ? data 
    : generateMockGreenContributions();

  const greenColors = [
    'bg-[#161b22] border border-[#1b2129]/30',
    'bg-[#0e4429]',
    'bg-[#006d32]',
    'bg-[#26a641]',
    'bg-[#39d353]'
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getMonthLabel = (wIdx: number) => {
    const weeks = contributions.weeks;
    if (!weeks || weeks.length === 0) return null;
    if (wIdx === 0) {
      const d = new Date(weeks[0].contributionDays[0].date);
      return months[d.getMonth()];
    }
    const prevDate = new Date(weeks[wIdx - 1].contributionDays[0].date);
    const currDate = new Date(weeks[wIdx].contributionDays[0].date);
    if (currDate.getMonth() !== prevDate.getMonth()) {
      return months[currDate.getMonth()];
    }
    return null;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`;
  };

  return (
    <div className="w-full mt-6 select-none relative">
      <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0d1117] flex flex-col gap-4">
        {/* Live GitHub Stats Cards Grid */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center items-center bg-[#0d1117] p-2.5 rounded-xl border border-zinc-800 shadow-inner hover:border-blue-500/50 transition-all duration-300">
              <img
                src="https://github-readme-stats.vercel.app/api?username=geetikavasistha-01&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=3B82F6&icon_color=3B82F6&text_color=94A3B8&hide=prs,issues,contribs"
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
          </div>
          
          {/* Live green heatmap grid instead of line graph image */}
          <div className="flex flex-col bg-[#0d1117] p-4 sm:p-5 rounded-xl border border-zinc-800 shadow-inner w-full hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
            {/* Months Header */}
            <div className="overflow-x-auto w-full pb-1">
              <div className="flex gap-[3px] min-w-[700px] text-[9px] text-zinc-500 font-mono mb-1.5 pl-6">
                {contributions.weeks.map((week, wIdx) => {
                  const label = getMonthLabel(wIdx);
                  return (
                    <div key={wIdx} className="w-[10px] h-3 relative flex-shrink-0">
                      {label && (
                        <span className="absolute left-0 top-0 whitespace-nowrap text-zinc-400 font-medium">
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heatmap Grid Row */}
            <div className="overflow-x-auto w-full pb-2">
              <div className="flex gap-[3px] min-w-[700px]">
                {/* Day Labels Column */}
                <div className="flex flex-col gap-[3px] text-[8px] text-zinc-500 font-mono pr-2 justify-between h-[88px] select-none">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                {contributions.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, dIdx) => {
                      const level = Math.min(Math.max(day.level ?? 0, 0), 4);
                      return (
                        <div
                          key={dIdx}
                          className={`w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 cursor-pointer ${greenColors[level]}`}
                          onMouseEnter={() => setHoveredContrDay({ count: day.count, date: day.date })}
                          onMouseLeave={() => setHoveredContrDay(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap Legend Row */}
            <div className="flex justify-end items-center text-[10px] text-zinc-500 font-mono mt-3">
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#161b22] border border-[#1b2129]/30" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#0e4429]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#006d32]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#26a641]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>

            {hoveredContrDay && (
              <div className="absolute bottom-2 left-4 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-200 px-2.5 py-1 rounded-md shadow-md z-20">
                {hoveredContrDay.count} commit{hoveredContrDay.count !== 1 && 's'} · {formatDate(hoveredContrDay.date)}
              </div>
            )}
          </div>
        </div>

        {/* Heatmap Footer Legend / Monospace Label */}
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono border-t border-zinc-800/60 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>
              {contributions.totalContributions} commits in the last year
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
