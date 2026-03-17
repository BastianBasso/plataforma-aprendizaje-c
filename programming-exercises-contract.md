# Programming Exercises (Frontend-validated) — Contract

Este documento define el contrato para ejercicios de programación validados en **frontend** por patrones (regex/includes) y con **persistencia en backend** (guardar aprobado/no aprobado).

## Flujo

1. El HTML de una lección incluye placeholders:

```html
<div data-exercise="programming">
  <script type="application/json" data-exercise-config>
    { "version": 1, "exerciseId": "m2-301-e5-area", "lessonId": 2301, "title": "Ejercicio 5" }
  </script>
</div>
```

### Modelo base del contenido HTML (escalable)

El HTML NO debe contener lógica; solo “anclas” declarativas.

**ExerciseConfig v1 (JSON dentro del `<script data-exercise-config>`)**

Campos mínimos:
- `version: 1`
- `exerciseId: string` (clave estable)
- `lessonId?: number` (para progreso)
- `title?: string` (fallback visual)

Opcional (para probar sin backend):
- `spec?: ProgrammingExerciseSpec` (spec inline)

Regla práctica:
- En producción, lo ideal es **NO** poner `spec` inline (se obtiene por API).
- Para prototipar/QA, `spec` inline o fallback local permite validar regex sin backend.

2. El visor del módulo monta React dentro del `iframe` buscando `data-exercise="programming"`.
3. El componente pide al backend el `spec`.
4. El frontend valida el código localmente.
5. Si pasa, el frontend registra el intento en backend (persistencia).

### Modo sin backend (para probar YA)

Si el backend todavía no implementa el endpoint, el frontend puede funcionar igual:

Prioridad para obtener spec:
1) `config.spec` (inline en el HTML)
2) `GET /api/programming-exercises/spec/:exerciseId`
3) `LOCAL_SPECS[exerciseId]` (fallback en frontend)

Esto permite comprobar la lógica regex en tus HTML sin tener el backend listo.

---

## Endpoints requeridos (backend)

### 1) Obtener spec

- **GET** `/api/programming-exercises/spec/:exerciseId`
- **Auth**: opcional (recomendado no requerir login para leer el spec)

**Response 200** (JSON): ver `ProgrammingExerciseSpec`.

**Errores**:
- `404` si no existe
- `400` si `exerciseId` inválido

### 2) Registrar intento

- **POST** `/api/programming-exercises/attempt`
- **Auth**: requerido (necesita usuario)

**Body**:
```json
{
  "usuarioId": 123,
  "exerciseId": "m2-301-e5-area",
  "lessonId": 2301,
  "passed": true,
  "results": [
    { "ruleId": "include-stdio", "passed": true },
    { "ruleId": "formula", "passed": true }
  ],
  "code": "..."
}
```

**Response 200**:
```json
{ "ok": true }
```

**Validaciones recomendadas**:
- `usuarioId` debe existir y coincidir con sesión (si usan sesión/cookie)
- `exerciseId` string no vacío
- `passed` boolean
- limitar `code` (por ejemplo 20k chars)
- guardar `code` completo es opcional (se puede guardar hash + primeros N chars)

---

## Modelo de datos sugerido (DB)

Tabla `programming_exercise_attempt` (o similar):
- `id` (PK)
- `usuario_id` (FK)
- `exercise_id` (text)
- `lesson_id` (int, opcional)
- `passed` (bool)
- `results` (jsonb/text)
- `code` (text, opcional)
- `created_at` (timestamp)

Índices:
- `(usuario_id, exercise_id)` para consultar rápido progreso

---

## Spec (validatorSpec)

### ProgrammingExerciseSpec

```ts
{
  version: 1,
  exerciseId: string,
  title?: string,
  language?: 'c',
  expectedOutput?: string,
  hints?: string[],
  normalize?: {
    stripComments?: boolean,
    collapseWhitespace?: boolean
  },
  maxCodeLength?: number,
  rules: Array<ValidationRule>
}

ValidationRule = {
  id: string,
  type: 'includes' | 'regex' | 'notRegex',
  // includes:
  value?: string,
  // regex / notRegex:
  pattern?: string,
  flags?: string,
  applyTo?: 'raw' | 'normalized',
  required?: boolean,
  message?: string
}
```

Notas:
- `collapseWhitespace: true` suele mejorar UX (no falla por saltos de línea).
- Evitar regex complejas (riesgo de backtracking) y preferir múltiples reglas simples.

### Regex y texto en español (Unicode)

