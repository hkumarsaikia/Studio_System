import React from 'react';

export const Person = ({ x = 0, y = 0, scale = 1, skin = '#f4c6a3', shirt = '#2563eb' }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy="-58" r="16" fill={skin} />
      <rect x="-18" y="-40" width="36" height="52" rx="8" fill={shirt} />
      <rect x="-26" y="-16" width="12" height="36" rx="6" fill={skin} />
      <rect x="14" y="-16" width="12" height="36" rx="6" fill={skin} />
      <rect x="-16" y="10" width="13" height="42" rx="5" fill="#0f172a" />
      <rect x="3" y="10" width="13" height="42" rx="5" fill="#0f172a" />
    </g>
  );
};
