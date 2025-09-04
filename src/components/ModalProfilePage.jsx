import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import '../styles/ModalProfilePage.css';
import EditUserModal from '../components/UserPage/EditUserPage';

function ModalProfilePage() {
  const { allBoutUser, getAllInformationById } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const getAllInformationByIdRequest = async () => {
      await getAllInformationById();
    };
    getAllInformationByIdRequest();
  }, []);

  // Función para obtener la primera letra del nombre
  const getInitial = name => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Función para formatear la fecha de registro
  const formatJoinDate = dateString => {
    if (!dateString) return 'Fecha no disponible';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Abrir modal de edición
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <div className='profile-card animate-in'>
        <div className='profile-header-card'>
          <div className='avatar-container'>
            <div className='user-avatar'>{getInitial(allBoutUser?.name)}</div>
            <div className='online-status'></div>
          </div>

          <div className='profile-info'>
            <h2 className='user-name'>{allBoutUser?.name || 'Usuario'}</h2>
            <p className='user-email'>
              {allBoutUser?.email || 'No especificado'}
            </p>
            <p className='user-bio'>
              {allBoutUser?.description || 'Sin descripción'}
            </p>
            <div className='user-meta'>
              <span className='join-date'>
                Miembro desde {formatJoinDate(allBoutUser?.created_at)}
              </span>
              {allBoutUser?.updated_at && (
                <span className='last-updated'>
                  Última actualización:{' '}
                  {formatJoinDate(allBoutUser?.updated_at)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Botón de editar */}
        <div className='profile-actions'>
          <button
            className='edit-profile-btn'
            onClick={handleEditClick}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
              <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
            </svg>
            Editar Perfil
          </button>
        </div>

        {/* Información adicional del usuario */}
      </div>

      {/* Modal de edición */}
      <EditUserModal
        visible={showEditModal}
        onClose={handleCloseEditModal}
        user={allBoutUser}
        onSave={() => {
          // Recargar la información del usuario después de guardar
          getAllInformationById();
        }}
      />
    </>
  );
}

export default ModalProfilePage;
