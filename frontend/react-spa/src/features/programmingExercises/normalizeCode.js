/**
 * Normalización liviana para validación por patrones.
 * No intenta parsear C; solo mejora tolerancia a espacios/comentarios.
 */

function stripBlockComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '');
}

function stripLineComments(text) {
  return text.replace(/\/\/.*$/gm, '');
}

/**
 * @param {string} code
 * @param {{ stripComments?: boolean, collapseWhitespace?: boolean }=} options
 */
export function normalizeCode(code, options) {
  let out = String(code ?? '');

  if (options?.stripComments) {
    out = stripBlockComments(out);
    out = stripLineComments(out);
  }

  if (options?.collapseWhitespace) {
    out = out.replace(/\s+/g, ' ').trim();
  }

  return out;
}
