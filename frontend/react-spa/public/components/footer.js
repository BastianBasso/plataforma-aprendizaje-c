
export function Footer() {
  return `
<style>
 
    .header-c { background: #fff; border-bottom: 1px solid #e5e7eb; }
    .logo-c {
      background: linear-gradient(135deg,#162047 60%, #3b2fa6 100%);
      color: #fff;
      font-weight: 900;
      font-size: 1.7rem;
      border-radius: 8px;
      width: 38px; height: 38px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(59,47,166,0.08);
      margin-right: 10px;
    }
    .user-profile {
      display: flex; align-items: center; gap: 10px;
      background: #e0e7ff;
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 1rem;
      color: #3730a3;
      font-weight: 600;
    }
    .content-title {
      color: #3730a3;
      font-size: 2.2rem;
      font-weight: 800;
      margin: 36px auto 10px auto;
      text-align: center;
      letter-spacing: 1px;
    }
    .progress-bar-container {
      max-width: 700px;
      margin: 0 auto 32px auto;
      background: #e0e7ff;
      border-radius: 999px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 1.1rem;
      font-weight: 600;
      color: #3730a3;
      box-shadow: 0 2px 8px rgba(59,47,166,0.08);
    }
    .progress-bar {
      flex: 1;
      height: 16px;
      background: #c7d2fe;
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg,#2563eb,#3b2fa6);
      border-radius: 999px;
      width: 12%;
      transition: width 0.4s;
    }
    .modules-list {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .module-card {
      background: linear-gradient(135deg,#2563eb 60%, #3b2fa6 100%);
      color: #fff;
      border-radius: 18px;
      box-shadow: 0 6px 24px rgba(59,47,166,0.10);
      padding: 0;
      display: flex;
      align-items: stretch;
      position: relative;
      overflow: hidden;
      min-height: 140px;
    }
    .module-progress-bar {
      width: 18px;
      background: #a5b4fc;
      display: flex;
      align-items: flex-end;
      border-radius: 18px 0 0 18px;
      margin-right: 0;
      position: relative;
    }
    .module-progress-fill {
      width: 100%;
      background: #3730a3;
      border-radius: 18px 0 0 18px;
      transition: height 0.4s;
    }
    .module-content {
      flex: 1;
      padding: 24px 32px 24px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .module-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .module-desc {
      font-size: 1rem;
      color: #dbeafe;
      margin-bottom: 10px;
    }
    .module-topics {
      margin-left: 1.2em;
      margin-bottom: 10px;
      color: #e0e7ff;
      font-size: 0.98rem;
    }
    .module-card .start-btn {
      align-self: flex-end;
      background: linear-gradient(90deg,#4f46e5,#2563eb);
      color: #fff;
      font-weight: 700;
      border: none;
      border-radius: 999px;
      padding: 10px 28px;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(37,99,235,0.18);
      transition: background 0.2s;
      cursor: pointer;
      margin-top: 8px;
    }
    .module-card .start-btn:hover {
      background: linear-gradient(90deg,#2563eb,#4f46e5);
    }
    .footer-c {
      background: linear-gradient(90deg,#49b3af,#25a6d7 90%);
      color: #fff;
      padding: 36px 0 18px 0;
      margin-top: 48px;
    }
    .footer-c .footer-content {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 32px;
    }
    .footer-c .footer-logo {
      display: flex; align-items: center; gap: 10px;
      font-size: 1.5rem; font-weight: 800;
      letter-spacing: 1px;
    }
    .footer-c .footer-links, .footer-c .footer-newsletter {
      min-width: 180px;
    }
    .footer-c .footer-links a {
      color: #e0f2fe;
      display: block;
      margin-bottom: 8px;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.2s;
    }
    .footer-c .footer-links a:hover {
      color: #fff;
    }
    .footer-c .newsletter-form {
      display: flex; gap: 8px; margin-top: 8px;
    }
    .footer-c .newsletter-form input[type="email"] {
      border-radius: 999px 0 0 999px;
      border: none;
      padding: 8px 16px;
      font-size: 1rem;
      outline: none;
      min-width: 0;
    }
    .footer-c .newsletter-form button {
      border-radius: 0 999px 999px 0;
      border: none;
      background: #2563eb;
      color: #fff;
      font-weight: 700;
      padding: 8px 18px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .footer-c .newsletter-form button:hover {
      background: #1e40af;
    }
    .footer-c .copyright {
      text-align: center;
      color: #bae6fd;
      font-size: 0.95rem;
      margin-top: 24px;
    }
    @media (max-width: 900px) {
      .footer-c .footer-content { flex-direction: column; gap: 18px; align-items: flex-start; }
      .content-c, .hero-c { padding: 24px 10px; }
    }
    @media (max-width: 900px) {
      .modules-list { padding: 0 8px; }
      .module-content { padding: 18px 10px 18px 10px; }
      .content-title { font-size: 1.5rem; }
    }
</style>
   

<footer class="footer-c">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="logo-c" style="width:32px;height:32px;font-size:1.3rem;">C</div>
        Plataforma C
      </div>
      <div class="footer-links">
        <div class="font-bold mb-2">Enlaces rapidos </div>
        <a href="#">Inicio</a>
        <a href="#">Contenidos</a>
        <a href="#">Sobre nosotros</a>
        <a href="#">Informacion de contacto</a>
      </div>
      
      <!--
      <div class="footer-newsletter">
        <div class="font-bold mb-2">Newsletter</div>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('¡Gracias por suscribirte!');">
            <input type="email" placeholder="Tu correo electrónico" required>
            <button type="submit">Get Newsletter</button>
          </form>
        </div>
      </div>
      -->
      
    <div class="copyright mt-6">&copy; 2025 Plataforma C. Todos los derechos reservados.</div>
  </footer>
    `;
}