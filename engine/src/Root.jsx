import React from 'react';
import { Composition, AbsoluteFill, Html5Audio, staticFile } from 'remotion';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TestComposition"
        component={() => (
          <AbsoluteFill
            style={{
              backgroundColor: 'black',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              fontSize: 80
            }}
          >
            Hello World 12345
            <Html5Audio src={staticFile('audio/scene1.mp3')} />
          </AbsoluteFill>
        )}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};