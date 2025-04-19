import React, { useState } from 'react';
import Header from './components/Header';
import SongForm from './components/SongForm';
import SongList from './components/SongList';
import SongViewPage from './components/SongViewPage';
import PlaylistManager from './components/PlaylistManager';
import PlaylistPlayer from './components/PlaylistPlayer';
import { mockSongs, mockPlaylists } from './mock/data';

const App = () => {
  const [songs, setSongs] = useState(mockSongs);
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [currentView, setCurrentView] = useState('list');
  const [editingSong, setEditingSong] = useState(null);
  const [viewingSong, setViewingSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const handleSave = (song) => {
    if (editingSong && editingSong.id) {
      setSongs(songs.map(s => s.id === editingSong.id ? { ...song, id: s.id } : s));
    } else {
      const newSong = { ...song, id: Date.now().toString() };
      setSongs([...songs, newSong]);
    }
    setCurrentView('list');
    setEditingSong(null);
  };

  const handleDelete = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  const handleEdit = (song) => {
    setEditingSong(song);
    setCurrentView('form');
  };

  const handleView = (song) => {
    setViewingSong(song);
    setCurrentView('view');
  };

  const handleCreatePlaylist = (playlist) => {
    const newPlaylist = { 
      ...playlist, 
      id: Date.now().toString() 
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleSelectPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentView('playlist');
  };

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return (
          <div>
            <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Tus Canciones</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentView('form')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Nueva Canción
                </button>
                <button 
                  onClick={() => setCurrentView('playlist-manager')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Playlists
                </button>
              </div>
            </div>
            <SongList 
              songs={songs} 
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </div>
        );
      case 'form':
        return (
          <SongForm 
            song={editingSong}
            onSave={handleSave}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'view':
        return (
          <SongViewPage 
            song={viewingSong}
            onBack={() => setCurrentView('list')}
          />
        );
      case 'playlist-manager':
        return (
          <PlaylistManager 
            songs={songs}
            playlists={playlists}
            onCreatePlaylist={handleCreatePlaylist}
            onSelectPlaylist={handleSelectPlaylist}
            onBack={() => setCurrentView('list')}
          />
        );
      case 'playlist':
        return (
          <PlaylistPlayer 
            playlist={currentPlaylist}
            songs={songs}
            onBack={() => setCurrentView('list')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;