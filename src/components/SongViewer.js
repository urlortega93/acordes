import React, { useState, useEffect, useRef } from 'react';

const SongViewer = ({ song, onClose }) => {
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Calcular acordes transpuestos
  const transposeChord = (chord) => {
    if (!chord) return '';
    const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const matches = chord.match(/^([A-G]#?)(.*)/);
    if (!matches) return chord;
    
    const [_, base, suffix] = matches;
    const index = chords.indexOf(base);
    if (index === -1) return chord;
    
    const newIndex = (index + transpose + 12) % 12;
    return chords[newIndex] + suffix;
  };

  const transposeContent = (content) => {
    return content.replace(/\[([^\]]+)\]/g, (match, chord) => {
      return `${transposeChord(chord)}`;
    });
  };

  // Animación de scrolling basado en BPM
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const scrollSpeed = (60 / song.bpm) * 1000; // ms por beat
    const container = containerRef.current;
    const maxScroll = container.scrollHeight - container.clientHeight;

    const animate = (timestamp) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;
      const delta = timestamp - lastUpdateRef.current;

      if (delta >= scrollSpeed / 4) { // Suavizar movimiento
        const newPosition = currentPosition + (delta / scrollSpeed) * 100;
        if (newPosition >= maxScroll) {
          setCurrentPosition(0);
          container.scrollTo(0, 0);
          setIsPlaying(false);
        } else {
          setCurrentPosition(newPosition);
          container.scrollTo(0, newPosition);
        }
        lastUpdateRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, currentPosition, song.bpm]);

  const togglePlay = () => {
    if (!isPlaying && currentPosition >= containerRef.current.scrollHeight - containerRef.current.clientHeight) {
      setCurrentPosition(0);
      containerRef.current.scrollTo(0, 0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{song.title}</h2>
              <p className="text-gray-600">{song.artist} • {song.bpm} BPM</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <label className="mr-3 text-gray-700">Transponer:</label>
              <select
                value={transpose}
                onChange={(e) => setTranspose(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg"
              >
                <option value="0">Original</option>
                <option value="1">+1</option>
                <option value="-1">-1</option>
                <option value="2">+2</option>
                <option value="-2">-2</option>
                <option value="3">+3</option>
                <option value="-3">-3</option>
                <option value="4">+4</option>
                <option value="-4">-4</option>
                <option value="5">+5</option>
                <option value="-5">-5</option>
                <option value="6">+6</option>
                <option value="-6">-6</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="mr-3 text-gray-700">Tamaño:</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="w-24"
              />
              <span className="ml-2 text-gray-700">{fontSize}px</span>
            </div>

            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
            >
              {isPlaying ? 'Detener' : 'Reproducir'}
            </button>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-6 pt-0 border-t border-gray-200"
          style={{ fontSize: `${fontSize}px` }}
        >
          {song.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 sticky top-0 bg-white py-2">
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h3>
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {transposeContent(section.content)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongViewer;
