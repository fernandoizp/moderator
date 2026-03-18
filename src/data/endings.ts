import { EndingCondition } from '../types';

export const endings: EndingCondition[] = [
  {
    id: 'profit-monster',
    title: 'La máquina rentable',
    summary: 'La plataforma bate récords y normaliza un clima tóxico que ya nadie sabe apagar.',
    epilogue: 'Recibes una promoción discreta. Tu panel se amplía; tu ventana desaparece.',
    priority: 5,
    matches: (world) => world.platformProfit >= 72 && world.socialTension >= 65,
  },
  {
    id: 'sterile-peace',
    title: 'Paz estéril',
    summary: 'La estabilidad sube, pero solo porque casi toda fricción ha sido esterilizada.',
    epilogue: 'La empresa te felicita por “reducir incertidumbre”. Fuera, nadie sabe ya qué puede decir.',
    priority: 4,
    matches: (world) => world.censorshipLevel >= 70 && world.politicalStability >= 58,
  },
  {
    id: 'collapse-trust',
    title: 'Colapso de credibilidad',
    summary: 'La plataforma sigue en pie, pero su palabra ya no pesa más que un rumor cualquiera.',
    epilogue: 'Un memorando interno culpa a verificadores, usuarios y contexto. Tu nombre no aparece.',
    priority: 4,
    matches: (world) => world.publicTrust <= 28,
  },
  {
    id: 'chaotic-feed',
    title: 'El feed arde',
    summary: 'La permisividad y la manipulación convierten la conversación pública en detonación continua.',
    epilogue: 'Las alertas siguen entrando incluso después del cierre de turno.',
    priority: 5,
    matches: (world) => world.socialTension >= 74 || world.extremismLevel >= 72,
  },
  {
    id: 'gray-survivor',
    title: 'Supervivencia gris',
    summary: 'No salvaste el sistema ni lo hundiste del todo. Aprendiste a moverte dentro de su niebla moral.',
    epilogue: 'Tu contrato se renueva por otros noventa días. La interfaz te da la bienvenida como si fuera un honor.',
    priority: 1,
    matches: () => true,
  },
];
