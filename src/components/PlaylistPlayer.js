import React, { useState, useEffect } from 'react';

const PlaylistPlayer = ({ playlist = [], currentSongIndex = 0, onSongSelect, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentSong = playlist[currentSongIndex] || {
    title: 'No hay canción seleccionada',
    artist: '',
    duration: 0
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [currentSongIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongSelect = (index) => {
    onSongSelect?.(index);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-blue-200 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          <h2 className="text-xl font-bold">Reproductor</h2>
          <div className="w-6"></div>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold truncate">{currentSong.title}</h3>
          <p className="text-blue-100 truncate">{currentSong.artist || 'Artista desconocido'}</p>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <button
          onClick={handlePlayPause}
          className={`p-3 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        <div className="flex-1 mx-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration || 0)}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${(currentTime / (currentSong.duration || 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 max-h-60 overflow-y-auto">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div
              key={index}
              onClick={() => handleSongSelect(index)}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-blue-50 ${
                index === currentSongIndex ? 'bg-blue-100' : ''
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className={`font-medium ${
                    index === currentSongIndex ? 'text-blue-600' : 'text-gray-800'
                  }`}>{song.title}</h4>
                  <p className="text-sm text-gray-600">{song.artist || 'Artista desconocido'}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatTime(song.duration || 0)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No hay canciones en la lista de reproducción
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPlayer;

// DONE