import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const defaultPosts: BlogPost[] = [
  {
    slug: 'understanding-attention-mechanisms',
    title: 'Attention Is All You Need (To Understand)',
    excerpt: 'A deep, mathematical deep-dive into self-attention matrices and sequence-to-sequence weights without the corporate hype.',
    content: `## Introduction
Self-attention is the core engine driving modern transformers. In this post, we break down the matrix mathematics behind Key, Query, and Value matrices, tracing how they form weight networks.

## The Attention Equation
Recall the iconic scaled dot-product attention equation:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

### Step-by-Step Matrix Mechanics
1. **Linear Projection:** Input embeddings are mapped to Query ($Q$), Key ($K$), and Value ($V$) matrices.
2. **Similarity Matrix:** $QK^T$ measures cosine similarity between all input tokens.
3. **Scaling:** Dividing by $\\sqrt{d_k}$ stabilizes gradients during training.
4. **Softmax:** Normalizes similarity rows into probabilities.

\`\`\`python
def attention(q, k, v, d_k):
    # q, k, v are torch Tensors
    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, v), weights
\`\`\`

## Why It Scales
Unlike recurrence engines (LSTMs), attention operations can be computed in parallel across sequence dimensions. This enables massive training speeds on distributed hardware cluster cores.`,
    tags: ['ML', 'TRANSFORMERS'],
    category: 'RESEARCH',
    published: true,
    featured: true,
    readTime: 8,
    createdAt: '2026-06-20T00:00:00.000Z'
  }
];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: post, isLoading, error } = useQuery<BlogPost | null>({
    queryKey: ['blog-post-detail', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        return res.data;
      } catch {
        return defaultPosts.find((p) => p.slug === slug) || null;
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const CodeBlock = ({ children }: { children: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);
    const codeText = React.Children.toArray(children).join('');

    const handleCopy = () => {
      navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded border border-border bg-surface hover:bg-surface2 text-text3 hover:text-text1 opacity-0 group-hover:opacity-100 transition-all"
        >
          {copied ? <Check size={12} className="text-green" /> : <Copy size={12} />}
        </button>
        <pre className="bg-surface2 rounded-xl p-4 overflow-x-auto border border-border text-xs leading-relaxed font-mono">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="animate-pulse flex flex-col gap-6 py-12">
          <div className="h-4 w-20 bg-surface2 rounded" />
          <div className="h-10 w-64 bg-surface2 rounded" />
          <div className="h-4 w-full bg-surface2 rounded" />
        </div>
      </PageWrapper>
    );
  }

  if (error || !post) {
    return (
      <PageWrapper>
        <div className="py-20 text-center flex flex-col items-center">
          <h2 className="text-2xl font-display text-text1">Article not found</h2>
          <Link to="/blog" className="text-xs text-text3 hover:text-text1 underline mt-4">
            Return to Journal
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-green z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <PageWrapper>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest text-text3 hover:text-text1 transition-colors uppercase font-mono"
          >
            <ArrowLeft size={10} /> Back to Journal
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-text3 uppercase mb-4">
          <span>{post.category}</span>
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-normal text-text1 leading-tight">
          {post.title}
        </h1>
        <p className="text-base text-text3 italic mt-3 leading-relaxed max-w-[600px]">
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="h-px bg-border/40 w-full my-8" />

        {/* Content */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-text2 leading-relaxed space-y-6">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => <h2 className="text-lg font-sans font-semibold text-text1 mt-10 mb-4" {...props} />,
              h3: ({ ...props }) => <h3 className="text-sm font-sans font-semibold text-text1 mt-6 mb-2" {...props} />,
              p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
              li: ({ ...props }) => <li className="mb-2 list-disc list-inside ml-2" {...props} />,
              ul: ({ ...props }) => <ul className="mb-4" {...props} />,
              code: ({ ...props }) => <code className="font-mono bg-surface2 px-1 py-0.5 rounded text-xs text-green" {...props} />,
              pre: ({ node, ...props }) => {
                // If it is a block container, we render our custom CodeBlock with copy button
                return <CodeBlock>{props.children}</CodeBlock>;
              },
              blockquote: ({ ...props }) => <blockquote className="border-l-2 border-border pl-4 italic text-text3" {...props} />
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </PageWrapper>
    </>
  );
}
