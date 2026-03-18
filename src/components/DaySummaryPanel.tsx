import { DayReport } from '../types';

export const DaySummaryPanel = ({ report, onContinue, isFinalDay }: { report: DayReport; onContinue: () => void; isFinalDay: boolean }) => (
  <section className="panel summary-panel">
    <p className="eyebrow">Cierre de jornada</p>
    <h2>{report.title}</h2>
    <p className="lead">{report.headline}</p>

    <div className="summary-grid">
      <article>
        <h3>Rendimiento</h3>
        <p>{report.processed} / {report.quota} casos procesados</p>
        <p>Respuesta media: {report.avgResponseSeconds}s</p>
      </article>
      <article>
        <h3>Mensaje interno</h3>
        <p>{report.internalMessage}</p>
      </article>
      <article>
        <h3>Lectura sistémica</h3>
        <ul>
          {report.summary.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>
      <article>
        <h3>Últimas decisiones</h3>
        <ul>
          {report.decisions.slice(-4).map((item) => <li key={item.caseId}>{item.action}: {item.effectNote}</li>)}
        </ul>
      </article>
    </div>

    <button className="primary-button" onClick={onContinue}>
      {isFinalDay ? 'Ver desenlace' : 'Siguiente jornada'}
    </button>
  </section>
);
