import { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext';

export function QuizViewer({ leccionId }) {
  const { user } = useSession();
  const [preguntas, setPreguntas] = useState([]);
  const [feedback, setFeedback] = useState({}); 
  const [cargando, setCargando] = useState(true);

  // 1. Cargar las preguntas desde el Backend
  useEffect(() => {
    async function fetchPreguntas() {
      try {
        const response = await fetch(`/api/quiz/alternativas/${leccionId}`);
        if (!response.ok) throw new Error('Error al cargar el quiz');
        
        const data = await response.json();
        setPreguntas(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    }

    if (leccionId) {
      fetchPreguntas();
    }
  }, [leccionId]);

  // 2. Enviar la respuesta del usuario al Backend
  const handleSeleccionar = async (preguntaId, alternativaId) => {
    // Si ya respondió esta pregunta, evitamos que haga clic de nuevo (opcional)
    if (feedback[preguntaId] !== undefined) return;

    try {
      const response = await fetch('/api/progreso/respuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: user.id, // O user.usuario_id, dependiendo de cómo lo guarde tu contexto
          preguntaId: preguntaId,
          alternativaIdSeleccionada: alternativaId
        })
      });
      
      const data = await response.json();
      
      // Guardamos el resultado para pintar el botón de verde o rojo
      setFeedback(prev => ({
        ...prev,
        [preguntaId]: data.esCorrecta
      }));

    } catch (error) {
      console.error("Error al registrar respuesta:", error);
    }
  };

  if (cargando) return <div>Cargando evaluación... ⏳</div>;
  if (preguntas.length === 0) return <div>No hay preguntas configuradas para esta lección.</div>;

  return (
    <div className="quiz-viewer">
      <h3>Evaluación de Conocimientos</h3>
      
      {preguntas.map((pregunta, index) => (
        <div key={pregunta.pregunta_id} className="pregunta-card" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <p><strong>{index + 1}. {pregunta.pregunta_texto}</strong></p>
          
          <div className="alternativas-lista" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
            {pregunta.alternativas.map((alt) => {
              const yaRespondio = feedback[pregunta.pregunta_id] !== undefined;
              let colorFondo = '#f0f0f0'; // Color por defecto

              if (yaRespondio) {
                // Solo si es una respuesta correcta en general, o si necesitamos marcar la que falló
                if (feedback[pregunta.pregunta_id] === true) {
                   colorFondo = '#d4edda'; // Verde éxito
                } else if (feedback[pregunta.pregunta_id] === false) {
                   colorFondo = '#f8d7da'; // Rojo error
                }
              }

              return (
                <button 
                  key={alt.id}
                  onClick={() => handleSeleccionar(pregunta.pregunta_id, alt.id)}
                  style={{
                    padding: '10px',
                    textAlign: 'left',
                    cursor: yaRespondio ? 'default' : 'pointer',
                    backgroundColor: colorFondo,
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  disabled={yaRespondio}
                >
                  {alt.texto}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}