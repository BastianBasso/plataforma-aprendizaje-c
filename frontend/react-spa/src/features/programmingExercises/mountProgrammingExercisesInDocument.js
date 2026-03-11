import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ProgrammingExercise } from './ProgrammingExercise.jsx';

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isValidExerciseConfig(obj) {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj.version === 1 &&
    typeof obj.exerciseId === 'string'
  );
}

/**
 * Monta ejercicios de programación en un documento (ej. dentro de un iframe).
 * Busca contenedores con: data-exercise="programming" y un <script type="application/json" data-exercise-config>.
 *
 * @param {Document} doc
 * @param {{ onAnyPassed?: (info: { exerciseId: string }) => void }=} options
 * @returns {{ mountedCount: number, cleanup: () => void }}
 */
export function mountProgrammingExercisesInDocument(doc, options) {
  if (!doc) return { mountedCount: 0, cleanup: () => {} };

  const containers = Array.from(doc.querySelectorAll('[data-exercise="programming"]'));
  const roots = [];
  let mountedCount = 0;

  for (const el of containers) {
    const script = el.querySelector('script[type="application/json"][data-exercise-config]');
    const jsonText = script?.textContent || '';
    const config = safeJsonParse(jsonText);
    if (!isValidExerciseConfig(config)) continue;

    try {
      el.innerHTML = '';
    } catch {
      // ignore
    }

    const root = createRoot(el);
    roots.push(root);
    mountedCount += 1;

    root.render(
      createElement(ProgrammingExercise, {
        config,
        onPassed: options?.onAnyPassed,
      }),
    );
  }

  const cleanup = () => {
    for (const r of roots) {
      try {
        r.unmount();
      } catch {
        // ignore
      }
    }
  };

  return { mountedCount, cleanup };
}
