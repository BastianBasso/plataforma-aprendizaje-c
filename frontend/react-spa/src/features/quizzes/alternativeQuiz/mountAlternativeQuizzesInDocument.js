import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { AlternativeQuiz } from './AlternativeQuiz.jsx';
import { submitAlternativeQuizAttempt } from '../../../services/quizApi.js';

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isValidQuizDefinition(obj) {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj.version === 1 &&
    typeof obj.quizId === 'string' &&
    Array.isArray(obj.questions)
  );
}

/**
 * Monta quizzes de alternativas en un documento (ej. dentro de un iframe).
 * Busca contenedores con: data-quiz="alternative" y un <script type="application/json" data-quiz-config>.
 *
 * @param {Document} doc
 * @param {{ onAnySubmitted?: (info: { quizId: string }) => void }=} options
 * @returns {{ mountedCount: number, cleanup: () => void }}
 */
export function mountAlternativeQuizzesInDocument(doc, options) {
  if (!doc) return { mountedCount: 0, cleanup: () => {} };

  const containers = Array.from(doc.querySelectorAll('[data-quiz="alternative"]'));
  const roots = [];
  let mountedCount = 0;

  for (const el of containers) {
    const script = el.querySelector('script[type="application/json"][data-quiz-config]');
    const jsonText = script?.textContent || '';
    const def = safeJsonParse(jsonText);
    if (!isValidQuizDefinition(def)) continue;

    // Limpia el placeholder para que React tenga control total del contenedor
    try {
      el.innerHTML = '';
    } catch {
      // ignore
    }

    const root = createRoot(el);
    roots.push(root);
    mountedCount += 1;

    root.render(
      createElement(AlternativeQuiz, {
        quiz: def,
        api: { submitAlternativeQuizAttempt },
        onSubmitted: options?.onAnySubmitted,
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
