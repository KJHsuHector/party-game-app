import React, { createContext, useState, useContext, useEffect } from 'react';
import { gameData } from '../data/gameData';
import { db, doc, setDoc, onSnapshot } from '../services/firebase';

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
  
  // Custom Prompts State (Cloud Synced)
  const [prompts, setPrompts] = useState(gameData);
  const [isPromptsLoaded, setIsPromptsLoaded] = useState(false);

  useEffect(() => {
    const promptDocRef = doc(db, 'party_game', 'shared_prompts');

    // Real-time listen to Cloud Firestore
    const unsubscribe = onSnapshot(promptDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setPrompts(docSnap.data());
        setIsPromptsLoaded(true);
      } else {
        // If DB is empty, push the default gameData
        setDoc(promptDocRef, gameData)
          .then(() => setIsPromptsLoaded(true))
          .catch(err => console.error("Error seeding Firestore:", err));
      }
    }, (error) => {
      console.error("Firestore sync error:", error);
    });

    return () => unsubscribe();
  }, []);

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

  const updateRemotePrompts = async (newPrompts) => {
    try {
      if (isPromptsLoaded) {
        await setDoc(doc(db, 'party_game', 'shared_prompts'), newPrompts);
      }
    } catch (e) {
      console.error("Failed to sync prompts to cloud", e);
      alert("Failed to sync to cloud. Please check your internet connection.");
    }
  };

  const addPrompt = (mode, category, level, text) => {
    const updated = JSON.parse(JSON.stringify(prompts)); // deep clone
    if (mode === 'truth_dare') {
      updated[mode][category][level] = [text, ...updated[mode][category][level]];
    } else {
      updated[mode][level] = [text, ...updated[mode][level]];
    }
    updateRemotePrompts(updated);
  };

  const deletePrompt = (mode, category, level, text) => {
    const updated = JSON.parse(JSON.stringify(prompts)); // deep clone
    if (mode === 'truth_dare') {
      updated[mode][category][level] = updated[mode][category][level].filter(p => p !== text);
    } else {
      updated[mode][level] = updated[mode][level].filter(p => p !== text);
    }
    updateRemotePrompts(updated);
  };

  const resetPromptsToDefault = () => {
    if (window.confirm("Are you sure you want to restore the default prompt database? This will overwrite the cloud database for EVERYONE.")) {
      updateRemotePrompts(gameData);
    }
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
    deletePrompt,
    resetPromptsToDefault
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
