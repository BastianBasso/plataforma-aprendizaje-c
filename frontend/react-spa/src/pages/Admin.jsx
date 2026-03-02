import { Shell } from '../components/Shell.jsx';
import { useMemo, useState } from 'react';
import { useSession } from '../context/SessionContext.jsx';


function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    focusable: false,
  };

  switch (name) {
    case 'users':
      return (
        <svg {...common}>
          <path
            d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 20v-1a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'courses':
      return (
        <svg {...common}>
          <path
            d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'message':
      return (
        <svg {...common}>
          <path
            d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <path
            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L15 3h-6L8.6 7.5a8 8 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.9 7.9 0 0 0 .1 2l-2 1.5 2 3.5 2.4-1a8 8 0 0 0 1.7 1L9 21h6l.4-2.5a8 8 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'faq':
      return (
        <svg {...common}>
          <path
            d="M12 18h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.09 9a3 3 0 1 1 4.91 2.36c-.9.63-1.5 1.28-1.5 2.64"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'filter':
      return (
        <svg {...common}>
          <path
            d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <path
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path
            d="M12 5v14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function Admin() {
  const { user, status } = useSession();
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState('usuarios');

  const users = useMemo(
    () => [
      {
        id: 1,
        name: 'Ann Culhane',
        role: 'Estudiante',
        email: 'annculhane@gmail.com',
        progress: 60,
        lastConnection: '2 semanas',
      },
      {
        id: 2,
        name: 'Ahmad Rosser',
        role: 'Estudiante',
        email: 'ahmadrosser@gmail.com',
        progress: 60,
        lastConnection: '1 semana',
      },
      {
        id: 3,
        name: 'Zain Calzoni',
        role: 'Estudiante',
        email: 'zaincalzoni@gmail.com',
        progress: 50,
        lastConnection: '3 días',
      },
      {
        id: 4,
        name: 'Leo Stanton',
        role: 'Estudiante',
        email: 'leostanton@gmail.com',
        progress: 30,
        lastConnection: '4 horas',
      },
      {
        id: 5,
        name: 'Kaiya Vetrov',
        role: 'Estudiante',
        email: 'kaiyavetrov@gmail.com',
        progress: 20,
        lastConnection: '1 mes',
      },
      {
        id: 6,
        name: 'Ryan Westervelt',
        role: 'Estudiante',
        email: 'ryanwestervelt@gmail.com',
        progress: 30,
        lastConnection: '1 año',
      },
      {
        id: 7,
        name: 'Corey Stanton',
        role: 'Estudiante',
        email: 'coreystanton@gmail.com',
        progress: 15,
        lastConnection: '2 días',
      },
      {
        id: 8,
        name: 'Adison Aminoff',
        role: 'Estudiante',
        email: 'adisonaminoff@gmail.com',
        progress: 90,
        lastConnection: '1 día',
      },
      {
        id: 9,
        name: 'Alfredo Aminoff',
        role: 'Estudiante',
        email: 'alfredoaminoff@gmail.com',
        progress: 100,
        lastConnection: '2 horas',
      },
    ],
    [],
  );

  const filteredUsers = useMemo(() => {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    });
  }, [query, users]);

  const pageTitle = useMemo(() => {
    switch (activeSection) {
      case 'usuarios':
        return 'Usuarios';
      case 'cursos':
        return 'Cursos edición';
      case 'mensajes':
        return 'Mensajes';
      case 'configuracion':
        return 'Configuración';
      case 'faq':
        return 'FAQ';
      default:
        return 'Administración';
    }
  }, [activeSection]);

  function progressTone(progress) {
    if (progress >= 70) return 'good';
    if (progress >= 35) return 'mid';
    return 'low';
  }

  return (
    <Shell>
      <main className="hub hub-admin" aria-label="Administración">
        <style>{`
          /* Estilos locales para /admin (scoped a .hub-admin) */
          .hub.hub-admin {
            max-width: 1180px;
            margin: 40px auto;
            padding: 28px;
          }

          .hub-admin .panel {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 18px;
            align-items: start;
          }
          
          /* Card base (alineado a Configuracion.jsx) */
          .hub-admin .generic-card {
            width: 85%;
            background: #fff;
            border: 2px solid #c4c5c5;
            border-radius: 18px;
            padding: 18px 20px;
            box-shadow: 0 2px 12px rgba(60, 120, 200, 0.08);
          }
          
          .hub-admin [aria-label="Encabezado"]{
            width: 88.8%;
          }
          
          .hub-admin .title {
            margin: 0 0 6px;
            color: #1a4e8a;
            font-weight: 800;
            font-size: 2rem;
            letter-spacing: 0.3px;
            text-align: left;
          }

          .hub-admin .subtitle {
            margin: 0;
            color: #222e3a;
            opacity: 0.85;
            text-align: left;
          }

          /* Sidebar */
          .hub-admin .sidebar {
            position: sticky;
            top: 18px;
            display: grid;
            gap: 12px;
          }

          .hub-admin .profile {
            display: grid;
            grid-template-columns: 64px 1fr;
            gap: 12px;
            align-items: center;
          }

          .hub-admin .avatar {
            width: 64px;
            height: 64px;
            border-radius: 999px;
            background: radial-gradient(circle at 30% 30%, #b3d8ff 0%, #1a4e8a 100%);
            box-shadow: 0 10px 22px rgba(26, 78, 138, 0.18);
            border: 2px solid rgba(26, 78, 138, 0.25);
          }

          .hub-admin .profile-name {
            margin: 0;
            color: #111;
            font-weight: 900;
            text-align: left;
            line-height: 1.1;
          }

          .hub-admin .profile-role {
            margin: 2px 0 0;
            color: #1a4e8a;
            font-weight: 800;
            opacity: 0.95;
            text-align: left;
          }

          .hub-admin .nav {
            display: grid;
            gap: 8px;
          }

          .hub-admin .navbtn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 12px;
            border: 1px solid #e3eaf2;
            background: #f7fbff;
            color: #14385f;
            font-weight: 900;
            cursor: pointer;
            text-align: left;
          }

          .hub-admin .navbtn:hover {
            border-color: rgba(26, 78, 138, 0.35);
            box-shadow: 0 0 0 3px rgba(26, 78, 138, 0.10);
          }

          .hub-admin .navbtn.active {
            background: #eaf6ff;
            border-color: rgba(26, 78, 138, 0.45);
            color: #1a4e8a;
          }

          /* Content */
          .hub-admin .content {
            display: grid;
            gap: 12px;
          }

          .hub-admin .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
          }

          .hub-admin .toolbar-left {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .hub-admin .iconbtn {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            border: 1px solid #e3eaf2;
            background: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #1a4e8a;
          }

          .hub-admin .search {
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #d7dee9;
            background: #fff;
            border-radius: 12px;
            padding: 0 10px;
            height: 40px;
            min-width: min(420px, 72vw);
          }

          .hub-admin .search input {
            border: 0;
            outline: none;
            font-size: 0.98rem;
            width: 100%;
            background: transparent;
          }

          .hub-admin .primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border-radius: 12px;
            border: 0;
            padding: 10px 14px;
            background: #1a4e8a;
            color: #fff;
            font-weight: 900;
            cursor: pointer;
            height: 40px;
          }

          .hub-admin .primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          /* Table */
          .hub-admin .tablewrap {
            overflow: auto;
            border-radius: 16px;
            border: 1px solid #e3eaf2;
          }

          .hub-admin table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            min-width: 760px;
          }

          .hub-admin thead th {
            text-align: left;
            padding: 12px 12px;
            font-size: 0.78rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #405268;
            background: #f7fbff;
            border-bottom: 1px solid #e3eaf2;
            white-space: nowrap;
          }

          .hub-admin tbody td {
            padding: 12px 12px;
            border-bottom: 1px solid #eef2f7;
            color: #111;
            font-weight: 700;
            vertical-align: middle;
          }

          .hub-admin tbody tr:hover td {
            background: rgba(234, 246, 255, 0.55);
          }

          .hub-admin .muted {
            font-weight: 800;
            color: #223;
            opacity: 0.78;
          }

          .hub-admin .pill {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(26, 78, 138, 0.08);
            color: #1a4e8a;
            font-weight: 900;
            font-size: 0.88rem;
            white-space: nowrap;
          }

          .hub-admin .pct {
            font-variant-numeric: tabular-nums;
            font-weight: 1000;
          }

          .hub-admin .pct.good { color: #0f7a3d; }
          .hub-admin .pct.mid { color: #1a4e8a; }
          .hub-admin .pct.low { color: #b42318; }

          .hub-admin .footerRow {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            padding: 10px 2px 0;
          }

          .hub-admin .mini {
            color: #222e3a;
            opacity: 0.8;
            font-weight: 800;
            margin: 0;
          }

          /* Responsive */
          @media (max-width: 980px) {
            .hub.hub-admin {
              padding: 18px 14px;
              margin: 18px auto;
            }

            .hub-admin .panel {
              grid-template-columns: 1fr;
            }

            .hub-admin .sidebar {
              position: static;
            }

            .hub-admin .search {
              min-width: 100%;
            }
          }
        `}</style>

        <section className="generic-card" aria-label="Encabezado">
          <h1 className="title">Administración de la página</h1>
          <p className="subtitle">
            Gestiona usuarios y contenido. Esta vista es UI lista para conectar APIs.
          </p>
        </section>

        <div className="panel">
          <aside className="sidebar" aria-label="Menú admin">
            <section className="generic-card" aria-label="Perfil">
              <div className="profile">
                <div className="avatar" />
                <div>
                  <p className="profile-name">{user?.username ?? 'Admin'}</p>
                  <p className="profile-role">
                    {status === 'authenticated' ? (user?.role ?? 'Administrador') : 'Invitado'}
                  </p>
                </div>
              </div>
            </section>

            <section className="generic-card" aria-label="Navegación">
              <div className="nav">
                <button
                  type="button"
                  className={`navbtn ${activeSection === 'usuarios' ? 'active' : ''}`}
                  onClick={() => setActiveSection('usuarios')}
                >
                  <Icon name="users" /> Usuarios
                </button>
                <button
                  type="button"
                  className={`navbtn ${activeSection === 'cursos' ? 'active' : ''}`}
                  onClick={() => setActiveSection('cursos')}
                >
                  <Icon name="courses" /> Cursos edición
                </button>
                <button
                  type="button"
                  className={`navbtn ${activeSection === 'mensajes' ? 'active' : ''}`}
                  onClick={() => setActiveSection('mensajes')}
                >
                  <Icon name="message" /> Mensajes
                </button>
                <button
                  type="button"
                  className={`navbtn ${activeSection === 'configuracion' ? 'active' : ''}`}
                  onClick={() => setActiveSection('configuracion')}
                >
                  <Icon name="settings" /> Configuración
                </button>
                <button
                  type="button"
                  className={`navbtn ${activeSection === 'faq' ? 'active' : ''}`}
                  onClick={() => setActiveSection('faq')}
                >
                  <Icon name="faq" /> FAQ
                </button>
              </div>
            </section>
          </aside>

          <section className="content" aria-label="Contenido admin">
            <section className="generic-card" aria-label="Barra de herramientas">
              <div className="toolbar">
                <div className="toolbar-left">
                  <button type="button" className="iconbtn" aria-label="Filtros (UI)">
                    <Icon name="filter" />
                  </button>
                  <div className="search" role="search">
                    <Icon name="search" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search… (nombre, correo, rol)"
                      aria-label="Buscar usuarios"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    // Placeholder: aquí conectarías modal/route para crear usuario
                    // eslint-disable-next-line no-alert
                    alert('UI lista. Conecta tu endpoint para crear usuarios.');
                  }}
                >
                  <Icon name="plus" /> añadir usuario
                </button>
              </div>
              <div className="footerRow" aria-label="Resumen">
                <p className="mini">
                  <span className="muted">Sección:</span> {pageTitle}
                </p>
                <p className="mini">
                  <span className="muted">Mostrando:</span> {filteredUsers.length} de {users.length}
                </p>
              </div>
            </section>

            <section className="generic-card" aria-label="Tabla">
              <div className="tablewrap" role="region" aria-label="Listado de usuarios" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 56 }}>#</th>
                      <th>NAME</th>
                      <th>ROL</th>
                      <th>CORREO</th>
                      <th style={{ width: 130 }}>% DE AVANCE</th>
                      <th style={{ width: 150 }}>LAST CONNECTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length ? (
                      filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="muted">{u.id}</td>
                          <td>{u.name}</td>
                          <td className="muted">{u.role}</td>
                          <td>
                            <span className="pill">{u.email}</span>
                          </td>
                          <td>
                            <span className={`pct ${progressTone(u.progress)}`}>{u.progress}</span>
                          </td>
                          <td className="muted">{u.lastConnection}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ padding: 18 }}>
                          <span className="muted">Sin resultados para “{String(query || '').trim()}”.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </main>
    </Shell>
  );
}
