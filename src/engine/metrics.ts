import { MetricSet } from '../types';
import { clamp } from '../utils/helpers';

export const createInitialWorld = (): MetricSet => ({
  publicTrust: 50,
  platformProfit: 50,
  censorshipLevel: 20,
  socialTension: 35,
  botInfluence: 30,
  publicMentalHealth: 55,
  extremismLevel: 25,
  politicalStability: 50,
});

export const mergeMetricDelta = (base: MetricSet, delta: Partial<MetricSet>): MetricSet => {
  const next = { ...base };
  (Object.keys(delta) as (keyof MetricSet)[]).forEach((key) => {
    const value = delta[key];
    if (typeof value === 'number') {
      next[key] = clamp(next[key] + value);
    }
  });
  return next;
};

export const diffMetrics = (before: MetricSet, after: MetricSet): Partial<MetricSet> => {
  const delta: Partial<MetricSet> = {};
  (Object.keys(before) as (keyof MetricSet)[]).forEach((key) => {
    const diff = after[key] - before[key];
    if (diff !== 0) {
      delta[key] = diff;
    }
  });
  return delta;
};
