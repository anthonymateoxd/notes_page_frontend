import { useState, useEffect } from 'react';
import '../../styles/users/EditUserModal.css';
import { useAuth } from '../../context/AuthProvider';

function EditUserModal({ visible, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const { editUser } = useAuth();

  // Cargar datos del usuario cuando se abre el modal
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        description: user.description || '',
      });
      setIsEdited(false);
    }
  }, [user]);

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
      // console.log('Usuario actualizado:', formData);
      await editUser(formData);
      // Éxito - cerrar modal y recargar datos
      onSave();
      onClose();
    } catch (error) {
      console.error('Error al guardar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!visible || !user) return null;

  return (
    <div className='edit-user-modal-overlay'>
      <div className='edit-user-modal'>
        <div className='edit-user-header'>
          <h2>Editar Perfil</h2>
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
          className='edit-user-form'
        >
          <div className='form-group'>
            <label htmlFor='name'>Nombre *</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Tu nombre completo'
              required
              maxLength={50}
            />
            <span className='char-count'>{formData.name.length}/50</span>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Descripcion</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Cuéntanos algo sobre ti...'
              rows='4'
              maxLength={200}
            />
            <span className='char-count'>
              {formData.description.length}/200
            </span>
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

export default EditUserModal;
