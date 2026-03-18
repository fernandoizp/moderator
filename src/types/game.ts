export type ActionType =
  | 'approve'
  | 'remove'
  | 'sensitive'
  | 'misinformation'
  | 'escalate'
  | 'suspend'
  | 'warn';

export type ContentType =
  | 'post'
  | 'headline'
  | 'comment'
  | 'meme'
  | 'video'
  | 'campaign'
  | 'dm';

export type MetricKey =
  | 'publicTrust'
  | 'platformProfit'
  | 'censorshipLevel'
  | 'socialTension'
  | 'botInfluence'
  | 'publicMentalHealth'
  | 'extremismLevel'
  | 'politicalStability';

export type MetricSet = Record<MetricKey, number>;

export type FrameworkKey = 'ethical' | 'corporate' | 'political' | 'stability';

export interface DecisionEffect {
  metrics: Partial<MetricSet>;
  timeBonus?: number;
  note: string;
  corpScore: number;
  ethicsScore: number;
}

export interface ContentCase {
  id: string;
  day: number;
  type: ContentType;
  headline: string;
  body: string;
  username: string;
  followers: number;
  tags: string[];
  context?: string;
  reports?: string[];
  authorHistory?: string[];
  suspicionSignals?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  hiddenFlags: string[];
  apparentBestAction: ActionType;
  ethicalBestAction: ActionType;
  corporateBestAction: ActionType;
  politicalBestAction: ActionType;
  stabilityBestAction: ActionType;
  effects: Record<ActionType, DecisionEffect>;
}

export interface PolicyChange {
  id: string;
  title: string;
  summary: string;
  emphasis: FrameworkKey;
  priorityAction?: ActionType;
  actionModifier?: Partial<Record<ActionType, Partial<MetricSet>>>;
  scoreBias?: Partial<Record<ActionType, number>>;
}

export interface GlobalEvent {
  id: string;
  day: number;
  title: string;
  summary: string;
  newsFlash: string;
  metricShift: Partial<MetricSet>;
  activeFlags?: string[];
}

export interface DayConfiguration {
  day: number;
  title: string;
  intro: string;
  quota: number;
  timerSeconds: number;
  news: string[];
  companyGoal: string;
  policyChange: PolicyChange;
  possibleEventIds: string[];
}

export interface DecisionLog {
  caseId: string;
  action: ActionType;
  responseSeconds: number;
  effectNote: string;
}

export interface DayReport {
  day: number;
  title: string;
  processed: number;
  quota: number;
  avgResponseSeconds: number;
  decisions: DecisionLog[];
  metricDelta: Partial<MetricSet>;
  summary: string[];
  internalMessage: string;
  headline: string;
}

export interface EndingCondition {
  id: string;
  title: string;
  summary: string;
  epilogue: string;
  priority: number;
  matches: (world: MetricSet) => boolean;
}

export interface ActiveDayState {
  day: number;
  queue: ContentCase[];
  currentIndex: number;
  remainingSeconds: number;
  startedAt: number;
}

export type ScreenState = 'menu' | 'briefing' | 'moderation' | 'summary' | 'ending';

export interface GameState {
  screen: ScreenState;
  world: MetricSet;
  dayConfigs: DayConfiguration[];
  currentDay: number;
  activeDay?: ActiveDayState;
  reports: DayReport[];
  dayDecisionLogs: DecisionLog[];
  dayStartWorld: MetricSet;
  activeEvent?: GlobalEvent;
  ending?: EndingCondition;
  seededRunId: string;
}
