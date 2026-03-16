import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Beer } from 'lucide-react';

export const CalloutScreen = ({ onBack }) => {
  const { intensity, currentPrompt, drawCard } = useGame();

  // Initial draw
  useEffect(() => {
    drawCard('callout');
  }, []);

  const handleNext = () => {
    drawCard('callout');
  };

  const getThemeColor = () => {
    if (intensity === 'green') return 'var(--neon-green)';
    if (intensity === 'yellow') return 'var(--neon-yellow)';
    return 'var(--neon-red)';
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flexGrow: 1, textAlign: 'center', marginRight: '32px' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '2px', 
            color: getThemeColor(),
            border: `1px solid ${getThemeColor()}`,
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {intensity} Callouts
          </span>
        </div>
      </header>

      {/* Main Card */}
      <div 
        className="glass animate-fade-in" 
        key={currentPrompt} // forces re-render animation when prompt changes
        style={{ 
          marginTop: 'auto', 
          marginBottom: 'auto',
          padding: '3rem 2rem', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          border: `2px solid ${getThemeColor()}`,
          boxShadow: `0 0 40px ${getThemeColor()}`.replace('var(', 'rgba(').replace(')', ', 0.2)'), // hacky opacity fallback
          minHeight: '40vh',
          justifyContent: 'center'
        }}
      >
        <Beer size={48} color={getThemeColor()} style={{ filter: `drop-shadow(0 0 10px ${getThemeColor()})` }} />
        
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 800, 
          lineHeight: 1.3,
          color: 'var(--text-primary)',
          textShadow: `0 0 20px ${getThemeColor()}`
        }}>
          {currentPrompt}
        </h2>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button 
          className="btn pulse-neon-pink" 
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', background: getThemeColor(), color: 'var(--bg-darker)' }}
          onClick={handleNext}
        >
          Next Card
        </button>
      </div>
    </div>
  );
};
