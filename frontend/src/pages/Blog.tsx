import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { BlogPost } from '../types';
import { Search, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultPosts: BlogPost[] = [
  {
    slug: 'understanding-attention-mechanisms',
    title: 'Attention Is All You Need (To Understand)',
    excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
    tags: ['ML', 'TRANSFORMERS'],
    category: 'RESEARCH',
    published: true,
    featured: true,
    readTime: 8,
    createdAt: '2026-06-20T00:00:00.000Z'
  },
  {
    slug: 'spatial-netcdf4-sentinel-pipeline',
    title: 'Spatial NetCDF4 pipelines for Sentinel-5P Satellite Data',
    excerpt: 'How we parse, spatial-bin, and model spatial mixing ratios of nitrogen precursors from ESA Copernicus instruments.',
    tags: ['DATA ENGINEERING', 'SPATIAL'],
    category: 'TUTORIAL',
    published: true,
    featured: false,
    readTime: 12,
    createdAt: '2026-06-05T00:00:00.000Z'
  },
  {
    slug: 'low-latency-gait-controllers-quadrupeds',
    title: 'Building low-latency gait controllers for Quadruped Locomotion',
    excerpt: 'Mathematical walk through Bezier curves trot trajectories running on-edge inside embedded micro-threads.',
    tags: ['ROBOTICS', 'C++'],
    category: 'ROBOTICS',
    published: true,
    featured: false,
    readTime: 15,
    createdAt: '2026-05-18T00:00:00.000Z'
  }
];

const categories = ['ALL', 'RESEARCH', 'TUTORIAL', 'ROBOTICS'];

export default function Blog() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        const res = await api.get('/blog');
        return res.data;
      } catch {
        return defaultPosts;
      }
    },
    initialData: defaultPosts
  });

  const filteredPosts = posts.filter((post) => {
    const catMatch = selectedFilter === 'ALL' || post.category.toUpperCase() === selectedFilter;
    const text = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
    const searchMatch = text.includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>JOURNAL</span>
          <span>{posts.length} articles</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Notes & thoughts.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          Deep-dives into ML mathematics, robotics kinematics, spatial computing, and technical memoirs.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-[9px] tracking-wider uppercase transition-all border ${
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

        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surface w-full mt-2">
          <Search size={14} className="text-text3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search articles by title, tag, or content..."
            className="bg-transparent border-none outline-none w-full text-xs text-text2 placeholder-text4"
          />
        </div>
      </div>

      {/* Blog Feed */}
      <SectionHeader label="articles" />
      <div className="flex flex-col gap-10 mt-8 w-full">
        {filteredPosts.map((post, idx) => (
          <article
            key={post.slug || idx}
            className="flex flex-col border-b border-border/40 pb-8 last:border-none w-full group"
          >
            {/* Meta */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-text3 uppercase mb-2.5">
              <span>{post.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar size={10} /> {formatDate(post.createdAt)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={10} /> {post.readTime} min
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-display font-normal text-text1 group-hover:text-text3 transition-colors">
              <Link to={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-text2 italic leading-relaxed mt-2.5 max-w-[620px]">
              {post.excerpt}
            </p>

            {/* Link */}
            <div className="mt-4">
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-mono text-text3 hover:text-text1 transition-colors uppercase"
              >
                Read Article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageWrapper>
  );
}
