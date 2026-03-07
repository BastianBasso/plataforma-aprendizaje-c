/**
 * Specs locales para poder probar el feature SIN backend.
 *
 * Migración a backend:
 * - Copiar estos JSON tal cual a DB o a un servicio.
 * - Implementar GET /api/programming-exercises/spec/:exerciseId.
 */

import { M2_201_SPECS } from './localSpecs/m2-201.js';
import { M2_301_SPECS } from './localSpecs/m2-301.js';
import { M2_401_SPECS } from './localSpecs/m2-401.js';
import { M2_501_SPECS } from './localSpecs/m2-501.js';
import { M2_601_SPECS } from './localSpecs/m2-601.js';

const OTHER_SPECS = {
};

export const LOCAL_SPECS = {
  ...M2_201_SPECS,
  ...M2_301_SPECS,
  ...M2_401_SPECS,
  ...M2_501_SPECS,
  ...M2_601_SPECS,
  ...OTHER_SPECS,
};
