import { useEffect, useMemo, useState } from 'react';
import { fetchProgrammingExerciseSpec, submitProgrammingExerciseAttempt } from '../../services/programmingExerciseApi.js';
import { isValidProgrammingExerciseSpec, validateCodeAgainstSpec } from './validateCodeAgainstSpec.js';
import { LOCAL_SPECS } from './localSpecs.js';

function getStoredUserId() {
  const raw = sessionStorage.getItem('userId');
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

/**
 * @param {{
 *  config: { version: 1, exerciseId: string, lessonId?: number, title?: string, showTitle?: boolean },
 *  onPassed?: (info: { exerciseId: string }) => void
 * }} props
 */
export function ProgrammingExercise({ config, onPassed }) {
  const exerciseId = config?.exerciseId;
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [passed, setPassed] = useState(false);

  const textareaStyle = useMemo(() => {
    const base = { width: '100%', fontFamily: 'monospace' };
    if (!lastResult) return base;
    if (lastResult.passed) return { ...base, borderColor: '#198754', outlineColor: '#198754' };
    return { ...base, borderColor: '#dc3545', outlineColor: '#dc3545' };
  }, [lastResult]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!exerciseId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setMessage(null);
      setMessageType(null);

      // 0) Permite probar sin backend: spec inline en el HTML.
      const inlineSpec = config?.spec;
      if (isValidProgrammingExerciseSpec(inlineSpec)) {
        setSpec(inlineSpec);
        setLoading(false);
        return;
      }

      // 1) Backend (si existe)
      const res = await fetchProgrammingExerciseSpec(exerciseId);
      if (cancelled) return;

      if (!res.ok || !isValidProgrammingExerciseSpec(res.json)) {
        // 2) Fallback local para poder validar regex sin servidor.
        const local = LOCAL_SPECS?.[exerciseId];
        if (isValidProgrammingExerciseSpec(local)) {
          setSpec(local);
          setMessageType('info');
          setMessage('Spec cargado localmente (modo sin backend).');
          setLoading(false);
          return;
        }

        setSpec(null);
        setMessageType('warning');
        setMessage('No se pudo cargar el ejercicio (sin spec).');
        setLoading(false);
        return;
      }

      setSpec(res.json);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [exerciseId]);

  const title = useMemo(() => {
    return spec?.title || config?.title || 'Ejercicio de programación';
  }, [spec?.title, config?.title]);

  const showTitle = config?.showTitle !== false;

  async function handleValidate() {
    if (!spec) return;

    const result = validateCodeAgainstSpec(spec, code);
    setLastResult(result);

    if (!result.passed) {
      setPassed(false);
      setMessageType('warning');
      const firstFail = (result.results || []).find(r => !r.passed);
      setMessage(firstFail ? `No cumple: ${firstFail.message}` : 'Aún no cumple con el patrón esperado.');
      return;
    }

    setPassed(true);
    setMessageType('success');
    setMessage('¡Ejercicio aprobado!');

    // Persistencia best-effort: si hay usuario, intentamos guardar.
    const usuarioId = getStoredUserId();
    if (usuarioId) {
      setSubmitting(true);
      const payload = {
        usuarioId,
        exerciseId: spec.exerciseId,
        lessonId: config?.lessonId,
        passed: true,
        results: (result.results || []).map(r => ({ ruleId: r.ruleId, passed: r.passed })),
        code,
      };

      const res = await submitProgrammingExerciseAttempt(payload);
      setSubmitting(false);

      if (!res.ok) {
        setMessageType('info');
        setMessage('Aprobado localmente (no se pudo guardar en el servidor).');
      }
    } else {
      setMessageType('info');
      setMessage('Aprobado localmente (inicia sesión para guardar el progreso).');
    }

    if (typeof onPassed === 'function') {
      onPassed({ exerciseId: spec.exerciseId });
    }
  }

  return (
    <section data-feature="programming-exercise" aria-label={title}>
      {showTitle ? <h2>{title}</h2> : null}

      {loading ? <p>Cargando ejercicio…</p> : null}

      {!loading && spec ? (
        <>
          {spec.expectedOutput ? (
            <details>
              <summary>Output esperado</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{spec.expectedOutput}</pre>
            </details>
          ) : null}

          {Array.isArray(spec.hints) && spec.hints.length ? (
            <details>
              <summary>Pistas</summary>
              <ul>
                {spec.hints.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </details>
          ) : null}

          <label style={{ display: 'block', marginTop: '0.75rem' }}>
            Tu código:
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={12}
              style={textareaStyle}
              disabled={passed}
              placeholder="Escribe aquí tu solución en C..."
            />
          </label>

          <button type="button" onClick={handleValidate} disabled={submitting || passed}>
            {passed ? 'Aprobado' : submitting ? 'Guardando…' : 'Validar'}
          </button>

          {message ? (
            <p className={`quiz-message ${messageType || ''}`} role="status" aria-live="polite">
              {message}
            </p>
          ) : null}

          {lastResult?.results?.length ? (
            <details style={{ marginTop: '0.5rem' }}>
              <summary>Detalle de validación</summary>
              <ul>
                {lastResult.results.map(r => (
                  <li key={r.ruleId}>
                    <strong>{r.passed ? 'OK' : 'Falta'}:</strong> {r.message}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </>
      ) : null}

      {!loading && !spec ? <p>No hay spec disponible para este ejercicio.</p> : null}
    </section>
  );
}
