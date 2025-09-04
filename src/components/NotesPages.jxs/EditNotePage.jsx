import { useState, useEffect } from 'react';
import '../../styles/notes/EditNoteModal.css';
import { useNotes } from '../../context/NotesProvider';

function EditNoteModal({ visible, onClose, note, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#667eea',
  });
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const { editNote, editedNote } = useNotes();

  // Cargar datos de la nota cuando se abre el modal
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        color: note.color || '#667eea',
      });
      setIsEdited(false);
    }
  }, [note]);

  // Verificar si hay cambios
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setIsEdited(true);
  };

  // Guardar cambios
  const handleSave = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular guardado (aquí conectarías con tu API)
      // console.log('Nota actualizada:', { id: note.id, ...formData });
      const noteData = {
        ...formData,
      };
      // console.log(note_id);
      await editNote(note.id, noteData);
      // Éxito - cerrar modal y recargar notas
      onSave();
      onClose();
    } catch (error) {
      console.error('Error al guardar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!visible || !note) return null;

  return (
    <div className='edit-note-modal-overlay'>
      <div className='edit-note-modal'>
        <div className='edit-note-header'>
          <h2>Editar Nota</h2>
          <button
            className='close-btn'
            onClick={onClose}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M18 6L6 18M6 6l12 12'></path>
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className='edit-note-form'
        >
          <div className='form-group'>
            <label htmlFor='title'>Título *</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='Título de la nota'
              required
              maxLength={100}
            />
            <span className='char-count'>{formData.title.length}/100</span>
          </div>

          <div className='form-group'>
            <label htmlFor='content'>Contenido</label>
            <textarea
              id='content'
              name='content'
              value={formData.content}
              onChange={handleInputChange}
              placeholder='Contenido de la nota...'
              rows='8'
              maxLength={2000}
            />
            <span className='char-count'>{formData.content.length}/2000</span>
          </div>

          <div className='form-group'>
            <label htmlFor='color'>Color</label>
            <div className='color-selector'>
              <input
                type='color'
                id='color'
                name='color'
                value={formData.color}
                onChange={handleInputChange}
                className='color-input'
              />
              <div
                className='color-preview'
                style={{ backgroundColor: formData.color }}
              ></div>
              <span className='color-value'>{formData.color}</span>
            </div>
          </div>

          <div className='color-presets'>
            <p>Colores predefinidos:</p>
            <div className='preset-colors'>
              {[
                '#667eea',
                '#764ba2',
                '#f093fb',
                '#f5576c',
                '#4facfe',
                '#43e97b',
                '#fa709a',
                '#ffecd2',
              ].map(color => (
                <button
                  key={color}
                  type='button'
                  className='color-preset'
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, color }));
                    setIsEdited(true);
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Información de la nota */}
          <div className='note-info-section'>
            <h4>Información de la nota</h4>
            <div className='note-details'>
              <div className='detail-item'>
                <span className='detail-label'>ID:</span>
                <span className='detail-value'>{note.id}</span>
              </div>
              <div className='detail-item'>
                <span className='detail-label'>Carpeta ID:</span>
                <span className='detail-value'>{note.folder_id}</span>
              </div>
              <div className='detail-item'>
                <span className='detail-label'>Creada:</span>
                <span className='detail-value'>
                  {new Date(note.created_at).toLocaleString('es-ES')}
                </span>
              </div>
              {note.updated_at && (
                <div className='detail-item'>
                  <span className='detail-label'>Actualizada:</span>
                  <span className='detail-value'>
                    {new Date(note.updated_at).toLocaleString('es-ES')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className='form-actions'>
            <button
              type='button'
              className='cancel-btn'
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='save-btn'
              disabled={loading || !isEdited}
            >
              {loading ? (
                <>
                  <svg
                    className='spinner'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.579 2 12c0 5.421 4.579 10 10 10z' />
                  </svg>
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteModal;
