/**
 * Dominio puro: valida código contra un spec por patrones (includes/regex).
 */

import { normalizeCode } from './normalizeCode.js';

/**
 * @typedef {{
 *  id: string,
 *  type: 'includes'|'regex'|'notRegex',
 *  value?: string,
 *  pattern?: string,
 *  flags?: string,
 *  applyTo?: 'raw'|'normalized',
 *  required?: boolean,
 *  message?: string,
 * }} ValidationRule
 */

/**
 * @typedef {{
 *  version: 1,
 *  exerciseId: string,
 *  title?: string,
 *  language?: 'c',
 *  expectedOutput?: string,
 *  hints?: string[],
 *  normalize?: { stripComments?: boolean, collapseWhitespace?: boolean },
 *  maxCodeLength?: number,
 *  rules: ValidationRule[],
 * }} ProgrammingExerciseSpec
 */

/**
 * @param {any} obj
 * @returns {obj is ProgrammingExerciseSpec}
 */
export function isValidProgrammingExerciseSpec(obj) {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj.version === 1 &&
    typeof obj.exerciseId === 'string' &&
    Array.isArray(obj.rules)
  );
}

/**
 * @param {ProgrammingExerciseSpec} spec
 * @param {string} code
 * @returns {{ passed: boolean, normalized: string, results: Array<{ ruleId: string, passed: boolean, message: string }> }}
 */
export function validateCodeAgainstSpec(spec, code) {
  const raw = String(code ?? '');
  const normalized = normalizeCode(raw, {
    stripComments: spec?.normalize?.stripComments ?? true,
    collapseWhitespace: spec?.normalize?.collapseWhitespace ?? false,
  });

  const maxLen = Number(spec?.maxCodeLength ?? 20000);
  if (Number.isFinite(maxLen) && maxLen > 0 && raw.length > maxLen) {
    return {
      passed: false,
      normalized,
      results: [
        {
          ruleId: '__maxCodeLength',
          passed: false,
          message: `El código excede el máximo permitido (${maxLen} caracteres).`,
        },
      ],
    };
  }

  const results = [];

  for (const rule of spec.rules || []) {
    const ruleId = String(rule?.id ?? '');
    const required = rule?.required !== false;
    const applyTo = rule?.applyTo === 'raw' ? 'raw' : 'normalized';
    const text = applyTo === 'raw' ? raw : normalized;

    let passed = true;
    let regexConfigError = false;

    if (rule?.type === 'includes') {
      const value = String(rule?.value ?? '');
      passed = value ? text.includes(value) : true;
    } else if (rule?.type === 'regex') {
      const pattern = String(rule?.pattern ?? '');
      const flags = String(rule?.flags ?? 'm');
      try {
        const re = new RegExp(pattern, flags);
        passed = pattern ? re.test(text) : true;
      } catch {
        passed = false;
        regexConfigError = true;
      }
    } else if (rule?.type === 'notRegex') {
      const pattern = String(rule?.pattern ?? '');
      const flags = String(rule?.flags ?? 'm');
      try {
        const re = new RegExp(pattern, flags);
        passed = pattern ? !re.test(text) : true;
      } catch {
        passed = false;
        regexConfigError = true;
      }
    }

    const message = regexConfigError
      ? `Regla mal configurada: regex inválida (id: ${ruleId || '(sin id)'})`
      : String(rule?.message ?? (passed ? 'OK' : 'No cumple'));

    results.push({ ruleId: ruleId || '(sin id)', passed: !!passed, message });

    // Si la regla no es requerida, su fallo no bloquea.
    if (!required) continue;
  }

  const passed = (spec.rules || []).every(rule => {
    const required = rule?.required !== false;
    if (!required) return true;
    const ruleId = String(rule?.id ?? '(sin id)');
    const r = results.find(x => x.ruleId === (ruleId || '(sin id)'));
    return !!r?.passed;
  });

  return { passed, normalized, results };
}
