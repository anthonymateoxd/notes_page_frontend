import { useState } from 'react';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import '../../styles/modals/principal.css';
import { useNavigate } from 'react-router-dom';
import { useFolder } from '../../context/FolderProvider';

function Principal() {
  const navigate = useNavigate();
  const { folders: folderId } = useFolder();

  const [showModal1, setShowModal1] = useState(true);
  const [showModal2, setShowModal2] = useState(true);

  return (
    <div className='principal-container'>
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

      <div className='modals-container'>
        <Modal1
          visible={showModal1}
          onClose={() => setShowModal1(false)}
        />

        <Modal2
          visible={showModal2}
          onClose={() => setShowModal2(false)}
          folderId={folderId}
        />
      </div>
    </div>
  );
}

export default Principal;
