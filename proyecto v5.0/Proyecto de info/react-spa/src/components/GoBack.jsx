import { useNavigate } from 'react-router-dom';

export function GoBack() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'sticky', top: 80, zIndex: 10 }}>
      <button type="button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
}
