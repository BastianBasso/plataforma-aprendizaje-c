/**
 * Dominio puro (sin React): evaluación y métricas del quiz.
 *
 * SOLID:
 * - SRP: solo cálculo de resultados.
 * - OCP: puedes extender métricas sin tocar UI.
 */

/**
 * @typedef {{ id: string|number, text: string }} AlternativeQuizOption
 */

/**
 * @typedef {{
 *  id: string|number,
 *  label?: string,
 *  text: string,
 *  options: AlternativeQuizOption[],
 *  correctOptionId?: string|number
 * }} AlternativeQuizQuestion
 */

/**
 * @typedef {{
 *  version: 1,
 *  quizId: string,
 *  lessonId?: number,
 *  title?: string,
 *  questions: AlternativeQuizQuestion[]
 * }} AlternativeQuizDefinition
 */

/**
 * @typedef {{
 *  quizId: string,
 *  answers: Record<string, string|number>
 * }} AlternativeQuizAttempt
 */

function normalizeKey(value) {
  return String(value);
}

/**
 * Evalúa un intento si el quiz incluye `correctOptionId`.
 * Si falta en alguna pregunta, la pregunta queda como `unknown`.
 *
 * @param {AlternativeQuizDefinition} quiz
 * @param {AlternativeQuizAttempt} attempt
 */
export function evaluateAlternativeQuizAttempt(quiz, attempt) {
  const byQuestion = [];
  let correctCount = 0;
  let gradedCount = 0;

  for (const q of quiz.questions || []) {
    const qKey = normalizeKey(q.id);
    const selected = attempt?.answers ? attempt.answers[qKey] : undefined;

    if (q.correctOptionId === undefined) {
      byQuestion.push({ questionId: q.id, label: q.label ?? null, selectedOptionId: selected ?? null, result: 'unknown' });
      continue;
    }

    const ok = selected !== undefined && normalizeKey(selected) === normalizeKey(q.correctOptionId);
    gradedCount += 1;
    if (ok) correctCount += 1;

    byQuestion.push({
      questionId: q.id,
      label: q.label ?? null,
      selectedOptionId: selected ?? null,
      correctOptionId: q.correctOptionId,
      result: ok ? 'correct' : 'incorrect',
    });
  }

  const percent = gradedCount > 0 ? Math.round((correctCount / gradedCount) * 100) : 0;

  /** @type {Record<string, { total: number, correct: number, incorrect: number, unknown: number }>} */
  const breakdownByLabel = {};

  for (const row of byQuestion) {
    const key = row.label ? String(row.label) : 'Sin etiqueta';
    breakdownByLabel[key] ||= { total: 0, correct: 0, incorrect: 0, unknown: 0 };
    breakdownByLabel[key].total += 1;
    if (row.result === 'correct') breakdownByLabel[key].correct += 1;
    else if (row.result === 'incorrect') breakdownByLabel[key].incorrect += 1;
    else breakdownByLabel[key].unknown += 1;
  }

  return {
    correctCount,
    gradedCount,
    percent,
    byQuestion,
    breakdownByLabel,
  };
}
