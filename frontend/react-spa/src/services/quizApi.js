/**
 * Cliente API (stub) para quiz de alternativas.
 *
 * SOLID:
 * - SRP: solo comunica con backend.
 * - DIP: la UI recibe una abstracción (funciones) en vez de acoplarse a fetch.
 *
 * Nota: el backend aún no existe; estos endpoints son sugeridos.
 */

function asJsonHeaders(extra) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(extra || {}),
  };
}

/**
 * Registra respuestas de un intento de quiz.
 * Backend sugerido: POST /api/quiz/alternative/attempt
 *
 * @param {{
 *  usuarioId: number|null,
 *  quizId: string,
 *  lessonId?: number,
 *  answers: Array<{ preguntaId?: number, questionId: string|number, alternativaId: string|number }> 
 * }} payload
 * @returns {Promise<{ ok: boolean, json: any }>} 
 */
export async function submitAlternativeQuizAttempt(payload) {
  try {
    const res = await fetch('/api/quiz/alternative/attempt', {
      method: 'POST',
      credentials: 'include',
      headers: asJsonHeaders(),
      body: JSON.stringify(payload),
    });

    let json = null;
    try {
      json = await res.json();
    } catch {
      // ignore
    }

    return { ok: res.ok, json };
  } catch {
    return { ok: false, json: null };
  }
}
