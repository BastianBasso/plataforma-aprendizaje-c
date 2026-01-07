import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';

export function RequireAuth({ children }) {
  const { status } = useSession();
  const location = useLocation();

  if (status === 'loading') {
    return <main className="page"><p>Cargando sesión…</p></main>;
  }

  if (status !== 'authenticated') {
    const from = `${location.pathname}${location.search || ''}`;
    return <Navigate to={`/login?from=${encodeURIComponent(from)}`} replace />;
  }

  return children;
}
