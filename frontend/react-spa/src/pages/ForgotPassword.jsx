import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('/forgot-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        setError(json?.message || 'No se pudo procesar la solicitud');
        return;
      }

      setMessage(json.message || 'Revisa tu correo para continuar.');
    } catch {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main aria-label="Recuperar contraseña">
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
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
          max-width: 520px;
          width: 100%;
          background: #ffffff;
        }

        .auth-card-inner {
          padding: 28px;
          color: #111827;
        }

        .fp-title {
          margin: 0 0 10px;
          font-weight: 900;
          font-size: 2rem;
          color: #2563eb;
        }

        .fp-subtitle {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .fp-form {
          display: grid;
          gap: 14px;
        }

        .fp-form label {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 600;
        }

        .fp-form input {
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: #ffffff;
          color: #111827;
        }

        .fp-actions {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        .fp-primary-btn {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #4f46e5);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.2);
        }

        .fp-primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .fp-footer {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          text-align: center;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .fp-footer a {
          color: #2563eb;
          font-weight: 700;
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card-inner">
            <h1 className="fp-title">Recuperar contraseña</h1>
            <p className="fp-subtitle">
              Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <form className="fp-form" onSubmit={onSubmit}>
              <label>
                Correo
                <input value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </label>

              {error ? <p className="form-error">{error}</p> : null}
              {message ? <p className="form-success">{message}</p> : null}

              <div className="fp-actions">
                <button className="fp-primary-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Enviando…' : 'Enviar enlace'}
                </button>
              </div>

              <div className="fp-footer">
                <Link to="/login">Volver al login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
