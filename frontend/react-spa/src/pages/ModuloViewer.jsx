import { useCallback, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

function getStoredUserId() {
  const raw = sessionStorage.getItem('userId');
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

function inferModuloId(moduloName) {
  const s = String(moduloName ?? '');
  const m = s.match(/modulo[-_\s]*(\d+)/i);
  return m ? Number(m[1]) : null;
}

function inferLeccionIdFromFilename(nombre) {
  const s = String(nombre ?? '');
  const m = s.match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

async function tryRegisterNextProgress({ usuarioId, moduloId, leccionId }) {
  if (!usuarioId || !moduloId || !leccionId) return;

  try {
    await fetch('/api/progreso/next', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // keepalive ayuda a que el request no se cancele al navegar
      keepalive: true,
      body: JSON.stringify({ usuarioId, moduloId, leccionId }),
    });
  } catch {
    // no bloquea navegación
  }
}

export function ModuloViewer({ modulosIndex }) {
  const { modIndex, fileIndex } = useParams();
  const mi = Number(modIndex);
  const fi = Number(fileIndex);

  const iframeRef = useRef(null);

  // CSS adicional para el contenido HTML cargado en el iframe.
  // Nota: esto solo funciona si el iframe es same-origin.
  const injectedCssHrefs = useMemo(() => [
    '/c-code-style.css',
  ], []);

  const flat = useMemo(() => {
    if (!modulosIndex) return [];
    const out = [];
    modulosIndex.forEach((m, mIndex) => {
      m.archivos.forEach((a, aIndex) => {
        out.push({ modIndex: mIndex, fileIndex: aIndex, ruta: a.ruta, nombre: a.nombre, modulo: m.modulo });
      });
    });
    return out;
  }, [modulosIndex]);

  const flatIndex = useMemo(() => {
    if (!flat.length) return -1;
    return flat.findIndex(x => x.modIndex === mi && x.fileIndex === fi);
  }, [flat, mi, fi]);

  const prev = flatIndex > 0 ? flat[flatIndex - 1] : null;
  const next = flatIndex >= 0 && flatIndex < flat.length - 1 ? flat[flatIndex + 1] : null;

  const file = useMemo(() => {
    const mod = modulosIndex?.[mi];
    return mod?.archivos?.[fi] || null;
  }, [modulosIndex, mi, fi]);

  const handleNextClick = useCallback(() => {
    const usuarioId = getStoredUserId();
    const moduloId = inferModuloId(modulosIndex?.[mi]?.modulo);
    const leccionId = inferLeccionIdFromFilename(file?.nombre);
    void tryRegisterNextProgress({ usuarioId, moduloId, leccionId });
  }, [file?.nombre, modulosIndex, mi]);

  const handleFrameLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const head = doc.head || doc.getElementsByTagName('head')[0];
      if (!head) return;

      for (const href of injectedCssHrefs) {
        if (!href) continue;
        const linkId = `injected-css-${btoa(href).replace(/=+$/g, '')}`;
        let link = doc.getElementById(linkId);
        if (!link) {
          link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.id = linkId;
          head.appendChild(link);
        } else {
          link.href = href;
        }
      }
    } catch {
      // Cross-origin o políticas del iframe: no se puede inyectar.
    }
  }, [injectedCssHrefs]);

  return (
    <div className="viewer">
      <main className="viewer-content">
        {file ? (
          <iframe
            className="viewer-frame"
            src={file.ruta}
            title={file.nombre || 'Contenido'}
            loading="eager"
            ref={iframeRef}
            onLoad={handleFrameLoad}
          />
        ) : (
          <p>Contenido no encontrado</p>
        )}
      </main>

      <footer className="viewer-nav" aria-label="Navegación de lección">
        <div className="viewer-nav-inner">
          {prev ? (
            <Link className="viewer-btn" to={`/m/${prev.modIndex}/${prev.fileIndex}`}>← Anterior</Link>
          ) : (
            <span className="viewer-btn viewer-btn-disabled">← Anterior</span>
          )}

          <Link className="viewer-hub" to="/cursos">Volver a cursos</Link>

          {next ? (
            <Link className="viewer-btn" to={`/m/${next.modIndex}/${next.fileIndex}`} onClick={handleNextClick}>
              Siguiente →
            </Link>
          ) : (
            <span className="viewer-btn viewer-btn-disabled">Siguiente →</span>
          )}
        </div>
      </footer>
    </div>
  );
}
