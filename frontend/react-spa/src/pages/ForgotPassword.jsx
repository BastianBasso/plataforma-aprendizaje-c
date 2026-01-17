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
    <main className="page" aria-label="Recuperar contraseña">
      <h1>Recuperar contraseña</h1>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Correo
          <input value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        </label>

        {error ? <p className="form-error">{error}</p> : null}
        {message ? <p className="form-success">{message}</p> : null}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar enlace'}
        </button>

        <div className="form-links">
          <Link to="/login">Volver al login</Link>
        </div>
      </form>
    </main>
  );
}
