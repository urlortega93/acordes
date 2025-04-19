import React, { useState } from 'react';

const PlaylistManager = ({ 
  songs, 
  playlists, 
  onCreatePlaylist, 
  onSelectPlaylist, 
  onBack 
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleSongSelect = (songId) => {
    setSelectedSongs(prev => 
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const createPlaylist = () => {
    if (newPlaylistName && selectedSongs.length > 0) {
      onCreatePlaylist({
        name: newPlaylistName,
        songs: selectedSongs
      });
      setNewPlaylistName('');
      setSelectedSongs([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold">Gestor de Playlists</h1>
        <div></div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Nombre de la playlist"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map(song => (
            <div 
              key={song.id}
              onClick={() => handleSongSelect(song.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedSongs.includes(song.id) 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between">
                <span>{song.title}</span>
                <span className="text-gray-600">{song.artist}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={createPlaylist}
          disabled={!newPlaylistName || selectedSongs.length === 0}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Crear Playlist
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mis Playlists</h2>
        {playlists.map(playlist => (
          <div 
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            className="p-4 border rounded-lg mb-2 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-between">
              <span>{playlist.name}</span>
              <span className="text-gray-600">{playlist.songs.length} canciones</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;

// DONE