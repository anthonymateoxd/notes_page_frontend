import { useState } from 'react';
import '../styles/modals/CreateNoteModal.css';
import { useFolder } from '../context/FolderProvider';
import { useNotes } from '../context/NotesProvider';

function CreateNoteModal({ visible, onClose }) {
  const { folder_Id } = useFolder();
  const { postNote } = useNotes();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#667eea',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      setFormData({ title: '', content: '', color: '#667eea' });
      // console.log('data: ', formData);
      // console.log('id: ', folder_Id);

      await postNote(folder_Id, formData);
      await onClose();
    } catch (error) {
      console.error('Error al crear nota:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!visible) return null;

  return (
    <div className='create-note-modal-overlay'>
      <div className='create-note-modal'>
        <div className='create-note-header'>
          <h2>Crear Nueva Nota</h2>
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
          onSubmit={handleSubmit}
          className='create-note-form'
        >
          <div className='form-group'>
            <label htmlFor='title'>Título de la nota *</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Escribe un título descriptivo'
              required
              maxLength={100}
            />
            <span className='char-count'>{formData.title.length}/100</span>
          </div>

          <div className='form-group'>
            <label htmlFor='content'>Descripción</label>
            <textarea
              id='content'
              name='content'
              value={formData.content}
              onChange={handleChange}
              placeholder='Escribe el contenido de tu nota...'
              rows='5'
              maxLength={1000}
            />
            <span className='char-count'>{formData.content.length}/1000</span>
          </div>

          <div className='form-group'>
            <label htmlFor='color'>Color de la nota</label>
            <div className='color-selector'>
              <input
                type='color'
                id='color'
                name='color'
                value={formData.color}
                onChange={handleChange}
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
                  onClick={() => setFormData({ ...formData, color })}
                  title={color}
                />
              ))}
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
              className='submit-btn'
              disabled={loading || !formData.title.trim()}
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
                  Creando...
                </>
              ) : (
                'Crear Nota'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNoteModal;
