import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

export function ModuloViewer({ modulosIndex }) {
  const { modIndex, fileIndex } = useParams();
  const mi = Number(modIndex);
  const fi = Number(fileIndex);

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

  return (
    <div className="viewer">
      <main className="viewer-content">
        {file ? (
          <iframe
            className="viewer-frame"
            src={file.ruta}
            title={file.nombre || 'Contenido'}
            loading="eager"
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
            <Link className="viewer-btn" to={`/m/${next.modIndex}/${next.fileIndex}`}>Siguiente →</Link>
          ) : (
            <span className="viewer-btn viewer-btn-disabled">Siguiente →</span>
          )}
        </div>
      </footer>
    </div>
  );
}
