import { ActionButton } from '../components/ActionButton';
import { ContentCard } from '../components/ContentCard';
import { TopBar } from '../components/TopBar';
import { ActionType, ContentCase, DayConfiguration, MetricSet } from '../types';

const actions: ActionType[] = ['approve', 'remove', 'sensitive', 'misinformation', 'escalate', 'suspend', 'warn'];

export const ModerationScreen = ({
  world,
  dayConfig,
  content,
  timer,
  queueLabel,
  onAction,
}: {
  world: MetricSet;
  dayConfig: DayConfiguration;
  content: ContentCase;
  timer: number;
  queueLabel: string;
  onAction: (action: ActionType) => void;
}) => (
  <main className="screen">
    <TopBar world={world} day={dayConfig.day} timer={timer} />
    <section className="workspace">
      <aside className="workspace__sidebar panel">
        <p className="eyebrow">Panel operativo</p>
        <h2>{queueLabel}</h2>
        <p>{dayConfig.companyGoal}</p>
        <div className="policy-box">
          <strong>{dayConfig.policyChange.title}</strong>
          <p>{dayConfig.policyChange.summary}</p>
        </div>
      </aside>
      <div className="workspace__main">
        <ContentCard content={content} />
        <div className="action-grid panel">
          {actions.map((action) => (
            <ActionButton key={action} action={action} onClick={() => onAction(action)} />
          ))}
        </div>
      </div>
    </section>
  </main>
);
