import { Link } from 'react-router-dom';
import { TopProgressBar } from '../components/TopProgressBar.jsx';
import { useUserProgress } from '../hooks/useUserProgress.js';

export function CursosSelec({ modulosIndex, loading, error }) {
  const { percent, loading: loadingProgress } = useUserProgress();

  if (loading) {
    return (
      <>
        <TopProgressBar percent={percent} loading={loadingProgress} />
        <main className="hub"><p>Cargando módulos…</p></main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopProgressBar percent={percent} loading={loadingProgress} />
        <main className="hub"><p>Error cargando índice</p></main>
      </>
    );
  }

  return (
    <>
      
        <TopProgressBar percent={percent} loading={loadingProgress} />
      
      <main className="hub" aria-label="Cursos Select">
        <div className="generic-card">
          <h1 className="hub-title">Cursos</h1>
          <p className="hub-subtitle">Selecciona un módulo para comenzar o continuar.</p>
        </div>

        <div className="hub-grid">
          {modulosIndex?.map((mod, modIndex) => (
            <section className="hub-card" key={mod.modulo}>
              <div className="hub-card-header">
                <h2 className="hub-card-title">{mod.modulo}</h2>
                <Link className="hub-enter" to={`/m/${modIndex}/0`}>Entrar</Link>
              </div>

              <ul className="hub-lessons">
                {mod.archivos.map((archivo, fileIndex) => (
                  <li key={archivo.ruta}>
                    <Link className="hub-lesson" to={`/m/${modIndex}/${fileIndex}`}>{archivo.nombre}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
