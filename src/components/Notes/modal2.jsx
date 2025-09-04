import { useState, useEffect } from 'react';
import '../../styles/modals/Modal2.css';
import { useFolder } from '../../context/FolderProvider';
import { useNotes } from '../../context/NotesProvider';
import EditNoteModal from '../NotesPages.jxs/EditNotePage';

function Modal2({ visible }) {
  const { folder_Id } = useFolder();
  const { getAllNotes, notes } = useNotes();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const notesPerPage = 6;

  // Función para formatear fechas
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Función para formatear horas
  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para recargar notas
  const fetchNotes = async () => {
    setLoading(true);
    try {
      await getAllNotes(folder_Id);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al cargar notas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal de edición
  const handleNoteClick = note => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedNote(null);
  };

  // Cargar notas cuando el modal se abre
  useEffect(() => {
    if (visible && folder_Id) {
      fetchNotes();
    }
  }, [visible, folder_Id]);

  // Calcular notas para la página actual
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes
    ? notes.slice(indexOfFirstNote, indexOfLastNote)
    : [];
  const totalPages = notes ? Math.ceil(notes.length / notesPerPage) : 0;

  // Cambiar página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Ir a página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Ir a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className='modal2-container'>
        <div className='modal2-content'>
          <div className='modal2-header'>
            <h2>Mis Notas</h2>
            <span className='folder-info'>Carpeta ID: {folder_Id}</span>
          </div>

          {/* Botón de recargar */}
          <div className='reload-section'>
            <button
              className='reload-btn'
              onClick={fetchNotes}
              disabled={loading}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className={loading ? 'spinning' : ''}
              >
                <path d='M23 4v6h-6M1 20v-6h6'></path>
                <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
              </svg>
              {loading ? 'Cargando...' : 'Recargar Notas'}
            </button>
          </div>

          {loading ? (
            <div className='loading-state'>
              <p>Cargando notas...</p>
            </div>
          ) : notes && notes.length > 0 ? (
            <>
              <div className='notes-grid'>
                {currentNotes.map(note => (
                  <div
                    key={note.id}
                    className='note-card'
                    style={{
                      '--note-color': note.color || '#667eea',
                      borderLeft: `4px solid ${note.color || '#667eea'}`,
                    }}
                    onClick={() => handleNoteClick(note)}
                  >
                    <div className='note-header'>
                      <h3>{note.title || 'Sin título'}</h3>
                    </div>

                    <div className='note-content'>
                      <p>{note.content || 'Sin contenido'}</p>
                    </div>

                    {/* Información adicional de la nota */}
                    <div className='note-info'>
                      <div className='note-dates'>
                        <span className='created-date'>
                          Creada: {formatDate(note.created_at)} a las{' '}
                          {formatTime(note.created_at)}
                        </span>
                        {note.updated_at && (
                          <span className='updated-date'>
                            Actualizada: {formatDate(note.updated_at)} a las{' '}
                            {formatTime(note.updated_at)}
                          </span>
                        )}
                      </div>

                      <div className='note-meta'>
                        <span className='note-id'>ID: {note.id}</span>
                        <span className='folder-id'>
                          Carpeta: {note.folder_id}
                        </span>
                      </div>
                    </div>

                    <div className='note-corner'></div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className='pagination'>
                  <button
                    className='pagination-btn prev-btn'
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M15 18l-6-6 6-6' />
                    </svg>
                    Anterior
                  </button>

                  <div className='pagination-numbers'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => (
                        <button
                          key={page}
                          className={`pagination-btn ${
                            currentPage === page ? 'active' : ''
                          }`}
                          onClick={() => paginate(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className='pagination-btn next-btn'
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M9 18l6-6-6-6' />
                    </svg>
                  </button>
                </div>
              )}

              {/* Información de paginación */}
              <div className='pagination-info'>
                <span>
                  Mostrando {indexOfFirstNote + 1}-
                  {Math.min(indexOfLastNote, notes.length)} de {notes.length}{' '}
                  notas
                </span>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
              </div>
            </>
          ) : (
            <div className='empty-state'>
              <p>No hay notas en esta carpeta.</p>
              <button
                className='reload-btn'
                onClick={fetchNotes}
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de edición */}
      <EditNoteModal
        visible={showEditModal}
        onClose={handleCloseEditModal}
        note={selectedNote}
        onSave={fetchNotes} // Recargar notas después de guardar
      />
    </>
  );
}

export default Modal2;
