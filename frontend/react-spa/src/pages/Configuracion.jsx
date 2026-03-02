import { Shell } from '../components/Shell.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from '../context/SessionContext.jsx';
import { useUserProgress } from '../hooks/useUserProgress.js';

export function Configuracion() {
  const { user } = useSession();
  const { percent, loading: loadingProgress } = useUserProgress();

  const [draftUsername, setDraftUsername] = useState(user?.username ?? '');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // info | error

  useEffect(() => {
    setDraftUsername(user?.username ?? '');
  }, [user?.username]);

  const stats = useMemo(() => {
    return [
      { k: 'Usuario', v: user?.username ?? '—' },
      { k: 'Rol', v: user?.role ?? '—' },
      { k: 'Progreso', v: loadingProgress ? 'Cargando…' : `${percent}%` },
    ];
  }, [user?.username, user?.role, percent, loadingProgress]);

  function onSaveUsername(e) {
    e.preventDefault();
    setMessage('');

    const next = String(draftUsername ?? '').trim();
    if (next.length < 3) {
      setMessageType('error');
      setMessage('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    setMessageType('info');
    setMessage('UI lista. Conecta tu API de update-username para guardar cambios.');
  }

  return (
    <Shell>
      <main className="hub hub-config" aria-label="Configuración">
        <style>{`
          /* Estilos locales para /configuracion (scoped a .hub-config) */
          .hub.hub-config {
            max-width: 1100px;
            margin: 40px auto;
            padding: 40px 100px;
            background: #d1e3f7;
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(60, 120, 200, 0.10);
          }
          
          .hub.hub-config .config-grid {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 32px;
          }

          .hub-config .generic-card {
            background: #fff;
            border: 2px solid #c4c5c5;
            border-radius: 18px;
            padding: 18px 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 12px rgba(60, 120, 200, 0.08);
          }

          .hub-config .hub-title {
            
            color: #1a4e8a;
            font-weight: 700;
            font-size: 2.0rem;
            letter-spacing: 0.5px;
            margin: 0 0 6px;
            text-align: left;
            
          }

          .hub-config .hub-subtitle {
            color: #222e3a;
            opacity: 0.85;
            margin: 0;
            text-align: left;
          }

          .hub-config .config-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 25px;
            column-gap: 75px;
          }

          .hub-config .config-card-title {
            margin: 0 0 12px;
            color: #1a4e8a;
            font-weight: 800;
            font-size: 1.15rem;
          }

          .hub-config .row {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 10px 0;
            border-top: 1px solid #eef2f7;
          }

          .hub-config .row:first-of-type {
            border-top: 0;
            padding-top: 0;
          }

          .hub-config .k {
            color: #223;
            opacity: 0.75;
            font-weight: 800;
          }

          .hub-config .v {
            color: #111;
            font-weight: 700;
          }

          .hub-config .form {
            display: grid;
            gap: 10px;
          }

          .hub-config label {
            font-weight: 800;
            color: #223;
          }

          .hub-config input {
            padding: 10px 12px;
            border-radius: 12px;
            border: 1px solid #d7dee9;
            outline: none;
            font-size: 1rem;
            background: #fff;
          }

          .hub-config input:focus {
            border-color: #1a4e8a;
            box-shadow: 0 0 0 3px rgba(26, 78, 138, 0.12);
          }

          .hub-config .btn {
            background: #1a4e8a;
            color: #fff;
            border: 0;
            border-radius: 12px;
            padding: 10px 14px;
            font-weight: 800;
            cursor: pointer;
          }

          .hub-config .msg {
            margin: 0;
            padding: 10px 12px;
            border-radius: 12px;
            border: 1px solid #e3eaf2;
            background: #eaf6ff;
            color: #1a4e8a;
            font-weight: 800;
          }

          .hub-config .msg.error {
            background: #ffecec;
            border-color: #ffd0d0;
            color: #8a1a1a;
          }

          .hub-config .progress-track {
            height: 12px;
            border-radius: 999px;
            background: #eaf6ff;
            border: 1px solid #e3eaf2;
            overflow: hidden;
          }

          .hub-config .progress-fill {
            
            height: 100%;
            background: #1a4e8a;
            width: 0;
          }

          @media (max-width: 850px) {
            .hub-config .config-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 600px) {
            .hub.hub-config {
              padding: 16px 12px;
              margin: 18px auto;
            }
          }
        `}</style>

        <div className="generic-card">
          <h1 className="hub-title">Configuración</h1>
          <p className="hub-subtitle">Perfil, ajustes y estadísticas del usuario.</p>
        </div>

        <div className="config-grid">
          <section className="generic-card" aria-label="Resumen">
            <h2 className="config-card-title">Resumen</h2>
            {stats.map((it) => (
              <div className="row" key={it.k}>
                <div className="k">{it.k}</div>
                <div className="v">{it.v}</div>
              </div>
            ))}

            <div style={{ marginTop: 12 }}>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <p className="hub-subtitle" style={{ marginTop: 10 }}>
                Esta sección ya está lista para conectar APIs (progreso, estadísticas, etc.).
              </p>
            </div>
          </section>

          <section className="generic-card" aria-label="Cambiar nombre">
            <h2 className="config-card-title">Cambiar nombre</h2>
            <form className="form" onSubmit={onSaveUsername}>
              <label htmlFor="username">Nuevo nombre de usuario</label>
              <input
                id="username"
                value={draftUsername}
                onChange={(e) => setDraftUsername(e.target.value)}
                placeholder="Tu nuevo nombre"
                autoComplete="username"
                maxLength={30}
              />

              <button className="btn" type="submit">Guardar</button>

              {message ? (
                <p className={`msg ${messageType === 'error' ? 'error' : ''}`} role={messageType === 'error' ? 'alert' : 'status'}>
                  {message}
                </p>
              ) : null}
            </form>
          </section>

          <section className="generic-card" aria-label="Estadísticas">
            <h2 className="config-card-title">Stats del usuario</h2>
            <div className="row">
              <div className="k">Módulos completados</div>
              <div className="v">—</div>
            </div>
            <div className="row">
              <div className="k">Quizzes aprobados</div>
              <div className="v">—</div>
            </div>
            <div className="row">
              <div className="k">Tiempo en plataforma</div>
              <div className="v">—</div>
            </div>
            <p className="hub-subtitle" style={{ marginTop: 10 }}>
              Placeholder visual: cuando tengas API, reemplaza los “—” por datos reales.
            </p>
          </section>

          <section className="generic-card" aria-label="Seguridad">
            <h2 className="config-card-title">Seguridad</h2>
            <p className="hub-subtitle">
              Aquí puedes agregar: cambio de contraseña, 2FA, cerrar sesiones, etc.
            </p>
          </section>
        </div>
      </main>
    </Shell>
  );
}
