/**
 * Specs locales para poder probar el feature SIN backend.
 *
 * Migración a backend:
 * - Copiar estos JSON tal cual a DB o a un servicio.
 * - Implementar GET /api/programming-exercises/spec/:exerciseId.
 */

export const LOCAL_SPECS = {
  'm2-201-e1-sizeof': {
    version: 1,
    exerciseId: 'm2-201-e1-sizeof',
    title: 'Ejercicio 1: sizeof()',
    language: 'c',
    expectedOutput:
      '--- TAMAÑOS EN BYTES ---\n' +
      'Tamaño de char: 1 bytes\n' +
      'Tamaño de int: 4 bytes\n' +
      'Tamaño de float: 4 bytes\n' +
      'Tamaño de double: 8 bytes',
    hints: [
      'Incluye <stdio.h>.',
      'Imprime 4 líneas usando sizeof(char/int/float/double).',
      'Usa %zu para imprimir sizeof.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      {
        id: 'include-stdio',
        type: 'regex',
        pattern: '#\\s*include\\s*<stdio\\.h>',
        flags: 'm',
        message: 'Incluye <stdio.h>.',
      },
      { id: 'has-sizeof-char', type: 'regex', pattern: 'sizeof\\s*\\(\\s*char\\s*\\)', flags: 'm', message: 'Usa sizeof(char).' },
      { id: 'has-sizeof-int', type: 'regex', pattern: 'sizeof\\s*\\(\\s*int\\s*\\)', flags: 'm', message: 'Usa sizeof(int).' },
      { id: 'has-sizeof-float', type: 'regex', pattern: 'sizeof\\s*\\(\\s*float\\s*\\)', flags: 'm', message: 'Usa sizeof(float).' },
      { id: 'has-sizeof-double', type: 'regex', pattern: 'sizeof\\s*\\(\\s*double\\s*\\)', flags: 'm', message: 'Usa sizeof(double).' },
      { id: 'printf-format-zu', type: 'regex', pattern: '%zu', flags: 'm', message: 'Usa %zu en algún printf para sizeof.' },
    ],
  },

  'm2-201-e2-ascii': {
    version: 1,
    exerciseId: 'm2-201-e2-ascii',
    title: 'Ejercicio 2: ASCII básico (char como número)',
    language: 'c',
    expectedOutput: 'El carácter es: A\nSu valor ASCII es: 65',
    hints: [
      'Declara: char letra_A = \'A\';',
      'Imprime letra_A con %c y con %d.',
      'Incluye <stdio.h>.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      {
        id: 'include-stdio',
        type: 'regex',
        pattern: '#\\s*include\\s*<stdio\\.h>',
        flags: 'm',
        message: 'Incluye <stdio.h>.',
      },
      {
        id: 'decl',
        type: 'regex',
        pattern: "\\bchar\\s+letra_A\\s*=\\s*'A'\\s*;",
        flags: 'm',
        message: "Declara: char letra_A = 'A';",
      },
      {
        id: 'printf-c',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*%c[^"]*"\\s*,\\s*letra_A\\s*\\)',
        flags: 'm',
        message: 'Imprime letra_A como carácter usando %c.',
      },
      {
        id: 'printf-d',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*%d[^"]*"\\s*,\\s*letra_A\\s*\\)',
        flags: 'm',
        message: 'Imprime letra_A como número ASCII usando %d.',
      },
    ],
  },

  'm2-201-e3-mixto': {
    version: 1,
    exerciseId: 'm2-201-e3-mixto',
    title: 'Ejercicio 3: Declaración y uso mixto',
    language: 'c',
    expectedOutput: 'Perfil: $28 de edad con promedio de 8.75.',
    hints: [
      'Declara: int edad = 28; float promedio_final = 8.75f; char simbolo_moneda = \'$\';',
      'Imprime los 3 valores con un solo printf (format: %c%d ... %.2f).',
      'Incluye <stdio.h>.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'edad', type: 'regex', pattern: '\\bint\\s+edad\\s*=\\s*28\\s*;', flags: 'm', message: 'Declara: int edad = 28;' },
      { id: 'promedio', type: 'regex', pattern: '\\bfloat\\s+promedio_final\\s*=\\s*8\\.75f?\\s*;', flags: 'm', message: 'Declara: float promedio_final = 8.75f;' },
      { id: 'simbolo', type: 'regex', pattern: "\\bchar\\s+simbolo_moneda\\s*=\\s*'\\\\$'\\s*;|\\bchar\\s+simbolo_moneda\\s*=\\s*'\\$'\\s*;", flags: 'm', message: "Declara: char simbolo_moneda = '$';" },
      {
        id: 'printf',
        type: 'regex',
        pattern:
          'printf\\s*\\(\\s*"[^"]*%c[^"]*%d[^"]*%\\.2f[^"]*"\\s*,\\s*simbolo_moneda\\s*,\\s*edad\\s*,\\s*promedio_final\\s*\\)',
        flags: 'm',
        message: 'Usa un printf con %c, %d y %.2f en ese orden.',
      },
    ],
  },

  'm2-201-e4-double': {
    version: 1,
    exerciseId: 'm2-201-e4-double',
    title: 'Ejercicio 4: Precisión con double',
    language: 'c',
    expectedOutput:
      'PI con precisión estándar (6 decimales): 3.141593\n' +
      'PI con alta precisión (10 decimales): 3.1415926535',
    hints: [
      'Declara: double pi_preciso = 3.1415926535;',
      'Imprime con %.6f y luego con %.10f usando la misma variable.',
      'Incluye <stdio.h>.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'decl', type: 'regex', pattern: '\\bdouble\\s+pi_preciso\\s*=\\s*3\\.1415926535\\s*;', flags: 'm', message: 'Declara: double pi_preciso = 3.1415926535;' },
      {
        id: 'printf-6',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*%\\.6f[^"]*"\\s*,\\s*pi_preciso\\s*\\)',
        flags: 'm',
        message: 'Imprime con %.6f usando pi_preciso.',
      },
      {
        id: 'printf-10',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*%\\.10f[^"]*"\\s*,\\s*pi_preciso\\s*\\)',
        flags: 'm',
        message: 'Imprime con %.10f usando pi_preciso.',
      },
    ],
  },

  'm2-201-e5-float-sufijo': {
    version: 1,
    exerciseId: 'm2-201-e5-float-sufijo',
    title: 'Ejercicio 5: Declaración explícita de float (sufijo f)',
    language: 'c',
    expectedOutput: 'Mi altura es: 1.85 metros',
    hints: [
      'Declara: float altura = 1.85f; (con sufijo f)',
      'Imprime con %.2f.',
      'Incluye <stdio.h>.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'decl', type: 'regex', pattern: '\\bfloat\\s+altura\\s*=\\s*1\\.85f\\s*;', flags: 'm', message: 'Declara: float altura = 1.85f;' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%\\.2f[^"]*"\\s*,\\s*altura\\s*\\)', flags: 'm', message: 'Imprime altura con %.2f.' },
    ],
  },

  'm2-201-e6-ascii-aritmetica': {
    version: 1,
    exerciseId: 'm2-201-e6-ascii-aritmetica',
    title: 'Ejercicio 6: Aritmética ASCII',
    language: 'c',
    expectedOutput: 'La letra inicial es: J\nLa letra resultante es: O',
    hints: [
      "Declara: char letra_inicial = 'J';",
      'Calcula una segunda variable sumándole 5.',
      'Imprime ambas con %c.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'decl-inicial', type: 'regex', pattern: "\\bchar\\s+letra_inicial\\s*=\\s*'J'\\s*;", flags: 'm', message: "Declara: char letra_inicial = 'J';" },
      { id: 'decl-final', type: 'regex', pattern: '\\bchar\\s+letra_final\\s*=\\s*letra_inicial\\s*\\+\\s*5\\s*;', flags: 'm', message: 'Calcula: char letra_final = letra_inicial + 5;' },
      { id: 'printf-inicial', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%c[^"]*"\\s*,\\s*letra_inicial\\s*\\)', flags: 'm', message: 'Imprime letra_inicial con %c.' },
      { id: 'printf-final', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%c[^"]*"\\s*,\\s*letra_final\\s*\\)', flags: 'm', message: 'Imprime letra_final con %c.' },
    ],
  },

  'm2-201-e7-enteros-signo': {
    version: 1,
    exerciseId: 'm2-201-e7-enteros-signo',
    title: 'Ejercicio 7: Enteros con signo',
    language: 'c',
    expectedOutput: 'Saldo de la cuenta: 15000\nGasto registrado: -3500',
    hints: [
      'Declara: int saldo = 15000; int gasto = -3500;',
      'Imprime ambos con %d.',
      'Incluye <stdio.h>.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'saldo', type: 'regex', pattern: '\\bint\\s+saldo\\s*=\\s*15000\\s*;', flags: 'm', message: 'Declara: int saldo = 15000;' },
      { id: 'gasto', type: 'regex', pattern: '\\bint\\s+gasto\\s*=\\s*-3500\\s*;', flags: 'm', message: 'Declara: int gasto = -3500;' },
      { id: 'printf-saldo', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%d[^"]*"\\s*,\\s*saldo\\s*\\)', flags: 'm', message: 'Imprime saldo con %d.' },
      { id: 'printf-gasto', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%d[^"]*"\\s*,\\s*gasto\\s*\\)', flags: 'm', message: 'Imprime gasto con %d.' },
    ],
  },

  'm2-201-e8-truncamiento': {
    version: 1,
    exerciseId: 'm2-201-e8-truncamiento',
    title: 'Ejercicio 8: Truncamiento (float → int)',
    language: 'c',
    expectedOutput: 'Valor original: 3.14159\nValor entero después de la asignación: 3',
    hints: [
      'Declara: float pi_decimal = 3.14159f;',
      'Declara: int pi_entero = pi_decimal; (o con cast explícito).',
      'Imprime con %.5f y con %d.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'decl-f', type: 'regex', pattern: '\\bfloat\\s+pi_decimal\\s*=\\s*3\\.14159f?\\s*;', flags: 'm', message: 'Declara: float pi_decimal = 3.14159f;' },
      { id: 'decl-i', type: 'regex', pattern: '\\bint\\s+pi_entero\\s*=\\s*(?:\\(\\s*int\\s*\\)\\s*)?pi_decimal\\s*;', flags: 'm', message: 'Declara: int pi_entero = pi_decimal; (se permite cast).' },
      { id: 'printf-f', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%\\.5f[^"]*"\\s*,\\s*pi_decimal\\s*\\)', flags: 'm', message: 'Imprime pi_decimal con %.5f.' },
      { id: 'printf-d', type: 'regex', pattern: 'printf\\s*\\(\\s*"[^"]*%d[^"]*"\\s*,\\s*pi_entero\\s*\\)', flags: 'm', message: 'Imprime pi_entero con %d.' },
    ],
  },

  'm2-201-e9-comillas': {
    version: 1,
    exerciseId: 'm2-201-e9-comillas',
    title: 'Ejercicio 9: Comillas dentro de printf',
    language: 'c',
    expectedOutput: 'El tipo "char" usa el delimitador \'\' para sus valores.',
    hints: [
      'Usa una sola llamada a printf.',
      'Para comillas dobles dentro del string: \\".',
      "Para imprimir comillas simples: '' o \\\'\\\' dentro del string.",
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      {
        id: 'printf',
        type: 'regex',
        pattern:
          'printf\\s*\\(\\s*"[^"]*(?:\\\\"char\\\\")[^"]*(?:\\\\n)?[^"]*"\\s*\\)\\s*;',
        flags: 'm',
        message: 'Incluye en el string el texto con "char" usando escape (\"char\").',
      },
      {
        id: 'single-quotes',
        type: 'regex',
        pattern: "(?:''|\\\\'\\\\')",
        flags: 'm',
        message: "Incluye el delimitador de comillas simples: '' o \\'\\'.",
      },
    ],
  },

  'm2-201-e10-multiple-decl': {
    version: 1,
    exerciseId: 'm2-201-e10-multiple-decl',
    title: 'Ejercicio 10: Declaración múltiple en una línea',
    language: 'c',
    expectedOutput: 'El costo total de la reserva es: 600',
    hints: [
      'Declara en una sola línea: int huespedes = 4, dias = 3, precio = 50;',
      'Calcula: costo_total = huespedes * dias * precio;',
      'Imprime el resultado con %d.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      {
        id: 'decl-multiple',
        type: 'regex',
        pattern:
          '\\bint\\s+huespedes\\s*=\\s*4\\s*,\\s*dias\\s*=\\s*3\\s*,\\s*precio\\s*=\\s*50\\s*;',
        flags: 'm',
        message: 'Declara huespedes, dias y precio en una sola línea (separados por comas).',
      },
      {
        id: 'calc',
        type: 'regex',
        pattern: '\\bint\\s+costo_total\\s*=\\s*huespedes\\s*\\*\\s*dias\\s*\\*\\s*precio\\s*;',
        flags: 'm',
        message: 'Calcula: int costo_total = huespedes * dias * precio;',
      },
      {
        id: 'printf',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*%d[^"]*"\\s*,\\s*costo_total\\s*\\)',
        flags: 'm',
        message: 'Imprime costo_total con printf y %d.',
      },
    ],
  },

  'm2-301-e5-area': {
    version: 1,
    exerciseId: 'm2-301-e5-area',
    title: 'Ejercicio 5: área del círculo',
    language: 'c',
    expectedOutput: 'El área del círculo es: 78.54',
    hints: [
      'Declara float radio = 5.0f;',
      'Declara float area;',
      'Calcula: area = 3.14159f * radio * radio;',
      'Imprime con %.2f.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      { id: 'decl-radio', type: 'regex', pattern: '\\bfloat\\s+radio\\s*=\\s*5\\.0f\\s*;', flags: 'm', message: 'Declara radio como 5.0f.' },
      { id: 'decl-area', type: 'regex', pattern: '\\bfloat\\s+area\\s*;', flags: 'm', message: 'Declara area.' },
      { id: 'formula', type: 'regex', pattern: '\\barea\\s*=\\s*3\\.14159f\\s*\\*\\s*radio\\s*\\*\\s*radio\\s*;', flags: 'm', message: 'Calcula area = 3.14159f * radio * radio.' },
      { id: 'printf-area', type: 'regex', pattern: 'printf\\s*\\(\\s*\"[^\"]*%\\.2f[^\"]*\"\\s*,\\s*area\\s*\\)\\s*;', flags: 'm', message: 'Imprime area con %.2f.' },
    ],
  },

  'm2-401-e2-define': {
    version: 1,
    exerciseId: 'm2-401-e2-define',
    title: 'Ejercicio 2: #define',
    language: 'c',
    expectedOutput: 'Horas en 3 semanas: 504',
    hints: ['Usa: #define DIAS_SEMANA 7', 'Usa HORAS_DIA = 24', 'Calcula DIAS_SEMANA * 3 * HORAS_DIA'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'define', type: 'regex', pattern: '#\\s*define\\s+DIAS_SEMANA\\s+7', flags: 'm', message: 'Define DIAS_SEMANA como 7.' },
      { id: 'horas-dia', type: 'regex', pattern: '\\bHORAS_DIA\\b', flags: 'm', message: 'Usa una constante HORAS_DIA.' },
      { id: 'formula', type: 'regex', pattern: 'DIAS_SEMANA\\s*\\*\\s*3\\s*\\*\\s*HORAS_DIA', flags: 'm', message: 'Calcula DIAS_SEMANA * 3 * HORAS_DIA.' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(.*Horas en 3 semanas', flags: 'm', message: 'Imprime el resultado con printf.' },
    ],
  },

  'm2-501-e2-overflow': {
    version: 1,
    exerciseId: 'm2-501-e2-overflow',
    title: 'Ejercicio 2: overflow',
    language: 'c',
    expectedOutput: 'Valor inicial (INT_MAX): 2147483647\nValor después de +1: -2147483648',
    hints: ['Incluye <limits.h>', 'Inicializa contador = INT_MAX', 'Suma 1 y vuelve a imprimir'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'include-limits', type: 'regex', pattern: '#\\s*include\\s*<limits\\.h>', flags: 'm', message: 'Incluye <limits.h>.' },
      { id: 'init', type: 'regex', pattern: '\\bint\\s+contador\\s*=\\s*INT_MAX\\s*;', flags: 'm', message: 'Inicializa contador con INT_MAX.' },
      { id: 'sum', type: 'regex', pattern: 'contador\\s*=\\s*contador\\s*\\+\\s*1\\s*;', flags: 'm', message: 'Suma 1 al contador (contador = contador + 1).' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(.*INT_MAX', flags: 'm', message: 'Imprime el valor inicial.' },
    ],
  },

  'm2-601-e62-refactor': {
    version: 1,
    exerciseId: 'm2-601-e62-refactor',
    title: 'Ejercicio 6.2: refactorización',
    language: 'c',
    hints: ['Usa snake_case para variables', 'Usa MAYUSCULAS_CON_GUION_BAJO para constantes'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'has-underscore-var', type: 'regex', pattern: '\\b[a-z]+_[a-z0-9_]+\\b', flags: 'm', message: 'Incluye al menos una variable en snake_case.' },
      { id: 'has-const-style', type: 'regex', pattern: '\\b[A-Z]+_[A-Z0-9_]+\\b', flags: 'm', message: 'Incluye al menos un identificador en MAYUSCULAS_CON_GUION_BAJO.' },
      { id: 'avoid-hyphen', type: 'notRegex', pattern: '-', flags: 'm', message: "No uses guiones '-' dentro de identificadores." },
    ],
  },
};
