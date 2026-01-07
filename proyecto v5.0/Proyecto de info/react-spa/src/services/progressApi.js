export async function fetchUserProgress() {
  // API futura: idealmente un endpoint del server protegido por sesión.
  // Por ahora: si no existe, devolvemos 0% sin romper la UI.
  try {
    const res = await fetch('/api/progress', { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // Formato esperado (flexible):
    // { percent: 0-100 } o { completed: number, total: number }
    if (typeof json?.percent === 'number') {
      return { percent: clampPercent(json.percent), raw: json };
    }
    if (typeof json?.completed === 'number' && typeof json?.total === 'number') {
      const percent = json.total > 0 ? (json.completed / json.total) * 100 : 0;
      return { percent: clampPercent(percent), raw: json };
    }

    return { percent: 0, raw: json };
  } catch {
    return { percent: 0, raw: null };
  }
}

function clampPercent(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
