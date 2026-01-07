import { Link } from 'react-router-dom';
import { Shell } from '../components/Shell.jsx';

export function Landing() {
  return (
    <Shell>
      <main className="page" aria-label="Landing">
        <h1>Plataforma C</h1>
        <p>Plataforma educativa para aprender Lenguaje C.</p>

        <div className="page-actions">
          <Link className="btn" to="/login">Iniciar sesión</Link>
          <Link className="btn btn-secondary" to="/registro">Registrarme</Link>
          <Link className="btn btn-secondary" to="/cursos">Ir a cursos</Link>
        </div>
      </main>
    </Shell>
  );
}
