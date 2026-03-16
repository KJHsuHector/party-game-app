import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export const PromptManagerScreen = ({ onBack }) => {
  const { prompts, addPrompt, deletePrompt, resetPromptsToDefault } = useGame();
  
  const [selectedMainGroup, setSelectedMainGroup] = useState('truth_dare'); // 'truth_dare', 'callout'
  const [selectedCategory, setSelectedCategory] = useState('truth'); // 'truth', 'dare' (only for truth_dare)
  const [selectedIntensity, setSelectedIntensity] = useState('green'); // 'green', 'yellow', 'red'
  
  const [newPromptText, setNewPromptText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newPromptText.trim()) {
      addPrompt(selectedMainGroup, selectedCategory, selectedIntensity, newPromptText.trim());
      setNewPromptText('');
    }
  };

  const getActiveList = () => {
    if (selectedMainGroup === 'truth_dare') {
      return prompts.truth_dare[selectedCategory][selectedIntensity] || [];
    } else {
      return prompts.callout[selectedIntensity] || [];
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', marginTop: '1rem', width: '100%' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.25rem' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="title" style={{ margin: 0, textAlign: 'center', fontSize: '1.1rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Prompt Bank</h2>
        <button 
          onClick={resetPromptsToDefault}
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--neon-red)', cursor: 'pointer', padding: '0.4rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Reset
        </button>
      </header>

      {/* Tabs / Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${selectedMainGroup === 'truth_dare' ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', background: selectedMainGroup !== 'truth_dare' ? 'var(--bg-glass)' : '' }}
            onClick={() => setSelectedMainGroup('truth_dare')}
          >
            Truth / Dare
          </button>
          <button 
            className={`btn ${selectedMainGroup === 'callout' ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', background: selectedMainGroup !== 'callout' ? 'var(--bg-glass)' : '' }}
            onClick={() => setSelectedMainGroup('callout')}
          >
            Callout
          </button>
        </div>

        {selectedMainGroup === 'truth_dare' && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="glass-panel"
              style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', border: selectedCategory === 'truth' ? '1px solid var(--neon-blue)' : '1px solid rgba(255,255,255,0.1)', color: selectedCategory === 'truth' ? 'var(--neon-blue)' : 'var(--text-secondary)' }}
              onClick={() => setSelectedCategory('truth')}
            >Truth</button>
            <button 
              className="glass-panel"
              style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', border: selectedCategory === 'dare' ? '1px solid var(--neon-pink)' : '1px solid rgba(255,255,255,0.1)', color: selectedCategory === 'dare' ? 'var(--neon-pink)' : 'var(--text-secondary)' }}
              onClick={() => setSelectedCategory('dare')}
            >Dare</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="glass-panel"
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', border: selectedIntensity === 'green' ? '1px solid var(--neon-green)' : '1px solid rgba(255,255,255,0.1)', color: selectedIntensity === 'green' ? 'var(--neon-green)' : 'var(--text-secondary)' }}
            onClick={() => setSelectedIntensity('green')}
          >Mild</button>
          <button 
            className="glass-panel"
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', border: selectedIntensity === 'yellow' ? '1px solid var(--neon-yellow)' : '1px solid rgba(255,255,255,0.1)', color: selectedIntensity === 'yellow' ? 'var(--neon-yellow)' : 'var(--text-secondary)' }}
            onClick={() => setSelectedIntensity('yellow')}
          >Tipsy</button>
          <button 
            className="glass-panel"
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', border: selectedIntensity === 'red' ? '1px solid var(--neon-red)' : '1px solid rgba(255,255,255,0.1)', color: selectedIntensity === 'red' ? 'var(--neon-red)' : 'var(--text-secondary)' }}
            onClick={() => setSelectedIntensity('red')}
          >Spicy</button>
        </div>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          className="glass-input" 
          placeholder="New prompt..." 
          value={newPromptText}
          onChange={(e) => setNewPromptText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem' }} disabled={!newPromptText.trim()}>
          <Plus size={20} />
        </button>
      </form>

      <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {getActiveList().length === 0 ? (
          <p className="text-secondary" style={{ textAlign: 'center', marginTop: '2rem' }}>No prompts in this category.</p>
        ) : (
          getActiveList().map((promptText, idx) => (
            <div key={idx} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem' }}>
              <span style={{ fontSize: '0.9rem', lineHeight: '1.4', flexGrow: 1, paddingRight: '1rem' }}>{promptText}</span>
              <button 
                onClick={() => deletePrompt(selectedMainGroup, selectedCategory, selectedIntensity, promptText)}
                style={{ background: 'none', border: 'none', color: 'var(--neon-red)', cursor: 'pointer', padding: '0.25rem', opacity: 0.8 }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
