import { PolicyChange } from '../types';

export const policies: PolicyChange[] = [
  {
    id: 'brand-safety',
    title: 'Protección de marca',
    summary: 'La dirección exige limpiar cualquier contenido que incomode a anunciantes premium.',
    emphasis: 'corporate',
    priorityAction: 'remove',
    scoreBias: { remove: 2, sensitive: 1 },
    actionModifier: {
      remove: { platformProfit: 2, censorshipLevel: 1 },
      approve: { platformProfit: -2, publicTrust: -1 },
    },
  },
  {
    id: 'anti-misinformation',
    title: 'Operación Verdad Flexible',
    summary: 'Se prioriza reducir bulos virales, pero solo cuando dañan la estabilidad institucional.',
    emphasis: 'stability',
    priorityAction: 'misinformation',
    scoreBias: { misinformation: 2, escalate: 1 },
    actionModifier: {
      misinformation: { publicTrust: 2, politicalStability: 1 },
      approve: { extremismLevel: 1, socialTension: 1 },
    },
  },
  {
    id: 'engagement-drive',
    title: 'Impulso de engagement',
    summary: 'La empresa quiere retener usuarios incluso si el discurso se vuelve más agresivo.',
    emphasis: 'corporate',
    priorityAction: 'approve',
    scoreBias: { approve: 2, warn: 1 },
    actionModifier: {
      approve: { platformProfit: 2, socialTension: 1 },
      remove: { platformProfit: -2, publicTrust: 1 },
    },
  },
  {
    id: 'state-partnership',
    title: 'Coordinación institucional',
    summary: 'Se pide contener rumores que erosionen la confianza en el gobierno y las fuerzas de orden.',
    emphasis: 'political',
    priorityAction: 'escalate',
    scoreBias: { escalate: 2, remove: 1 },
    actionModifier: {
      escalate: { politicalStability: 2, censorshipLevel: 1 },
      approve: { politicalStability: -2, publicTrust: -1 },
    },
  },
  {
    id: 'wellness-window',
    title: 'Protocolo de bienestar',
    summary: 'Tras varias crisis virales, se penaliza dejar pasar contenido autodestructivo o traumático.',
    emphasis: 'ethical',
    priorityAction: 'sensitive',
    scoreBias: { sensitive: 2, escalate: 1 },
    actionModifier: {
      sensitive: { publicMentalHealth: 2, publicTrust: 1 },
    },
  },
  {
    id: 'zero-ambiguity',
    title: 'Tolerancia cero a la ambigüedad visual',
    summary: 'Todo material insinuado como violento, sexual o estremecedor debe tratarse de forma conservadora.',
    emphasis: 'corporate',
    priorityAction: 'sensitive',
    scoreBias: { sensitive: 2, remove: 1 },
    actionModifier: {
      sensitive: { platformProfit: 1, censorshipLevel: 1 },
      approve: { platformProfit: -1, publicTrust: -1 },
    },
  },
];
