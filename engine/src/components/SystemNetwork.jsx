import React from 'react';

export const SystemNetwork = ({ nodes = ['State', 'Market', 'Labor', 'Capital', 'Public'] }) => {
  const points = [
    { x: 200, y: 180 },
    { x: 460, y: 90 },
    { x: 700, y: 180 },
    { x: 610, y: 340 },
    { x: 290, y: 340 },
  ];

  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2],
    [1, 3],
  ];

  return (
    <svg viewBox="0 0 900 480" style={{ width: '100%', height: '100%' }}>
      {links.map(([a, b], idx) => (
        <line
          key={`l-${idx}`}
          x1={points[a].x}
          y1={points[a].y}
          x2={points[b].x}
          y2={points[b].y}
          stroke="#38bdf8"
          strokeOpacity="0.45"
          strokeWidth="3"
        />
      ))}

      {points.map((p, idx) => (
        <g key={`n-${idx}`} transform={`translate(${p.x}, ${p.y})`}>
          <circle r="46" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
          <text x="0" y="7" fill="#e2e8f0" textAnchor="middle" fontSize="18" fontWeight="700">
            {nodes[idx] || `N${idx + 1}`}
          </text>
        </g>
      ))}
    </svg>
  );
};
