// js/router.js
import { modulosIndex } from "./data/modulosIndex.js";
import { loadHTML } from "./loader.js";



function loadDynamicCSS(href) {
  // Elimina el CSS anterior si existe
  const oldLink = document.getElementById("dynamic-css");
  if (oldLink) oldLink.remove();

  // Crea el nuevo <link>
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.id = "dynamic-css";
  document.head.appendChild(link);
}





export function router() {
  const hash = location.hash;
  // Busca hashes del tipo #/modulo/modulo-1-Fundamentos-Introduccion/100-Introduccion-a-la-programacion-y-Algoritmos.html
  const match = hash.match(/^#\/modulo\/([^\/]+)\/(.+)$/);
  if (match) {
    const [ , modulo, archivo ] = match;
    const mod = modulosIndex.find(m => m.modulo === modulo);
    if (mod) {
      const file = mod.archivos.find(a => a.nombre === archivo);
      

      // Prueba de carga
      console.log(file);

      //css especifico
      if (file.ruta.includes("")) {
        loadDynamicCSS("/assets/content-01sust.css");
        console.log("css si ");
      } else {
        console.log("css no ");
        // Si no es ejercicios, elimina el CSS dinámico si existe
        const oldLink = document.getElementById("dynamic-css");
        if (oldLink) oldLink.remove();
      }





      if (file) {
        loadHTML(file.ruta);
        return;
      }
    }
    document.getElementById("contentJs").innerHTML = "<h2>Contenido no encontrado</h2>";
    return;
  }

  
  /*
  // Otros casos (inicio, login, etc)
  if (hash === "#/inicio") {
    document.getElementById("content").innerHTML = "<h2>Bienvenido a la plataforma</h2>";
    return;
  }
  if (hash === "#/login") {
    loadHTML("./login.html");
    return;
  }
  */
  document.getElementById("contentJs").innerHTML = "<h2>Seleccione un módulo</h2>";
}