import React from 'react';

const Node = ({ x, y, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect width="180" height="70" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
    <text x="90" y="42" fill="#e2e8f0" fontSize="20" textAnchor="middle">
      {label}
    </text>
  </g>
);

export const FlowDiagram = ({ labels = ['Input', 'System', 'Output'] }) => {
  return (
    <svg viewBox="0 0 900 420" style={{ width: '100%', height: '100%' }}>
      <Node x={70} y={160} label={labels[0]} />
      <Node x={360} y={160} label={labels[1]} />
      <Node x={650} y={160} label={labels[2]} />
      <line x1="250" y1="195" x2="360" y2="195" stroke="#38bdf8" strokeWidth="5" />
      <line x1="540" y1="195" x2="650" y2="195" stroke="#38bdf8" strokeWidth="5" />
      <polygon points="360,195 342,185 342,205" fill="#38bdf8" />
      <polygon points="650,195 632,185 632,205" fill="#38bdf8" />
    </svg>
  );
};
