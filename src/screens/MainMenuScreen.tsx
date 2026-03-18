export const MainMenuScreen = ({ onStart, hasSave }: { onStart: () => void; hasSave: boolean }) => (
  <main className="screen menu-screen">
    <section className="hero-panel">
      <p className="eyebrow">Simulador narrativo · Vertical Slice MVP</p>
      <h1>MODERADOR DE INTERNET</h1>
      <p className="lead">
        Revisa contenido bajo presión, obedece políticas cambiantes y descubre cuánto daño puede producir una interfaz limpia.
      </p>
      <ul className="feature-list">
        <li>6 jornadas intensas con reglas dinámicas.</li>
        <li>48 casos escritos para zonas grises morales.</li>
        <li>Variables globales que alteran el clima social y el desenlace.</li>
        <li>Tono corporativo frío, opresivo y sistémico.</li>
      </ul>
      <button className="primary-button" onClick={onStart}>
        {hasSave ? 'Nueva partida / sobrescribir guardado' : 'Iniciar turno'}
      </button>
    </section>
  </main>
);
