import { useState } from 'react';
import '../styles/FoldersSection.css';

function FoldersSection({
  folders,
  loading,
  currentPage,
  setCurrentPage,
  handleFolderClick,
  handleGetFolder,
  setIsModalOpen,
  setSelectedFolderId,
  setIsCreateModalOpen,
}) {
  const [localLoading, setLocalLoading] = useState(false);

  if (localLoading) {
    return <div className='loading-indicator'>Cargando carpetas...</div>;
  }

  return (
    <div className='folders-section'>
      <div className='section-header'>
        <h2>Mis Carpetas</h2>

        <button
          className='create-folder-btn'
          onClick={() => {
            setIsCreateModalOpen(true);
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
          Nueva Carpeta
        </button>
      </div>

      {folders.length === 0 ? (
        loading ? (
          <div className='loading-indicator'>Cargando carpetas...</div>
        ) : (
          <p>No hay carpetas disponibles</p>
        )
      ) : (
        <>
          <div className='folders-grid'>
            {folders
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map(folder => (
                <div
                  key={folder.id}
                  className='folder-card animate-in'
                  onClick={() =>
                    handleFolderClick(folder.id, folder.name, folder.color)
                  }
                >
                  <div
                    className='folder-header'
                    style={{ backgroundColor: folder.color }}
                  >
                    <div className='folder-icon'>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        onClick={e => {
                          e.stopPropagation(); // prevent triggering folder click
                        }}
                        style={{ cursor: 'pointer' }} // make it clear it's clickable
                      >
                        <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
                      </svg>
                    </div>

                    <button
                      className='folder-menu'
                      onClick={e => {
                        e.stopPropagation();
                        handleGetFolder(folder.id);
                        setSelectedFolderId(folder.id);
                        setIsModalOpen(true);
                        console.log('Menú de carpeta', folder.id);
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
                        <circle
                          cx='12'
                          cy='12'
                          r='1'
                        ></circle>
                        <circle
                          cx='12'
                          cy='5'
                          r='1'
                        ></circle>
                        <circle
                          cx='12'
                          cy='19'
                          r='1'
                        ></circle>
                      </svg>
                    </button>
                  </div>

                  <div className='folder-content'>
                    <h3>{folder.name}</h3>
                    <div className='folder-stats'>
                      <span>{folder.notes || 0} notas</span>
                      <span className='updated'>
                        {folder.updated || folder.created_At}
                      </span>
                    </div>
                  </div>

                  <div className='folder-actions'>
                    <button
                      className='action-btn'
                      onClick={e => {
                        e.stopPropagation();
                        handleFolderClick(folder.id, folder.name, folder.color);
                      }}
                    >
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                        <circle
                          cx='12'
                          cy='12'
                          r='3'
                        ></circle>
                      </svg>
                      Abrir
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Paginación - solo se muestra si hay más de 6 carpetas */}
          {folders.length > 6 && (
            <div className='pagination-controls'>
              <button
                className='pagination-btn'
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='15 18 9 12 15 6'></polyline>
                </svg>
                Anterior
              </button>

              <span className='pagination-info'>
                Página {currentPage} de {Math.ceil(folders.length / 6)}
              </span>

              <button
                className='pagination-btn'
                onClick={() =>
                  setCurrentPage(prev =>
                    Math.min(prev + 1, Math.ceil(folders.length / 6))
                  )
                }
                disabled={currentPage === Math.ceil(folders.length / 6)}
              >
                Siguiente
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='9 18 15 12 9 6'></polyline>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FoldersSection;
