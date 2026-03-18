import { EndingCondition, MetricSet } from '../types';

export const EndingPanel = ({ ending, world, onRestart, onMenu }: { ending: EndingCondition; world: MetricSet; onRestart: () => void; onMenu: () => void }) => (
  <section className="panel ending-panel">
    <p className="eyebrow">Estado de cierre</p>
    <h2>{ending.title}</h2>
    <p className="lead">{ending.summary}</p>
    <p>{ending.epilogue}</p>

    <div className="ending-metrics">
      {Object.entries(world).map(([key, value]) => (
        <div key={key} className="ending-metric">
          <span>{key}</span>
          <strong>{Math.round(value)}</strong>
        </div>
      ))}
    </div>

    <div className="button-row">
      <button className="primary-button" onClick={onRestart}>Reiniciar partida</button>
      <button className="secondary-button" onClick={onMenu}>Volver al menú</button>
    </div>
  </section>
);
