import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/authCodeBackground.css';

export function RestorePassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/restore-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        setError(json?.message || 'No se pudo restablecer la contraseña');
        return;
      }

      setMessage(json.message || 'Contraseña restablecida.');
    } catch {
      setError('Error de red al intentar conectar con el servidor.');
    } finally {
      setSubmitting(false);
    }
  }

  // Iconos SVG para los ojitos
  const EyeOpen = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeClosed = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <main className="auth-page auth-page--code" aria-label="Restablecer contraseña">
      <style>{`
        /* FONDO TECH UNIFICADO */
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative; 
          font-family: 'Arial', sans-serif;
        }

        /* TARJETA CENTRAL BLANCA */
        .auth-card-simple {
          position: relative;
          z-index: 2;
          background: #ffffff;
          width: 100%;
          max-width: 420px;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          color: #111827;
        }

        .auth-title {
          margin: 0 0 10px;
          font-weight: 900;
          font-size: 1.8rem;
          color: #2563eb;
          text-align: center;
        }

        .auth-subtitle {
          margin: 0 0 24px;
          color: #6b7280;
          font-size: 0.95rem;
          text-align: center;
          line-height: 1.5;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 700;
        }

        /* INPUTS CON OJITO */
        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-wrapper input {
          width: 100%;
          padding: 12px 40px 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          font-size: 1rem;
          color: #111;
          background: #f9fafb;
          outline: none;
          transition: border-color 0.2s;
        }

        .password-wrapper input:focus {
          border-color: #2563eb;
          background: #ffffff;
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
          color: #2563eb;
        }

        /* BOTÓN PRINCIPAL */
        .primary-btn {
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #4f46e5);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
          font-size: 1rem;
          margin-top: 10px;
          transition: transform 0.1s, opacity 0.2s;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ALERTAS Y ENLACES */
        .alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-align: center;
        }

        .alert.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .alert.success { background: #dcfce3; color: #15803d; border: 1px solid #86efac; }

        .back-link {
          display: block;
          text-align: center;
          margin-top: 24px;
          color: #4f46e5;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-code-columns" aria-hidden="true">
        <span className="auth-code-col auth-code-col--1" />
        <span className="auth-code-col auth-code-col--2" />
        <span className="auth-code-col auth-code-col--3" />
        <span className="auth-code-col auth-code-col--4" />
      </div>

      <div className="auth-card-simple">
        <h1 className="auth-title">Nueva contraseña</h1>
        <p className="auth-subtitle">Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta de Plataforma C.</p>

        {!token ? (
          <div className="alert error">Falta el token de seguridad en la URL. Solicita un nuevo enlace.</div>
        ) : null}

        <form onSubmit={onSubmit}>
          {/* CAMPO: NUEVA CONTRASEÑA */}
          <label className="form-group">
            Nueva contraseña
            <div className="password-wrapper">
              <input 
                type={showNewPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres..."
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                tabIndex="-1"
              >
                {showNewPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </label>

          {/* CAMPO: CONFIRMAR CONTRASEÑA */}
          <label className="form-group">
            Confirmar contraseña
            <div className="password-wrapper">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                autoComplete="new-password"
                placeholder="Repite tu contraseña..."
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </label>

          {/* MENSAJES DE ESTADO */}
          {error ? <div className="alert error">{error}</div> : null}
          {message ? <div className="alert success">{message}</div> : null}

          {/* BOTÓN GUARDAR */}
          <button className="primary-btn" type="submit" disabled={submitting || !token}>
            {submitting ? 'Guardando nueva clave...' : 'Guardar y Entrar'}
          </button>

          {/* ENLACE VOLVER */}
          <Link to="/login" className="back-link">
            Volver al inicio de sesión
          </Link>
        </form>
      </div>
    </main>
  );
}
