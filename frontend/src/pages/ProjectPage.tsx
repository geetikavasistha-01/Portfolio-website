import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import { Project } from '../types';
import { ArrowLeft, Globe, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import ReactMarkdown from 'react-markdown';

const defaultProjects: Project[] = [
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
    longDescription: `## Overview
TokenLens is a distributed token usage SaaS platform designed for high-throughput AI environments. It tracks precise consumption counts across multiple model API calls, caches identical requests, and predicts scaling thresholds.

## Problem Statement
When scaling LLM deployments, engineering teams face sudden cost spikes and rate limits without granular visibility. Traditional monitoring tools track standard HTTP metrics but fail to parse token counts on-the-fly.

## Approach & Architecture
We built an asynchronous proxy in FastAPI that intercepts prompt chunks, decodes them via fast tiktoken bindings, and pushes token statistics to a Redis time-series database.
- **LSTM Predictor:** A background service trains on historical usage and forecasts scaling bottlenecks.
- **Billing Sync:** Integrated with Stripe to trigger tier changes automatically.

## Outcomes
- Injected less than 45ms of middleware overhead.
- Accurately forecast cost limits with 94% accuracy.`,
    githubUrl: 'https://github.com/geetikavasistha-01/tokenlens',
    liveUrl: 'https://tokenlens.dev',
    featured: true,
    order: 1,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=360&q=80'
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
    longDescription: `## Overview
This satellite pipeline was designed for the ISRO AQI/HCHO spatial tracking competition. It digests massive NetCDF4 datasets from Sentinel-5P and trains deep learning estimators to track ozone precursors.

## Architecture
- **Ingestion Grid:** Spatial-bins coordinates into uniform grids using Python's xarray.
- **Deep Model:** Spatio-temporal CNN-LSTM modeling the mixing ratios of HCHO.
`,
    githubUrl: 'https://github.com/geetikavasistha-01',
    liveUrl: 'https://isro.gov.in',
    featured: true,
    order: 2,
    featuredImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=360&q=80'
  }
];

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery<Project | null>({
    queryKey: ['project-detail', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/projects/${slug}`);
        return res.data;
      } catch {
        return defaultProjects.find((p) => p.slug === slug) || null;
      }
    }
  });

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="animate-pulse flex flex-col gap-6 py-12">
          <div className="h-4 w-20 bg-surface2 rounded" />
          <div className="h-10 w-64 bg-surface2 rounded" />
          <div className="h-[240px] w-full bg-surface2 rounded-xl" />
        </div>
      </PageWrapper>
    );
  }

  if (error || !project) {
    return (
      <PageWrapper>
        <div className="py-20 text-center flex flex-col items-center">
          <h2 className="text-2xl font-display text-text1">Project not found</h2>
          <Link to="/projects" className="text-xs text-text3 hover:text-text1 underline mt-4">
            Return to Projects
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest text-text3 hover:text-text1 transition-colors uppercase font-mono"
        >
          <ArrowLeft size={10} /> Back to Projects
        </Link>
      </div>

      {/* Meta Headers */}
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-text3 uppercase mb-4">
        <span>{project.year}</span>
        <span>·</span>
        <span>{project.language}</span>
        {project.status === 'wip' && <span className="text-amber">● WIP</span>}
      </div>

      <h1 className="text-4xl sm:text-5xl font-display font-normal italic text-text1">
        {project.title.toLowerCase()}
      </h1>
      <p className="text-base text-text3 italic mt-3 leading-relaxed">
        {project.description}
      </p>

      {/* Hero Image */}
      {project.featuredImage && (
        <div className="w-full h-[280px] sm:h-[360px] rounded-xl overflow-hidden border border-border mt-8 shadow-sm">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-12 mt-12 items-start">
        
        {/* Markdown Long Description (Left) */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-text2 leading-relaxed space-y-6">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => <h2 className="text-lg font-sans font-semibold text-text1 mt-10 mb-4" {...props} />,
              h3: ({ ...props }) => <h3 className="text-sm font-sans font-semibold text-text1 mt-6 mb-2" {...props} />,
              p: ({ ...props }) => <p className="mb-4 text-text2 leading-relaxed" {...props} />,
              li: ({ ...props }) => <li className="mb-2 list-disc list-inside ml-2" {...props} />,
              ul: ({ ...props }) => <ul className="mb-4" {...props} />,
              code: ({ ...props }) => <code className="font-mono bg-surface2 px-1 py-0.5 rounded text-xs text-green" {...props} />,
              pre: ({ ...props }) => <pre className="bg-surface2 rounded-xl p-4 overflow-x-auto mb-4 border border-border text-xs" {...props} />
            }}
          >
            {project.longDescription}
          </ReactMarkdown>
        </div>

        {/* Sidebar stats & links (Right) */}
        <div className="flex flex-col gap-8 md:sticky md:top-24">
          {/* Stats mono block */}
          {project.stats && project.stats.length > 0 && (
            <div className="flex flex-col border-l-2 border-border pl-4 font-mono text-[11px] text-text3 gap-1.5 leading-loose">
              <span className="text-[9px] uppercase tracking-widest text-text4 font-semibold">METRICS</span>
              {project.stats.map((stat, sIdx) => (
                <div key={sIdx}>
                  · {stat.label.toLowerCase()}: <span className="text-text2">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Repository/Live links */}
          <div className="flex flex-col gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border rounded-full px-4 py-2 text-xs font-semibold tracking-wider text-text2 hover:bg-surface2 hover:text-text1 transition-all uppercase"
              >
                <FaGithub size={12} /> Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border rounded-full px-4 py-2 text-xs font-semibold tracking-wider text-text2 hover:bg-surface2 hover:text-text1 transition-all uppercase"
              >
                <Globe size={12} /> Live Site
              </a>
            )}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
