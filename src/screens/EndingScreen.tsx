import { EndingPanel } from '../components/EndingPanel';
import { TopBar } from '../components/TopBar';
import { EndingCondition, MetricSet } from '../types';

export const EndingScreen = ({ world, ending, onRestart, onMenu, day }: { world: MetricSet; ending: EndingCondition; onRestart: () => void; onMenu: () => void; day: number }) => (
  <main className="screen">
    <TopBar world={world} day={day} />
    <EndingPanel ending={ending} world={world} onRestart={onRestart} onMenu={onMenu} />
  </main>
);
