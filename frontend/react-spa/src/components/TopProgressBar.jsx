export function TopProgressBar({ percent = 0, loading = false }) {
  const label = loading ? 'Cargando progreso…' : `Progreso: ${percent}%`;
  const width = loading ? 0 : percent;

  return (
    <div className="topbar">
      <div className="topbar-row">
        <div className="topbar-progress" aria-label={label}>
          <span className="topbar-progress-text">{label}</span>
          <div className="topbar-progress-track">
            <div className="topbar-progress-fill" style={{ width: `${width}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
