import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { WorkExperience, Education } from '../types';
import { FileText, ArrowUpRight } from 'lucide-react';

const defaultExperiences: WorkExperience[] = [
  {
    company: 'Havish M Consultancy',
    role: 'AI Engineering Intern',
    type: 'intern',
    location: 'Remote',
    locationType: 'remote',
    startDate: '2024-10-01T00:00:00.000Z',
    endDate: '2025-03-31T00:00:00.000Z',
    bullets: [
      'Designed ML-driven document intelligence platform for Landmark Group, transforming unstructured logistics data into structured entries.',
      'Configured semantic search systems using LangChain and GPT-4, decreasing manual processing overhead by 50%.',
      'Built fast backend API gateways with FastAPI and React to visualize pipeline throughput metrics in real-time.'
    ],
    techStack: ['Python', 'LangChain', 'FastAPI', 'GPT-4', 'React', 'MongoDB'],
    order: 1
  },
  {
    company: 'Raphsons Robotics Ltd',
    role: 'ML Engineer (Co-Founder)',
    type: 'co-founder',
    location: 'Delhi NCR',
    locationType: 'onsite',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: null, // Present
    bullets: [
      'Engineered core computer vision navigation models for quadruped robotics, facilitating pipeline inspection tasks.',
      'Created low-latency image ingestion pipeline handling 1000+ frames per hour under strict power limits.',
      'Developed telemetry models with OpenCV and TensorFlow to track joints stability during walking cycles.'
    ],
    techStack: ['Python', 'ROS', 'OpenCV', 'TensorFlow', 'C++'],
    order: 2
  }
];

const defaultEducation: Education[] = [
  {
    institution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech. Computer Science',
    field: 'Data Science',
    location: 'Delhi NCR',
    startYear: 2021,
    endYear: 2025,
    gpa: '8.3 / 10.0',
    order: 1
  }
];

export default function Work() {
  const { data: experiences } = useQuery<WorkExperience[]>({
    queryKey: ['work-experiences'],
    queryFn: async () => {
      try {
        const res = await api.get('/work');
        return res.data;
      } catch {
        return defaultExperiences;
      }
    },
    initialData: defaultExperiences
  });

  const { data: education } = useQuery<Education[]>({
    queryKey: ['education'],
    queryFn: async () => {
      try {
        const res = await api.get('/education');
        return res.data;
      } catch {
        return defaultEducation;
      }
    },
    initialData: defaultEducation
  });

  const formatDateRange = (start: string, end: string | null) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const startDate = new Date(start);
    const startStr = `${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
    
    if (!end) return `${startStr} — PRESENT`;
    const endDate = new Date(end);
    return `${startStr} — ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
  };

  const getPaddedNumber = (idx: number) => {
    const num = idx + 1;
    return `Nº${num < 10 ? '0' + num : num}`;
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>WORK</span>
          <span>since 2024</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Things I've done.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          ML-heavy. Data pipelines, real-time inference, the occasional full-stack app.
          Roles listed in order of recency.
        </p>

        {/* Resume PDF link */}
        <div className="mt-6">
          <a
            href="https://cloudinary.com" // Cloudinary resume link placeholder
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-text3 hover:text-text1 transition-colors"
          >
            <FileText size={12} /> RESUME <ArrowUpRight size={10} />
          </a>
        </div>
      </div>

      {/* Experience Section */}
      <SectionHeader label="experience" />
      <div className="flex flex-col gap-16 mt-8">
        {experiences.map((exp, idx) => (
          <div key={exp._id || idx} className="flex flex-col w-full relative">
            
            {/* Number stamp and Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className="font-display italic text-xl text-text3">
                {getPaddedNumber(idx)}
              </span>
              <span className="text-[10px] tracking-[0.18em] font-mono text-text3 uppercase">
                {formatDateRange(exp.startDate, exp.endDate)} · {exp.locationType}
              </span>
            </div>

            {/* Company Name */}
            <h3 className="font-display italic text-3xl sm:text-4xl text-text1 leading-none mb-2">
              {exp.company}
            </h3>

            {/* Role title */}
            <span className="text-[10px] tracking-[0.18em] font-mono text-text3 uppercase mb-6">
              {exp.role}
            </span>

            {/* Bullet points */}
            <ul className="flex flex-col gap-3 mb-6">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex gap-3 text-sm text-text2 leading-relaxed">
                  <span className="text-text3 select-none">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border rounded-full px-3 py-0.5 text-[9px] font-mono tracking-wider text-text3 bg-transparent uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Education Section */}
      <SectionHeader label="education" />
      <div className="flex flex-col gap-10 mt-8">
        {education.map((edu, idx) => (
          <div key={edu._id || idx} className="flex flex-col w-full">
            {/* Education meta */}
            <div className="text-[10px] tracking-[0.18em] font-mono text-text3 uppercase mb-3 flex items-center justify-between">
              <span>{edu.startYear} — {edu.endYear} · {edu.location}</span>
              {edu.gpa && (
                <span className="text-amber font-semibold">
                  [{edu.gpa}]
                </span>
              )}
            </div>

            {/* Institution */}
            <h3 className="font-display italic text-2xl sm:text-3xl text-text1 leading-snug">
              {edu.institution}
            </h3>

            {/* Degree details */}
            <p className="text-xs sm:text-sm text-text2 mt-1.5 leading-relaxed">
              {edu.degree} ({edu.field}).
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
