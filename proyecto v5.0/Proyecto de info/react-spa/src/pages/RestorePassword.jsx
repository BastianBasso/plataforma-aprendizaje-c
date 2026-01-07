import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export function RestorePassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('/restore-password', {
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
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page" aria-label="Restablecer contraseña">
      <h1>Restablecer contraseña</h1>

      {!token ? <p className="form-error">Falta el token en la URL.</p> : null}

      <form className="form" onSubmit={onSubmit}>
        <label>
          Nueva contraseña
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" />
        </label>

        <label>
          Confirmar contraseña
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
        </label>

        {error ? <p className="form-error">{error}</p> : null}
        {message ? <p className="form-success">{message}</p> : null}

        <button className="btn" type="submit" disabled={submitting || !token}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </button>

        <div className="form-links">
          <Link to="/login">Ir al login</Link>
        </div>
      </form>
    </main>
  );
}
