// js/components/navbar.js
import { modulosIndex } from "../../react-spa/public/data/modulosIndex.js";

// Puedes pasar el índice del módulo a mostrar (por defecto muestra todos)
export function Navbar({ moduloIndex = null } = {}) {
  let html = `
<style>
  .navbar-custom {
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
  background: #232946;
  color: #fff;
  padding: 1em 2em;
  border-radius: 12px;
  margin-bottom: 1em;
}
.navbar-card {
  background: #282a36;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(59,47,166,0.10);
  padding: 1em 1.2em;
  min-width: 220px;
  max-width: 260px;
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.navbar-card b {
  color: #eebbc3;
  font-size: 1.1em;
  margin-bottom: 0.5em;
  display: block;
}
.navbar-card ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
  width: 100%;
}
.navbar-card li {
  margin: 0.3em 0;
}
.navbar-card a {
  display: inline-block;
  background: #b8c1ec;
  color: #232946;
  border-radius: 6px;
  padding: 0.3em 0.7em;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 0.2em;
}
.navbar-card a:hover {
  background: #eebbc3;
  color: #232946;
}
</style>
Navegacion:
<div class="navbar-custom">`;
  //moduloIndex =4;
  let modulosToRender = modulosIndex;
  if (moduloIndex !== null && modulosIndex[moduloIndex]) {
    //modulosToRender = [modulosIndex[moduloIndex]];
    // borrar esta barbaridad y agregar lo de arriba
    modulosToRender = [modulosIndex[0],modulosIndex[1],modulosIndex[2]];
  }
  modulosToRender.forEach(mod => {
    html += `<div class="navbar-card"><b>${mod.modulo}</b><ul>`;
    mod.archivos.forEach(archivo => {
      html += `<li><a href="#/modulo/${mod.modulo}/${archivo.nombre}">${archivo.nombre}</a></li>`;
    });
    html += `</ul></div>`;
  });
  html += `</nav>`;
  return html;
}