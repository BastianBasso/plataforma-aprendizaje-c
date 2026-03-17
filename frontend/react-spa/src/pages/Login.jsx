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
      const res = await fetch('/api/login', {
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

      if (json?.usuario?.id != null) {
        try {
          sessionStorage.setItem('userId', String(json.usuario.id));
        } catch {
        }
      }

      await refresh();

      const rolUsuario = json?.usuario?.rol || 'Usuario';

      if (rolUsuario === 'Administrador' || rolUsuario === 'Super Administrador') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }

    } catch {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main aria-label="Login">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #6b7280; /* gray */
        }

        .auth-card {
          display: flex;
          gap: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
          max-width: 920px;
          width: 100%;
          background: #ffffff;
        }

        .left-panel {
          background: linear-gradient(135deg, #0f172a 0%, #312e81 60%, #4f46e5 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          padding: 24px;
          width: 50%;
        }

        .bit-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(#9fa8ff 1px, transparent 1px),
            radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 10px 10px, 20px 20px;
          opacity: 0.35;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .big-c {
          font-weight: 900;
          font-size: 10rem;
          line-height: 1;
          letter-spacing: -0.05em;
          background: repeating-linear-gradient(90deg, #c7d2fe 0 2px, #6366f1 2px 6px);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 6px 14px rgba(15, 23, 42, 0.6));
          text-rendering: optimizeLegibility;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          transform: translateX(6px);
        }

        .right-panel {
          padding: 28px;
          background: #ffffff;
          width: 60%;
          min-width: 370px;
          flex: 1;
          color: #111827; /* texto oscuro */
        }

        .login-title {
          margin: 0 0 10px;
          font-weight: 900;
          font-size: 2rem;
          color: #2563eb;
        }

        .login-subtitle {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .login-form {
          display: grid;
          gap: 14px;
        }

        .login-form label {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 600;
        }

        .login-form input {
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: #ffffff;
          color: #111827;
        }

        .login-actions {
          display: flex;
          justify-content: center;
        }

        .login-primary-btn {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #4f46e5);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.2);
        }

        .login-primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          text-align: center;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .login-footer a {
          color: #2563eb;
          font-weight: 700;
        }

        .login-links {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 880px) {
          .auth-card {
            flex-direction: column;
          }

          .left-panel {
            min-height: 180px;
            width: 80%;
          }

          .right-panel {
            width: 100%;
          }

          .big-c {
            font-size: 6.5rem;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="left-panel" aria-hidden="true">
            <div className="bit-pattern" aria-hidden="true" />
            <div className="big-c">C</div>
          </div>

          <div className="right-panel">
            <h1 className="login-title">Iniciar sesión</h1>
            <p className="login-subtitle">
              Estamos felices de verte. Por favor, introduce tus datos para acceder a tu cuenta y continuar.
            </p>

            {authError ? <p className="form-error">Debes iniciar sesión para continuar.</p> : null}

            <form className="login-form" onSubmit={onSubmit}>
              <label>
                Usuario
                <input value={user} onChange={e => setUser(e.target.value)} autoComplete="username" />
              </label>

              <label>
                Contraseña
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              </label>

              {error ? <p className="form-error">{error}</p> : null}

              <div className="login-links">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                
              </div>

              <div className="login-actions">
                <button className="login-primary-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Ingresando…' : 'Ingresar'}
                </button>
              </div>

              <div className="login-footer">
                ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
