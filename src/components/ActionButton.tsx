import { ActionType } from '../types';

const labels: Record<ActionType, string> = {
  approve: 'Aprobar',
  remove: 'Eliminar',
  sensitive: 'Contenido sensible',
  misinformation: 'Marcar desinformación',
  escalate: 'Escalar revisión',
  suspend: 'Suspender cuenta',
  warn: 'Advertir usuario',
};

export const ActionButton = ({ action, onClick }: { action: ActionType; onClick: () => void }) => (
  <button className={`action-button action-button--${action}`} onClick={onClick}>
    {labels[action]}
  </button>
);
