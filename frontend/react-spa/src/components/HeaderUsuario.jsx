import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';

export function HeaderUsuario() {
  const { status, user, logout } = useSession();
  const navigate = useNavigate();

  const isAuthenticated = status === 'authenticated';
  const username = isAuthenticated ? user?.usuario : null;

  async function onLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="app-header" aria-label="Header usuario">
      <div className="app-header-inner">
        <Link className="app-header-brand" to="/">Plataforma C</Link>

        {isAuthenticated ? (
          <nav className="app-header-nav" aria-label="Navegación">
            <Link to="/cursos">Cursos</Link>
            <Link to="/configuracion">Configuración</Link>
          </nav>
        ) : null}

        <div className="app-header-user" aria-label="Usuario">
          {username ? (
            <>
              <span className="app-header-username">{username}</span>
              <button type="button" className="app-header-btn" onClick={onLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              {// <span className="app-header-username">Invitado</span>
              }
              <Link className="app-header-btn" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
