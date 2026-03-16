import React from 'react';
import { useGame } from '../context/GameContext';
import { Flame, Ghost, Sparkles, Beer, ArrowLeft } from 'lucide-react';

export const ModeSelectScreen = ({ onBack, onStart }) => {
  const { gameMode, setGameMode, intensity, setIntensity } = useGame();

  const handleStart = () => {
    if (gameMode && intensity) {
      onStart();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="title" style={{ flexGrow: 1, textAlign: 'center', marginRight: '32px' }}>Choose Poison</h2>
      </header>

      {/* Game Mode Selection */}
      <h3 className="text-secondary" style={{ marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Game Mode</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        <button 
          className="glass-panel" 
          style={{ 
            padding: '1.5rem', 
            border: gameMode === 'truth_dare' ? '2px solid var(--neon-pink)' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: gameMode === 'truth_dare' ? '0 0 20px rgba(236,72,153,0.2)' : 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
          onClick={() => setGameMode('truth_dare')}
        >
          <div style={{ background: 'rgba(236,72,153,0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--neon-pink)' }}>
            <Ghost size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Truth or Dare</h4>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Spin the wheel. Reveal secrets or do something stupid.</p>
          </div>
        </button>

        <button 
          className="glass-panel" 
          style={{ 
            padding: '1.5rem', 
            border: gameMode === 'callout' ? '2px solid var(--neon-blue)' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: gameMode === 'callout' ? '0 0 20px rgba(59,130,246,0.2)' : 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
          onClick={() => setGameMode('callout')}
        >
          <div style={{ background: 'rgba(59,130,246,0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--neon-blue)' }}>
            <Beer size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Drink If...</h4>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Classic callouts. If you did it, you drink.</p>
          </div>
        </button>
      </div>

      {/* Intensity Selection */}
      <h3 className="text-secondary" style={{ marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>2. Intensity</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: 'auto' }}>
        
        <button 
          className="glass-panel"
          style={{ 
            padding: '1rem 0.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            border: intensity === 'green' ? '2px solid var(--neon-green)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: intensity === 'green' ? 'inset 0 0 10px rgba(16,185,129,0.2), 0 0 15px rgba(16,185,129,0.2)' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setIntensity('green')}
        >
          <Sparkles color="var(--neon-green)" size={24} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Mild</span>
        </button>

        <button 
          className="glass-panel"
          style={{ 
            padding: '1rem 0.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            border: intensity === 'yellow' ? '2px solid var(--neon-yellow)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: intensity === 'yellow' ? 'inset 0 0 10px rgba(245,158,11,0.2), 0 0 15px rgba(245,158,11,0.2)' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setIntensity('yellow')}
        >
          <Beer color="var(--neon-yellow)" size={24} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Tipsy</span>
        </button>

        <button 
          className="glass-panel"
          style={{ 
            padding: '1rem 0.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            border: intensity === 'red' ? '2px solid var(--neon-red)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: intensity === 'red' ? 'inset 0 0 10px rgba(239,68,68,0.2), 0 0 15px rgba(239,68,68,0.2)' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setIntensity('red')}
        >
          <Flame color="var(--neon-red)" size={24} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Spicy</span>
        </button>

      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          style={{ 
            width: '100%', 
            padding: '1.25rem', 
            fontSize: '1.25rem',
            background: gameMode ? (gameMode === 'callout' ? 'var(--neon-blue)' : 'var(--neon-pink)') : 'var(--bg-glass)'
          }}
          disabled={!gameMode}
          onClick={handleStart}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};