Si quieres que una regla acepte texto con acentos/ñ dentro de strings (ej. `"Tamaño"`, `"área"`), normalmente **no necesitas nada especial** si tu patrón usa algo como `[^\"]*`.

Problemas típicos y soluciones:
- **No uses `\\b` (word boundary) para palabras con acentos**: en JS, `\\b` está pensado para `[A-Za-z0-9_]` y puede fallar con `áéíóúñ`.
  - En su lugar, valida por contexto (por ejemplo buscando `printf(`, `"%.2f"`, etc.) o usa clases Unicode.
- Si necesitas “letras” en general, usa **Unicode property escapes** con flag `u`:
  - Patrón: `\\p{L}` (letra), `\\p{N}` (número)
  - Flags: `"mu"` (multiline + unicode)
  - Ejemplo (identificador flexible): `"\\b[\\p{L}_][\\p{L}\\p{N}_]*\\b"` con flags `"mu"`
- Recuerda que en JSON debes **doble-escapar** backslashes: `\\p{L}` se escribe como `"\\\\p{L}"`.

---

## Escalado (de HTML → backend) sin reescribir frontend

1) **Empieza** con `exerciseId` en el HTML (ya está hecho) y usa `LOCAL_SPECS` para validar.
2) Cuando el backend esté listo, migra los JSON specs a:
  - una tabla `programming_exercise_spec(exercise_id, spec_json)` o
  - un JSON file servido por el backend.
3) Implementa el GET del spec; el frontend automáticamente lo preferirá.
4) Habilita el POST attempt para persistencia.

Importante: `exerciseId` es la llave que te permite mover el spec de lugar sin romper lecciones.

---

## Ejemplos de specs (para copiar al backend)

### m2-201-e1-sizeof

```json
{
  "version": 1,
  "exerciseId": "m2-201-e1-sizeof",
  "title": "Ejercicio 1: sizeof()",
  "language": "c",
  "expectedOutput": "--- TAMAÑOS EN BYTES ---\nTamaño de char: 1 bytes\nTamaño de int: 4 bytes\nTamaño de float: 4 bytes\nTamaño de double: 8 bytes",
  "hints": [
    "Incluye <stdio.h>",
    "Imprime 4 líneas usando sizeof(char/int/float/double)",
    "Usa %zu para imprimir sizeof"
  ],
  "normalize": { "stripComments": true, "collapseWhitespace": true },
  "maxCodeLength": 12000,
  "rules": [
    { "id": "include-stdio", "type": "regex", "pattern": "#\\s*include\\s*<stdio\\.h>", "flags": "m", "message": "Incluye <stdio.h>." },
    { "id": "has-sizeof-char", "type": "regex", "pattern": "sizeof\\s*\\(\\s*char\\s*\\)", "flags": "m", "message": "Usa sizeof(char)." },
    { "id": "has-sizeof-int", "type": "regex", "pattern": "sizeof\\s*\\(\\s*int\\s*\\)", "flags": "m", "message": "Usa sizeof(int)." },
    { "id": "has-sizeof-float", "type": "regex", "pattern": "sizeof\\s*\\(\\s*float\\s*\\)", "flags": "m", "message": "Usa sizeof(float)." },
    { "id": "has-sizeof-double", "type": "regex", "pattern": "sizeof\\s*\\(\\s*double\\s*\\)", "flags": "m", "message": "Usa sizeof(double)." },
    { "id": "printf-format-zu", "type": "regex", "pattern": "%zu", "flags": "m", "message": "Usa %zu en algún printf para sizeof." }
  ]
}
```

### m2-301-e5-area

```json
{
  "version": 1,
  "exerciseId": "m2-301-e5-area",
  "title": "Ejercicio 5: área del círculo",
  "language": "c",
  "expectedOutput": "El área del círculo es: 78.54",
  "hints": [
    "Declara float radio = 5.0f;",
    "Declara float area;",
    "Calcula: area = 3.14159f * radio * radio;",
    "Imprime con %.2f"
  ],
  "normalize": { "stripComments": true, "collapseWhitespace": true },
  "rules": [
    { "id": "include-stdio", "type": "regex", "pattern": "#\\s*include\\s*<stdio\\.h>", "flags": "m", "message": "Incluye <stdio.h>." },
    { "id": "decl-radio", "type": "regex", "pattern": "\\bfloat\\s+radio\\s*=\\s*5\\.0f\\s*;", "flags": "m", "message": "Declara radio como 5.0f." },
    { "id": "decl-area", "type": "regex", "pattern": "\\bfloat\\s+area\\s*;", "flags": "m", "message": "Declara area." },
    { "id": "formula", "type": "regex", "pattern": "\\barea\\s*=\\s*3\\.14159f\\s*\\*\\s*radio\\s*\\*\\s*radio\\s*;", "flags": "m", "message": "Calcula area = 3.14159f * radio * radio." },
    { "id": "printf-area", "type": "regex", "pattern": "printf\\s*\\(\\s*\"[^\"]*%\\.2f[^\"]*\"\\s*,\\s*area\\s*\\)\\s*;", "flags": "m", "message": "Imprime area con %.2f." }
  ]
}
```

