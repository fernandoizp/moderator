import { MetricCard } from './MetricCard';
import { MetricSet } from '../types';

export const TopBar = ({ world, day, timer }: { world: MetricSet; day: number; timer?: number }) => (
  <header className="topbar">
    <div>
      <p className="eyebrow">Plataforma · División de Integridad</p>
      <h1>Moderador de Internet</h1>
    </div>
    <div className="topbar__status">
      <div className="status-pill">Día {day}</div>
      {typeof timer === 'number' && <div className="status-pill status-pill--timer">{timer}s</div>}
    </div>
    <div className="topbar__metrics">
      {(Object.entries(world) as [keyof MetricSet, number][]).map(([metric, value]) => (
        <MetricCard key={metric} metric={metric} value={value} />
      ))}
    </div>
  </header>
);
