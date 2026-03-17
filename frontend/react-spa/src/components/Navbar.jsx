import { Link } from 'react-router-dom';

export function Navbar({ modulosIndex }) {
  if (!modulosIndex) return null;

  return (
    <nav>
      <div className="navbar-custom">
        {modulosIndex.map((mod, modIndex) => (
          <div className="navbar-card" key={mod.modulo}>
            <b>{mod.modulo}</b>
            <ul>
              {mod.archivos.map((archivo, fileIndex) => (
                <li key={archivo.ruta}>
                  <Link to={`/m/${modIndex}/${fileIndex}`}>{archivo.nombre}</Link>
                </li>
              ))}
            </ul>
            <br />

          </div>

        ))}
      </div>
    </nav>
  );
}
