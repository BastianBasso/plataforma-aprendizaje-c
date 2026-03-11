export const M2_601_SPECS = {
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

  'm2-601-e63-decl-cerca-uso': {
    version: 1,
    exerciseId: 'm2-601-e63-decl-cerca-uso',
    title: 'Ejercicio 6.3: declaración cerca del uso (C99+)',
    language: 'c',
    hints: [
      'Declara total_acumulado cerca de su primer uso.',
      'Declara i dentro del for: for (int i = 0; ...)',
      'Imprime el total con printf.',
    ],
    normalize: { stripComments: true, collapseWhitespace: true },
    maxCodeLength: 12000,
    rules: [
      { id: 'include-stdio', type: 'regex', pattern: '#\\s*include\\s*<stdio\\.h>', flags: 'm', message: 'Incluye <stdio.h>.' },
      {
        id: 'late-total',
        type: 'regex',
        pattern: '\\bint\\s+total_acumulado\\s*=\\s*0\\s*;',
        flags: 'm',
        message: 'Declara: int total_acumulado = 0;',
      },
      {
        id: 'for-int-i',
        type: 'regex',
        pattern: '\\bfor\\s*\\(\\s*int\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*50\\s*;\\s*i\\s*\\+\\+\\s*\\)',
        flags: 'm',
        message: 'Declara i dentro del for: for (int i = 0; i < 50; i++).',
      },
      {
        id: 'accumulate',
        type: 'regex',
        pattern: 'total_acumulado\\s*\\+?=\\s*i\\s*;',
        flags: 'm',
        message: 'Acumula dentro del bucle: total_acumulado += i; (o equivalente).',
      },
      {
        id: 'printf-total',
        type: 'regex',
        pattern: 'printf\\s*\\(\\s*"[^"]*Total\\s+Acumulado:[^"]*%d[^"]*"\\s*,\\s*total_acumulado\\s*\\)',
        flags: 'm',
        message: 'Imprime el total con printf y %d.',
      },
    ],
  },
};
