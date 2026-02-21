// scripts/generateModulosIndex.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../react-spa/public/Modulos');
const output = [];

function getModuloNumber(moduloDir) {
  const m = String(moduloDir ?? '').match(/modulo[-_\s]*(\d+)/i);
  return m ? Number(m[1]) : null;
}

function getArchivoNumber(fileName) {
  const m = String(fileName ?? '').match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

const moduloDirs = fs.readdirSync(baseDir)
  .filter((moduloDir) => {
    const moduloPath = path.join(baseDir, moduloDir);
    return fs.statSync(moduloPath).isDirectory();
  })
  .sort((a, b) => {
    const na = getModuloNumber(a);
    const nb = getModuloNumber(b);
    if (na != null && nb != null && na !== nb) return na - nb;
    if (na != null && nb == null) return -1;
    if (na == null && nb != null) return 1;
    return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' });
  });

moduloDirs.forEach((moduloDir) => {
  const moduloPath = path.join(baseDir, moduloDir);

  const archivos = fs.readdirSync(moduloPath)
    .filter(f => f.endsWith('.html'))
      return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' });
    })
    .map(f => ({
      nombre: f,
      ruta: `/Modulos/${moduloDir}/${f}`
    }));

  output.push({
    modulo: moduloDir,
    archivos
  });


fs.writeFileSync(
  path.join(__dirname, '../react-spa/public/data/modulosIndex.json'),
  JSON.stringify(output, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../js-spa/data/modulosIndex.json'),
  JSON.stringify(output, null, 2)
);
console.log('Índice generado!');