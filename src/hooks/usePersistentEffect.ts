import { DependencyList, useEffect } from 'react';

export const usePersistentEffect = (effect: () => void, deps: DependencyList) => {
  useEffect(effect, deps);
};
