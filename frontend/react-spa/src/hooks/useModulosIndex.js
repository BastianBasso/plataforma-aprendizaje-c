import { useEffect, useState } from 'react';

function getModuloNumber(moduloName) {
  const s = String(moduloName ?? '');
  const m = s.match(/modulo[-_\s]*(\d+)/i);
  return m ? Number(m[1]) : null;
}

function getArchivoNumber(archivoName) {
  const s = String(archivoName ?? '');
  const m = s.match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

function sortModulosIndex(index) {
  if (!Array.isArray(index)) return index;

  const sorted = [...index].sort((a, b) => {
    const na = getModuloNumber(a?.modulo);
    const nb = getModuloNumber(b?.modulo);
    if (na != null && nb != null && na !== nb) return na - nb;
    if (na != null && nb == null) return -1;
    if (na == null && nb != null) return 1;
    return String(a?.modulo ?? '').localeCompare(String(b?.modulo ?? ''), 'es', { numeric: true, sensitivity: 'base' });
  });

  return sorted.map((m) => {
    const archivos = Array.isArray(m?.archivos) ? [...m.archivos].sort((a, b) => {
      const na = getArchivoNumber(a?.nombre);
      const nb = getArchivoNumber(b?.nombre);
      if (na != null && nb != null && na !== nb) return na - nb;
      if (na != null && nb == null) return -1;
      if (na == null && nb != null) return 1;
      return String(a?.nombre ?? '').localeCompare(String(b?.nombre ?? ''), 'es', { numeric: true, sensitivity: 'base' });
    }) : m?.archivos;

    return { ...m, archivos };
  });
}

export function useModulosIndex() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/data/modulosIndex.json', {
          headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(sortModulosIndex(json));
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
