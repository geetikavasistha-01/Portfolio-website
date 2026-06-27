import React from 'react';

const buildingItems = [
  "⚡ TokenLens — token intelligence SaaS",
  "🛰️ ISRO AQI/HCHOSentinel-5P Sentinel pipeline",
  "📝 GeekyKunoichi blog",
  "👾 Locomotion gait controller",
  "🛡️ EthicalTwin AI governance"
];

export default function CurrentlyBuilding() {
  const marqueeText = [...buildingItems, ...buildingItems].join("  ·  ");

  return (
    <div
      id="currently-building"
      className="w-full py-3 bg-surface border-y border-border overflow-hidden relative select-none flex items-center"
    >
      <div className="w-[100px] bg-gradient-to-r from-bg to-transparent h-full absolute left-0 z-10 pointer-events-none" />
      <div className="w-[100px] bg-gradient-to-l from-bg to-transparent h-full absolute right-0 z-10 pointer-events-none" />

      {/* Marquee Content */}
      <div className="flex whitespace-nowrap min-w-full animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        <span className="text-[11px] font-mono tracking-wide text-text2 px-4">
          {marqueeText}
        </span>
        <span className="text-[11px] font-mono tracking-wide text-text2 px-4">
          {marqueeText}
        </span>
      </div>
    </div>
  );
}
