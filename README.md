# Moderador de Internet

## Resumen ejecutivo
Moderador de Internet es un simulador narrativo de sesiones cortas e intensas donde el jugador trabaja en la división de integridad de una gran plataforma digital.
Cada jornada presenta una cola de casos con presión temporal, ambigüedad moral y objetivos corporativos cambiantes.
El núcleo jugable mezcla revisión rápida de contenido, lectura contextual y decisiones con impacto sistémico.
El jugador no optimiza solo puntos: altera confianza pública, rentabilidad, censura, tensión social, salud mental colectiva, extremismo, influencia bot y estabilidad política.
La fantasía central no es “ser juez perfecto”, sino descubrir cómo una interfaz burocrática normaliza decisiones con consecuencias masivas.
El tono se apoya en frialdad corporativa, manipulación blanda y sátira oscura contenida, evitando tanto el meme absurdo como el sermón moralista.
La vertical slice del MVP está diseñada para ser rejugable, comprensible y extensible.
Incluye un menú principal, briefing de jornada, pantalla principal de moderación, cierre de día, persistencia local y finales divergentes.
La arquitectura es data-driven para permitir añadir nuevos casos, eventos, políticas y finales sin reescribir la UI.
El contenido prioriza zonas grises: denuncias reales confundibles con fake news, sátira atacada por brigadas, campañas bot con agravios plausibles o clips útiles pero traumáticos.
La progresión introduce nuevas tensiones: presión de anunciantes, crisis informativas, trauma viral, automatización política y noches de disturbios.
Cada día dura pocos minutos y fuerza al jugador a operar bajo fatiga, prioridades cruzadas y criterios que nunca coinciden del todo.
La intención del MVP es validar la identidad del juego, su loop, la legibilidad de la UI y la solidez de la base sistémica.

## Cómo ejecutar el proyecto

### Requisitos
- Node.js 20 o superior.
- npm 10 o superior.

### Arranque normal
```bash
npm install
npm run dev
```

Después abre la URL que muestre Vite, normalmente `http://localhost:5173`.

### Build de producción
```bash
npm run build
npm run preview
```

## Si `npm install` falla con proxy / 403
En algunos entornos corporativos o contenedores, `npm` hereda variables como `HTTP_PROXY`, `HTTPS_PROXY`, `npm_config_http_proxy` o `npm_config_https_proxy`.
Si ese proxy responde `403 Forbidden`, la instalación no depende del código del repo: depende de la red o de la configuración del equipo.

Este repo incluye dos ayudas:

```bash
npm run doctor
npm run bootstrap
```

- `npm run doctor` imprime versión de Node/npm, registry activo y variables proxy detectadas.
- `npm run bootstrap` limpia variables proxy comunes, fuerza el registry público de npm y luego ejecuta `npm install`.

También puedes hacerlo manualmente:

```bash
unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy
unset npm_config_http_proxy npm_config_https_proxy npm_config_proxy npm_config_all_proxy
npm config delete proxy
npm config delete https-proxy
npm config set registry https://registry.npmjs.org/
npm install
```

Si incluso así no descarga paquetes, entonces tu red no tiene salida directa a npm y necesitas:
- cambiar de red,
- usar una VPN con acceso a npm,
- o configurar correctamente un mirror/proxy corporativo que permita el registro.

## Sistemas principales
- Loop de jornada: briefing → moderación → resumen → progresión.
- Sistema de casos data-driven con efectos por decisión.
- Sistema de métricas globales persistentes durante la partida.
- Políticas dinámicas corporativas con sesgos distintos por día.
- Eventos globales que alteran el clima del mundo antes de cada jornada.
- Temporizador por jornada para introducir presión operativa.
- Finales condicionales según estado sistémico acumulado.
- Persistencia local de partida para permitir retomar o reiniciar.
- UI modular estilo dashboard corporativo opresivo.

## Arquitectura técnica
- **Stack**: React + TypeScript + Vite.
- **Gestión de estado**: Context + reducer para separar la lógica del render, evitar dependencias adicionales y mantener trazabilidad del flujo.
- **Capa de datos**: `src/data` contiene configuraciones de días, políticas, eventos, finales y casos de contenido.
- **Capa de motor**: `src/engine` resuelve estado inicial, selección determinista de colas, aplicación de métricas, reportes diarios y final de partida.
- **Capa de UI**: `src/components` compone paneles reutilizables; `src/screens` orquesta pantallas completas.
- **Capa de tipos**: `src/types` define el contrato del juego para mantener consistencia entre datos, motor y UI.
- **Capa de utilidades**: `src/utils` centraliza helpers de formato y selección determinista.
- **Persistencia**: `localStorage` con serialización del estado completo del run.

## Estructura de carpetas
```text
src/
  components/    # paneles y widgets reutilizables de UI
  data/          # casos, eventos, políticas, días y finales
  engine/        # reducer, provider, motor y métricas
  hooks/         # hooks auxiliares reutilizables
  screens/       # pantallas completas del flujo
  styles/        # CSS global y estética del dashboard
  types/         # tipos e interfaces del dominio
  utils/         # helpers puros de apoyo
scripts/
  bootstrap.sh   # limpia proxy env y lanza npm install
  doctor.sh      # diagnostica node/npm/proxy/registry
```

## Tipos/interfaces principales
- `ContentCase`: define cada pieza moderable, metadatos, marcos de “mejor decisión” y efectos por acción.
- `PolicyChange`: representa cambios de criterio corporativo con sesgos y modificadores de métricas.
- `GlobalEvent`: modela crisis o acontecimientos del mundo con impactos sistémicos previos a la jornada.
- `MetricSet` / `WorldState`: encapsula las variables globales que evolucionan durante la partida.
- `DayConfiguration`: describe cuota, temporizador, briefing, noticias y política del día.
- `DayReport`: resume la jornada, decisiones, delta de métricas y mensaje interno.
- `EndingCondition`: define reglas de cierre y epílogo según el estado final del mundo.
- `GameState`: estado raíz serializable del run, listo para persistencia y expansión.

## Plan de implementación
1. Definir visión, tono, métricas y dominio tipado.
2. Montar estructura técnica base de Vite + React + TypeScript.
3. Implementar estado global, reducer y persistencia local.
4. Construir loop completo de pantallas jugables.
5. Crear base data-driven de días, políticas, eventos y finales.
6. Escribir una librería inicial de 48 casos ambiguos y reutilizables.
7. Pulir UI/UX con identidad corporativa fría y feedback claro.
8. Validar flujo completo, ajustar balance y dejar puntos de expansión futura.
