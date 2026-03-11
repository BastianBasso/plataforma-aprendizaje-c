export const M2_401_SPECS = {
  'm2-401-e1-const-tipadas': {
    version: 1,
    exerciseId: 'm2-401-e1-const-tipadas',
    title: 'Ejercicio 1: const int',
    language: 'c',
    expectedOutput: 'Límite máximo definido: 50\nPuntuación inicial: 50',
    hints: ['Usa const int LIMITE_MAXIMO = 50', 'Inicializa puntuacion con LIMITE_MAXIMO', 'Imprime ambos con printf'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'const', type: 'regex', pattern: '\\bconst\\s+int\\s+LIMITE_MAXIMO\\s*=\\s*50\\s*;', flags: 'm', message: 'Define const int LIMITE_MAXIMO = 50.' },
      { id: 'init', type: 'regex', pattern: '\\bint\\s+puntuacion\\s*=\\s*LIMITE_MAXIMO\\s*;', flags: 'm', message: 'Inicializa puntuacion con LIMITE_MAXIMO.' },
      { id: 'print1', type: 'regex', pattern: 'printf\\s*\\(.*L[ií]mite m[aá]ximo', flags: 'm', message: 'Imprime el límite máximo.' },
      { id: 'print2', type: 'regex', pattern: 'printf\\s*\\(.*Puntuaci[oó]n', flags: 'm', message: 'Imprime la puntuación.' },
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

  'm2-401-e3-const-inmutable': {
    version: 1,
    exerciseId: 'm2-401-e3-const-inmutable',
    title: 'Ejercicio 3: const inmutable',
    language: 'c',
    expectedOutput: 'La constante PI fue definida de forma segura.',
    hints: ['Define const float PI = 3.14159f', 'Comenta la línea PI = ...', 'Imprime un mensaje final'],
    normalize: { stripComments: false, collapseWhitespace: true },
    rules: [
      { id: 'const-pi', type: 'regex', pattern: '\\bconst\\s+float\\s+PI\\s*=\\s*3\\.14159f\\s*;', flags: 'm', message: 'Define const float PI = 3.14159f.' },
      { id: 'commented-assign', type: 'regex', pattern: '//.*PI\\s*=.*', flags: 'm', message: 'Deja comentada la línea donde reasignarías PI.' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(.*constante PI', flags: 'mi', message: 'Imprime el mensaje final.' },
    ],
  },

  'm2-401-e4-nomenclatura': {
    version: 1,
    exerciseId: 'm2-401-e4-nomenclatura',
    title: 'Ejercicio 4: nomenclatura',
    language: 'c',
    expectedOutput: 'Capital: 1000.00\nInterés ganado: 50.00',
    hints: ['Usa const float TASA_ANUAL = 0.05f', 'Variable capitalInicial', 'Calcula interesGanado = capitalInicial * TASA_ANUAL'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'const-rate', type: 'regex', pattern: '\\bconst\\s+float\\s+TASA_ANUAL\\s*=\\s*0\\.05f\\s*;', flags: 'm', message: 'Define const float TASA_ANUAL = 0.05f.' },
      { id: 'var-capital', type: 'regex', pattern: '\\bfloat\\s+capitalInicial\\s*=\\s*1000\\.0f\\s*;', flags: 'm', message: 'Define capitalInicial (camelCase) con 1000.0f.' },
      { id: 'calc', type: 'regex', pattern: 'interesGanado\\s*=\\s*capitalInicial\\s*\\*\\s*TASA_ANUAL', flags: 'm', message: 'Calcula interesGanado = capitalInicial * TASA_ANUAL.' },
    ],
  },

  'm2-401-e5-impl-int-float': {
    version: 1,
    exerciseId: 'm2-401-e5-impl-int-float',
    title: 'Ejercicio 5: int + float',
    language: 'c',
    expectedOutput: 'Resultado (15 + 2.5): 17.5',
    hints: ['Declara int numero_entero = 15', 'Declara float numero_decimal = 2.5f', 'Guarda la suma en float resultado'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'int', type: 'regex', pattern: '\\bint\\s+numero_entero\\s*=\\s*15\\s*;', flags: 'm', message: 'Declara numero_entero = 15.' },
      { id: 'float', type: 'regex', pattern: '\\bfloat\\s+numero_decimal\\s*=\\s*2\\.5f\\s*;', flags: 'm', message: 'Declara numero_decimal = 2.5f.' },
      { id: 'sum', type: 'regex', pattern: '\\bfloat\\s+resultado\\s*=\\s*numero_entero\\s*\\+\\s*numero_decimal\\s*;', flags: 'm', message: 'Suma int + float y guárdalo en float resultado.' },
    ],
  },

  'm2-401-e6-impl-char-int': {
    version: 1,
    exerciseId: 'm2-401-e6-impl-char-int',
    title: 'Ejercicio 6: char + int',
    language: 'c',
    expectedOutput: "Código ASCII de '1' + 5 es: 54",
    hints: ["char caracter_uno = '1'", 'int incremento = 5', 'Suma y guarda en int valor_final'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'char', type: 'regex', pattern: "\\bchar\\s+caracter_uno\\s*=\\s*'1'\\s*;", flags: 'm', message: "Declara char caracter_uno = '1'." },
      { id: 'inc', type: 'regex', pattern: '\\bint\\s+incremento\\s*=\\s*5\\s*;', flags: 'm', message: 'Declara incremento = 5.' },
      { id: 'sum', type: 'regex', pattern: '\\bint\\s+valor_final\\s*=\\s*caracter_uno\\s*\\+\\s*incremento', flags: 'm', message: 'Suma char + int y guarda en valor_final.' },
    ],
  },

  'm2-401-e7-div-entera': {
    version: 1,
    exerciseId: 'm2-401-e7-div-entera',
    title: 'Ejercicio 7: división entera',
    language: 'c',
    expectedOutput: 'Resultado de división entera (10 / 4): 2.00',
    hints: ['num1 = 10', 'num2 = 4', 'float resultado_entero = num1 / num2'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'nums', type: 'regex', pattern: '\\bint\\s+num1\\s*=\\s*10\\s*;[\\s\\S]*\\bint\\s+num2\\s*=\\s*4\\s*;', flags: 'm', message: 'Declara num1=10 y num2=4.' },
      { id: 'div', type: 'regex', pattern: '\\bfloat\\s+resultado_entero\\s*=\\s*num1\\s*/\\s*num2\\s*;', flags: 'm', message: 'Guarda la división entera en un float.' },
    ],
  },

  'm2-401-e8-div-casting': {
    version: 1,
    exerciseId: 'm2-401-e8-div-casting',
    title: 'Ejercicio 8: división con casting',
    language: 'c',
    expectedOutput: 'Resultado de división decimal (10 / 4): 2.50',
    hints: ['Aplica (float) a num1 o num2', 'Calcula num1/num2 como float', 'Imprime con %.2f'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'cast', type: 'regex', pattern: '\\(\\s*float\\s*\\)', flags: 'm', message: 'Incluye un casting a float: (float).' },
      { id: 'div', type: 'regex', pattern: 'resultado_decimal\\s*=\\s*\n?\s*\(?\s*float\s*\)?\s*\w+\s*/\s*\w+', flags: 'm', message: 'Calcula la división con casting y guárdala en resultado_decimal.' },
    ],
  },

  'm2-401-e9-cast-trunc': {
    version: 1,
    exerciseId: 'm2-401-e9-cast-trunc',
    title: 'Ejercicio 9: truncamiento',
    language: 'c',
    expectedOutput: 'Valor double original: 99.98\nValor entero resultante (truncado): 99',
    hints: ['double valor_decimal = 99.98', 'int valor_entero = (int)valor_decimal', 'Imprime ambos'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'double', type: 'regex', pattern: '\\bdouble\\s+valor_decimal\\s*=\\s*99\\.98\\s*;', flags: 'm', message: 'Declara double valor_decimal = 99.98.' },
      { id: 'cast', type: 'regex', pattern: '\\bint\\s+valor_entero\\s*=\\s*\\(\\s*int\\s*\\)\\s*valor_decimal\\s*;', flags: 'm', message: 'Haz casting a int al asignar valor_decimal.' },
    ],
  },

  'm2-401-e10-stock-const': {
    version: 1,
    exerciseId: 'm2-401-e10-stock-const',
    title: 'Ejercicio 10: stock y const',
    language: 'c',
    expectedOutput: 'Cantidad vendida (constante): 10\nStock restante (variable reasignada): 90',
    hints: ['int stock = 100', 'const int CANTIDAD_VENDIDA = 10', 'stock = stock - CANTIDAD_VENDIDA'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'stock', type: 'regex', pattern: '\\bint\\s+stock\\s*=\\s*100\\s*;', flags: 'm', message: 'Inicializa stock a 100.' },
      { id: 'const', type: 'regex', pattern: '\\bconst\\s+int\\s+CANTIDAD_VENDIDA\\s*=\\s*10\\s*;', flags: 'm', message: 'Define const int CANTIDAD_VENDIDA = 10.' },
      { id: 'op', type: 'regex', pattern: 'stock\\s*=\\s*stock\\s*-\\s*CANTIDAD_VENDIDA', flags: 'm', message: 'Reasigna stock restando CANTIDAD_VENDIDA.' },
    ],
  },

  'm2-401-e11-promociones': {
    version: 1,
    exerciseId: 'm2-401-e11-promociones',
    title: 'Ejercicio 11: promociones',
    language: 'c',
    expectedOutput: 'Resultado final (double): 190.5',
    hints: ["char letra_z = 'Z'", 'int numero_grande = 100', 'double factor = 0.5', 'double resultado = letra_z + numero_grande + factor'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'vars', type: 'regex', pattern: "char\\s+letra_z\\s*=\\s*'Z'\\s*;[\\s\\S]*int\\s+numero_grande\\s*=\\s*100\\s*;[\\s\\S]*double\\s+factor\\s*=\\s*0\\.5\\s*;", flags: 'm', message: 'Declara char, int y double con los valores pedidos.' },
      { id: 'sum', type: 'regex', pattern: '\\bdouble\\s+resultado\\s*=\\s*letra_z\\s*\\+\\s*numero_grande\\s*\\+\\s*factor', flags: 'm', message: 'Suma y guarda el resultado en un double.' },
    ],
  },

  'm2-401-e12-promedio-cast': {
    version: 1,
    exerciseId: 'm2-401-e12-promedio-cast',
    title: 'Ejercicio 12: promedio con casting',
    language: 'c',
    expectedOutput: 'Promedio real: 87.75\nPromedio entero forzado: 87',
    hints: ['float promedio_real = (nota1 + nota2) / 2.0f', 'int promedio_entero = (int)promedio_real'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'notes', type: 'regex', pattern: '\\bfloat\\s+nota1\\s*=\\s*95\\.5f\\s*;[\\s\\S]*\\bfloat\\s+nota2\\s*=\\s*80\\.0f\\s*;', flags: 'm', message: 'Declara nota1 y nota2 con 95.5f y 80.0f.' },
      { id: 'avg', type: 'regex', pattern: '\\bfloat\\s+promedio_real\\s*=.*\\/\\s*2\\.0f', flags: 'm', message: 'Calcula el promedio real dividiendo por 2.0f.' },
      { id: 'cast', type: 'regex', pattern: '\\bint\\s+promedio_entero\\s*=\\s*\\(\\s*int\\s*\\)\\s*promedio_real', flags: 'm', message: 'Convierte el promedio real a int con casting.' },
    ],
  },

  'm2-401-e13-mixta-const': {
    version: 1,
    exerciseId: 'm2-401-e13-mixta-const',
    title: 'Ejercicio 13: constantes mixtas',
    language: 'c',
    expectedOutput: 'Mensaje de estado: 301\nColor seleccionado: ROJO',
    hints: ['#define COLOR_DEFAULT "ROJO"', 'const int CODIGO_ESTADO = 301', 'Imprime ambos'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'define', type: 'regex', pattern: '#\\s*define\\s+COLOR_DEFAULT\\s+"ROJO"', flags: 'm', message: 'Define COLOR_DEFAULT con "ROJO" usando #define.' },
      { id: 'const', type: 'regex', pattern: '\\bconst\\s+int\\s+CODIGO_ESTADO\\s*=\\s*301\\s*;', flags: 'm', message: 'Define const int CODIGO_ESTADO = 301.' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(.*CODIGO_ESTADO', flags: 'm', message: 'Imprime el código de estado.' },
    ],
  },

  'm2-401-e14-double-float': {
    version: 1,
    exerciseId: 'm2-401-e14-double-float',
    title: 'Ejercicio 14: double a float',
    language: 'c',
    hints: ['double valor_alta_precision = 1234567.89', 'float valor_baja_precision = (float)valor_alta_precision', 'Imprime ambos'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'double', type: 'regex', pattern: '\\bdouble\\s+valor_alta_precision\\s*=\\s*1234567\\.89\\s*;', flags: 'm', message: 'Declara double valor_alta_precision = 1234567.89.' },
      { id: 'cast', type: 'regex', pattern: '\\bfloat\\s+valor_baja_precision\\s*=\\s*\\(\\s*float\\s*\\)\\s*valor_alta_precision', flags: 'm', message: 'Convierte a float con casting.' },
    ],
  },

  'm2-401-e15-expresion-cast': {
    version: 1,
    exerciseId: 'm2-401-e15-expresion-cast',
    title: 'Ejercicio 15: expresión con casting',
    language: 'c',
    expectedOutput: 'Resultado (5 + 2.0/3.0): 5.6667',
    hints: ['a=5, b=2, c=3', 'resultado = a + ((float)b / c)', 'Imprime con %.4f'],
    normalize: { stripComments: true, collapseWhitespace: true },
    rules: [
      { id: 'vars', type: 'regex', pattern: '\\bint\\s+a\\s*=\\s*5\\s*;[\\s\\S]*\\bint\\s+b\\s*=\\s*2\\s*;[\\s\\S]*\\bint\\s+c\\s*=\\s*3\\s*;', flags: 'm', message: 'Declara a=5, b=2, c=3.' },
      { id: 'expr', type: 'regex', pattern: 'resultado\\s*=\\s*a\\s*\\+\\s*\\(\\(\\s*float\\s*\\)\\s*b\\s*/\\s*c\\s*\\)', flags: 'm', message: 'Calcula resultado = a + ((float)b / c).' },
      { id: 'printf', type: 'regex', pattern: 'printf\\s*\\(.*5 \\+ 2\\.0/3\\.0', flags: 'm', message: 'Imprime el resultado.' },
    ],
  },
};
