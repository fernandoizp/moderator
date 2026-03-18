import { BriefingPanel } from '../components/BriefingPanel';
import { TopBar } from '../components/TopBar';
import { DayConfiguration, GlobalEvent, MetricSet } from '../types';

export const BriefingScreen = ({ world, day, event, onStart }: { world: MetricSet; day: DayConfiguration; event?: GlobalEvent; onStart: () => void }) => (
  <main className="screen">
    <TopBar world={world} day={day.day} />
    <BriefingPanel day={day} event={event} onStart={onStart} />
  </main>
);
