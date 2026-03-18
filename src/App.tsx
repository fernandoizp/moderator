import { useEffect, useMemo, useRef } from 'react';
import { GameProvider, useGame } from './engine/GameProvider';
import { getEventForDay } from './engine/gameEngine';
import { BriefingScreen } from './screens/BriefingScreen';
import { EndingScreen } from './screens/EndingScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { ModerationScreen } from './screens/ModerationScreen';
import { SummaryScreen } from './screens/SummaryScreen';

const GameShell = () => {
  const { state, dispatch } = useGame();
  const currentDayConfig = state.dayConfigs[state.currentDay - 1];
  const currentCase = state.activeDay?.queue[state.activeDay.currentIndex];
  const dayEvent = useMemo(() => getEventForDay(currentDayConfig, state.seededRunId), [currentDayConfig, state.seededRunId]);
  const caseOpenedAt = useRef(Date.now());

  useEffect(() => {
    if (state.screen !== 'moderation') return undefined;
    const timer = window.setInterval(() => dispatch({ type: 'ADVANCE_TIMER' }), 1000);
    return () => window.clearInterval(timer);
  }, [state.screen, dispatch]);

  useEffect(() => {
    caseOpenedAt.current = Date.now();
  }, [state.activeDay?.currentIndex]);

  if (state.screen === 'menu') {
    return <MainMenuScreen onStart={() => dispatch({ type: 'START_GAME' })} hasSave={state.reports.length > 0} />;
  }

  if (state.screen === 'briefing') {
    return (
      <BriefingScreen
        world={state.world}
        day={currentDayConfig}
        event={dayEvent}
        onStart={() => dispatch({ type: 'BEGIN_DAY' })}
      />
    );
  }

  if (state.screen === 'moderation' && currentCase && state.activeDay) {
    return (
      <ModerationScreen
        world={state.world}
        dayConfig={currentDayConfig}
        content={currentCase}
        timer={state.activeDay.remainingSeconds}
        queueLabel={`Caso ${state.activeDay.currentIndex + 1} de ${state.activeDay.queue.length}`}
        onAction={(action) =>
          dispatch({
            type: 'DECIDE',
            payload: {
              action,
              responseSeconds: Math.max(1, Math.round((Date.now() - caseOpenedAt.current) / 1000)),
            },
          })
        }
      />
    );
  }

  if (state.screen === 'summary') {
    return (
      <SummaryScreen
        world={state.world}
        report={state.reports[state.reports.length - 1]}
        onContinue={() => dispatch({ type: 'NEXT_DAY' })}
        isFinalDay={state.currentDay >= state.dayConfigs.length}
      />
    );
  }

  if (state.screen === 'ending' && state.ending) {
    return (
      <EndingScreen
        world={state.world}
        ending={state.ending}
        day={state.currentDay}
        onRestart={() => dispatch({ type: 'RESTART' })}
        onMenu={() => dispatch({ type: 'RETURN_TO_MENU' })}
      />
    );
  }

  return null;
};

const App = () => (
  <GameProvider>
    <GameShell />
  </GameProvider>
);

export default App;
