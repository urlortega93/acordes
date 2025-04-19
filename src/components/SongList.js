import React from 'react';
import { mockSongs } from '../mock/data';

const SongList = ({ songs = mockSongs, onEdit, onView, onDelete }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No hay canciones aún
          </h2>
          <p className="text-gray-600 mb-6">
            Comienza agregando tu primera canción
          </p>
          <button 
            onClick={() => onEdit(null)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear Canción
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map(song => (
          <div 
            key={song.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                {song.title}
              </h3>
              <p className="text-gray-600 mb-4 truncate">
                {song.artist} • {song.bpm} BPM
              </p>
              <div className="flex justify-between space-x-2">
                <button 
                  onClick={() => onView(song)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Ver
                </button>
                <button 
                  onClick={() => onEdit(song)}
                  className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(song.id)}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;

// DONE