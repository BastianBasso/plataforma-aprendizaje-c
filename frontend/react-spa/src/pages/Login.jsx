import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';
import '../styles/authCodeBackground.css';

export function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
          position: relative; 
        }

        .auth-card {
           position: relative;
            z-index: 2;
        }

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .password-wrapper input {
          width: 100%;
          padding-right: 40px; /* Deja espacio para que el texto no pise el ícono */
        }
        .eye-button {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.2s;
        }
        .eye-button:hover {
          color: #2563eb; /* Se pinta de azul al pasar el mouse */
        }

        .auth-card {
          display: flex;
          gap: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
          max-width: 70em;
          min-height: 50vh; 
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

      <div className="auth-page auth-page--code">
        <div className="auth-code-columns" aria-hidden="true">
          <span className="auth-code-col auth-code-col--1" />
          <span className="auth-code-col auth-code-col--2" />
          <span className="auth-code-col auth-code-col--3" />
          <span className="auth-code-col auth-code-col--4" />
        </div>
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
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    autoComplete="current-password" 
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      /* Ícono de Ojo Abierto (Ocultar) */
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      /* Ícono de Ojo Cerrado (Mostrar) */
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
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
