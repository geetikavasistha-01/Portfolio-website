import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Log } from '../../types';
import { useUIStore } from '../../store/uiStore';

const colorStyles = {
  amber: {
    cardClass: "bg-amber-500/5 border border-amber-500/10 dark:bg-amber-950/20 dark:border-amber-900/30 text-[#8a5f1e] dark:text-amber",
    dotClass: "bg-[#8a5f1e] dark:bg-amber"
  },
  teal: {
    cardClass: "bg-teal-500/5 border border-teal-500/10 dark:bg-teal-950/20 dark:border-teal-900/30 text-[#1f6682] dark:text-teal",
    dotClass: "bg-[#1f6682] dark:bg-teal"
  },
  rose: {
    cardClass: "bg-rose-500/5 border border-rose-500/10 dark:bg-rose-950/20 dark:border-rose-900/30 text-[#7e3b4a] dark:text-rose",
    dotClass: "bg-[#7e3b4a] dark:bg-rose"
  }
};

const defaultLogs: Log[] = [
  {
    content: "Training sequence models at 2am. The LSTM network shows stable loss convergence. Climate AQI datasets have massive noise but clean spatial signals.",
    accentColor: 'amber',
    date: '2026-06-24T00:00:00.000Z',
    published: true
  },
  {
    content: "Refactoring the robot locomotion scripts. Thread-safe IPC pipelines are harder than they look. OpenCV pipeline runs smoothly now.",
    accentColor: 'teal',
    date: '2026-06-18T00:00:00.000Z',
    published: true
  },
  {
    content: "Writing is a lot like modeling. You start with unstructured thoughts, filter the noise, test hypotheses, and output narrative.",
    accentColor: 'rose',
    date: '2026-06-12T00:00:00.000Z',
    published: true
  }
];

export default function LogCards() {
  const { recruiterMode } = useUIStore();

  const { data: logs } = useQuery<Log[]>({
    queryKey: ['logs'],
    queryFn: async () => {
      try {
        const res = await api.get('/logs');
        return res.data;
      } catch {
        return defaultLogs;
      }
    },
    initialData: defaultLogs
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  // Logs are hidden in recruiter mode
  if (recruiterMode) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6">
      {logs.slice(0, 3).map((log, index) => {
        const color = log.accentColor || 'amber';
        const style = colorStyles[color];
        return (
          <div
            key={log._id || index}
            className={`rounded-xl p-5 flex flex-col justify-between min-h-[160px] relative transition-transform duration-300 hover:scale-[1.01] hover:brightness-[1.03] select-none ${style.cardClass}`}
          >
            {/* Small glowing dot */}
            <div className={`w-1 h-1 rounded-full absolute top-3 left-1/2 -translate-x-1/2 ${style.dotClass}`} />
            
            {/* Category title */}
            <span className="text-[9px] tracking-[0.2em] font-semibold uppercase opacity-60">
              LOG
            </span>

            {/* Content */}
            <p className="my-4 text-xs leading-relaxed italic">
              "{log.content}"
            </p>

            {/* Date */}
            <div className="text-[10px] font-mono opacity-60 mt-auto">
              {formatDate(log.date)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
