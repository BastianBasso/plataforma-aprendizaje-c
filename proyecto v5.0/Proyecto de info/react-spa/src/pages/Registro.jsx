import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Registro() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ text, email, password }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        setError(json?.message || 'No se pudo registrar');
        return;
      }

      setSuccess('Usuario registrado. Ahora inicia sesión.');
      setTimeout(() => navigate('/login', { replace: true }), 500);
    } catch {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page" aria-label="Registro">
      <div className="generic-card">

      <h1>Registro</h1>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Usuario
          <input value={text} onChange={e => setText(e.target.value)} autoComplete="username" />
        </label>

        <label>
          Correo
          <input value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        </label>

        <label>
          Contraseña
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
        </label>

        {error ? <p className="form-error">{error}</p> : null}
        {success ? <p className="form-success">{success}</p> : null}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Registrando…' : 'Crear cuenta'}
        </button>

        <div className="form-links">
          <Link to="/login">Ya tengo cuenta</Link>
        </div>
      </form>
      </div>
    </main>
  );
}
