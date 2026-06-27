import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { AMAEntry } from '../../types';

const defaultAmas: AMAEntry[] = [
  {
    question: "How do you think about ethical AI versus speed of deployment in climate projects?",
    askedBy: 'ANONYMOUS',
    answer: "In climate tech, correctness is safety. A model predicting emissions or air quality indexes that hallucinates can mislead policy. Perfect is the enemy of raw velocity, but robust cross-validation isn't a speed bump — it's the foundation. Deploy rapidly, but benchmark relentlessly.",
    pinned: true,
    answered: true,
    date: '2026-06-20T00:00:00.000Z'
  },
  {
    question: "What's the story behind co-founding Raphson Robotics?",
    askedBy: 'ANONYMOUS',
    answer: "Raphson grew out of SRM Incubator labs. We wanted to build rugged quadrupeds for hazardous pipeline checking. My role was designing low-latency CV models that run on-device. It taught me systems optimization under resource constraints.",
    pinned: true,
    answered: true,
    date: '2026-06-10T00:00:00.000Z'
  }
];

export default function AMAPreview() {
  const { data: amas } = useQuery<AMAEntry[]>({
    queryKey: ['amas-pinned'],
    queryFn: async () => {
      try {
        const res = await api.get('/ama?pinned=true');
        return res.data;
      } catch {
        return defaultAmas;
      }
    },
    initialData: defaultAmas
  });

  return (
    <div className="w-full mt-6 select-none flex flex-col">
      <div className="flex flex-col gap-10">
        {amas.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex flex-col items-start border-l border-border/40 pl-6">
            <h4 className="text-base sm:text-lg italic font-display text-text1 leading-relaxed">
              "{item.question}"
            </h4>
            <span className="text-[9px] tracking-widest text-text3 font-semibold font-mono uppercase mt-2">
              — {item.askedBy || 'ANONYMOUS'}
            </span>
            <p className="text-xs sm:text-sm text-text2 leading-relaxed mt-4">
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/ama"
          className="text-xs font-semibold tracking-wider text-text3 hover:text-text1 transition-colors uppercase"
        >
          Ask Me Anything →
        </Link>
      </div>
    </div>
  );
}
