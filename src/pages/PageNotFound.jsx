import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Animaciones para los elementos post-it
    const timer = setTimeout(() => {
      const notes = document.querySelectorAll('.post-it-note');
      notes.forEach((note, index) => {
        setTimeout(() => {
          note.classList.add('animate-in');
        }, index * 200);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='not-found-page'>
      {/* Fondo con elementos decorativos */}
      <div className='not-found-background'>
        <div className='floating-paper paper-1'></div>
        <div className='floating-paper paper-2'></div>
        <div className='floating-paper paper-3'></div>
        <div className='floating-pencil'></div>
        <div className='floating-tape'></div>
      </div>

      <div className='not-found-container'>
        {/* Notas post-it animadas */}
        <div className='post-it-note note-1'>
          <div className='note-content'>
            <h3>¡Ups!</h3>
            <p>Parece que esta página se ha escapado</p>
          </div>
        </div>

        <div className='post-it-note note-2'>
          <div className='note-content'>
            <h3>404</h3>
            <p>Página no encontrada</p>
          </div>
        </div>

        <div className='post-it-note note-3'>
          <div className='note-content'>
            <h3>¿Qué hacer?</h3>
            <p>Revisa la URL o vuelve al inicio</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className='not-found-content'>
          <div className='error-number'>
            <span className='number-4'>4</span>
            <span className='number-0'>0</span>
            <span className='number-4-2'>4</span>
          </div>

          <h1>¡Página no encontrada!</h1>
          <p>
            Lo sentimos, pero la página que buscas no existe o ha sido movida.
          </p>

          <div className='not-found-actions'>
            <button
              className='home-button'
              onClick={handleGoHome}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                <polyline points='9 22 9 12 15 12 15 22'></polyline>
              </svg>
              Volver al Inicio
            </button>

            <button
              className='contact-button'
              onClick={() =>
                (window.location.href = 'mailto:soporte@notasapp.com')
              }
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
                <polyline points='22,6 12,13 2,6'></polyline>
              </svg>
              Contactar Soporte
            </button>
          </div>
        </div>

        {/* Notas adicionales */}
        <div className='post-it-note note-4'>
          <div className='note-content'>
            <h3>Tip</h3>
            <p>Revisa tu conexión a internet</p>
          </div>
        </div>

        <div className='post-it-note note-5'>
          <div className='note-content'>
            <h3>¿Perdido?</h3>
            <p>No te preocupes, todos nos perdemos a veces</p>
          </div>
        </div>
      </div>

      {/* Elemento decorativo final */}
      <div className='floating-clip'></div>
    </div>
  );
}

export default PageNotFound;
