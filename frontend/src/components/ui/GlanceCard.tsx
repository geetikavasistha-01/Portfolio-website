import React from 'react';
import { cn } from '../../lib/utils';

interface GlanceCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlanceCard({ children, className }: GlanceCardProps) {
  return (
    <div className={cn(
      "bg-[#111115] border border-zinc-800/60 rounded-2xl p-6 mb-4",
      className
    )}>
      {children}
    </div>
  );
}
