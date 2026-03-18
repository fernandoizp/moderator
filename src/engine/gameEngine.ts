import { contentCases, dayConfigurations, endings, globalEvents } from '../data';
import {
  ActiveDayState,
  ContentCase,
  DayConfiguration,
  DayReport,
  DecisionLog,
  EndingCondition,
  GameState,
  GlobalEvent,
  MetricSet,
} from '../types';
import { createInitialWorld, diffMetrics } from './metrics';
import { pickDeterministic } from '../utils/helpers';

const STORAGE_KEY = 'moderador-internet-save';

export const createRunId = () => `${Date.now()}`;

const hashSeed = (input: string) =>
  input.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 17);

export const buildInitialState = (): GameState => ({
  screen: 'menu',
  world: createInitialWorld(),
  dayConfigs: dayConfigurations,
  currentDay: 1,
  reports: [],
  dayDecisionLogs: [],
  dayStartWorld: createInitialWorld(),
  seededRunId: createRunId(),
});

export const getEventForDay = (dayConfig: DayConfiguration, runId: string): GlobalEvent | undefined => {
  const pool = globalEvents.filter((event) => dayConfig.possibleEventIds.includes(event.id));
  if (pool.length === 0) return undefined;
  return pickDeterministic(pool, hashSeed(`${runId}-${dayConfig.day}`), 1)[0];
};

export const createDayQueue = (day: number, quota: number, runId: string): ContentCase[] => {
  const pool = contentCases.filter((item) => item.day === day);
  return pickDeterministic(pool, hashSeed(`${runId}-${day}-queue`), quota);
};

export const startDayState = (dayConfig: DayConfiguration, runId: string): ActiveDayState => ({
  day: dayConfig.day,
  queue: createDayQueue(dayConfig.day, dayConfig.quota, runId),
  currentIndex: 0,
  remainingSeconds: dayConfig.timerSeconds,
  startedAt: Date.now(),
});

export const getCurrentCase = (state: GameState) => {
  const activeDay = state.activeDay;
  if (!activeDay) return undefined;
  return activeDay.queue[activeDay.currentIndex];
};

export const finishDayReport = (
  dayConfig: DayConfiguration,
  worldBeforeDay: MetricSet,
  worldAfterDay: MetricSet,
  decisions: DecisionLog[],
  activeEvent?: GlobalEvent,
): DayReport => {
  const metricDelta = diffMetrics(worldBeforeDay, worldAfterDay);
  const avgResponseSeconds = decisions.length
    ? Number((decisions.reduce((sum, item) => sum + item.responseSeconds, 0) / decisions.length).toFixed(1))
    : 0;

  const summary = [
    activeEvent ? `Evento activo: ${activeEvent.title}.` : 'Sin evento macro adicional en esta jornada.',
    metricDelta.publicTrust ? `Confianza pública ${metricDelta.publicTrust > 0 ? 'al alza' : 'a la baja'}.` : 'La confianza pública apenas se movió.',
    metricDelta.platformProfit ? `Rentabilidad ${metricDelta.platformProfit > 0 ? 'mejora' : 'retrocede'} tras tus decisiones.` : 'Los ingresos quedaron estables.',
    metricDelta.socialTension ? `La tensión social ${metricDelta.socialTension > 0 ? 'crece' : 'cede'} en el ecosistema.` : 'La tensión social quedó contenida.',
  ];

  return {
    day: dayConfig.day,
    title: dayConfig.title,
    processed: decisions.length,
    quota: dayConfig.quota,
    avgResponseSeconds,
    decisions,
    metricDelta,
    summary,
    internalMessage: `Dirección interna: ${dayConfig.companyGoal}`,
    headline: activeEvent?.newsFlash ?? 'La jornada concluye sin alivio visible.',
  };
};

export const getEnding = (world: MetricSet): EndingCondition =>
  [...endings].sort((a, b) => b.priority - a.priority).find((ending) => ending.matches(world)) ?? endings[0];

export const saveGame = (state: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGame = (): GameState | undefined => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return undefined;
  }
};

export const clearSave = () => localStorage.removeItem(STORAGE_KEY);
