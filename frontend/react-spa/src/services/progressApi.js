const DEFAULT_CURSO_ID = 1;

function getStoredUserId() {
  // Se setea al hacer login (ver Login.jsx). Persistencia por pestaña.
  const raw = sessionStorage.getItem('userId');
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

function parsePercentFromProgresoRow(row) {
  if (!row || typeof row !== 'object') return null;
  // pg normaliza alias a lowercase: total_pasos, pasos_completados, porcentaje
  const porcentaje = row.porcentaje ?? row.Porcentaje;
  if (typeof porcentaje === 'number') return porcentaje;
  if (typeof porcentaje === 'string' && porcentaje.trim() !== '' && Number.isFinite(Number(porcentaje))) {
    return Number(porcentaje);
  }

  const total = Number(row.total_pasos ?? row.Total_Pasos);
  const completed = Number(row.pasos_completados ?? row.Pasos_Completados);
  if (Number.isFinite(total) && Number.isFinite(completed) && total > 0) {
    return (completed / total) * 100;
  }
  return 0;
}

/**
 * Devuelve progreso (0-100) del curso principal.
 * No toca backend: usa GET /api/curso/:usuarioId/:cursoId
 */
export async function fetchUserProgress() {
  const usuarioId = getStoredUserId();
  if (!usuarioId) return { percent: 0, raw: null };

  try {
    const res = await fetch(`/api/curso/${encodeURIComponent(usuarioId)}/${encodeURIComponent(DEFAULT_CURSO_ID)}`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json().catch(() => null);
    const percent = clampPercent(parsePercentFromProgresoRow(json?.progreso));
    return { percent, raw: json };
  } catch {
    return { percent: 0, raw: null };
  }
}

/**
 * Progreso por módulo (0-100). Útil si luego quieres una barra dentro del visor.
 */
export async function fetchModuloProgress(moduloId) {
  const usuarioId = getStoredUserId();
  const mid = Number(moduloId);
  if (!usuarioId || !Number.isFinite(mid)) return { percent: 0, raw: null };

  try {
    const res = await fetch(`/api/modulo/${encodeURIComponent(usuarioId)}/${encodeURIComponent(mid)}`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json().catch(() => null);
    const percent = clampPercent(parsePercentFromProgresoRow(json?.progreso));
    return { percent, raw: json };
  } catch {
    return { percent: 0, raw: null };
  }
}

function clampPercent(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
