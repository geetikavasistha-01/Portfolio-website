import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: 'ml' | 'data' | 'infra' | 'frontend' | 'core';
  projects: string[];
}

interface Edge {
  source: string;
  target: string;
}

const nodes: Node[] = [
  { id: 'python', label: 'Python', x: 250, y: 140, category: 'core', projects: ['TokenLens', 'Sentinel-5P', 'Raphson Locomotion'] },
  { id: 'pytorch', label: 'PyTorch', x: 160, y: 80, category: 'ml', projects: ['Sentinel-5P'] },
  { id: 'sklearn', label: 'scikit-learn', x: 340, y: 80, category: 'ml', projects: ['TokenLens', 'EthicalTwin'] },
  { id: 'fastapi', label: 'FastAPI', x: 150, y: 200, category: 'data', projects: ['TokenLens', 'Teachers-Mate'] },
  { id: 'mongodb', label: 'MongoDB', x: 350, y: 200, category: 'data', projects: ['TokenLens', 'Teachers-Mate'] },
  { id: 'redis', label: 'Redis', x: 90, y: 140, category: 'infra', projects: ['DistributedRateLimiter'] },
  { id: 'go', label: 'Go', x: 410, y: 140, category: 'core', projects: ['DistributedRateLimiter'] },
  { id: 'react', label: 'React', x: 250, y: 50, category: 'frontend', projects: ['TokenLens', 'Teachers-Mate'] },
  { id: 'typescript', label: 'TypeScript', x: 80, y: 70, category: 'frontend', projects: ['TokenLens', 'Geetika Portfolio'] },
  { id: 'tailwind', label: 'Tailwind CSS', x: 420, y: 220, category: 'frontend', projects: ['Geetika Portfolio'] }
];

const edges: Edge[] = [
  { source: 'python', target: 'pytorch' },
  { source: 'python', target: 'sklearn' },
  { source: 'python', target: 'fastapi' },
  { source: 'python', target: 'mongodb' },
  { source: 'pytorch', target: 'sklearn' },
  { source: 'fastapi', target: 'mongodb' },
  { source: 'fastapi', target: 'redis' },
  { source: 'go', target: 'redis' },
  { source: 'go', target: 'python' },
  { source: 'react', target: 'typescript' },
  { source: 'react', target: 'tailwind' },
  { source: 'typescript', target: 'python' }
];

const categoryColors = {
  core: 'stroke-amber fill-amber text-amber border-amber',
  ml: 'stroke-teal fill-teal text-teal border-teal',
  data: 'stroke-rose fill-rose text-rose border-rose',
  infra: 'stroke-purple-400 fill-purple-400 text-purple-400 border-purple-400',
  frontend: 'stroke-blue-400 fill-blue-400 text-blue-400 border-blue-400'
};

export default function SkillConstellation() {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === nodeId) return true;
    return edges.some(
      (edge) =>
        (edge.source === hoveredNode.id && edge.target === nodeId) ||
        (edge.target === hoveredNode.id && edge.source === nodeId)
    );
  };

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-5 relative select-none">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[9px] font-mono tracking-widest text-text3 uppercase">
          Interactive Skill Constellation
        </span>
        {hoveredNode && (
          <div className="text-[10px] font-mono text-text2 max-w-[280px] text-right truncate">
            {hoveredNode.label}: <span className="text-text3">{hoveredNode.projects.join(', ')}</span>
          </div>
        )}
      </div>

      <div className="relative w-full aspect-[5/3] overflow-hidden">
        <svg viewBox="0 0 500 280" className="w-full h-full">
          {/* Edges / Connections */}
          {edges.map((edge, idx) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isHighlighted =
              hoveredNode &&
              (hoveredNode.id === edge.source || hoveredNode.id === edge.target);

            return (
              <line
                key={idx}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                className={`transition-all duration-300 ${
                  isHighlighted
                    ? 'stroke-text1 stroke-[1.5px] opacity-100'
                    : 'stroke-border stroke-[1px] opacity-40'
                }`}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelf = hoveredNode?.id === node.id;
            const isConn = isConnected(node.id);
            const colorClass = categoryColors[node.category];

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer pulsing ring for hover */}
                {isSelf && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    className={`opacity-20 animate-ping ${colorClass.split(' ')[1]}`}
                  />
                )}

                {/* Main Node Point */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelf ? 6 : 4}
                  className={`transition-all duration-200 ${
                    isSelf || isConn ? colorClass.split(' ')[1] : 'fill-text3 dark:fill-text4'
                  }`}
                />

                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y - 12}
                  textAnchor="middle"
                  className={`text-[9px] font-semibold font-mono tracking-wider transition-colors duration-200 ${
                    isSelf
                      ? 'fill-text1 font-bold'
                      : isConn
                      ? 'fill-text2'
                      : 'fill-text4'
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
