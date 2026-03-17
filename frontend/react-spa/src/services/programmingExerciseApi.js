/**
 * API client para ejercicios de programación (validación en frontend).
 *
 * SOLID:
 * - SRP: solo comunica con backend.
 * - DIP: la UI recibe funciones (abstracción) en vez de acoplarse a fetch.
 */

function asJsonHeaders(extra) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(extra || {}),
  };
}

/**
 * Obtiene el validatorSpec de un ejercicio.
 * Backend propuesto: GET /api/programming-exercises/spec/:exerciseId
 *
 * @param {string} exerciseId
 * @returns {Promise<{ ok: boolean, json: any }>} 
 */
export async function fetchProgrammingExerciseSpec(exerciseId) {
  if (!exerciseId) return { ok: false, json: null };

  try {
    const res = await fetch(`/api/programming-exercises/spec/${encodeURIComponent(exerciseId)}`, {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json' },
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

/**
 * Registra un intento (aprobó/no aprobó) para persistencia.
 * Backend propuesto: POST /api/programming-exercises/attempt
 *
 * @param {{
 *  usuarioId: number,
 *  exerciseId: string,
 *  lessonId?: number,
 *  passed: boolean,
 *  results?: Array<{ ruleId: string, passed: boolean }>,
 *  code?: string,
 * }} payload
 * @returns {Promise<{ ok: boolean, json: any }>} 
 */
export async function submitProgrammingExerciseAttempt(payload) {
  try {
    const res = await fetch('/api/programming-exercises/attempt', {
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