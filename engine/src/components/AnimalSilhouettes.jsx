import React from 'react';

export const AnimalSilhouettes = ({ animals = ['bird', 'fish', 'deer'] }) => {
  const symbols = {
    bird: '🕊️',
    fish: '🐟',
    deer: '🦌',
    cow: '🐄',
    bee: '🐝',
    turtle: '🐢',
  };

  return (
    <svg viewBox="0 0 900 520" style={{ width: '100%', height: '100%' }}>
      {animals.map((a, idx) => (
        <g key={`${a}-${idx}`} transform={`translate(${120 + idx * 220}, ${210 + (idx % 2) * 60})`}>
          <circle r="74" fill="#0f172a" opacity="0.75" />
          <text textAnchor="middle" y="18" fontSize="56">
            {symbols[a] || '🐾'}
          </text>
          <text textAnchor="middle" y="112" fill="#cbd5e1" fontSize="20" style={{ textTransform: 'uppercase' }}>
            {a}
          </text>
        </g>
      ))}
    </svg>
  );
};
