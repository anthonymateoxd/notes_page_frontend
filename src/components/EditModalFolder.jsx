import { useState, useEffect } from 'react';
import { useFolder } from '../context/FolderProvider';
import '../styles/EditModalFolder.css';
import { useNavigate } from 'react-router-dom';

function EditModalFolder({
  isModalOpen,
  setIsModalOpen,
  selectedFolderId,
  folderId,
  initialTitle = '',
  initialColor = '#7C3AED',
}) {
  const { updateFolder } = useFolder();
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [fileTitle, setFileTitle] = useState(initialTitle);
  const [error, setError] = useState('');

  const { deleteFolderById, folder } = useFolder();

  const navigate = useNavigate();

  const colors = [
    '#7C3AED',
    '#06B6D4',
    '#EC4899',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#3B82F6',
    '#111827', // black
    '#F3F4F6', // light gray
  ];

  // Efecto para sincronizar los valores iniciales
  useEffect(() => {
    setFileTitle(initialTitle);
    setSelectedColor(initialColor);
    setError('');
  }, [isModalOpen, initialTitle, initialColor]);

  const handleSave = async () => {
    if (fileTitle.length <= 3) {
      setError('Title must be more than 3 characters');
      return;
    }

    const folderData = {
      name: fileTitle,
      color: selectedColor,
    };

    await updateFolder(folderId.id, folderData);

    console.log({
      folder_id: folderId.id,
      name: fileTitle,
      color: selectedColor,
    });

    setIsModalOpen(false);
    navigate(0);
  };

  // Función para eliminar (solo console.log por ahora)
  const handleDelete = async id => {
    id = folderId.id;
    // console.log('Eliminando archivo/carpeta con ID:', folderId.id);
    await deleteFolderById(id);
    console.log(id);
    navigate(0);
  };

  if (!isModalOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className='modal-content'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='modal-header'>
          <h2 className='modal-title'>{selectedFolderId} Edit File</h2>
          <button
            className='modal-close-btn'
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Title input */}
        <div className='input-group'>
          <label className='input-label'>File Title</label>
          <input
            type='text'
            value={fileTitle}
            onChange={e => {
              setFileTitle(e.target.value);
              if (e.target.value.length > 3) {
                setError('');
              }
            }}
            className='title-input'
          />
          {error && <p className='error-message'>{error}</p>}
        </div>

        {/* Color selection */}
        <div className='color-selection-group'>
          <label className='input-label'>Select Color</label>
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
            {/* Custom color input */}
            <input
              type='color'
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className='color-picker'
            />
          </div>
        </div>
        {/* Actions */}
        <div className='modal-actions'>
          <button
            onClick={handleDelete}
            className='delete-btn'
          >
            🗑️ Delete File
          </button>

          <button
            onClick={() => setIsModalOpen(false)}
            className='cancel-btn'
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className='save-btn'
            style={{ backgroundColor: selectedColor }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModalFolder;
