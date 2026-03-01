import React from 'react';
import { ShortsVertical } from '../templates/ShortsVertical.jsx';
import { ExplainerCinematic } from '../templates/ExplainerCinematic.jsx';

export const TemplateLoader = ({ template, scenes }) => {
  switch (template) {
    case 'explainer':
      return <ExplainerCinematic scenes={scenes} />;
    case 'shorts':
    default:
      return <ShortsVertical scenes={scenes} />;
  }
};