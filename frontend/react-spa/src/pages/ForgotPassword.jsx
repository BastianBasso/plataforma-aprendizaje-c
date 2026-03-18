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
      const res = await fetch('/api/forgot-password', {
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
        /* FONDO TECH UNIFICADO */
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative; 
          background-image: url('/image/fondoNegroCOD.jpg'); 
          background-size: cover;
          background-position: center;
          font-family: 'Arial', sans-serif;
        }

        /* CAPA OSCURA SEMI-TRANSPARENTE */
        .auth-page::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(15, 23, 42, 0.85); 
          backdrop-filter: blur(4px); 
          z-index: 0;
        }

        /* TARJETA BLANCA (Debe estar por encima de la capa oscura) */
        .auth-card {
          position: relative;
          z-index: 1; /* Esto asegura que no sea tapada por el fondo */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Sombra un poco más fuerte para el fondo oscuro */
          max-width: 50em;
          min-height: 30vh; 
          width: 100%;
          background: #ffffff;
        }

        .auth-card-inner {
          padding: 40px 30px; /* Un poco más de aire por dentro */
          color: #111827;
        }

        .fp-title {
          margin: 0 0 10px;
          font-weight: 900;
          font-size: 2rem;
          color: #2563eb;
          text-align: center;
        }

        .fp-subtitle {
          margin: 0 0 24px;
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.45;
          text-align: center;
        }

        .fp-form {
          display: grid;
          gap: 16px;
        }

        .fp-form label {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 600;
        }

        .fp-form input {
          padding: 12px 14px; /* Un poco más alto para verse moderno */
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: #f9fafb;
          color: #111;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .fp-form input:focus {
           border-color: #2563eb;
           background: #ffffff;
        }

        .fp-actions {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        .fp-primary-btn {
          padding: 12px 24px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #4f46e5);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
          max-width: 400px;
          width: 100%; /* Botón ancho como en el login */
          font-size: 1rem;
          transition: transform 0.1s;
        }

        .fp-primary-btn:hover:not(:disabled) {
           transform: translateY(-1px);
        }

        .fp-primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .fp-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.95rem;
        }

        .fp-footer a {
          color: #4f46e5;
          font-weight: 700;
          text-decoration: none;
        }
        
        .fp-footer a:hover {
           text-decoration: underline;
        }

        /* Estilos básicos para los mensajes de error/éxito si no los tienes globales */
        .form-error { color: #b91c1c; font-size: 0.85rem; font-weight: bold; text-align: center; }
        .form-success { color: #15803d; font-size: 0.85rem; font-weight: bold; text-align: center; }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card-inner">
            <h1 className="fp-title">Recuperar contraseña</h1>
            <p className="fp-subtitle">
              Ingresa tu correo y te enviaremos un enlace seguro para restablecer tu contraseña.
            </p>
            <br />
            <form className="fp-form" onSubmit={onSubmit}>
              <label>
                Correo Electrónico
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  autoComplete="email" 
                  placeholder="ejemplo@correo.com"
                  required
                />
              </label>

              {error ? <p className="form-error">{error}</p> : null}
              {message ? <p className="form-success">{message}</p> : null}
              <br />
              <div className="fp-actions">
                <button className="fp-primary-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Enviando correo...' : 'Enviar enlace de recuperación'}
                </button>
              </div>
              
              <div className="fp-footer">
                <Link to="/login">Volver al inicio de sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    );
    }