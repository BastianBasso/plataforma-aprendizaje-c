// scripts/generateModulosIndex.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../proyecto/dist/protected_html/Modulos');
const output = [];

fs.readdirSync(baseDir).forEach(moduloDir => {
  const moduloPath = path.join(baseDir, moduloDir);
  if (fs.statSync(moduloPath).isDirectory()) {
    const archivos = fs.readdirSync(moduloPath)
      .filter(f => f.endsWith('.html'))
      .map(f => ({
        nombre: f,
        ruta: `/Modulos/${moduloDir}/${f}`
      }));
    output.push({
      modulo: moduloDir,
      archivos
    });
  }
});

fs.writeFileSync(
  path.join(__dirname, '../js-spa/data/modulosIndex.js'),
  'export const modulosIndex = ' + JSON.stringify(output, null, 2) + ';'
);

fs.writeFileSync(
  path.join(__dirname, '../js-spa/data/modulosIndex.json'),
  JSON.stringify(output, null, 2)
);
console.log('Índice generado!');