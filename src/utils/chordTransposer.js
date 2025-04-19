const baseChords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const extractBaseChords = (content) => {
  const chordRegex = /\[([A-G]#?b?)(?:m|maj|min|dim|aug|sus|7|9|11|13)?\]/gi;
  const matches = content.match(chordRegex) || [];
  return matches.map(chord => chord.slice(1, -1));
};

const calculateKeySignature = (chords) => {
  const chordCounts = chords.reduce((acc, chord) => {
    const base = chord.replace(/[^A-G#b]/g, '');
    acc[base] = (acc[base] || 0) + 1;
    return acc;
  }, {});

  const sortedChords = Object.entries(chordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([chord]) => chord);

  return sortedChords[0] || 'C';
};

const transposeChord = (chord, semitones) => {
  if (!chord) return chord;
  
  // Extraer la nota base y modificadores
  const match = chord.match(/^([A-G]#?b?)(.*)/i);
  if (!match) return chord;
  
  let [_, baseNote, modifiers] = match;
  
  // Normalizar bemoles a sostenidos
  baseNote = baseNote
    .replace(/Db/gi, 'C#')
    .replace(/Eb/gi, 'D#')
    .replace(/Gb/gi, 'F#')
    .replace(/Ab/gi, 'G#')
    .replace(/Bb/gi, 'A#');

  const baseIndex = baseChords.indexOf(baseNote);
  if (baseIndex === -1) return chord;
  
  // Calcular nueva posición
  const newIndex = (baseIndex + semitones + 12) % 12;
  const newBase = baseChords[newIndex];
  
  return newBase + modifiers;
};

const transposeLine = (line, semitones) => {
  return line.replace(/\[([^\]]+)\]/g, (match, chord) => {
    return `[${transposeChord(chord, semitones)}]`;
  });
};

export { 
  extractBaseChords,
  calculateKeySignature,
  transposeChord,
  transposeLine
};

// DONE