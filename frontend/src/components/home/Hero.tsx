import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Hero() {
  const { recruiterMode } = useUIStore();

  return (
    <section className="pt-24 pb-12 w-full flex flex-col items-start relative z-10">
      {/* Avatar & Social Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full mb-8">
        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-surface2 border border-border shadow-md">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
            alt="Geetika Vasistha"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/geetikavasistha-01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/geetikavasisthampy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text3 hover:text-text1 transition-colors"
            title="Twitter"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Name and Alias */}
      <div className="flex flex-col mb-8">
        <h1 className="text-5xl sm:text-6xl font-display font-normal leading-none tracking-tight">
          Geetika <span className="text-text3">Vasistha</span>
        </h1>
        <span className="text-xs text-text3 font-mono mt-2 italic select-none">
          geekykunoichi
        </span>
      </div>

      {/* Bio Prose Block */}
      <div className="space-y-6 text-sm text-text2 leading-relaxed max-w-[620px]">
        <p className="flex flex-wrap items-center gap-2">
          I am an AI engineer and data scientist building intelligent systems. Currently crafting models with
          <span className="inline-flex items-center bg-surface2 border border-border text-text2 text-xs px-2 py-0.5 rounded font-mono">
            🐍 Python
          </span>
          ,
          <span className="inline-flex items-center bg-surface2 border border-border text-text2 text-xs px-2 py-0.5 rounded font-mono">
            ⚡ FastAPI
          </span>
          , and
          <span className="inline-flex items-center bg-surface2 border border-border text-text2 text-xs px-2 py-0.5 rounded font-mono">
            📊 scikit-learn
          </span>
          .
        </p>

        <p>
          I focus on machine learning algorithms, distributed pipelines, and climate technology.
          My background lies at the intersection of robotic vision systems (co-founding Raphson Robotics) and high-throughput data pipelines.
        </p>

        <p className="text-text3">
          Explore my latest <Link to="/projects" className="underline hover:text-text1">projects</Link>, read my 
          work <Link to="/work" className="underline hover:text-text1">experience</Link>, or checkout the 
          technical <Link to="/blog" className="underline hover:text-text1">blog</Link>.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <Link
          to="/glance"
          className="inline-flex items-center gap-2 border border-border text-text2 rounded-full px-5 py-2.5 text-xs tracking-wider uppercase hover:bg-surface2 hover:text-text1 transition-all duration-300 shadow-sm"
        >
          Everything at a glance <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* Fan of line (hidden in recruiter mode) */}
      {!recruiterMode && (
        <div className="mt-12 text-xs text-text3 italic select-none font-display">
          fan of · 🎵 melodic OSTs and · ✍ memoir writing and · 📌 paper + systems
        </div>
      )}
    </section>
  );
}