### m2-401-e2-define

```json
{
  "version": 1,
  "exerciseId": "m2-401-e2-define",
  "title": "Ejercicio 2: #define",
  "language": "c",
  "expectedOutput": "Horas en 3 semanas: 504",
  "hints": [
    "Usa: #define DIAS_SEMANA 7",
    "Usa HORAS_DIA = 24",
    "Calcula DIAS_SEMANA * 3 * HORAS_DIA"
  ],
  "normalize": { "stripComments": true, "collapseWhitespace": true },
  "rules": [
    { "id": "define", "type": "regex", "pattern": "#\\s*define\\s+DIAS_SEMANA\\s+7", "flags": "m", "message": "Define DIAS_SEMANA como 7." },
    { "id": "horas-dia", "type": "regex", "pattern": "\\bHORAS_DIA\\b", "flags": "m", "message": "Usa una constante HORAS_DIA." },
    { "id": "formula", "type": "regex", "pattern": "DIAS_SEMANA\\s*\\*\\s*3\\s*\\*\\s*HORAS_DIA", "flags": "m", "message": "Calcula DIAS_SEMANA * 3 * HORAS_DIA." },
    { "id": "printf", "type": "regex", "pattern": "printf\\s*\\(.*Horas en 3 semanas", "flags": "m", "message": "Imprime el resultado con printf." }
  ]
}
```

### m2-501-e2-overflow

```json
{
  "version": 1,
  "exerciseId": "m2-501-e2-overflow",
  "title": "Ejercicio 2: overflow",
  "language": "c",
  "expectedOutput": "Valor inicial (INT_MAX): 2147483647\nValor después de +1: -2147483648",
  "hints": [
    "Incluye <limits.h>",
    "Inicializa contador = INT_MAX",
    "Suma 1 y vuelve a imprimir"
  ],
  "normalize": { "stripComments": true, "collapseWhitespace": true },
  "rules": [
    { "id": "include-limits", "type": "regex", "pattern": "#\\s*include\\s*<limits\\.h>", "flags": "m", "message": "Incluye <limits.h>." },
    { "id": "init", "type": "regex", "pattern": "\\bint\\s+contador\\s*=\\s*INT_MAX\\s*;", "flags": "m", "message": "Inicializa contador con INT_MAX." },
    { "id": "sum", "type": "regex", "pattern": "contador\\s*=\\s*contador\\s*\\+\\s*1\\s*;", "flags": "m", "message": "Suma 1 al contador (contador = contador + 1)." },
    { "id": "printf", "type": "regex", "pattern": "printf\\s*\\(.*INT_MAX", "flags": "m", "message": "Imprime el valor inicial." }
  ]
}
```

### m2-601-e62-refactor (sugerencia)

Nota: este ejercicio es menos determinista; conviene diseñarlo para validar *mínimos* (p.ej. que aparezcan ciertos nombres) y dejar el resto como feedback manual.

```json
{
  "version": 1,
  "exerciseId": "m2-601-e62-refactor",
  "title": "Ejercicio 6.2: refactorización",
  "language": "c",
  "hints": [
    "Usa snake_case para variables",
    "Usa MAYUSCULAS_CON_GUION_BAJO para constantes"
  ],
  "normalize": { "stripComments": true, "collapseWhitespace": true },
  "rules": [
    { "id": "has-underscore-var", "type": "regex", "pattern": "\\b[a-z]+_[a-z0-9_]+\\b", "flags": "m", "message": "Incluye al menos una variable en snake_case." },
    { "id": "has-const-style", "type": "regex", "pattern": "\\b[A-Z]+_[A-Z0-9_]+\\b", "flags": "m", "message": "Incluye al menos un identificador en MAYUSCULAS_CON_GUION_BAJO." },
    { "id": "avoid-hyphen", "type": "notRegex", "pattern": "-", "flags": "m", "message": "No uses guiones '-' dentro de identificadores." }
  ]
}
```
