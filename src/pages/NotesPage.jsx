import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function NotesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const folderName = searchParams.get('folderName') || 'Todas las notas';
  const folderColor = searchParams.get('folderColor') || '#7C3AED';

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Reunión de equipo',
      content:
        'Discutir los nuevos requisitos del proyecto y asignar tareas para la próxima sprint.',
      folder: 'Trabajo',
      createdAt: '2023-10-15T10:30:00',
      updatedAt: '2023-10-20T14:45:00',
      tags: ['trabajo', 'reunión', 'proyecto'],
      color: '#FFFD8C',
    },
    {
      id: 2,
      title: 'Ideas para vacaciones',
      content:
        'Posibles destinos: Bali, Costa Rica o Italia. Presupuesto máximo: $3000 por persona.',
      folder: 'Personal',
      createdAt: '2023-09-20T16:20:00',
      updatedAt: '2023-10-18T11:15:00',
      tags: ['viajes', 'personal', 'vacaciones'],
      color: '#9EE7FF',
    },
    {
      id: 3,
      title: 'Resumen de React Hooks',
      content:
        'useState: para estado local\nuseEffect: para efectos secundarios\nuseContext: para contexto global\nuseReducer: para estado complejo',
      folder: 'Estudios',
      createdAt: '2023-10-05T09:00:00',
      updatedAt: '2023-10-22T17:30:00',
      tags: ['react', 'programación', 'estudio'],
      color: '#B4FF9E',
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [currentNote, setCurrentNote] = useState({
    title: '',
    content: '',
    tags: [],
    color: '#FFFD8C',
  });
  const [newTag, setNewTag] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const colorOptions = [
    '#FFFD8C',
    '#9EE7FF',
    '#B4FF9E',
    '#FF9E9E',
    '#D9BCFF',
    '#FFD580',
  ];

  useEffect(() => {
    // Animación de entrada para las notas
    const timer = setTimeout(() => {
      const noteElements = document.querySelectorAll('.note-card');
      noteElements.forEach((note, index) => {
        setTimeout(() => {
          note.classList.add('animate-in');
        }, index * 100);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [notes, viewMode]);

  // Encontrar la nota que se está editando
  const editingNote = editingNoteId
    ? notes.find(note => note.id === editingNoteId)
    : null;

  const handleCreateNote = () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) return;

    const newNote = {
      id: notes.length + 1,
      title: currentNote.title,
      content: currentNote.content,
      folder: folderName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: currentNote.tags,
      color: currentNote.color,
    };

    setNotes([newNote, ...notes]);
    resetForm();
    setIsCreating(false);
  };

  const handleUpdateNote = () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) return;

    const updatedNotes = notes.map(note =>
      note.id === editingNoteId
        ? {
            ...note,
            title: currentNote.title,
            content: currentNote.content,
            tags: currentNote.tags,
            color: currentNote.color,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    resetForm();
    setEditingNoteId(null);
  };

  const handleDeleteNote = noteId => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
    }
  };

  const startEditing = note => {
    setEditingNoteId(note.id);
    setCurrentNote({
      title: note.title,
      content: note.content,
      tags: [...note.tags],
      color: note.color,
    });
  };

  const resetForm = () => {
    setCurrentNote({
      title: '',
      content: '',
      tags: [],
      color: '#FFFD8C',
    });
    setNewTag('');
  };

  const addTag = () => {
    if (newTag.trim() && !currentNote.tags.includes(newTag.trim())) {
      setCurrentNote({
        ...currentNote,
        tags: [...currentNote.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = tagToRemove => {
    setCurrentNote({
      ...currentNote,
      tags: currentNote.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='notes-page'>
      {/* Header con el nombre de la carpeta */}
      <div
        className='notes-header'
        style={{ backgroundColor: folderColor }}
      >
        <div className='header-content'>
          <button
            className='back-button'
            onClick={() => navigate('/profile')}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M19 12H5M12 19l-7-7 7-7' />
            </svg>
          </button>
          <h1>{folderName}</h1>
          <p>{notes.length} notas</p>
        </div>
      </div>

      <div className='notes-container'>
        {/* Controles */}
        <div className='notes-controls'>
          <div className='view-toggle'>
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <rect
                  x='3'
                  y='3'
                  width='7'
                  height='7'
                ></rect>
                <rect
                  x='14'
                  y='3'
                  width='7'
                  height='7'
                ></rect>
                <rect
                  x='14'
                  y='14'
                  width='7'
                  height='7'
                ></rect>
                <rect
                  x='3'
                  y='14'
                  width='7'
                  height='7'
                ></rect>
              </svg>
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <line
                  x1='8'
                  y1='6'
                  x2='21'
                  y2='6'
                ></line>
                <line
                  x1='8'
                  y1='12'
                  x2='21'
                  y2='12'
                ></line>
                <line
                  x1='8'
                  y1='18'
                  x2='21'
                  y2='18'
                ></line>
                <line
                  x1='3'
                  y1='6'
                  x2='3.01'
                  y2='6'
                ></line>
                <line
                  x1='3'
                  y1='12'
                  x2='3.01'
                  y2='12'
                ></line>
                <line
                  x1='3'
                  y1='18'
                  x2='3.01'
                  y2='18'
                ></line>
              </svg>
            </button>
          </div>

          <button
            className='create-note-btn'
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <line
                x1='12'
                y1='5'
                x2='12'
                y2='19'
              ></line>
              <line
                x1='5'
                y1='12'
                x2='19'
                y2='12'
              ></line>
            </svg>
            Nueva Nota
          </button>
        </div>

        {/* Modal de creación/edición de nota */}
        {(isCreating || editingNoteId) && (
          <div className='note-modal'>
            <div className='modal-content'>
              <h3>{editingNoteId ? 'Editar Nota' : 'Crear Nueva Nota'}</h3>

              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Título de la nota'
                  value={currentNote.title}
                  onChange={e =>
                    setCurrentNote({ ...currentNote, title: e.target.value })
                  }
                />
              </div>

              <div className='input-group'>
                <textarea
                  placeholder='Escribe tu contenido aquí...'
                  value={currentNote.content}
                  onChange={e =>
                    setCurrentNote({ ...currentNote, content: e.target.value })
                  }
                  rows='6'
                ></textarea>
              </div>

              <div className='tags-editor'>
                <p>Etiquetas:</p>
                <div className='tags-input-container'>
                  <div className='existing-tags'>
                    {currentNote.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='tag'
                      >
                        #{tag}
                        <button
                          className='remove-tag'
                          onClick={() => removeTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className='new-tag-input'>
                    <input
                      type='text'
                      placeholder='Añadir etiqueta (presiona Enter)'
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                    />
                    <button
                      className='add-tag-btn'
                      onClick={addTag}
                      disabled={!newTag.trim()}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className='color-picker'>
                <p>Color de la nota:</p>
                <div className='color-options'>
                  {colorOptions.map((color, index) => (
                    <div
                      key={index}
                      className={`color-option ${
                        currentNote.color === color ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setCurrentNote({ ...currentNote, color })}
                    ></div>
                  ))}
                </div>
              </div>

              <div className='modal-actions'>
                <button
                  className='cancel-btn'
                  onClick={() => {
                    resetForm();
                    setIsCreating(false);
                    setEditingNoteId(null);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className='save-btn'
                  onClick={editingNoteId ? handleUpdateNote : handleCreateNote}
                  disabled={
                    !currentNote.title.trim() || !currentNote.content.trim()
                  }
                >
                  {editingNoteId ? 'Actualizar' : 'Crear'} Nota
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid/Lista de notas */}
        <div className={`notes-grid ${viewMode}`}>
          {notes.map(note => (
            <div
              key={note.id}
              className='note-card'
              style={{ '--note-color': note.color }}
            >
              <div className='note-header'>
                <h3>{note.title}</h3>
                <div className='note-actions'>
                  <button
                    className='edit-btn'
                    onClick={() => startEditing(note)}
                    title='Editar nota'
                  >
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                      <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
                    </svg>
                  </button>
                  <button
                    className='delete-btn'
                    onClick={() => handleDeleteNote(note.id)}
                    title='Eliminar nota'
                  >
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className='note-content'>
                <p>{note.content}</p>
              </div>

              {note.tags.length > 0 && (
                <div className='note-tags'>
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='tag'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className='note-footer'>
                <div className='note-dates'>
                  <span className='created-date'>
                    Creada: {formatDate(note.createdAt)} a las{' '}
                    {formatTime(note.createdAt)}
                  </span>
                  <span className='updated-date'>
                    Actualizada: {formatDate(note.updatedAt)} a las{' '}
                    {formatTime(note.updatedAt)}
                  </span>
                </div>
              </div>

              <div className='note-corner'></div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay notas */}
        {notes.length === 0 && (
          <div className='empty-state'>
            <div className='empty-icon'>
              <svg
                width='64'
                height='64'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                <polyline points='14 2 14 8 20 8'></polyline>
                <line
                  x1='16'
                  y1='13'
                  x2='8'
                  y2='13'
                ></line>
                <line
                  x1='16'
                  y1='17'
                  x2='8'
                  y2='17'
                ></line>
                <polyline points='10 9 9 9 8 9'></polyline>
              </svg>
            </div>
            <h3>No hay notas aún</h3>
            <p>Crea tu primera nota para comenzar</p>
            <button
              className='create-first-btn'
              onClick={() => setIsCreating(true)}
            >
              Crear primera nota
            </button>
          </div>
        )}
      </div>

      {/* Elementos decorativos flotantes */}
      <div className='floating-elements'>
        <div className='floating-paper'></div>
        <div className='floating-pencil'></div>
        <div className='floating-pin'></div>
      </div>
    </div>
  );
}

export default NotesPage;
