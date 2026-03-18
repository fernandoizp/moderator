import { ContentCase } from '../types';

export const ContentCard = ({ content }: { content: ContentCase }) => (
  <section className="content-card">
    <div className="content-card__meta">
      <div>
        <p className="eyebrow">{content.type.toUpperCase()}</p>
        <h2>{content.headline}</h2>
      </div>
      <div className="content-card__identity">
        <strong>@{content.username}</strong>
        <span>{content.followers.toLocaleString('es-ES')} seguidores</span>
      </div>
    </div>

    <p className="content-card__body">{content.body}</p>

    <div className="content-card__tags">
      {content.tags.map((tag) => (
        <span key={tag}>#{tag}</span>
      ))}
    </div>

    <div className="content-card__panels">
      <article>
        <h3>Contexto parcial</h3>
        <p>{content.context ?? 'Sin contexto adicional.'}</p>
      </article>
      <article>
        <h3>Reportes</h3>
        <ul>
          {(content.reports ?? ['Sin reportes relevantes']).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article>
        <h3>Historial del autor</h3>
        <ul>
          {(content.authorHistory ?? ['Sin historial disciplinario']).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article>
        <h3>Señales de sospecha</h3>
        <ul>
          {(content.suspicionSignals ?? ['Sin anomalías claras']).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  </section>
);
