export const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export const pickDeterministic = <T,>(items: T[], seed: number, count: number): T[] => {
  const pool = [...items];
  const selected: T[] = [];
  let localSeed = seed;

  while (pool.length > 0 && selected.length < count) {
    localSeed = (localSeed * 9301 + 49297) % 233280;
    const index = Math.floor((localSeed / 233280) * pool.length);
    selected.push(pool.splice(index, 1)[0]);
  }

  return selected;
};

export const formatMetric = (value: number) => `${Math.round(value)}`;

export const toTitleCase = (value: string) =>
  value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
