import { DayConfiguration, GlobalEvent } from '../types';

export const BriefingPanel = ({ day, event, onStart }: { day: DayConfiguration; event?: GlobalEvent; onStart: () => void }) => (
  <section className="panel briefing-panel">
    <p className="eyebrow">Inicio de jornada</p>
    <h2>{day.title}</h2>
    <p className="lead">{day.intro}</p>

    <div className="briefing-grid">
      <article>
        <h3>Noticias</h3>
        <ul>
          {day.news.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article>
        <h3>Objetivo corporativo</h3>
        <p>{day.companyGoal}</p>
      </article>
      <article>
        <h3>Cambio de política</h3>
        <strong>{day.policyChange.title}</strong>
        <p>{day.policyChange.summary}</p>
      </article>
      <article>
        <h3>Evento activo</h3>
        <p>{event ? `${event.title}. ${event.summary}` : 'Sin evento extraordinario confirmado.'}</p>
      </article>
    </div>

    <button className="primary-button" onClick={onStart}>
      Abrir panel de moderación
    </button>
  </section>
);
