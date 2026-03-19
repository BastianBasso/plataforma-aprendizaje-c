import { Shell } from '../components/Shell.jsx';
import { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext.jsx';
import { useUserProgress } from '../hooks/useUserProgress.js';

export function Configuracion() {
  const { user } = useSession();
  const { percent, loading: loadingProgress } = useUserProgress();

  const [editingField, setEditingField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [drafts, setDrafts] = useState({
    usuario: user?.usuario || '',
    nombre: user?.nombre || '',
    correo: user?.correo || ''
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const [statsData, setStatsData] = useState({ modulos: 'Cargando...', quizzes: 'Cargando...' });
  const [newPassword, setNewPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');
  const [pwdMessageType, setPwdMessageType] = useState(''); 
  const [isSavingPwd, setIsSavingPwd] = useState(false);

  useEffect(() => {
    setDrafts({
      usuario: user?.usuario || '',
      nombre: user?.nombre || '',
      correo: user?.correo || ''
    });
  }, [user]);

  useEffect(() => {
    fetch('/api/perfil/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatsData({ modulos: data.modulos, quizzes: data.quizzes });
        } else {
          setStatsData({ modulos: 0, quizzes: 0 });
        }
      })
      .catch(() => setStatsData({ modulos: '-', quizzes: '-' }));
  }, []);

  async function handleSave() {
    setMessage('');
    if (drafts.usuario.trim().length < 3) {
      setMessageType('error');
      setMessage('El usuario de login debe tener al menos 3 caracteres.');
      return;
    }
    if (!drafts.correo.includes('@')) {
      setMessageType('error');
      setMessage('Por favor, ingresa un correo válido.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/perfil', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          usuario: drafts.usuario.trim(),
          nombre: drafts.nombre.trim(),
          correo: drafts.correo.trim(),
          bio: user?.bio || '' 
        }) 
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessageType('success');
        setMessage('¡Actualizado con éxito! Recargando para aplicar cambios...');
        setEditingField(null);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessageType('error');
        setMessage(data.message || 'Error al actualizar.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessageType('error');
      setMessage('Error de conexión con el servidor.');
    } finally {
      setIsSaving(false);
    }
  }

async function handleSavePassword(e) {
    e.preventDefault();
    setPwdMessage('');
    setPwdMessageType(''); 

    setIsSavingPwd(true);
    try {
      const response = await fetch('/api/perfil/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevaContrasena: newPassword })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setPwdMessage('¡Contraseña cambiada con éxito!');
        setPwdMessageType('success');
        setNewPassword(''); 
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          setPwdMessage(data.errors);
        } else {
          setPwdMessage(data.message || 'Error al cambiar contraseña');
        }
        setPwdMessageType('error');
      }
    } catch (error) {
      setPwdMessage('Error de conexión con el servidor.');
      setPwdMessageType('error');
    } finally {
      setIsSavingPwd(false);
    }
  }

  function handleCancel() {
    setDrafts({
      usuario: user?.usuario || '',
      nombre: user?.nombre || '',
      correo: user?.correo || ''
    });
    setEditingField(null);
    setMessage('');
  }

  const renderRow = (label, fieldKey, type = "text") => {
    const isEditing = editingField === fieldKey;
    const displayValue = user?.[fieldKey] || '(Sin configurar)';

    return (
      <div className="row">
        <div className="k">{label}</div>
        <div className="v">
          {isEditing ? (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input 
                type={type}
                className="inline-input"
                value={drafts[fieldKey]}
                onChange={(e) => setDrafts({...drafts, [fieldKey]: e.target.value})}
                disabled={isSaving}
                autoFocus
              />
              <button className="btn-small save" onClick={handleSave} disabled={isSaving}>
                {isSaving ? '...' : '✔'}
              </button>
              <button className="btn-small cancel" onClick={handleCancel} disabled={isSaving}>
                ✖
              </button>
            </div>
          ) : (
            <>
              <span>{displayValue}</span>
              <button className="edit-btn" onClick={() => setEditingField(fieldKey)} title={`Editar ${label.toLowerCase()}`}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Shell>
      <main className="hub hub-config" aria-label="Configuración">
        <style>{`
          .hub-config * { box-sizing: border-box; }
          .hub.hub-config { max-width: 1050px; margin: 40px auto; padding: 40px 60px; background: #d1e3f7; border-radius: 18px; box-shadow: 0 4px 24px rgba(60, 120, 200, 0.10); }
          .hub-config .generic-card { width: 100%; background: #fff; border: 2px solid #c4c5c5; border-radius: 18px; padding: 22px 26px; box-shadow: 0 2px 12px rgba(60, 120, 200, 0.08); }
          
          .hub-config .hub-title { color: #1a4e8a; font-weight: 700; font-size: 2.0rem; letter-spacing: 0.5px; margin: 0 0 6px; }
          .hub-config .hub-subtitle { color: #222e3a; opacity: 0.85; margin: 0; }
          
          .hub-config .config-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; margin-top: 25px; align-items: stretch; }         

          .hub-config .config-card-title { margin: 0 0 16px; color: #1a4e8a; font-weight: 800; font-size: 1.2rem; border-bottom: 2px solid #eef2f7; padding-bottom: 10px;}
          .hub-config .row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eef2f7; min-height: 48px;}
          .hub-config .row:last-of-type { border-bottom: 0; }
          .hub-config .k { color: #223; opacity: 0.75; font-weight: 800; }
          .hub-config .v { color: #111; font-weight: 700; display: flex; align-items: center; gap: 8px;}

          .hub-config .edit-btn { background-color: transparent !important; border: none !important; cursor: pointer; padding: 4px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;}
          .hub-config .edit-btn:hover { background: #eaf6ff !important; }
          .hub-config .edit-btn svg { width: 16px; height: 16px; fill: #1a4e8a; }

          .hub-config .inline-input {padding: 6px 10px; border-radius: 8px; border: 2px solid #1a4e8a; outline: none; font-size: 0.95rem; width: 180px; font-weight: 600; background-color: #f4f8fc; color: #111111; }
          .hub-config .inline-input:-webkit-autofill {-webkit-box-shadow: 0 0 0 30px #f4f8fc inset !important; -webkit-text-fill-color: #111111 !important; }
          
          .hub-config .btn-small { padding: 6px 12px; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; font-size: 0.85rem; transition: opacity 0.2s;}
          .hub-config .btn-small:disabled { opacity: 0.6; cursor: not-allowed; }
          .hub-config .btn-small.save { background: #1a4e8a; color: white; }
          .hub-config .btn-small.cancel { background: #e3eaf2; color: #444; }

          .hub-config .pwd-input { 
            width: 100%; 
            padding: 10px 12px; 
            border-radius: 8px; 
            border: 2px solid #d7dee9; 
            outline: none; 
            font-size: 1rem; 
            margin-bottom: 10px; 
            transition: border-color 0.2s; 
            background-color: #fff; 
            color: #111; 
          }
          .hub-config .pwd-input:focus { border-color: #1a4e8a; }
          
          .hub-config .btn-pwd { background: #1a4e8a; color: white; width: 100%; padding: 10px; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
          .hub-config .btn-pwd:hover { background: #123866; }
          
          .hub-config .pwd-msg { font-size: 0.9rem; margin-top: 10px; font-weight: 600; padding: 10px; border-radius: 8px; text-align: center;}
          .hub-config .pwd-msg.success { color: #1e7035; background-color: #e6ffed; border: 1px solid #b3f0c3; } 
          .hub-config .pwd-msg.error { color: #8a1a1a; background-color: #ffecec; border: 1px solid #ffd0d0; } 
          
          .hub-config .msg { margin: 15px 0 0; padding: 10px 12px; border-radius: 10px; font-weight: 700; font-size: 0.9rem;}
          .hub-config .msg.error { background: #ffecec; color: #8a1a1a; border: 1px solid #ffd0d0;}
          .hub-config .msg.success { background: #e6ffed; color: #1e7035; border: 1px solid #b3f0c3;}
          
          .hub-config .progress-track { height: 12px; border-radius: 999px; background: #eaf6ff; border: 1px solid #e3eaf2; overflow: hidden; margin-top: 15px;}
          .hub-config .progress-fill { height: 100%; background: #1a4e8a; transition: width 0.3s ease; }
          
          @media (max-width: 850px) { .hub-config .config-grid { grid-template-columns: 1fr; } }
          @media (max-width: 600px) { .hub.hub-config { padding: 20px 15px; margin: 15px; } }

          /* Estilos para los Toggles de Preferencias */
          .hub-config .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eef2f7; }
          .hub-config .toggle-row:last-of-type { border-bottom: none; }
          .hub-config .toggle-label { font-size: 0.95rem; color: #374151; font-weight: 700; }
          .hub-config .toggle-switch { position: relative; width: 44px; height: 24px; appearance: none; background: #cbd5e1; border-radius: 999px; outline: none; cursor: pointer; transition: background 0.3s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); margin: 0;}
          .hub-config .toggle-switch:checked { background: #1e7035; }
          .hub-config .toggle-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.3s; }
          .hub-config .toggle-switch:checked::after { transform: translateX(20px); }
        `}</style>

        <div className="generic-card">
          <h1 className="hub-title">Configuración</h1>
          <p className="hub-subtitle">Perfil, ajustes y estadísticas del usuario.</p>
        </div>

        {message && (
          <div className={`msg ${messageType}`} role="alert">
            {message}
          </div>
        )}

<div className="config-grid">
          
          {/* COLUMNA IZQUIERDA */}
          {/* Agregamos height: '100%' a la columna entera */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', height: '100%' }}>
            
            {/* TARJETA 1: IDENTIDAD */}
            <section className="generic-card" aria-label="Resumen del Perfil">
              <h2 className="config-card-title">Detalles de la Cuenta</h2>
              {renderRow('Usuario', 'usuario')}
              {renderRow('Nombre', 'nombre')}
              {renderRow('Correo Electrónico', 'correo', 'email')}
              {user?.rol && user.rol.toLowerCase() !== 'usuario' && (
                <div className="row">
                  <div className="k">Rol de Sistema</div>
                  <div className="v" style={{ color: '#8a1a1a' }}>{user.rol}</div>
                </div>
              )}
            </section>

            {/* TARJETA 2: PREFERENCIAS */}
            {/* Agregamos flex: 1 para que esta tarjeta empuje hacia abajo */}
            <section className="generic-card" aria-label="Preferencias" style={{ flex: 1 }}>
              <h2 className="config-card-title">Preferencias de la Plataforma</h2>
              
              <div className="toggle-row">
                <span className="toggle-label">Recibir correos de progreso</span>
                <input type="checkbox" className="toggle-switch" defaultChecked />
              </div>
              
              <div className="toggle-row">
                <span className="toggle-label">Mostrar mi perfil a otros estudiantes</span>
                <input type="checkbox" className="toggle-switch" />
              </div>

              <div className="toggle-row">
                <span className="toggle-label">Avisos de nuevos módulos</span>
                <input type="checkbox" className="toggle-switch" defaultChecked />
              </div>
            </section>

          </div>

          {/* COLUMNA DERECHA */}
          {/* Agregamos height: '100%' a la columna entera */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', height: '100%' }}>
            
            {/* TARJETA 3: ESTADÍSTICAS */}
            <section className="generic-card" aria-label="Estadísticas">
              <h2 className="config-card-title">Tus Estadísticas</h2>
              <div className="row">
                <div className="k">Módulos avanzados</div>
                <div className="v" style={{ color: '#1a4e8a' }}>{statsData.modulos}</div>
              </div>
              <div className="row">
                <div className="k">Quizzes superados</div>
                <div className="v" style={{ color: '#1e7035' }}>{statsData.quizzes}</div>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eef2f7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="k" style={{ fontSize: '0.9rem' }}>Progreso Global del Curso</span>
                  <span className="v" style={{ fontSize: '0.9rem', color: '#1a4e8a' }}>
                    {loadingProgress ? '...' : `${percent}%`}
                  </span>
                </div>
                <div className="progress-track" aria-hidden="true" style={{ marginTop: 0 }}>
                  <div className="progress-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </section>

            {/* TARJETA 4: SEGURIDAD */}
            {/* Cambiamos flexGrow: 1 por flex: 1 para mayor compatibilidad */}
            <section className="generic-card" aria-label="Seguridad" style={{ flex: 1 }}>
              <h2 className="config-card-title">Seguridad</h2>
              <form onSubmit={handleSavePassword}>
                <label className="k" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>
                  Cambiar Contraseña
                </label>
                 <input 
                  type="password" 
                  className="pwd-input" 
                  placeholder="Nueva contraseña..." 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isSavingPwd}
                />
                <button type="submit" className="btn-pwd" disabled={isSavingPwd || newPassword.length === 0}>
                  {isSavingPwd ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
                
                {pwdMessage && (
                  <div 
                    className={`pwd-msg ${pwdMessageType}`} 
                    style={{ textAlign: Array.isArray(pwdMessage) ? 'left' : 'center' }}
                  >
                    {Array.isArray(pwdMessage) ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {pwdMessage.map((err, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{err}</li>
                        ))}
                      </ul>
                    ) : (
                      pwdMessage
                    )}
                  </div>
                )}
              </form>
            </section>

          </div>
        </div>
      </main>
    </Shell>
  );
}