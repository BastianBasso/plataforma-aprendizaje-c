import { useState, useEffect } from 'react';

function getStoredUserId() {
  const raw = sessionStorage.getItem('userId');
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

function normalizeId(value) {
  return String(value);
}

export function AlternativeQuiz({ quiz, api, onSubmitted }) {
  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); 
  
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [correcciones, setCorrecciones] = useState({});

  useEffect(() => {
    async function fetchPreguntas() {
      if (!quiz?.lessonId) {
        setCargando(false);
        return;
      }
      try {
        const res = await fetch(`/api/quiz/alternativas/${quiz.lessonId}`);
        if (!res.ok) throw new Error('Error al cargar preguntas');
        
        const data = await res.json();
        setPreguntas(data);
      } catch (error) {
        console.error(error);
        setMessageType("warning");
        setMessage("Error al cargar el cuestionario desde la base de datos.");
      } finally {
        setCargando(false);
      }
    }
    fetchPreguntas();
  }, [quiz?.lessonId]);

  function setAnswer(questionId, optionId) {
    if (submitted) return; 
    setAnswers(prev => ({ ...prev, [normalizeId(questionId)]: optionId }));
  }

  async function handleSubmit(e) {
    e?.preventDefault?.();
    const usuarioId = getStoredUserId();

    if (!usuarioId) {
      setMessageType("warning");
      setMessage("Debes iniciar sesión para evaluar el cuestionario.");
      return;
    }

    const unanswered = preguntas.reduce((acc, q) => {
      return answers[normalizeId(q.pregunta_id)] === undefined ? acc + 1 : acc;
    }, 0);

    if (unanswered > 0) {
      setMessageType('warning');
      setMessage(`⚠️ Aún te faltan ${unanswered} preguntas por responder.`);
      return;
    }

    setSubmitting(true);
    setMessage("Enviando respuestas al servidor y evaluando...");
    setMessageType("info");

    try {
      let nuevasCorrecciones = {};

      for (const p of preguntas) {
        const preguntaId = p.pregunta_id;
        const alternativaIdSeleccionada = answers[normalizeId(preguntaId)];

        const res = await fetch('/api/respuesta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuarioId,
            preguntaId,
            alternativaIdSeleccionada
          })
        });
        
        const data = await res.json();
        // AHORA GUARDAMOS TAMBIÉN EL ID CORRECTO
        nuevasCorrecciones[normalizeId(preguntaId)] = {
            esCorrecta: data.esCorrecta,
            idCorrecta: data.idCorrecta ? normalizeId(data.idCorrecta) : null
        };
      }

      setCorrecciones(nuevasCorrecciones);

      const resNota = await fetch(`/api/acierto/${usuarioId}/${quiz.lessonId}`);
      const dataNota = await resNota.json();
      setResultadoFinal(dataNota.acierto);

      setSubmitted(true);
      setMessageType('success');
      setMessage(`¡Cuestionario completado y evaluado con éxito!`);

      if (typeof onSubmitted === 'function') {
        onSubmitted({ quizId: quiz.quizId });
      }

    } catch (error) {
      console.error(error);
      setMessageType("warning");
      setMessage("Hubo un error al comunicar con el servidor.");
    } finally {
      setSubmitting(false);
    }
  }

  const title = quiz?.title || 'Cuestionario de Evaluación';

  if (cargando) return <div className="alt-quiz-container">Conectando con la base de datos... ⏳</div>;
  if (preguntas.length === 0) return <div className="alt-quiz-container">No hay preguntas configuradas para esta lección.</div>;

  return (
    <section className="alt-quiz" aria-label={title}>
      <div className="alt-quiz-container">
        <h1 className="alt-quiz-title">{title}</h1>

        <form className="alt-quiz-form" onSubmit={handleSubmit}>
          {preguntas.map((q, idx) => {
            const qKey = normalizeId(q.pregunta_id);
            const selected = answers[qKey];

            return (
              <div key={qKey} className="question-item" data-question-id={qKey}>
                <p>
                  <strong>
                    {idx + 1}. {q.pregunta_texto}
                    {q.tipo_conocimiento ? <span className="alt-quiz-label"> [{q.tipo_conocimiento}]</span> : null}
                  </strong>
                </p>

                {(q.alternativas || []).map(opt => {
                  const optKey = normalizeId(opt.id);
                  const id = `q-${qKey}-opt-${optKey}`;

                  let cls = 'option-label';
                  
                  // LÓGICA VISUAL ACTUALIZADA
                  if (submitted && correcciones[qKey]) {
                    const info = correcciones[qKey];
                    const esOpcionSeleccionada = (selected !== undefined && normalizeId(selected) === optKey);
                    const esOpcionCorrectaReal = (info.idCorrecta === optKey);

                    if (esOpcionCorrectaReal) {
                        // Siempre revelamos la correcta de color verde
                        cls += ' correct';
                    } else if (esOpcionSeleccionada && !info.esCorrecta) {
                        // Si la seleccionó y estaba mala, se marca de rojo
                        cls += ' incorrect';
                    }
                  }

                  return (
                    <label key={optKey} className={cls} data-value={optKey} htmlFor={id}>
                      <input
                        id={id}
                        type="radio"
                        name={qKey}
                        value={optKey}
                        checked={selected !== undefined && normalizeId(selected) === optKey}
                        onChange={() => setAnswer(q.pregunta_id, opt.id)}
                        disabled={submitted} 
                      />
                      {' '}{opt.texto}
                    </label>
                  );
                })}
              </div>
            );
          })}

          {message ? (
            <div className={`quiz-message ${messageType || ''}`} role="status" aria-live="polite">
              {message}
            </div>
          ) : null}

          {!submitted && (
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Evaluando en el servidor…' : 'Enviar Respuestas'}
            </button>
          )}
        </form>
      </div>

      {resultadoFinal ? (
        <div style={{ marginTop: '1rem', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>
            <strong>Tu Calificación:</strong> {resultadoFinal.aciertos} correctas de {resultadoFinal.total_respuestas} 
            <span style={{ color: resultadoFinal.porcentaje_acierto >= 60 ? 'green' : 'red', marginLeft: '10px' }}>
              ({resultadoFinal.porcentaje_acierto}%)
            </span>
          </p>
        </div>
      ) : null}
    </section>
  );
}