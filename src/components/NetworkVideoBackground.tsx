import React from 'react';

export const NetworkVideoBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#0a0a0a',
      }}
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
          mixBlendMode: 'screen'
        }}
      >
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40134-424754593_large.mp4"
          type="video/mp4"
        />
        {/* Fallback video if the first one fails */}
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connection-background-27807-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay to ensure text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1
        }}
      />
    </div>
  );
};
