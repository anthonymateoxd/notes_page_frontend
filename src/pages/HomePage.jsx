import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [animate, setAnimate] = useState(false);

  const naviate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      naviate('/profile');
    }
  });

  useEffect(() => {
    setAnimate(true);

    // Efectos de interacción con el mouse
    const handleMouseMove = e => {
      const cards = document.querySelectorAll('.feature-card, .use-case-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='home-page'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-background'>
          <div className='floating-shape shape-1'></div>
          <div className='floating-shape shape-2'></div>
          <div className='floating-shape shape-3'></div>
          <div className='floating-shape shape-4'></div>
        </div>

        <div className={`hero-content ${animate ? 'animate-in' : ''}`}>
          <div className='hero-text'>
            <h1 className='hero-title'>
              <span className='text-gradient'>Organiza</span> tus ideas y
              <span className='text-gradient'> conocimientos</span>
            </h1>
            <p className='hero-subtitle'>
              La herramienta todo-en-uno para capturar, organizar y compartir
              tus apuntes.
            </p>

            <div className='hero-cta'>
              <button
                className='cta-button primary'
                onClick={() => naviate('/login-page')}
              >
                Comenzar ahora
              </button>
              <button className='cta-button secondary'>Ver demostración</button>
            </div>
          </div>

          <div className='hero-visual'>
            <div className='floating-notebook'>
              <div className='page'></div>
              <div className='page'></div>
              <div className='page'></div>
              <div className='cover'></div>
            </div>

            <div className='decorative-elements'>
              <div className='decoration pencil'></div>
              <div className='decoration pin'></div>
              <div className='decoration highlighter'></div>
              <div className='decoration paper-clip'></div>
              <div className='decoration tape'></div>
            </div>
          </div>
        </div>

        <div className='scrolldown-indicator'>
          <span>Desplázate para descubrir</span>
          <div className='scroll-line'></div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className='use-cases-section'>
        <div className='container'>
          <h2>
            Perfecto para{' '}
            <span className='text-gradient'>cualquier situación</span>
          </h2>

          <div className='use-cases-grid'>
            <div className='use-case-card'>
              <div className='use-case-header'>
                <div className='use-case-icon students'></div>
                <h3>Estudiantes</h3>
              </div>
              <p>
                Apuntes de clase, resúmenes, planificación de estudios y
                preparación de exámenes.
              </p>
              <ul>
                <li>Organiza por materias</li>
                <li>Resaltado importante</li>
                <li>Tarjetas de estudio</li>
              </ul>
            </div>

            <div className='use-case-card'>
              <div className='use-case-header'>
                <div className='use-case-icon professionals'></div>
                <h3>Profesionales</h3>
              </div>
              <p>
                Notas de reuniones, ideas de proyectos, documentación y
                seguimiento de tareas.
              </p>
              <ul>
                <li>Integración con calendario</li>
                <li>Plantillas profesionales</li>
                <li>Compartir con equipo</li>
              </ul>
            </div>

            <div className='use-case-card'>
              <div className='use-case-header'>
                <div className='use-case-icon creators'></div>
                <h3>Creativos</h3>
              </div>
              <p>
                Lluvia de ideas, bosquejos, storyboards y organización de
                proyectos creativos.
              </p>
              <ul>
                <li>Dibujo integrado</li>
                <li>Mood boards</li>
                <li>Inspiración visual</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='testimonials-section'>
        <div className='container'>
          <h2>
            Lo que dicen nuestros{' '}
            <span className='text-gradient'>usuarios</span>
          </h2>

          <div className='testimonials-grid'>
            <div className='testimonial-card'>
              <div className='testimonial-content'>
                <div className='stars'>★★★★★</div>
                <p>
                  "Esta app ha transformado completamente cómo organizo mis
                  estudios. ¡Ahora puedo encontrar cualquier apunte en
                  segundos!"
                </p>
              </div>
              <div className='testimonial-author'>
                <div className='avatar'></div>
                <div className='author-info'>
                  <h4>María López</h4>
                  <span>Estudiante de Medicina</span>
                </div>
              </div>
            </div>

            <div className='testimonial-card'>
              <div className='testimonial-content'>
                <div className='stars'>★★★★★</div>
                <p>
                  "Como diseñador freelance, necesito capturar ideas
                  rápidamente. Esta herramienta es perfecta para organizar mi
                  flujo de trabajo creativo."
                </p>
              </div>
              <div className='testimonial-author'>
                <div className='avatar'></div>
                <div className='author-info'>
                  <h4>Javier Mendoza</h4>
                  <span>Diseñador UX/UI</span>
                </div>
              </div>
            </div>

            <div className='testimonial-card'>
              <div className='testimonial-content'>
                <div className='stars'>★★★★☆</div>
                <p>
                  "La colaboración en tiempo real ha mejorado nuestra
                  productividad en equipo. Perfecto para nuestras reuniones y
                  seguimiento de proyectos."
                </p>
              </div>
              <div className='testimonial-author'>
                <div className='avatar'></div>
                <div className='author-info'>
                  <h4>Ana Rodríguez</h4>
                  <span>Gerente de Proyecto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='final-cta'>
        <div className='container'>
          <h2>
            Comienza a organizar tus{' '}
            <span className='text-gradient'>ideas hoy mismo</span>
          </h2>
          <p>
            Únete a miles de usuarios que ya están transformando cómo capturan y
            organizan su conocimiento.
          </p>

          <div className='cta-buttons'>
            <button className='cta-button primary large'>
              Crear cuenta gratuita
            </button>
            <button className='cta-button secondary large'>
              Más información
            </button>
          </div>

          <div className='decorative-notes'>
            <div className='note'></div>
            <div className='note'></div>
            <div className='note'></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
