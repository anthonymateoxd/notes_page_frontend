import { useFolder } from '../context/FolderProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateFolderModal({ isCreateModalOpen, setIsCreateModalOpen }) {
  const { createFolder } = useFolder();

  const navigate = useNavigate();

  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [error, setError] = useState('');

  const colors = [
    '#7C3AED',
    '#06B6D4',
    '#EC4899',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#3B82F6',
    '#111827',
    '#F3F4F6',
  ];

  const handleSubmit = async () => {
    if (folderName.length <= 3) {
      setError('El nombre debe tener más de 3 caracteres');
      return;
    }

    const folderData = {
      name: folderName,
      color: selectedColor,
    };

    try {
      // console.log(folderData);

      await createFolder(folderData);
      navigate(0);

      // Limpiar formulario
      setFolderName('');
      setSelectedColor('#7C3AED');
      setError('');
    } catch (error) {
      setError();
      console.log(error);
    }
  };

  if (!isCreateModalOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={() => setIsCreateModalOpen(false)}
    >
      <div
        className='modal-content'
        onClick={e => e.stopPropagation()}
      >
        {/* Lógica del loading */}

        {/* Header */}
        <div className='modal-header'>
          <h2 className='modal-title'>Crear Nueva Carpeta</h2>
          <button
            className='modal-close-btn'
            onClick={() => {
              setIsCreateModalOpen(false);
              setError('');
            }}
          >
            ✕
          </button>
        </div>

        {/* Nombre de la carpeta */}
        <div className='input-group'>
          <label className='input-label'>Nombre de la Carpeta</label>
          <input
            type='text'
            placeholder='Escribe el nombre de la carpeta'
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
            className='title-input'
          />
          {error && <p className='error-message'>{error}</p>}
        </div>

        {/* Selección de color */}
        <div className='color-selection-group'>
          <label className='input-label'>Seleccionar Color</label>
          <div className='color-options'>
            {colors.map(color => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`color-circle ${
                  selectedColor === color ? 'selected' : ''
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {/* Selector de color personalizado */}
            <input
              type='color'
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className='color-picker'
            />
          </div>
        </div>

        {/* Acciones */}
        <div className='modal-actions'>
          <button
            className='cancel-btn'
            onClick={() => {
              setIsCreateModalOpen(false);
              setError('');
            }}
          >
            Cancelar
          </button>
          <button
            className='save-btn'
            onClick={handleSubmit}
            style={{ backgroundColor: selectedColor }}
          >
            Crear Carpeta
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;
