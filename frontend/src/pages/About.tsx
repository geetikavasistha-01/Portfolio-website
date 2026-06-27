import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import SkillConstellation from '../components/about/SkillConstellation';

const skillGroups = [
  {
    label: 'ML & DATA SCIENCE',
    skills: 'Python, scikit-learn, XGBoost, LSTM, LangChain, HuggingFace, BERT'
  },
  {
    label: 'DATA ENGINEERING',
    skills: 'FastAPI, Pandas, NumPy, Streamlit, SQLite, MongoDB, Redis'
  },
  {
    label: 'INFRASTRUCTURE',
    skills: 'Docker, Git, GitHub Actions, GCP, Vercel, Railway'
  },
  {
    label: 'FRONTEND',
    skills: 'React, TypeScript, Tailwind CSS, HTMX, Jinja2'
  },
  {
    label: 'RESEARCH & WRITING',
    skills: 'Technical blogs, Memoir writing, Research papers (ICMCE 2026)'
  }
];

const philosophyCards = [
  {
    title: 'Precision over speed',
    description: 'Build things that work under pressure. Fast prototypes are cheap, stable systems are premium.'
  },
  {
    title: 'Data tells stories',
    description: 'Every model is a hypothesis about the world. Filter out the noise to capture the real signal.'
  },
  {
    title: 'Ship, then refine',
    description: 'Iteration beats waiting for perfection. Get it in front of users, monitor logs, and optimize.'
  },
  {
    title: 'Write to understand',
    description: 'If you cannot explain it to an anonymous questioner, you do not fully understand it yet.'
  }
];

export default function About() {
  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>ABOUT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
        </div>
        <h1 className="text-4xl font-sans font-semibold text-text1 mt-2">
          About Me
        </h1>
        <p className="text-sm text-text3 mt-2">
          The journey, the tools, and the philosophy behind what I build.
        </p>
      </div>

      {/* Two-Column Bio Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 mt-4">
        
        {/* Left Column (Sticky info cards) */}
        <div className="flex flex-col items-center md:items-start md:sticky md:top-24 self-start gap-4">
          <div className="w-[180px] h-[180px] rounded-xl overflow-hidden border border-border bg-surface shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&h=250&q=80"
              alt="Geetika Vasistha"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs text-text3 font-mono">
              geekykunoichi / Geetika
            </span>
            <span className="text-[11px] italic text-text4 mt-1 leading-normal max-w-[180px]">
              engineering intelligence, one model at a time
            </span>
            <span className="text-[10px] text-text4 mt-1">
              Delhi NCR, India
            </span>
          </div>
        </div>

        {/* Right Column (Content panels) */}
        <div className="flex flex-col gap-10">
          
          {/* Journey Section */}
          <section className="flex flex-col">
            <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
              My Journey
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-text2 leading-relaxed">
              <p>
                My journey into tech began at SRM Institute of Science and Technology, specializing in Data Science.
                Early on, I realized I loved building tangible systems, which led to co-founding Raphsons Robotics,
                an incubator project where I wrote on-device ML scripts for quadruped robots.
              </p>
              <p>
                From robotics, I transitioned into high-performance web engineering and ML pipelines, doing internships at Havish M Consultancy where I designed document intelligence frameworks, and building data pipelines for Sentinel satellite telemetry.
              </p>
              <p>
                Besides building, I write technical memoirs and keep a micro-log diary of bugs, insights, and late-night compilation files.
              </p>
            </div>
          </section>

          {/* Skill Constellation Section */}
          <section className="flex flex-col">
            <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
              Skill Graph
            </h2>
            <SkillConstellation />
          </section>

          {/* Stack & Style Section */}
          <section className="flex flex-col">
            <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
              Stack & Style
            </h2>
            <div className="flex flex-col gap-4">
              {skillGroups.map((group) => (
                <div key={group.label} className="flex flex-col border-b border-border/40 pb-3">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-text3 mb-1.5 uppercase font-mono">
                    {group.label}
                  </span>
                  <p className="text-xs sm:text-sm text-text2 leading-normal">
                    {group.skills}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="flex flex-col mb-4">
            <h2 className="text-xl font-sans font-semibold text-text1 mb-4">
              Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-text2 leading-relaxed mb-6">
              Engineering is not just writing code — it is organizing systems to resolve human ambiguities. These core anchors guide my building decisions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {philosophyCards.map((card) => (
                <div key={card.title} className="bg-surface border border-border rounded-xl p-5 select-none">
                  <h3 className="text-xs sm:text-sm font-semibold text-text1 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-text3 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
}
