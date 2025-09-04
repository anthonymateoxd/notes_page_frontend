// import { useEffect } from 'react';
// import { useAuth } from '../context/AuthProvider';

// function EstadisticPage({ user }) {
//   const { getAllFoldersAndNotes, allFoldersAndNotes } = useAuth();

//   useEffect(() => {
//     const GetFoldersAndNotesRequest = async () => {
//       await getAllFoldersAndNotes();
//     };
//     GetFoldersAndNotesRequest();
//   }, []);

//   return (
//     <div className='stats-grid'>
//       <div className='stats-card animate-in'>
//         <div className='stats-icon folders'>
//           <svg
//             width='24'
//             height='24'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//           >
//             <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
//           </svg>
//         </div>
//         <div className='stats-info'>
//           <h3>{allFoldersAndNotes.total_folders}</h3>
//           <p>Carpetas</p>
//         </div>
//       </div>

//       <div className='stats-card animate-in'>
//         <div className='stats-icon notes'>
//           <svg
//             width='24'
//             height='24'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//           >
//             <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
//             <polyline points='14 2 14 8 20 8'></polyline>
//             <line
//               x1='16'
//               y1='13'
//               x2='8'
//               y2='13'
//             ></line>
//             <line
//               x1='16'
//               y1='17'
//               x2='8'
//               y2='17'
//             ></line>
//             <polyline points='10 9 9 9 8 9'></polyline>
//           </svg>
//         </div>
//         <div className='stats-info'>
//           <h3>{allFoldersAndNotes.total_notes}</h3>
//           <p>Notas</p>
//         </div>
//       </div>

//       <div className='stats-card animate-in'>
//         <div className='stats-icon recent'>
//           <svg
//             width='24'
//             height='24'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//           >
//             <circle
//               cx='12'
//               cy='12'
//               r='10'
//             ></circle>
//             <polyline points='12 6 12 12 16 14'></polyline>
//           </svg>
//         </div>
//         <div className='stats-info'>
//           <h3>{allFoldersAndNotes.last_folder_created_at}</h3>
//         </div>
//       </div>
//       <div className='stats-card animate-in'>
//         <div className='stats-icon recent'>
//           <svg
//             width='24'
//             height='24'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//           >
//             <circle
//               cx='12'
//               cy='12'
//               r='10'
//             ></circle>
//             <polyline points='12 6 12 12 16 14'></polyline>
//           </svg>
//         </div>
//         <div className='stats-info'>
//           <h3>{allFoldersAndNotes.last_note_created_at}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EstadisticPage;

import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

function EstadisticPage({ user }) {
  const { getAllFoldersAndNotes, allFoldersAndNotes } = useAuth();

  useEffect(() => {
    const GetFoldersAndNotesRequest = async () => {
      await getAllFoldersAndNotes();
    };
    GetFoldersAndNotesRequest();
  }, []);

  // Función para formatear fechas de forma legible con hora
  const formatDateTime = dateString => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    // Si es hace menos de 1 minuto
    if (diffMinutes < 1) {
      return 'Ahora mismo';
    }
    // Si es hace menos de 1 hora
    else if (diffHours < 1) {
      return `Hace ${diffMinutes} min`;
    }
    // Si es hoy
    else if (diffDays === 0) {
      return `Hoy a las ${date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
    // Si es ayer
    else if (diffDays === 1) {
      return `Ayer a las ${date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
    // Si es esta semana
    else if (diffDays < 7) {
      return `${date.toLocaleDateString('es-ES', {
        weekday: 'long',
      })} a las ${date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
    // Para fechas más antiguas
    else {
      return (
        date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }) +
        ` a las ${date.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      );
    }
  };

  return (
    <div className='stats-grid'>
      <div className='stats-card animate-in'>
        <div className='stats-icon folders'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
          </svg>
        </div>
        <div className='stats-info'>
          <h3>{allFoldersAndNotes.total_folders}</h3>
          <p>Carpetas</p>
        </div>
      </div>

      <div className='stats-card animate-in'>
        <div className='stats-icon notes'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
            <polyline points='14 2 14 8 20 8'></polyline>
            <line
              x1='16'
              y1='13'
              x2='8'
              y2='13'
            ></line>
            <line
              x1='16'
              y1='17'
              x2='8'
              y2='17'
            ></line>
            <polyline points='10 9 9 9 8 9'></polyline>
          </svg>
        </div>
        <div className='stats-info'>
          <h3>{allFoldersAndNotes.total_notes}</h3>
          <p>Notas</p>
        </div>
      </div>

      <div className='stats-card animate-in'>
        <div className='stats-icon recent'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <circle
              cx='12'
              cy='12'
              r='10'
            ></circle>
            <polyline points='12 6 12 12 16 14'></polyline>
          </svg>
        </div>
        <div className='stats-info'>
          <h3 className='date-display'>
            {formatDateTime(allFoldersAndNotes.last_folder_created_at)}
          </h3>
          <p className='date-subtitle'>Última carpeta creada</p>
        </div>
      </div>

      <div className='stats-card animate-in'>
        <div className='stats-icon recent'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <circle
              cx='12'
              cy='12'
              r='10'
            ></circle>
            <polyline points='12 6 12 12 16 14'></polyline>
          </svg>
        </div>
        <div className='stats-info'>
          <h3 className='date-display'>
            {formatDateTime(allFoldersAndNotes.last_note_created_at)}
          </h3>
          <p className='date-subtitle'>Última nota creada</p>
        </div>
      </div>
    </div>
  );
}

export default EstadisticPage;
