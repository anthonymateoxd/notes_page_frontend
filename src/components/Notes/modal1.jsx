import { useState } from 'react';
import '../../styles/modals/Modal1.css';
import CreateNoteModal from '../CreateNotesPage';

function Modal1({ visible, onClose }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!visible) return null;

  return (
    <>
      <div className='modal1-container'>
        <div className='modal1-content'>
          <div className='modal1-header'>
            <h2>Agregar Nueva Nota</h2>
          </div>

          <button
            className='action-btn create-btn'
            onClick={() => setShowCreateModal(true)}
          >
            Crear Nota
          </button>
        </div>
      </div>

      <CreateNoteModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          onClose(); // Cierra también el modal principal si lo deseas
        }}
      />
    </>
  );
}

export default Modal1;
