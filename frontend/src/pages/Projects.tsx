import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { Project, SideExperiment } from '../types';
import { Search, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const filterCategories = ['ALL', 'ML / AI', 'DATA ENGINEERING', 'FULL STACK', 'ROBOTICS', 'RESEARCH'];

const defaultFeatured: Project[] = [
  {
    slug: 'tokenlens',
    title: 'TokenLens',
    year: 2025,
    language: 'Python',
    status: 'wip',
    tags: ['ML / AI', 'DATA ENGINEERING', 'FULL STACK'],
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
    order: 1,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=260&q=80'
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
    order: 2,
    featuredImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&h=260&q=80'
  },
  {
    slug: 'ethicaltwin-governance',
    title: 'EthicalTwin Research',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI', 'RESEARCH'],
    description: 'XGBoost dual-agent AI governance framework to audit model decision parameters against compliance templates.',
    stats: [
      { label: 'Compliance Audit Rate', value: '150 runs/sec' },
      { label: 'Governance Drift Detection', value: '98.5% sensitivity' }
    ],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: true,
    order: 3,
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=260&q=80'
  }
];

const defaultMoreWork: Project[] = [
  {
    slug: 'distributed-rate-limiter',
    title: 'DistributedRateLimiter',
    year: 2025,
    language: 'Go',
    status: 'live',
    tags: ['DATA ENGINEERING'],
    description: 'Four algorithms, Prometheus monitoring, Nginx reverse proxy load balancer integration.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 4
  },
  {
    slug: 'geekykunoichi-blog',
    title: 'GeekyKunoichi Blog',
    year: 2025,
    language: 'Python',
    status: 'live',
    tags: ['FULL STACK'],
    description: 'FastAPI driven markdown portfolio blog engine with SSR and SQLite cache layers.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 5
  },
  {
    slug: 'solariq-firmware',
    title: 'SolarIQ',
    year: 2024,
    language: 'C++',
    status: 'live',
    tags: ['ROBOTICS'],
    description: 'ESP32 firmware logging solar cell yield data via low power bluetooth protocol arrays.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 6
  },
  {
    slug: 'teachers-mate',
    title: 'Teachers-Mate',
    year: 2024,
    language: 'JavaScript',
    status: 'live',
    tags: ['FULL STACK'],
    description: 'Full-stack platform for teachers to organize assignments and evaluate grading indices.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 7
  },
  {
    slug: 'civillens',
    title: 'CivilLens',
    year: 2024,
    language: 'Python',
    status: 'live',
    tags: ['ML / AI'],
    description: 'RAG parsing pipeline turning dense public administration drafts into searchable charts.',
    stats: [],
    longDescription: '',
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: '',
    featured: false,
    order: 8
  }
];

const defaultExperiments: SideExperiment[] = [
  {
    repoName: 'raphson-quadruped',
    description: 'Locomotion gait controllers implementing forward kinematics and trot sequence loops.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 1
  },
  {
    repoName: 'tokenlens-sdk',
    description: 'Python client wrapper supporting request hooks, JWT tokens, and background async buffers.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 2
  },
  {
    repoName: 'lstm-forecaster',
    description: 'Standalone LSTM sequences model helper optimized for spatial air quality datasets.',
    githubUrl: 'https://github.com/geetikavasistha-01',
    order: 3
  }
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [experimentIdx, setExperimentIdx] = useState(0);

  const { data: featured } = useQuery<Project[]>({
    queryKey: ['projects-featured-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/featured');
        return res.data;
      } catch {
        return defaultFeatured;
      }
    },
    initialData: defaultFeatured
  });

  const { data: moreWork } = useQuery<Project[]>({
    queryKey: ['projects-more-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/more');
        return res.data;
      } catch {
        return defaultMoreWork;
      }
    },
    initialData: defaultMoreWork
  });

  const { data: experiments } = useQuery<SideExperiment[]>({
    queryKey: ['projects-experiments-page'],
    queryFn: async () => {
      try {
        const res = await api.get('/projects/experiments');
        return res.data;
      } catch {
        return defaultExperiments;
      }
    },
    initialData: defaultExperiments
  });

  const filterProjects = <T extends Project>(list: T[]): T[] => {
    return list.filter((p) => {
      // Category match
      const catMatch =
        selectedFilter === 'ALL' ||
        p.tags.some((t) => t.toUpperCase() === selectedFilter);

      // Search match
      const text = `${p.title} ${p.description} ${p.language} ${p.tags.join(' ')}`.toLowerCase();
      const searchMatch = text.includes(searchQuery.toLowerCase());

      return catMatch && searchMatch;
    });
  };

  const filteredFeatured = filterProjects(featured);
  const filteredMoreWork = filterProjects(moreWork);

  const getPaddedNumber = (idx: number) => {
    const num = idx + 1;
    return `Nº${num < 10 ? '0' + num : num}`;
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>PROJECTS</span>
          <span>{featured.length + moreWork.length} entries</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Things I've built.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          ML pipelines, SaaS platforms, robotics firmware, and the engineering details in between.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-text1 text-bg border-text1'
                    : 'border-border text-text3 hover:border-text3 hover:text-text1'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surface w-full mt-2">
          <Search size={14} className="text-text3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search projects, languages, tags..."
            className="bg-transparent border-none outline-none w-full text-xs text-text2 placeholder-text4"
          />
        </div>
      </div>

      {/* Featured Section */}
      <SectionHeader label="featured" />
      <div className="flex flex-col gap-20 mt-8 w-full">
        {filteredFeatured.map((project, idx) => (
          <div
            key={project.slug || idx}
            className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-start border-b border-border/40 pb-12"
          >
            {/* Info details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
                <span>{getPaddedNumber(idx)}</span>
                <span>·</span>
                <span>{project.year}</span>
                <span>·</span>
                <span>{project.language}</span>
                {project.status === 'wip' && (
                  <span className="text-amber">● WIP</span>
                )}
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-normal italic text-text1 hover:text-text3 mb-3 flex items-center gap-2">
                <Link to={`/projects/${project.slug}`} className="hover:underline flex items-center gap-1">
                  {project.title.toLowerCase()} <ArrowUpRight size={18} />
                </Link>
              </h3>

              <p className="text-sm text-text3 italic leading-relaxed mb-6">
                {project.description}
              </p>

              {project.stats && project.stats.length > 0 && (
                <div className="border-l-2 border-border pl-4 font-mono text-[11px] text-text3 flex flex-col gap-1.5 leading-relaxed">
                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx}>
                      · {stat.label.toLowerCase()}: <span className="text-text2">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Image */}
            {project.featuredImage && (
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface shadow-sm">
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More Work flat list */}
      <SectionHeader label="more work" />
      <div className="flex flex-col mt-4 w-full">
        {filteredMoreWork.map((project, idx) => (
          <Link
            key={project.slug || idx}
            to={`/projects/${project.slug}`}
            className="group flex justify-between items-start py-5 border-b border-border hover:bg-surface/30 px-3 -mx-3 rounded-lg transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text1 group-hover:text-text3 transition-colors">
                {project.title}
              </span>
              <span className="text-xs italic text-text3 mt-1 truncate max-w-[280px] sm:max-w-[450px]">
                {project.description}
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-text3 text-right uppercase">
              {project.year && `${project.year} · `}{project.language}
            </div>
          </Link>
        ))}
      </div>

      {/* Side Experiments Carousel */}
      <SectionHeader
        label="side experiments"
        rightElement={
          <div className="flex gap-2">
            <button
              onClick={() => setExperimentIdx((prev) => (prev - 1 + experiments.length) % experiments.length)}
              className="p-1 rounded border border-border bg-surface hover:bg-surface2 transition-all"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => setExperimentIdx((prev) => (prev + 1) % experiments.length)}
              className="p-1 rounded border border-border bg-surface hover:bg-surface2 transition-all"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        }
        subtext="Smaller implementations, snippets, and scripts not worthy of full case studies."
      />
      <div className="flex gap-4 overflow-x-auto w-full mt-4 pb-4 select-none">
        {experiments.map((exp, idx) => {
          const isActive = idx === experimentIdx;
          return (
            <a
              key={exp._id || idx}
              href={exp.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-[260px] flex-shrink-0 bg-surface border rounded-xl p-5 hover:border-text2 transition-all duration-300 ${
                isActive ? 'border-purple-500/30' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                  <FaGithub size={14} />
                  <span>{exp.repoName}</span>
                </div>
                <ArrowUpRight size={12} className="text-text4" />
              </div>
              <p className="text-xs text-text3 mt-3 leading-relaxed">
                {exp.description}
              </p>
            </a>
          );
        })}
      </div>
    </PageWrapper>
  );
}
