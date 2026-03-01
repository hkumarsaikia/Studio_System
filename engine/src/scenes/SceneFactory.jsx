import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Crowd } from '../components/Crowd.jsx';
import { DataBars } from '../components/DataBars.jsx';
import { FlowDiagram } from '../components/FlowDiagram.jsx';
import { SystemNetwork } from '../components/SystemNetwork.jsx';
import { IconGrid } from '../components/IconGrid.jsx';
import { LandscapeBackdrop } from '../components/LandscapeBackdrop.jsx';
import { CityStreetBackdrop } from '../components/CityStreetBackdrop.jsx';
import { AnimalSilhouettes } from '../components/AnimalSilhouettes.jsx';

export const SceneFactory = ({ scene }) => {
  const visual = scene.visual || 'none';

  if (visual === 'crowd') {
    return (
      <AbsoluteFill style={{ justifyContent: 'flex-end' }}>
        <Crowd count={scene.crowdCount || 8} />
      </AbsoluteFill>
    );
  }

  if (visual === 'bars') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
        <DataBars values={scene.barValues || [20, 35, 52, 68, 84]} />
      </AbsoluteFill>
    );
  }

  if (visual === 'flow') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
        <FlowDiagram labels={scene.flowLabels || ['Input', 'System', 'Output']} />
      </AbsoluteFill>
    );
  }

  if (visual === 'network') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
        <SystemNetwork nodes={scene.networkNodes || ['State', 'Market', 'Labor', 'Capital', 'Public']} />
      </AbsoluteFill>
    );
  }

  if (visual === 'icons') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 70 }}>
        <IconGrid icons={scene.icons || ['bank', 'factory', 'home', 'cart', 'law', 'media']} />
      </AbsoluteFill>
    );
  }

  if (visual === 'landscape') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <LandscapeBackdrop />
      </AbsoluteFill>
    );
  }

  if (visual === 'city') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CityStreetBackdrop />
      </AbsoluteFill>
    );
  }

  if (visual === 'animals') {
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 70 }}>
        <AnimalSilhouettes animals={scene.animals || ['bird', 'fish', 'deer']} />
      </AbsoluteFill>
    );
  }

  return null;
};
