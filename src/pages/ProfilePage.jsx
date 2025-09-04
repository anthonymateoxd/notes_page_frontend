import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';
import { useFolder } from '../context/FolderProvider';
import EstadisticPage from '../components/EstadisticPage.jsx';
import EditModalFolder from '../components/EditModalFolder.jsx';
import FoldersSection from '../components/FoldersSection.jsx';
import ModalProfilePage from '../components/ModalProfilePage.jsx';
import CreateFolderModal from '../components/CreateFolderModal.jsx';

function ProfilePage() {
  const {
    getFolders,
    folders,
    folder: folderId,
    getFolderById,
    setFolder_Id,
    folder_Id,
  } = useFolder();

  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [fileTitle, setFileTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [FolderId, setFolderId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleCreateFolder = folderData => {
    console.log('Creando carpeta:', folderData);
    // Aquí va tu lógica para crear la carpeta
    // await createFolder(folderData);

    // Cerrar modal después de crear
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    if (isCreateModalOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCreateModalOpen]);

  useEffect(() => {
    const getFoldersRequest = async () => {
      await getFolders();
    };
    getFoldersRequest();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (folderId && folderId.name) {
      setFileTitle(folderId.name);
      setSelectedColor(folderId.color || '#7C3AED');
    }
  }, [folderId]);

  const getFolderByIdRequest = async id => {
    return await getFolderById(id);
  };

  const handleUpdateFolder = async (folderData, folderId) => {
    console.log(folderData, folderId);
  };

  const handleGetFolder = async id => {
    const folderData = await getFolderByIdRequest(id);
    setFolderId(folderData);
  };

  const navigate = useNavigate();

  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Apasionado por la organización y productividad. Amante de las notas bien estructuradas y los apuntes creativos.',
    joinDate: 'Enero 2023',
    folders: 12,
    notes: 147,
  });

  const handleFolderClick = (id, name, color) => {
    console.log('Click en carpeta:', { id, name, color });
    navigate(`/folder/${id}`);
    setFolder_Id(id); // <-- Guardas solo el ID
  };

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        {/* Header con fondo gradiente */}
        <div className='profile-header'>
          <div className='header-background'></div>
        </div>

        {/* Contenido principal */}
        <div className='profile-content'>
          {/* Sección de información de usuario y estadísticas */}
          <div className='profile-main-section'>
            <ModalProfilePage user={user} />
            <EstadisticPage user={user} />
          </div>

          {/* Sección de carpetas */}
          <div className='folders-main-section'>
            <FoldersSection
              folders={folders}
              loading={loading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleFolderClick={handleFolderClick}
              handleGetFolder={handleGetFolder}
              setIsModalOpen={setIsModalOpen}
              setSelectedFolderId={setSelectedFolderId}
              setIsCreateModalOpen={setIsCreateModalOpen}
            />
          </div>
        </div>

        {/* Modales */}
        <EditModalFolder
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedFolderId={selectedFolderId}
          folderId={folderId}
          handleUpdateFolder={handleUpdateFolder}
          initialTitle={fileTitle}
          initialColor={selectedColor}
          loading={loading}
        />

        {/* NUEVO MODAL PARA CREAR CARPETA */}
        <CreateFolderModal
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
          handleCreateFolder={handleCreateFolder}
          folderId={folderId}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
