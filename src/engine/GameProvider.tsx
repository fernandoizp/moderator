import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { buildInitialState, clearSave, loadGame, saveGame } from './gameEngine';
import { GameState } from '../types';
import { GameAction, gameReducer } from './gameReducer';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => loadGame() ?? buildInitialState());

  useEffect(() => {
    saveGame(state);
  }, [state]);

  useEffect(() => {
    if (state.screen === 'menu' && state.reports.length === 0 && state.currentDay === 1) {
      clearSave();
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
