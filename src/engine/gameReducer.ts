import { dayConfigurations } from '../data';
import { ActionType, DayReport, GameState } from '../types';
import { buildInitialState, finishDayReport, getCurrentCase, getEnding, getEventForDay, startDayState } from './gameEngine';
import { mergeMetricDelta } from './metrics';

export type GameAction =
  | { type: 'BOOT'; payload?: GameState }
  | { type: 'START_GAME' }
  | { type: 'BEGIN_DAY' }
  | { type: 'ADVANCE_TIMER' }
  | { type: 'DECIDE'; payload: { action: ActionType; responseSeconds: number } }
  | { type: 'NEXT_DAY' }
  | { type: 'RESTART' }
  | { type: 'RETURN_TO_MENU' };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'BOOT':
      return action.payload ?? state;
    case 'START_GAME': {
      const fresh = buildInitialState();
      return { ...fresh, screen: 'briefing' };
    }
    case 'BEGIN_DAY': {
      const dayConfig = dayConfigurations[state.currentDay - 1];
      const activeEvent = getEventForDay(dayConfig, state.seededRunId);
      const worldWithEvent = activeEvent ? mergeMetricDelta(state.world, activeEvent.metricShift) : state.world;
      return {
        ...state,
        world: worldWithEvent,
        dayStartWorld: worldWithEvent,
        dayDecisionLogs: [],
        screen: 'moderation',
        activeDay: startDayState(dayConfig, state.seededRunId),
        activeEvent,
      };
    }
    case 'ADVANCE_TIMER': {
      if (state.screen !== 'moderation' || !state.activeDay) return state;
      const remainingSeconds = state.activeDay.remainingSeconds - 1;
      if (remainingSeconds > 0) {
        return {
          ...state,
          activeDay: { ...state.activeDay, remainingSeconds },
        };
      }

      const timeoutWorld = mergeMetricDelta(state.world, { publicTrust: -3, platformProfit: -2, socialTension: 3 });
      const report = finishDayReport(
        dayConfigurations[state.currentDay - 1],
        state.dayStartWorld,
        timeoutWorld,
        [],
        state.activeEvent,
      );

      return {
        ...state,
        world: timeoutWorld,
        reports: [...state.reports, report],
        dayDecisionLogs: [],
        screen: state.currentDay >= dayConfigurations.length ? 'ending' : 'summary',
        ending: state.currentDay >= dayConfigurations.length ? getEnding(timeoutWorld) : undefined,
        activeDay: undefined,
      };
    }
    case 'DECIDE': {
      if (!state.activeDay) return state;
      const currentCase = getCurrentCase(state);
      if (!currentCase) return state;
      const dayConfig = dayConfigurations[state.currentDay - 1];
      const effect = currentCase.effects[action.payload.action];
      const policyDelta = dayConfig.policyChange.actionModifier?.[action.payload.action] ?? {};
      const mergedEffect = {
        ...effect.metrics,
        ...Object.fromEntries(
          Object.keys(policyDelta).map((key) => [
            key,
            ((effect.metrics as Record<string, number | undefined>)[key] ?? 0) +
              ((policyDelta as Record<string, number | undefined>)[key] ?? 0),
          ]),
        ),
      };
      const nextWorld = mergeMetricDelta(state.world, mergedEffect);
      const decisions = [
        ...state.dayDecisionLogs,
        {
          caseId: currentCase.id,
          action: action.payload.action,
          responseSeconds: action.payload.responseSeconds,
          effectNote: effect.note,
        },
      ];

      const nextIndex = state.activeDay.currentIndex + 1;
      const isDayComplete = nextIndex >= state.activeDay.queue.length;

      if (!isDayComplete) {
        return {
          ...state,
          world: nextWorld,
          dayDecisionLogs: decisions,
          activeDay: {
            ...state.activeDay,
            currentIndex: nextIndex,
          },
        };
      }

      const report: DayReport = finishDayReport(dayConfig, state.dayStartWorld, nextWorld, decisions, state.activeEvent);
      const isFinalDay = state.currentDay >= dayConfigurations.length;

      return {
        ...state,
        world: nextWorld,
        activeDay: undefined,
        dayDecisionLogs: [],
        reports: [...state.reports, report],
        screen: isFinalDay ? 'ending' : 'summary',
        ending: isFinalDay ? getEnding(nextWorld) : undefined,
      };
    }
    case 'NEXT_DAY': {
      if (state.currentDay >= dayConfigurations.length) {
        return {
          ...state,
          screen: 'ending',
          ending: getEnding(state.world),
        };
      }
      return {
        ...state,
        currentDay: state.currentDay + 1,
        screen: 'briefing',
        activeEvent: undefined,
      };
    }
    case 'RETURN_TO_MENU':
      return buildInitialState();
    case 'RESTART':
      return { ...buildInitialState(), screen: 'briefing' };
    default:
      return state;
  }
};
