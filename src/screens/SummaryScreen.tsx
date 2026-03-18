import { DaySummaryPanel } from '../components/DaySummaryPanel';
import { TopBar } from '../components/TopBar';
import { DayReport, MetricSet } from '../types';

export const SummaryScreen = ({ world, report, onContinue, isFinalDay }: { world: MetricSet; report: DayReport; onContinue: () => void; isFinalDay: boolean }) => (
  <main className="screen">
    <TopBar world={world} day={report.day} />
    <DaySummaryPanel report={report} onContinue={onContinue} isFinalDay={isFinalDay} />
  </main>
);
