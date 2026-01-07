// js/loader.js
export async function loadHTML(path) {
  const content = document.getElementById("contentJs");

  try {
    const response = await fetch(path);

    if (!response.ok) {
      content.innerHTML = "<h2>Error cargando contenido</h2>";
      return;
    }

    const html = await response.text();
    content.innerHTML = html;

  } catch (error) {
    content.innerHTML = "<h2>Error de conexión</h2>";
  }
}
