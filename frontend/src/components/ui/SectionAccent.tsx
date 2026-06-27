import React from 'react';
import { cn } from '../../lib/utils';

interface SectionAccentProps {
  title: string;
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'zinc';
  className?: string;
}

export default function SectionAccent({ title, color = 'blue', className }: SectionAccentProps) {
  const colors = {
    blue:   'border-blue-500',
    purple: 'border-purple-500',
    green:  'border-green-500',
    pink:   'border-pink-400',
    zinc:   'border-zinc-500',
  };

  return (
    <h2 className={cn(
      "border-l-[3px] pl-3 text-lg font-semibold text-text1 mb-5",
      colors[color],
      className
    )}>
      {title}
    </h2>
  );
}
