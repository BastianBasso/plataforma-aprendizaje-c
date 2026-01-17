import { HeaderUsuario } from './HeaderUsuario.jsx';
import { Footer } from './Footer.jsx';

export function Shell({ children }) {
  return (
    <div className="app-shell">
      <HeaderUsuario />
      <div className="app-shell-body">{children}</div>
      <Footer />
    </div>
  );
}
