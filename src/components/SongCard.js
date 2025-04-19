import React from 'react';

const SongCard = ({ song, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {song.title}
            </h3>
            <p className="text-gray-600">{song.artist}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {song.bpm} BPM
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => onView(song)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Acordes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;