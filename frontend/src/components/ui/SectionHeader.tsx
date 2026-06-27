import React from 'react';

interface SectionHeaderProps {
  label: string;
  rightElement?: React.ReactNode;
  subtext?: string;
  className?: string;
}

export default function SectionHeader({ label, rightElement, subtext, className }: SectionHeaderProps) {
  return (
    <div className={`w-full mt-16 mb-6 flex flex-col select-none ${className || ''}`}>
      <div className="flex items-center justify-between gap-4 w-full">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text3 whitespace-nowrap">
          {label}
        </span>
        <div className="h-px flex-1 bg-border" />
        {rightElement && (
          <div className="text-[11px] font-mono text-text3 flex-shrink-0">
            {rightElement}
          </div>
        )}
      </div>
      {subtext && (
        <p className="mt-2 text-xs italic text-text3 font-display">
          {subtext}
        </p>
      )}
    </div>
  );
}
