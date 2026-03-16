import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { SetupScreen } from './screens/SetupScreen';
import { ModeSelectScreen } from './screens/ModeSelectScreen';
import { TruthDareScreen } from './screens/TruthDareScreen';
import { CalloutScreen } from './screens/CalloutScreen';
import { PromptManagerScreen } from './screens/PromptManagerScreen';

const GameRouter = () => {
  const { gameMode, user } = useGame();
  const [currentScreen, setCurrentScreen] = useState('setup'); // 'setup', 'mode_select', 'active'

  const renderScreen = () => {
    // Force SetupScreen (which now acts as Login Gate) if not authenticated
    if (!user) {
      return <SetupScreen onNext={() => setCurrentScreen('mode_select')} onManagePrompts={() => setCurrentScreen('prompt_manager')} />;
    }

    switch (currentScreen) {
      case 'setup':
        return <SetupScreen onNext={() => setCurrentScreen('mode_select')} onManagePrompts={() => setCurrentScreen('prompt_manager')} />;
      case 'prompt_manager':
        return <PromptManagerScreen onBack={() => setCurrentScreen('setup')} />;
      case 'mode_select':
        return (
          <ModeSelectScreen 
            onBack={() => setCurrentScreen('setup')} 
            onStart={() => setCurrentScreen('active')} 
          />
        );
      case 'active':
        if (gameMode === 'truth_dare') {
          return <TruthDareScreen onBack={() => setCurrentScreen('mode_select')} />;
        } else if (gameMode === 'callout') {
          return <CalloutScreen onBack={() => setCurrentScreen('mode_select')} />;
        }
        return null;
      default:
        return <SetupScreen onNext={() => setCurrentScreen('mode_select')} onManagePrompts={() => setCurrentScreen('prompt_manager')} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
      {renderScreen()}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
