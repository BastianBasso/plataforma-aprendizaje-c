import { Navigate, Route, Routes } from 'react-router-dom';
import { CursosSelec } from './pages/CursosSelec.jsx';
import { ModuloViewer } from './pages/ModuloViewer.jsx';
import { useModulosIndex } from './hooks/useModulosIndex.js';
import { RequireAuth } from './components/RequireAuth.jsx';
import { Shell } from './components/Shell.jsx';
import { Landing } from './pages/Landing.jsx';
import { Login } from './pages/Login.jsx';
import { Registro } from './pages/Registro.jsx';
import { ForgotPassword } from './pages/ForgotPassword.jsx';
import { RestorePassword } from './pages/RestorePassword.jsx';
import { Inicio } from './pages/Inicio.jsx';
import { Admin } from './pages/Admin.jsx';
import { Configuracion } from './pages/Configuracion.jsx';
import './index.css';

export default function App() {
  const { data, loading, error } = useModulosIndex();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/restore-password" element={<RestorePassword />} />

      <Route
        path="/cursos"
        element={
          <RequireAuth>
            <Shell>
              <CursosSelec modulosIndex={data} loading={loading} error={error} />
            </Shell>
          </RequireAuth>
        }
      />
      <Route
        path="/m/:modIndex/:fileIndex"
        element={
          <RequireAuth>
            <Shell>
              <ModuloViewer modulosIndex={data} />
            </Shell>
          </RequireAuth>
        }
      />
      <Route
        path="/inicio"
        element={
          <RequireAuth>
            <Inicio />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        }
      />
      <Route
        path="/configuracion"
        element={
          <RequireAuth>
            <Configuracion />
          </RequireAuth>
        }
      />

      

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
