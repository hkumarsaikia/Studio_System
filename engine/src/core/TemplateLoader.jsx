import React from 'react';
import { ShortsVertical } from '../templates/ShortsVertical.jsx';
import { ExplainerCinematic } from '../templates/ExplainerCinematic.jsx';
import { DataInfographic } from '../templates/DataInfographic.jsx';
import { ProtestCinematic } from '../templates/ProtestCinematic.jsx';

export const TemplateLoader = ({ template, scenes }) => {
  switch (template) {
    case 'explainer':
      return <ExplainerCinematic scenes={scenes} />;
    case 'infographic':
      return <DataInfographic scenes={scenes} />;
    case 'protest':
      return <ProtestCinematic scenes={scenes} />;
    case 'shorts':
    default:
      return <ShortsVertical scenes={scenes} />;
  }
};
