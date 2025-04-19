import React, { useState, useRef, useEffect } from 'react';
import { 
  extractBaseChords, 
  calculateKeySignature, 
  transposeChord,
  transposeLine 
} from '../utils/chordTransposer';

const SongViewPage = ({ song, onBack, isPlaying, onPlayPause, isLastSong, onNextSong }) => {
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [autoScroll, setAutoScroll] = useState(false);
  const [originalKey, setOriginalKey] = useState('');
  const [currentKey, setCurrentKey] = useState('');
  const [scrollDelay, setScrollDelay] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const delayTimeoutRef = useRef(null);

  // Detección de tonalidad original
  useEffect(() => {
    const allChords = song.sections.flatMap(section => 
      extractBaseChords(section.content)
    );
    const key = calculateKeySignature(allChords);
    setOriginalKey(key);
    setCurrentKey(key);
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
    };
  }, [song]);

  // Actualización de tonalidad al transponer
  useEffect(() => {
    const transposedKey = transposeChord(originalKey, transpose);
    setCurrentKey(transposedKey);
  }, [transpose, originalKey]);

  // Scroll automático con delay inicial
  useEffect(() => {
    if (autoScroll && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollSpeed = Math.max(50, 200 - song.bpm);
      
      // Resetear posición y activar delay
      container.scrollTop = 0;
      setScrollDelay(true);
      
      // Delay de 4 segundos antes de comenzar scroll
      delayTimeoutRef.current = setTimeout(() => {
        setScrollDelay(false);
        
        scrollIntervalRef.current = setInterval(() => {
          container.scrollTop += 1;
          
          if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
            clearInterval(scrollIntervalRef.current);
            setAutoScroll(false);
            if (isLastSong) {
              onPlayPause(false);
            } else {
              onNextSong();
            }
          }
        }, scrollSpeed);
      }, 4000);

      return () => {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
      };
    }
  }, [autoScroll, song.bpm, isLastSong]);

  const formatSectionContent = (content) => {
    return content.split('\n').map((line, lineIndex) => {
      const transposedLine = transposeLine(line, transpose);
      
      return (
        <div key={lineIndex} className="mb-4">
          {transposedLine.split(/(\[[^\]]+\])/).map((part, partIndex) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              return (
                <span 
                  key={partIndex} 
                  className="text-blue-600 font-bold mr-1"
                >
                  {part}
                </span>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    });
  };

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-600">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{song.title}</h1>
              <p className="text-blue-100">{song.artist} • {song.bpm} BPM</p>
            </div>
            <div className="text-white">
              <div className="text-sm">Tonalidad</div>
              <div className="font-bold">
                {originalKey} → {currentKey}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label className="mr-3 text-gray-700">Transponer:</label>
                <select
                  value={transpose}
                  onChange={(e) => setTranspose(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg"
                >
                  {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(step => (
                    <option key={step} value={step}>
                      {step > 0 ? `+${step}` : step}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="mr-3 text-gray-700">Tamaño:</label>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24"
                />
                <span className="ml-2 text-gray-700">{fontSize}px</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPlayPause(!isPlaying)}
                className={`px-4 py-2 rounded-lg ${
                  isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white transition-colors`}
              >
                {isPlaying ? 'Detener' : 'Reproducir'}
              </button>
              <button
                onClick={toggleAutoScroll}
                className={`px-4 py-2 rounded-lg ${
                  autoScroll ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                {autoScroll ? (scrollDelay ? 'Preparando...' : 'Scroll Activo') : 'Auto Scroll'}
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="p-6 overflow-y-auto"
          style={{ 
            fontSize: `${fontSize}px`,
            height: 'calc(100vh - 250px)',
            scrollBehavior: 'smooth'
          }}
        >
          {song.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 sticky top-0 bg-white py-2 z-10">
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h3>
              <div className="whitespace-pre-wrap">
                {formatSectionContent(section.content)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongViewPage;

// DONE