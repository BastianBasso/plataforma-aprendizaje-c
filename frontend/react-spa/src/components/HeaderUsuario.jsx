import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.654.846.588.278 1.14.634 1.588.978.303.251.71.326 1.06.197l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.22 1.397l-1.003.751c-.308.231-.45.613-.368.997.14.65.14 1.325 0 1.976-.082.384.06.766.368.997l1.003.751c.403.302.496.918.22 1.397l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456a1.125 1.125 0 0 0-1.06.197 6.672 6.672 0 0 1-1.588.978c-.34.16-.591.472-.654.846l-.213 1.281c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.654-.846 6.672 6.672 0 0 1-1.588-.978 1.125 1.125 0 0 0-1.06-.197l-1.217.456a1.125 1.125 0 0 1-1.37-.49L2.26 17.876a1.125 1.125 0 0 1 .22-1.397l1.003-.751c.308-.231.45-.613.368-.997a6.873 6.873 0 0 1 0-1.976c.082-.384-.06-.766-.368-.997l-1.003-.751a1.125 1.125 0 0 1-.22-1.397l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.35.13.757.054 1.06-.197a6.672 6.672 0 0 1 1.588-.978c.34-.16.591-.472.654-.846l.213-1.281Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
            
            {(user?.rol === 'Administrador' || user?.rol === 'Super Administrador') && (
              <Link to="/admin" style={{  color: '#b8c1ec' }}>
                Panel Admin
              </Link>
            )}
            
            <Link to="/cursos">Cursos</Link>
          </nav>
        ) : null}

        <div className="app-header-user" aria-label="Usuario">
          {username ? (
            <>
              <span className="app-header-username">{username}</span>
              <button type="button" className="app-header-btn" onClick={onLogout}>Cerrar sesión</button>
              <Link
                to="/configuracion"
                aria-label="Configuración"
                title="Configuración"
                className="app-header-iconBtn"
              >
                <SettingsIcon className="app-header-icon" />
              </Link>
            </>
          ) : (
            <>
              <Link className="app-header-btn" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
