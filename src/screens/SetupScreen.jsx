import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { UserPlus, X, Play } from 'lucide-react';

export const SetupScreen = ({ onNext, onManagePrompts }) => {
  const { participants, addParticipant, removeParticipant } = useGame();
  const [newName, setNewName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      addParticipant(newName.trim());
      setNewName('');
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem', position: 'relative' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>😏</h1>
        <button 
          onClick={onManagePrompts}
          style={{ position: 'absolute', right: '0', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Manage Prompts"
        >
          <UserPlus size={18} style={{ display: 'none' }}/> 
          {/* using text instead of another icon to limit imports, or we can use another icon */}
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Edit Cards</span>
        </button>
      </header>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Player Name..." 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          maxLength={15}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem' }} disabled={!newName.trim()}>
          <UserPlus size={20} />
        </button>
      </form>

      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {participants.length === 0 ? (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', opacity: 0.7 }}>
            <p className="text-secondary">It's a bit empty here.</p>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Add at least 2 players!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {participants.map(p => (
              <div key={p.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{p.name}</span>
                </div>
                <button 
                  onClick={() => removeParticipant(p.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          className="btn btn-primary pulse-neon-pink" 
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}
          disabled={participants.length < 2}
          onClick={onNext}
        >
          <Play fill="white" size={24} /> Start Game
        </button>
      </div>
    </div>
  );
};
