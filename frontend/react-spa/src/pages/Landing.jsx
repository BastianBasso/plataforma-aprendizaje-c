import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shell } from '../components/Shell.jsx';

export function Landing() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Shell>
      <style>{`
        .landing { padding: 18px; color: #111; }
        .landingTitle { margin: 0 0 8px; }
        .landingActions { display: flex; gap: 10px; }
        .header-c { background: #fff; border-bottom: 1px solid #e5e7eb; }
    .logo-c {
      background: linear-gradient(135deg,#162047 60%, #3b2fa6 100%);
      color: #fff;
      font-weight: 900;
      font-size: 1.7rem;
      border-radius: 8px;
      width: 38px; height: 38px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(59,47,166,0.08);
      margin-right: 10px;
    }
    .user-profile {
      display: flex; align-items: center; gap: 10px;
      background: #e0e7ff;
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 1rem;
      color: #3730a3;
      font-weight: 600;
    }
    .hero-c {
      background: linear-gradient(135deg,#162047 60%, #3b2fa6 100%);
      color: #fff;
      border-radius: 18px;
      box-shadow: 0 10px 30px rgba(2,6,23,0.12);
      padding: 48px 32px 36px 32px;
      margin: 36px auto 0 auto;
      max-width: 700px;
      text-align: center;
      position: relative;
    }
    .hero-c .icon-c {
      background: #0f172a;
      border-radius: 18px;
      width: 80px; height: 80px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 18px auto;
      box-shadow: 0 4px 18px rgba(16,23,42,0.18);
    }
    .hero-c .icon-c span {
      font-size: 3.2rem;
      font-weight: 900;
      color: #fff;
      letter-spacing: 2px;
    }
    .hero-c h1 {
      font-size: 2.6rem;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .hero-c p {
      font-size: 1.1rem;
      color: #dbeafe;
      margin-bottom: 22px;
    }
    .hero-c .main-btn {
      background: linear-gradient(90deg,#2563eb,#4f46e5);
      color: #fff;
      font-weight: 700;
      border: none;
      border-radius: 999px;
      padding: 12px 36px;
      font-size: 1.1rem;
      box-shadow: 0 4px 16px rgba(37,99,235,0.18);
      transition: background 0.2s;
      cursor: pointer;
    }
    .hero-c .main-btn:hover {
      background: linear-gradient(90deg,#4f46e5,#2563eb);
    }
    .content-c {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 18px rgba(59,47,166,0.07);
      max-width: 700px;
      margin: 32px auto 0 auto;
      padding: 36px 32px 28px 32px;
    }
    .content-c h2 {
      color: #3730a3;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .content-c .details-c {
      color: #374151;
      font-size: 1.05rem;
      margin-bottom: 18px;
    }
    .content-c ul {
      margin-left: 1.2em;
      margin-bottom: 10px;
      color: #1e293b;
    }
    .content-c ul li {
      margin-bottom: 6px;
      font-size: 1rem;
    }
    .content-c .show-more {
      color: #2563eb;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
      font-size: 1rem;
    }
    `}</style>

      <main className="page" aria-label="Landing">
        <>
  {/* Hero Section */}
  <section className="hero-c animate__animated animate__fadeInDown">

    <div className="icon-c">
      <span>C</span>
    </div>
    <h1>Curso del lenguaje C</h1>
    <p>
      Aprende paso a paso el lenguaje que dio origen a la mayoría de las
      tecnologías modernas. Este curso te guiará desde los conceptos
      fundamentales —como los tipos de datos, operadores y estructuras de
      control— hasta temas avanzados como punteros, manejo de archivos, memoria
      dinámica y listas enlazadas. Cada módulo combina teoría con ejercicios
      prácticos diseñados para ayudarte a comprender cómo funciona realmente el
      lenguaje C.
    </p>
    <Link className="main-btn animate__animated animate__pulse animate__infinite" to="/cursos">
      Comienza el curso
    </Link>
  </section>
  {/* Content Section */}
  <section className="content-c animate__animated animate__fadeInUp">
    <h2>¿Qué aprenderás en este curso?</h2>
    <div className="details-c">
      Aprende los fundamentos del lenguaje C y cómo aplicarlos en el desarrollo
      de software moderno. Este curso cubre desde los conceptos básicos hasta
      técnicas avanzadas, preparándote para crear aplicaciones eficientes y
      robustas.
    </div>
    <ul>
      <li>Fundamentos y Sintaxis: Domina variables, tipos de datos y operadores lógicos.</li>
      <li>Control de Flujo: Crea algoritmos inteligentes con estructuras if-else, switch y bucles for/while.</li>
      <li>Punteros y Memoria: Aprende el manejo real de la memoria (el verdadero poder de C).</li>
      <li>Estructuras de Datos: Implementa listas enlazadas, pilas y colas desde cero.</li>
      <li>Manejo de Archivos: Lee y escribe datos en archivos para aplicaciones prácticas.</li>
    </ul>
    <button
      type="button"
      className="show-more-landing"
      onClick={() => setExpanded((prev) => !prev)}
      aria-expanded={expanded}
    >
      {expanded ? 'Mostrar menos...' : 'Mostrar más...'}
    </button>

    {expanded && (
      <div style={{ marginTop: 16, color: '#1e293b', fontSize: '1rem' }}>
        <h3 style={{ color: '#3730a3', fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>
          ¿Por qué aprender C?
        </h3>
        <ul style={{ marginLeft: '1.2em' }}>
          <li>Base para otros lenguajes como C++, Java y Python.</li>
          <li>Uso en sistemas operativos, drivers y software embebido.</li>
          <li>Desarrollo de algoritmos eficientes y comprensión profunda de la memoria.</li>
          <li>Gran demanda en la industria tecnológica y académica.</li>
        </ul>
        <p>
          El lenguaje C te permite entender cómo funciona realmente una computadora, desde la gestión de memoria hasta la interacción directa con el hardware. Aprender C es el primer paso para convertirte en un desarrollador versátil y preparado para cualquier reto.
        </p>
      </div>
    )}
  </section>
</>


        <div className="page-actions">
          {//<Link className="btn" to="/login">Iniciar sesión</Link>
          //<Link className="btn btn-secondary" to="/registro">Registrarme</Link>
          //<Link className="btn btn-secondary" to="/cursos">Ir a cursos</Link>
          }
        </div>
      </main>
    </Shell>
  );
}
