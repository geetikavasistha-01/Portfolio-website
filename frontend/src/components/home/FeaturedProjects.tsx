import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultProjects: Project[] = [
  {
    slug: 'tokenlens',
    title: 'TokenLens',
    year: 2025,
    language: 'Python',
    status: 'wip',
    tags: ['ML / AI', 'DATA ENGINEERING'],
    description: 'A token intelligence SaaS platform for LLM usage tracking and forecasting.',
    stats: [
      { label: 'Latency', value: '<45ms overhead' },
      { label: 'Forecasting Accuracy', value: '94% MAPE (LSTM)' },
      { label: 'Throughput', value: '10M tokens/day' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01/tokenlens',
    liveUrl: 'https://tokenlens.dev',
    featured: true,
    order: 1
  },
  {
    slug: 'isro-sentinel-pipeline',
    title: 'ISRO Sentinel AQI Pipeline',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'DATA ENGINEERING', 'RESEARCH'],
    description: 'CNN-LSTM satellite pipeline digesting Sentinel-5P/TROPOMI datasets for real-time HCHO/NO2 mapping.',
    stats: [
      { label: 'Resolution', value: '3.5km x 5.5km' },
      { label: 'Data ingestion speed', value: '450MB/sec' },
      { label: 'Prediction MSE', value: '0.0024' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: 'https://isro.gov.in',
    featured: true,
    order: 2
  }
];

export default function FeaturedProjects() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects-featured'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects?featured=true');
        return res.data;
      } catch {
        return defaultProjects;
      }
    },
    initialData: defaultProjects
  });

  return (
    <div className="w-full mt-6 select-none flex flex-col gap-10">
      {projects.map((project, idx) => (
        <Link
          key={project.slug || idx}
          to={`/projects/${project.slug}`}
          className="group block relative w-full border-b border-border/40 pb-10 transition-colors"
        >
          {/* Top metadata */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.language}</span>
            {project.status === 'wip' && (
              <>
                <span>·</span>
                <span className="text-amber flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                  WIP
                </span>
              </>
            )}
          </div>

          {/* Title and Hover Arrow */}
          <div className="flex justify-between items-baseline mb-3">
            <h3 className="text-3xl sm:text-4xl font-display font-normal italic text-text1 group-hover:text-text3 transition-colors">
              {project.title.toLowerCase()}
            </h3>
            <ArrowUpRight
              size={18}
              className="text-text4 group-hover:text-text1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-text2 italic max-w-[560px] leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Stats mono block */}
          {project.stats && project.stats.length > 0 && (
            <div className="border-l-2 border-border pl-4 font-mono text-[11px] text-text3 flex flex-col gap-1 leading-loose">
              {project.stats.map((stat, sIdx) => (
                <div key={sIdx}>
                  · {stat.label.toLowerCase()}: <span className="text-text2">{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
