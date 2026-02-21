export function headerUsuario() {
  let html = `
  <header class="header-c px-6 py-4 flex items-center justify-between" >
    <div class="flex items-center">
      <div class="logo-c" aria-label="Logo C">C</div>
      <span class="font-bold text-blue-700 text-lg tracking-wide">Plataforma C</span>
    </div>
    <div class="user-profile">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Usuario</span>
    </div>
  </header>
  `;
  
  return html;
}