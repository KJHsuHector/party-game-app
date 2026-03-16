import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, RefreshCw, Dna } from 'lucide-react';

export const TruthDareScreen = ({ onBack }) => {
  const { activePlayer, selectNextPlayer, intensity, currentPrompt, drawCard } = useGame();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  // Initial spin when component mounts
  useEffect(() => {
    if (!activePlayer) {
      handleNextTurn();
    }
  }, []);

  const handleNextTurn = () => {
    setIsSpinning(true);
    setShowCard(false);
    setSelectedType(null);
    
    // Fake spin delay
    setTimeout(() => {
      selectNextPlayer();
      setIsSpinning(false);
    }, 1500);
  };

  const handleSelect = (type) => {
    setSelectedType(type);
    drawCard(type);
    setShowCard(true);
  };

  // Theming based on intensity
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
            {intensity} Mode
          </span>
        </div>
      </header>

      {/* Player Selection Area */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '2rem' }}>
        <p className="text-secondary" style={{ fontSize: '1rem', marginBottom: '1rem' }}>WHO'S UP?</p>
        
        {isSpinning ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <RefreshCw size={48} color={getThemeColor()} style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : activePlayer ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '4rem', filter: `drop-shadow(0 0 10px ${getThemeColor()})` }}>{activePlayer.emoji}</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', textShadow: `0 0 15px ${getThemeColor()}` }}>
              {activePlayer.name}
            </h2>
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      {!isSpinning && !showCard && activePlayer && (
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', marginTop: 'auto', marginBottom: 'auto' }}>
          <button 
            className="glass-panel"
            style={{ 
              flex: 1, 
              padding: '2rem 1rem', 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              background: 'rgba(59, 130, 246, 0.1)',
              borderColor: 'var(--neon-blue)',
              color: 'var(--neon-blue)',
              boxShadow: '0 0 20px rgba(59,130,246,0.2)',
              cursor: 'pointer'
            }}
            onClick={() => handleSelect('truth')}
          >
            TRUTH
          </button>
          <button 
            className="glass-panel"
            style={{ 
              flex: 1, 
              padding: '2rem 1rem', 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              background: 'rgba(236, 72, 153, 0.1)',
              borderColor: 'var(--neon-pink)',
              color: 'var(--neon-pink)',
              boxShadow: '0 0 20px rgba(236,72,153,0.2)',
              cursor: 'pointer'
            }}
            onClick={() => handleSelect('dare')}
          >
            DARE
          </button>
        </div>
      )}

      {/* Card Reveal Area */}
      {showCard && currentPrompt && (
        <div className="glass animate-fade-in" style={{ 
          marginTop: 'auto', 
          marginBottom: 'auto',
          padding: '2.5rem 1.5rem', 
          textAlign: 'center',
          border: `2px solid ${selectedType === 'truth' ? 'var(--neon-blue)' : 'var(--neon-pink)'}`,
          boxShadow: `0 0 30px ${selectedType === 'truth' ? 'rgba(59,130,246,0.3)' : 'rgba(236,72,153,0.3)'}`
        }}>
          <h3 style={{ 
            color: selectedType === 'truth' ? 'var(--neon-blue)' : 'var(--neon-pink)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            {selectedType}
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 }}>
            "{currentPrompt}"
          </p>
        </div>
      )}

      <div style={{ marginTop: 'auto' }}>
        <button 
          className="btn" 
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'white' }}
          disabled={isSpinning}
          onClick={handleNextTurn}
        >
          {showCard ? "Next Turn" : "Re-spin"}
        </button>
      </div>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
