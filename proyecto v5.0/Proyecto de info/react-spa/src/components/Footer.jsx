import { useEffect, useMemo, useState } from "react";

export function Footer() {
  const [isNarrow, setIsNarrow] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(max-width: 900px)");

    const apply = () => setIsNarrow(media.matches);
    apply();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }

    // Fallback navegadores antiguos
    media.addListener(apply);
    return () => media.removeListener(apply);
  }, []);

  const styles = useMemo(() => {
    return {
      footer: {
        background: "linear-gradient(90deg,#49b3af,#25a6d7 90%)",
        color: "#fff",
        fontFamily: "Roboto, Arial, sans-serif",
        padding: "36px 0 18px 0",
        marginTop: 48,
      },

      inner: {
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: isNarrow ? 18 : 32,
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0 32px",
        flexDirection: isNarrow ? "column" : "row",
      },

      footerLogo: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: "1.5rem",
        fontWeight: 800,
        letterSpacing: "1px",
      },

      logoBox: {
        background: "linear-gradient(135deg,#162047 60%, #3b2fa6 100%)",
        color: "#fff",
        fontWeight: 900,
        fontSize: "1.3rem",
        borderRadius: 8,
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(59,47,166,0.08)",
        flex: "0 0 auto",
      },

      linksBlock: {
        minWidth: 180,
      },

      linksTitle: {
        fontWeight: 700,
        marginBottom: 8,
      },

      link: (isHovered) => ({
        color: isHovered ? "#fff" : "#e0f2fe",
        display: "block",
        marginBottom: 8,
        textDecoration: "none",
        fontSize: "1rem",
        transition: "color 0.2s",
      }),

      copyright: {
        textAlign: "center",
        color: "#bae6fd",
        fontSize: "0.95rem",
        marginTop: 24,
      },
    };
  }, [isNarrow]);

  const links = [
    { label: "Inicio", href: "#" },
    { label: "Contenidos", href: "#" },
    { label: "Sobre nosotros", href: "#" },
    { label: "Información de contacto", href: "#" },
  ];

  return (
    <footer className="app-footer" aria-label="Footer" style={styles.footer}>
      <div className="app-footer-inner" style={styles.inner}>
        <div style={styles.footerLogo}>
          <div style={styles.logoBox} aria-label="Logo C">
            C
          </div>
          <span>Plataforma C</span>
        </div>

        <div style={styles.linksBlock}>
          <div style={styles.linksTitle}>Enlaces rápidos</div>
          {links.map((l) => {
            const isHovered = hoveredLink === l.label;
            return (
              <a
                key={l.label}
                href={l.href}
                style={styles.link(isHovered)}
                onMouseEnter={() => setHoveredLink(l.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/*
          Si quieres la sección Newsletter (estaba comentada en tu HTML),
          te la agrego también en inline styles.
        */}
      </div>

      <div style={styles.copyright}>
        <small>© 2025 Plataforma C. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}

/*
export function Footer() {
  return (
    <footer className="app-footer" aria-label="Footer">
      <div className="app-footer-inner">
        <small>Plataforma de aprendizaje de Lenguaje C</small>
      </div>
    </footer>
  );
}
*/
/**
 * 
 * 

<footer class="footer-c">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="logo-c" style="width:32px;height:32px;font-size:1.3rem;">C</div>
        Plataforma C
      </div>
      <div class="footer-links">
        <div class="font-bold mb-2">Enlaces rápidos</div>
        <a href="#">Inicio</a>
        <a href="#">Contenidos</a>
        <a href="#">Sobre nosotros</a>
        <a href="#">Información de contacto</a>
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
 * 
 */