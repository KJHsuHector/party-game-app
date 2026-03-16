import React, { createContext, useState, useContext, useEffect } from 'react';
import { gameData } from '../data/gameData';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Global State
  const [participants, setParticipants] = useState([]);
  const [gameMode, setGameMode] = useState(null); // 'truth_dare' or 'callout'
  const [intensity, setIntensity] = useState('green'); // 'green', 'yellow', 'red'
  const [activePlayer, setActivePlayer] = useState(null);
  
  // Game Logic State
  const [currentPrompt, setCurrentPrompt] = useState(null);
  
  // Custom Prompts State
  const [prompts, setPrompts] = useState(() => {
    const saved = localStorage.getItem('party_game_prompts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading prompts");
      }
    }
    return gameData; // fallback
  });

  // Save prompts on change
  useEffect(() => {
    localStorage.setItem('party_game_prompts', JSON.stringify(prompts));
  }, [prompts]);

  // Load participants from storage
  useEffect(() => {
    const saved = localStorage.getItem('party_game_participants');
    if (saved) {
      try {
        setParticipants(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading participants");
      }
    }
  }, []);

  // Save participants on change
  useEffect(() => {
    localStorage.setItem('party_game_participants', JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (name) => {
    const emojis = ['👽', '😈', '🚀', '🔥', '💃', '🕺', '🤡', '🤖', '👾', '👻'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Check if name already exists
    if (!participants.find(p => p.name.toLowerCase() === name.toLowerCase())) {
      setParticipants([...participants, { id: Date.now().toString(), name, emoji: randomEmoji }]);
    }
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const getRandomParticipant = () => {
    if (participants.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * participants.length);
    return participants[randomIndex];
  };

  const selectNextPlayer = () => {
    const nextPlayer = getRandomParticipant();
    setActivePlayer(nextPlayer);
    setCurrentPrompt(null);
  };

  const addPrompt = (mode, category, level, text) => {
    setPrompts(prev => {
      const updated = { ...prev };
      if (mode === 'truth_dare') {
        updated[mode][category][level] = [text, ...updated[mode][category][level]];
      } else {
        updated[mode][level] = [text, ...updated[mode][level]];
      }
      return updated;
    });
  };

  const deletePrompt = (mode, category, level, text) => {
    setPrompts(prev => {
      const updated = { ...prev };
      if (mode === 'truth_dare') {
        updated[mode][category][level] = updated[mode][category][level].filter(p => p !== text);
      } else {
        updated[mode][level] = updated[mode][level].filter(p => p !== text);
      }
      return updated;
    });
  };

  const getPrompt = (mode, category, level) => {
    if (mode === 'truth_dare') {
      const array = prompts.truth_dare[category][level];
      if (!array || array.length === 0) return "No prompt available.";
      return array[Math.floor(Math.random() * array.length)];
    } else {
      const array = prompts.callout[level];
      if (!array || array.length === 0) return "No prompt available.";
      return array[Math.floor(Math.random() * array.length)];
    }
  };

  const drawCard = (type) => {
    // type is 'truth' or 'dare' or 'callout'
    const prompt = getPrompt(gameMode, type, intensity);
    setCurrentPrompt(prompt);
  };

  const resetGame = () => {
    setGameMode(null);
    setActivePlayer(null);
    setCurrentPrompt(null);
  };

  const value = {
    participants,
    addParticipant,
    removeParticipant,
    gameMode,
    setGameMode,
    intensity,
    setIntensity,
    activePlayer,
    selectNextPlayer,
    currentPrompt,
    drawCard,
    resetGame,
    prompts,
    addPrompt,
    deletePrompt
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
