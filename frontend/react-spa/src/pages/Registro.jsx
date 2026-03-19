import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/authCodeBackground.css';

export function Registro() {
  const [text, setText] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await fetch('/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ nombre, text, email, password }),
      });
      const json = await res.json().catch(() => null);

       if (!res.ok || !json?.success) {
        if (json?.errors && json.errors.length > 0) {
          setError(json.errors); 
        } else {
          setError(json?.message || 'No se pudo registrar'); 
        }
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
    <main aria-label="Registro">
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
          padding-right: 40px; 
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

        .auth-card {
          display: flex;
          gap: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
          max-width: 80em;
          min-height: 50vh; 
          width: 100%;
          background: #ffffff;
        }

        .left-panel {
          flex: 1;
          min-width: 320px;
          background: linear-gradient(135deg, #081028 0%, #162047 50%, #3b2fa6 100%);
          color: #fff;
          position: relative;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30%;
        }

        .code-bg {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace;
          font-size: 12px;
          line-height: 1.3;
          color: #7dd3fc;
          padding: 28px;
          overflow: hidden;
          pointer-events: none;
          filter: blur(2px) saturate(1.1);
          white-space: pre;
        }

        .binary-overlay {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.95;
        }

        .hex-blob {
          width: 180px;
          height: 180px;
        }

        .brand-text {
          color: #a5b4fc;
          margin-top: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .right-panel {
          flex: 1;
          background: #ffffff;
          padding: 28px;
          min-width: 360px;
          width: 50%;
          color: #111827;
        }

        .reg-title {
          margin: 0 0 10px;
          font-weight: 900;
          font-size: 2rem;
          color: #2563eb;
        }

        .reg-heading {
          margin: 0 0 10px;
          font-weight: 800;
          font-size: 1.2rem;
          color: #111827;
        }

        .reg-subtitle {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .reg-form {
          display: grid;
          gap: 14px;
        }

        .reg-form label {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
          color: #374151;
          font-weight: 600;
        }

        .reg-form input {
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: #ffffff;
          color: #111827;
        }

        .reg-actions {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        .reg-primary-btn {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #4f46e5);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.2);
        }

        .reg-primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .reg-footer {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          text-align: center;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .reg-footer a {
          color: #2563eb;
          font-weight: 700;
        }

        @media (max-width: 880px) {
          .auth-card {
            flex-direction: column;
          }

          .left-panel {
            min-height: 160px;
            width: 100%;
          }

          .right-panel {
            width: 100%;
            min-width: 0;
          }

          .hex-blob {
            width: 140px;
            height: 140px;
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
            <div className="code-bg" aria-hidden="true">
{`#include <stdio.h>
#include "sprite.h"
#include "card.h"
#include "game.h"
#include "blind.h"
#include "joker.h"
#include "affine_background.h"
#include "graphic_utils.h"

int main(void) {
  printf("Hola, Plataforma C\\n");
  return 0;
}
  
void init()
{
    irq_init(NULL);
    irq_add(II_VBLANK, mmVBlank);
    irq_add(II_HBLANK, affine_background_hblank);

    // Initialize text engine
    tte_init_se(0, BG_CBB(TTE_CBB) | BG_SBB(TTE_SBB), 0, CLR_WHITE, TTE_BIT_UNPACK_OFFSET, NULL, NULL);
    tte_erase_screen();
    tte_init_con();

    // TTE palette setup
    pal_bg_bank[TTE_YELLOW_PB][TTE_BIT_ON_CLR_IDX] = TEXT_CLR_YELLOW;
    pal_bg_bank[TTE_BLUE_PB][TTE_BIT_ON_CLR_IDX] = TEXT_CLR_BLUE; 
    pal_bg_bank[TTE_RED_PB][TTE_BIT_ON_CLR_IDX] = TEXT_CLR_RED; 
    pal_bg_bank[TTE_WHITE_PB][TTE_BIT_ON_CLR_IDX] = TEXT_CLR_WHITE;
    
    // Set up the video mode
    // BG0 is the TTE text layer
    REG_BG0CNT = BG_PRIO(0) | BG_CBB(TTE_CBB) | BG_SBB(TTE_SBB) | BG_4BPP;
    // BG1 is the main background layer
    REG_BG1CNT = BG_PRIO(1) | BG_CBB(MAIN_BG_CBB) | BG_SBB(MAIN_BG_SBB) | BG_8BPP;
    // BG2 is the affine background layer
    REG_BG2CNT = BG_PRIO(2) | BG_CBB(AFFINE_BG_CBB) | BG_SBB(AFFINE_BG_SBB) | BG_8BPP | BG_WRAP;
    
    int win1_left = 72;
    int win1_top = 44;
    int win1_right = 200;

// Aprende • Practica • Progresa
// 0101 1010 1100 0011
`}
            </div>
            <div className="binary-overlay" aria-hidden="true">
              <svg className="hex-blob" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <polygon points="50 4 90 24 90 76 50 96 10 76 10 24" fill="url(#g1)" opacity="0.95" />
                <g transform="translate(50,50)" fill="rgba(255,255,255,0.12)" fontFamily="monospace" fontSize="6" textAnchor="middle">
                  <text y="-6">1010 0101</text>
                  <text y="6">0101 1010</text>
                  <text y="33" fontSize="100" fill="white">C</text>
                </g>
                <circle cx="50" cy="50" r="16" fill="rgba(255,255,255,0.06)" />
              </svg>
              <div className="brand-text">PLATAFORMA C</div>
            </div>
          </div>

          <div className="right-panel">
            <h1 className="reg-title">Registrarse</h1>
            <h2 className="reg-heading">Crea tu cuenta y empieza a aprender hoy</h2>
            <p className="reg-subtitle">
              Estás a un paso de convertirte en un desarrollador C. El registro es rápido, gratuito y te da acceso inmediato a tus rutas de aprendizaje.
            </p>

            <form className="reg-form" onSubmit={onSubmit}>
               <label>
                Nombre 
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </label>

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
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} /* Asegúrate de que esta variable coincida con tu estado */
                    onChange={e => setPassword(e.target.value)} 
                    autoComplete="new-password" 
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      /* Ícono Ocultar */
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      /* Ícono Mostrar */
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </label>

                {/* MENSAJES DE ERROR INTELIGENTES */}
                {error ? (
                  <div className="form-error" style={{ textAlign: 'left', background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    {Array.isArray(error) ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {error.map((err, index) => (
                          <li key={index} style={{ marginBottom: '4px' }}>{err}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0, fontWeight: 'bold', textAlign: 'center' }}>{error}</p>
                    )}
                  </div>
                ) : null}
              {success ? <p className="form-success">{success}</p> : null}

              <div className="reg-actions">
                <button className="reg-primary-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Registrando…' : 'Registrarse'}
                </button>
              </div>

              <div className="reg-footer">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
