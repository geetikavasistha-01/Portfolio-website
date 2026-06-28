import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { AMAEntry } from '../../types';

const defaultAmas: AMAEntry[] = [
  {
    question: "What did you actually build during your AI internship — and what was the hardest part?",
    askedBy: 'ANONYMOUS',
    answer: "At Havish M Consultancy, I architected a RAG-powered document intelligence platform — LangChain on top of LLaMA and Mistral, with FAISS and Pinecone handling vector retrieval. The semantic chunking pipeline alone cut processing time by 50%. The hardest part wasn't the models; it was designing agentic workflows with ReAct-style tool-calling — web search, code execution, live APIs — so the system could autonomously resolve multi-step queries without hand-holding. That piece improved on-time delivery by 70%, which felt meaningful.",
    pinned: true,
    answered: true,
    date: '2026-06-20T00:00:00.000Z'
  },
  {
    question: "How did Raphsons Robotics start, and what was your role there technically?",
    askedBy: 'ANONYMOUS',
    answer: "Raphsons grew out of SRM's incubator. We were building rugged quadrupeds for hazardous pipeline inspection — the kind of terrain where you don't want humans. My role was the computer vision side: anomaly detection using TensorFlow and PyTorch, deployed on AWS EC2 with S3 for asset storage. I redesigned the inference pipeline and pushed accuracy up 40% while processing over 1,000 images per hour. I also applied quantization and pruning to make it viable for edge deployment, and built automated model-evaluation harnesses so regressions got caught before they ever shipped.",
    pinned: true,
    answered: true,
    date: '2026-06-10T00:00:00.000Z'
  },
  {
    question: "What did your backend internship at Sacred Gurukul look like day-to-day?",
    askedBy: 'ANONYMOUS',
    answer: "It was a full-stack backend role — I built the e-commerce backend on Django REST with MongoDB, handling JWT auth and payment integration from scratch. The interesting addition was an LLM-powered recommendation agent that used vector similarity search over a user's browsing history to surface products. On the DevOps side, I set up Docker and GitHub Actions for CI/CD, which meant releases were clean and repeatable. Cross-browser frontend compatibility was also part of the brief, so it wasn't purely backend — it was end-to-end ownership.",
    pinned: true,
    answered: true,
    date: '2026-06-01T00:00:00.000Z'
  }
];

export default function AMAPreview() {
  const { data: amas } = useQuery<AMAEntry[]>({
    queryKey: ['amas-pinned'],
    queryFn: async () => {
      return defaultAmas;
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
