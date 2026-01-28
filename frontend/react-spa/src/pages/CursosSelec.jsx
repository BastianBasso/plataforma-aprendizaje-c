import { Link } from 'react-router-dom';
import { TopProgressBar } from '../components/TopProgressBar.jsx';
import { useUserProgress } from '../hooks/useUserProgress.js';

function getModuloNumber(moduloName) {
  const s = String(moduloName ?? '');
  const m = s.match(/modulo[-_\s]*(\d+)/i);
  return m ? Number(m[1]) : null;
}

function getLeadingNumber(text) {
  const s = String(text ?? '');
  const m = s.match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

function prettifyFileName(fileName) {
  const s = String(fileName ?? '');
  return s
    .replace(/\.html?$/i, '')
    .replace(/^\d+\s*[-_.]*/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const MODULE_TITLES = {
  1: 'Módulo 1 – Fundamentos (Introducción)',
  2: 'Módulo 2 – Tipos de Datos y Variables',
  3: 'Módulo 3 – Operadores y Entrada / Salida de Datos',
  4: 'Módulo 4 – Estructuras de Control',
  5: 'Módulo 5 – Funciones y Modularidad',
  6: 'Módulo 6 – Arrays y Punteros',
  7: 'Módulo 7 – Structs y Unions',
  8: 'Módulo 8 – Manipulación de Archivos',
  9: 'Módulo 9 – Asignación de Memoria Dinámica',
  10: 'Módulo 10 – Listas Enlazadas',
};

const LESSON_TITLES = {
  1: {
    100: 'Introducción a la programación y a los algoritmos',
    101: 'Selección múltiple: Introducción',
    200: 'Historia, propósito y aplicaciones del lenguaje C',
    201: 'Selección múltiple: Historia y propósito',
    300: 'El proceso de compilación y el ciclo de vida del código',
    301: 'Selección múltiple: Proceso de compilación',
    400: 'Estructura básica de un programa en C (la función main)',
    401: 'Selección múltiple: Estructura del programa',
    500: 'Pensamiento computacional: descomposición y abstracción',
    501: 'Selección múltiple: Pensamiento computacional',
    600: 'Primeros pasos y la función de salida básica',
    601: 'Selección múltiple: Función de salida',
    800: 'Resumen del módulo',
  },
  2: {
    100: 'El concepto de dato y la gestión de memoria',
    101: 'Selección múltiple: Concepto de dato',
    200: 'Clasificación de tipos primitivos (int, float, char)',
    201: 'Selección múltiple: Tipos primitivos',
    300: 'Declaración, inicialización y uso de variables',
    301: 'Ejercicios de programación: Variables',
    400: 'Variables y constantes',
    401: 'Selección múltiple: Variables y constantes',
    500: 'Límites y rangos de los tipos de datos (desbordamiento)',
    501: 'Ejercicios de programación: Rangos y límites',
    600: 'Declaración de variables y buenas prácticas',
    601: 'Ejercicios de programación: Buenas prácticas',
    700: 'Proyecto del módulo',
    800: 'Resumen del módulo',
  },
  3: {
    100: 'Operadores aritméticos y de asignación',
    101: 'Ejercicios de programación: Operadores aritméticos',
    200: 'Operadores relacionales y lógicos (bases para la decisión)',
    201: 'Selección múltiple: Operadores lógicos',
    300: 'Prioridad de operadores y expresiones',
    301: 'Ejercicios de programación: Prioridad',
    400: 'Entrada estándar de datos (Input): captura de valores',
    401: 'Selección múltiple: Entrada de datos',
    500: 'Salida estándar de datos (Output): formateo de resultados',
    501: 'Selección múltiple: Salida de datos',
    600: 'Implementación práctica del ciclo Input–Procesamiento–Output',
    601: 'Selección múltiple: Ciclo IPO',
    700: 'Proyecto del módulo',
    800: 'Resumen del módulo',
  },
  4: {
    100: 'Flujo de ejecución lineal vs. control de flujo',
    101: 'Selección múltiple: Flujo de control',
    200: 'Estructuras condicionales simples y dobles (if / else)',
    201: 'Ejercicios de programación: Condicionales',
    300: 'Estructuras condicionales múltiples (switch y anidamiento)',
    301: 'Ejercicios de programación: Switch',
    400: 'Bucles de repetición por contador (for)',
    401: 'Ejercicios de programación: For',
    500: 'Bucles de repetición condicionales (while / do-while)',
    501: 'Ejercicios de programación: While',
    600: 'Control de bucles (break y continue)',
    601: 'Ejercicios de programación: Control de bucles',
    700: 'Proyecto del módulo',
    800: 'Resumen del módulo',
  },
  5: {
    100: 'Concepto de modularidad y reutilización de código',
    101: 'Selección múltiple: Modularidad',
    200: 'Definición, declaración y llamada de funciones',
    201: 'Ejercicios de programación: Funciones',
    300: 'Comunicación de datos: paso de argumentos y parámetros',
    301: 'Ejercicios de programación: Parámetros',
    400: 'Valores de retorno y el tipo void',
    401: 'Ejercicios de programación: Retorno',
    500: 'Ámbito (scope) de variables: locales y globales',
    501: 'Ejercicios de programación: Scope',
    600: 'Creación de librerías simples (.h y .c)',
    601: 'Ejercicios de programación: Librerías',
    700: 'Proyecto del módulo',
    800: 'Resumen del módulo',
  },
  6: {
    100: 'Concepto y declaración de arrays unidimensionales',
    101: 'Ejercicios de programación: Arrays',
    200: 'Acceso a elementos mediante indexación',
    201: 'Ejercicios de programación: Indexación',
    300: 'Arrays bidimensionales (matrices) y su utilidad',
    301: 'Ejercicios de programación: Matrices',
    400: 'Concepto de puntero y dirección de memoria',
    401: 'Selección múltiple: Punteros',
    500: 'Operadores de punteros (* y &)',
    501: 'Selección múltiple: Operadores de punteros',
    600: 'Relación fundamental entre punteros y arrays',
    601: 'Selección múltiple: Punteros y arrays',
    700: 'Proyecto del módulo',
    800: 'Resumen del módulo',
  },
  7: {
    100: 'Tipo de dato definido por el usuario',
    101: 'Selección múltiple: Tipos definidos por el usuario',
    200: 'Declaración y uso de structs',
    201: 'Ejercicios de programación: Structs',
    300: 'Acceso a miembros de structs (. y ->)',
    301: 'Ejercicios de programación: Acceso a miembros',
    400: 'Arrays de structs',
    401: 'Ejercicios de programación: Arrays de structs',
    500: 'Uso de unions para optimización de memoria',
    501: 'Ejercicios de programación: Unions',
    600: 'Campos de bits y alineación de datos',
    601: 'Selección múltiple: Campos de bits',
    700: 'Proyecto del módulo',
    701: 'Respuesta del proyecto',
    800: 'Resumen del módulo',
  },
  8: {
    100: 'Persistencia de datos y streams',
    101: 'Selección múltiple: Persistencia',
    200: 'Apertura y cierre de archivos (FILE*)',
    201: 'Ejercicios de programación: Archivos',
    300: 'Modos de operación (r, w, a)',
    301: 'Ejercicios de programación: Modos de archivo',
    400: 'Manipulación de archivos de texto',
    401: 'Ejercicios de programación: Texto',
    500: 'Manipulación de archivos binarios',
    501: 'Ejercicios de programación: Binarios',
    600: 'Detección de errores y fin de archivo',
    601: 'Ejercicios de programación: Errores',
    700: 'Proyecto del módulo',
    750: 'Resultado del proyecto',
    800: 'Resumen del módulo',
  },
  9: {
    100: 'Memoria estática vs. memoria dinámica (Heap)',
    150: 'Ejercicios de programación: Memoria',
    200: 'Asignación de memoria con malloc',
    250: 'Ejercicios de programación: malloc',
    300: 'Redimensión de memoria con realloc',
    350: 'Ejercicios de programación: realloc',
    400: 'Inicialización de memoria con calloc',
    450: 'Selección múltiple: calloc',
    500: 'Liberación de memoria con free',
    550: 'Ejercicios de programación: free',
    600: 'Fugas de memoria y buenas prácticas',
    650: 'Ejercicios de programación: Memory leaks',
    700: 'Proyecto del módulo',
    750: 'Respuesta del proyecto',
    800: 'Resumen del módulo',
  },
  10: {
    100: 'Problema de los arrays de tamaño fijo',
    150: 'Introducción teórica',
    200: 'Estructura de un nodo: dato y enlace',
    250: 'Ejercicios de programación: Nodo',
    300: 'Creación de listas enlazadas simples',
    350: 'Ejercicios de programación: Listas',
    400: 'Inserción en listas (inicio, fin y medio)',
    450: 'Ejercicios de programación: Inserción',
    500: 'Eliminación y recorrido de listas',
    550: 'Ejercicios de programación: Eliminación',
    600: 'Aplicación: implementación de una pila o cola',
    650: 'Ejercicios de programación: Pila y cola',
    700: 'Proyecto del módulo',
    750: 'Solución del proyecto',
    800: 'Resumen del módulo',
  },
};

export function CursosSelec({ modulosIndex, loading, error }) {
  const { percent, loading: loadingProgress } = useUserProgress();

  if (loading) {
    return (
      <>
        <TopProgressBar percent={percent} loading={loadingProgress} />
        <main className="hub"><p>Cargando módulos…</p></main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopProgressBar percent={percent} loading={loadingProgress} />
        <main className="hub"><p>Error cargando índice</p></main>
      </>
    );
  }

  return (
    <>
      <div className="cursos-page">
        <TopProgressBar percent={percent} loading={loadingProgress} />

        <style>{`
          /* Estilo local para la barra de progreso SOLO en /cursos */
          .cursos-page .topbar {
            position: sticky;
            top: 0;
            z-index: 20;
            background: #c5e8f8ff;
            border-bottom: 1px solid #e3eaf2;
            box-shadow: 0 2px 12px rgba(60, 120, 200, 0.08);
          }

          .cursos-page .topbar-row {
            max-width: 1500px;
            margin: 0 auto;
            padding: 14px 18px;
            justify-content: flex-center;
          }

          .cursos-page .topbar-progress {
            align-items: flex-center;
          }

          .cursos-page .topbar-progress-text {
            color: #1a4e8a;
            font-weight: 700;
            opacity: 1;
          }

          .cursos-page .topbar-progress-track {
            height: 12px;
            background: #eaf6ff;
            border: 1px solid #e3eaf2;
          }

          .cursos-page .topbar-progress-fill {
            background: #1a4e8a;
          }
        `}</style>

      <style>{`
        /* Estilos locales para /cursos (scoped a .hub-cursos) */
        .hub.hub-cursos {
          max-width: 1500px;
          margin: 40px auto;
          padding: 40px 32px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(60, 120, 200, 0.10);
        }

        .hub-cursos .generic-card {
          background: #fff;
          border: 1px solid #e3eaf2;
          border-radius: 18px;
          padding: 18px 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(60, 120, 200, 0.08);
        }

        .hub-cursos .hub-title {
          color: #1a4e8a;
          font-weight: 700;
          font-size: 2.0rem;
          letter-spacing: 0.5px;
          margin: 0 0 6px;
          text-align: left;
        }

        .hub-cursos .hub-subtitle {
          color: #222e3a;
          opacity: 0.85;
          margin: 0;
          text-align: left;
        }

        .hub-cursos .hub-grid {
          gap: 18px;
        }

        .hub-cursos .hub-card {
          background: #fff;
          border: 1px solid #e3eaf2;
          border-radius: 18px;
          padding: 18px 18px;
          box-shadow: 0 2px 10px rgba(60, 120, 200, 0.10);
        }

        .hub-cursos .hub-card-title {
          color: #1a4e8a;
          font-weight: 700;
          font-size: 1.15rem;
        }

        .hub-cursos .hub-enter {
          background: #1a4e8a;
          border-radius: 12px;
          padding: 10px 14px;
        }

        .hub-cursos .hub-enter:hover {
          filter: brightness(1.05);
        }

        .hub-cursos .hub-lesson {
          background: #eaf6ff;
          border: 1px solid #e3eaf2;
          border-radius: 12px;
        }

        .hub-cursos .hub-lesson:hover {
          background: #e3f0ff;
        }

        @media (max-width: 600px) {
          .hub.hub-cursos {
            padding: 16px 12px;
            margin: 18px auto;
          }
        }
      `}</style>

      <main className="hub hub-cursos" aria-label="Cursos Select">
        <div className="generic-card">
          <h1 className="hub-title">Cursos</h1>
          <p className="hub-subtitle">Selecciona un módulo para comenzar o continuar.</p>
        </div>

        <div className="hub-grid">
          {modulosIndex?.map((mod, modIndex) => (
            (() => {
              const moduleNumber = getModuloNumber(mod?.modulo);
              const moduleTitle = (moduleNumber != null && MODULE_TITLES[moduleNumber]) ? MODULE_TITLES[moduleNumber] : mod.modulo;
              return (
            <section className="hub-card" key={mod.modulo}>
              <div className="hub-card-header">
                <h2 className="hub-card-title">{moduleTitle}</h2>
                <Link className="hub-enter" to={`/m/${modIndex}/0`}>Entrar</Link>
              </div>

              <ul className="hub-lessons">
                {mod.archivos.map((archivo, fileIndex) => (
                  <li key={archivo.ruta}>
                    <Link className="hub-lesson" to={`/m/${modIndex}/${fileIndex}`}>
                      {(() => {
                        const code = getLeadingNumber(archivo?.nombre);
                        const staticTitle = moduleNumber != null && code != null
                          ? LESSON_TITLES[moduleNumber]?.[code]
                          : undefined;
                        return staticTitle || prettifyFileName(archivo?.nombre);
                      })()}
                    </Link>
                  </li>
                ))}

              
              </ul>
            </section>
              );
            })()
          ))}
        </div>
      </main>
      </div>
    </>
  );
}
