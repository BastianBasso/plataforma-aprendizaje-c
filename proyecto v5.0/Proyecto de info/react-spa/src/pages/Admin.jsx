import { Shell } from '../components/Shell.jsx';

export function Admin() {
  return (
    <Shell>
      <main className="page" aria-label="Admin">
        <div className="generic-card">
          <h1>Admin</h1>
          <p>Panel admin (migración mínima).</p>
        </div>
      </main>
    </Shell>
  );
}
