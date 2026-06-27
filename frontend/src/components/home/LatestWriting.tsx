import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { BlogPost } from '../../types';

const defaultPost: BlogPost = {
  slug: 'understanding-attention-mechanisms',
  title: 'Attention Is All You Need (To Understand)',
  excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
  content: '',
  tags: ['ML', 'TRANSFORMERS'],
  category: 'RESEARCH',
  published: true,
  featured: true,
  readTime: 8,
  createdAt: '2026-06-20T00:00:00.000Z'
};

export default function LatestWriting() {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['blog-latest'],
    queryFn: async () => {
      try {
        const res = await api.get('/blog?limit=1');
        return res.data;
      } catch {
        return [defaultPost];
      }
    },
    initialData: [defaultPost]
  });

  const post = posts[0] || defaultPost;

  return (
    <div className="w-full mt-6 select-none">
      <div className="flex flex-col items-start max-w-[620px]">
        <span className="text-[10px] font-mono tracking-widest text-text3 uppercase mb-3">
          {post.category || 'ARTICLE'} · {post.readTime} min read
        </span>
        <h3 className="text-2xl font-display font-normal text-text1 hover:text-text3 transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-text2 italic mt-3 leading-relaxed">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-xs font-mono text-text3 hover:text-text1 transition-colors uppercase tracking-wider mt-5"
        >
          Read Post &rarr;
        </Link>
      </div>
    </div>
  );
}
