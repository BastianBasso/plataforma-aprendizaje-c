import { useMemo, useState } from 'react';
import { evaluateAlternativeQuizAttempt } from './evaluateAlternativeQuiz.js';

function getStoredUserId() {
  const raw = sessionStorage.getItem('userId');
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

function normalizeId(value) {
  return String(value);
}

/**
 * @param {{
 *  quiz: {
 *    version: 1,
 *    quizId: string,
 *    lessonId?: number,
 *    title?: string,
 *    questions: Array<{
 *      id: string|number,
 *      label?: string,
 *      text: string,
 *      options: Array<{ id: string|number, text: string }>,
 *      correctOptionId?: string|number
 *    }>
 *  },
 *  api?: { submitAlternativeQuizAttempt?: Function },
 *  onSubmitted?: (info: { quizId: string }) => void,
 * }} props
 */
export function AlternativeQuiz({ quiz, api, onSubmitted }) {
  const [answers, setAnswers] = useState(() => ({}));
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // success | warning | info

  const result = useMemo(() => {
    if (!submitted) return null;
    return evaluateAlternativeQuizAttempt(quiz, { quizId: quiz.quizId, answers });
  }, [answers, quiz, submitted]);

  function setAnswer(questionId, optionId) {
    setAnswers(prev => ({ ...prev, [normalizeId(questionId)]: optionId }));
  }

  async function handleSubmit(e) {
    e?.preventDefault?.();

    setSubmitted(true);
    if (typeof onSubmitted === 'function') {
      try {
        onSubmitted({ quizId: quiz.quizId });
      } catch {
        // ignore
      }
    }

    const total = (quiz.questions || []).length;
    const unanswered = (quiz.questions || []).reduce((acc, q) => {
      const qKey = normalizeId(q.id);
      return answers[qKey] === undefined ? acc + 1 : acc;
    }, 0);

    if (unanswered > 0) {
      setMessageType('warning');
      setMessage(`⚠️ Aún te faltan ${unanswered} preguntas por responder.`);
    } else {
      setMessageType('info');
      setMessage(`Respuestas enviadas (${total} preguntas).`);
    }

    const submitFn = api?.submitAlternativeQuizAttempt;
    if (typeof submitFn !== 'function') return;

    const usuarioId = getStoredUserId();
    const payload = {
      usuarioId,
      quizId: quiz.quizId,
      lessonId: quiz.lessonId,
      answers: (quiz.questions || [])
        .map(q => {
          const qKey = normalizeId(q.id);
          const selected = answers[qKey];
          if (selected === undefined) return null;
          return { questionId: q.id, alternativaId: selected };
        })
        .filter(Boolean),
    };

    setSubmitting(true);
    try {
      await submitFn(payload);
    } finally {
      setSubmitting(false);
    }
  }

  const title = quiz.title || 'Cuestionario';

  return (
    <section className="alt-quiz" aria-label={title}>
      <div className="alt-quiz-container">
        <h1 className="alt-quiz-title">{title}</h1>

        <form className="alt-quiz-form" onSubmit={handleSubmit}>
          {(quiz.questions || []).map((q, idx) => {
            const qKey = normalizeId(q.id);
            const selected = answers[qKey];
            const hasKey = q.correctOptionId !== undefined;
            const correctKey = hasKey ? normalizeId(q.correctOptionId) : null;

            return (
              <div key={qKey} className="question-item" data-question-id={qKey}>
                <p>
                  <strong>
                    {idx + 1}. {q.text}
                    {q.label ? <span className="alt-quiz-label"> {' '}[{q.label}]</span> : null}
                  </strong>
                </p>

                {(q.options || []).map(opt => {
                  const optKey = normalizeId(opt.id);
                  const id = `q-${qKey}-opt-${optKey}`;

                  let cls = 'option-label';
                  if (submitted && hasKey) {
                    if (optKey === correctKey) cls += ' correct';
                    else if (selected !== undefined && normalizeId(selected) === optKey) cls += ' incorrect';
                  }

                  return (
                    <label key={optKey} className={cls} data-value={optKey} htmlFor={id}>
                      <input
                        id={id}
                        type="radio"
                        name={qKey}
                        value={optKey}
                        checked={selected !== undefined && normalizeId(selected) === optKey}
                        onChange={() => setAnswer(q.id, opt.id)}
                      />
                      {' '}{opt.text}
                    </label>
                  );
                })}
              </div>
            );
          })}

          {message ? (
            <div className={`quiz-message ${messageType || ''}`} role="status" aria-live="polite">
              {message}
            </div>
          ) : null}

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Enviar Respuestas'}
          </button>
        </form>
      </div>

      {result ? (
        <div style={{ marginTop: '1rem' }}>
          <p>
            <strong>Resultado:</strong> {result.correctCount}/{result.gradedCount} ({result.percent}%)
            {result.gradedCount === 0 ? ' (sin corrección local)' : ''}
          </p>

          <details>
            <summary>Ver detalle por etiqueta</summary>
            <ul>
              {Object.entries(result.breakdownByLabel).map(([label, b]) => (
                <li key={label}>
                  {label}: {b.correct} correctas, {b.incorrect} incorrectas{b.unknown ? `, ${b.unknown} sin evaluar` : ''}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ) : null}
    </section>
  );
}
