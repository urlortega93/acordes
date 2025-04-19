import React, { useState } from 'react';
import SongViewPage from './SongViewPage';
import PlaylistPlayer from './PlaylistPlayer';
import SongForm from './SongForm';
import mockSongs from '../mock/songs';

const App = () => {
  const [view, setView] = useState('playlist');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(mockSongs);
  const [editingSong, setEditingSong] = useState(null);

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setView('song');
    setIsPlaying(false);
  };

  const handleBack = () => {
    setView('playlist');
    setIsPlaying(false);
  };

  const handleSaveSong = (songData) => {
    if (editingSong !== null) {
      // Editar canción existente
      const updatedSongs = [...songs];
      updatedSongs[editingSong] = songData;
      setSongs(updatedSongs);
    } else {
      // Añadir nueva canción
      setSongs([...songs, songData]);
    }
    setView('playlist');
    setEditingSong(null);
  };

  const handleEditSong = (index) => {
    setEditingSong(index);
    setView('form');
  };

  const handleNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {view === 'playlist' && (
        <PlaylistPlayer
          playlist={songs}
          currentSongIndex={currentSongIndex}
          onSongSelect={handleSongSelect}
          onBack={() => setView('menu')}
        />
      )}
      
      {view === 'song' && (
        <SongViewPage
          song={songs[currentSongIndex]}
          onBack={handleBack}
          isPlaying={isPlaying}
          onPlayPause={setIsPlaying}
          isLastSong={currentSongIndex === songs.length - 1}
          onNextSong={handleNextSong}
        />
      )}
      
      {view === 'form' && (
        <SongForm
          song={editingSong !== null ? songs[editingSong] : null}
          onSave={handleSaveSong}
          onCancel={handleBack}
        />
      )}
    </div>
  );
};

export default App;

// DONE