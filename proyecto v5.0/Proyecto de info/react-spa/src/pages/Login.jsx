import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';

export function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refresh } = useSession();

  const from = useMemo(() => {
    const v = searchParams.get('from');
    return v && v.startsWith('/') ? v : '/cursos';
  }, [searchParams]);

  const authError = useMemo(() => searchParams.get('auth_error') === 'true', [searchParams]);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ user, password }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        setError(json?.message || 'No se pudo iniciar sesión');
        return;
      }

      await refresh();
      navigate(from, { replace: true });
    } catch {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page" aria-label="Login">
      <div className="generic-card">
      <h1>Iniciar sesión</h1>

      {authError ? <p className="form-error">Debes iniciar sesión para continuar.</p> : null}

      <form className="form" onSubmit={onSubmit}>
        <label>
          Usuario
          <input value={user} onChange={e => setUser(e.target.value)} autoComplete="username" />
        </label>

        <label>
          Contraseña
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Ingresando…' : 'Ingresar'}
        </button>

        <div className="form-links">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <Link to="/registro">Crear cuenta</Link>
        </div>
      </form>
      </div>
    </main>
  );
}
