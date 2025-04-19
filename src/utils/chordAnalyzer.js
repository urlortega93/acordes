const baseChords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const chordTypes = {
  major: '',
  minor: 'm',
  diminished: '°',
  augmented: '+',
  suspended: 'sus',
  seventh: '7',
  major7: 'maj7',
  minor7: 'm7'
};

const extractBaseChords = (content) => {
  const chordRegex = /\[([A-G]#?)(?:m|maj|min|dim|aug|sus|7)?\]/g;
  const matches = content.match(chordRegex) || [];
  return matches.map(chord => chord.slice(1, -1).replace(/[a-z°+\d]/g, ''));
};

const calculateKeySignature = (chords) => {
  const chordCounts = chords.reduce((acc, chord) => {
    acc[chord] = (acc[chord] || 0) + 1;
    return acc;
  }, {});

  const sortedChords = Object.entries(chordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([chord]) => chord);

  return sortedChords[0] || 'C';
};

const transposeChord = (chord, semitones) => {
  const chordRegex = /^([A-G]#?)([a-z°+\d]*)/;
  const match = chord.match(chordRegex);
  
  if (!match) return chord;

  const [_, baseNote, chordType] = match;
  const baseIndex = baseChords.indexOf(baseNote);
  
  if (baseIndex === -1) return chord;

  const newIndex = (baseIndex + semitones + 12) % 12;
  return baseChords[newIndex] + chordType;
};

export { 
  extractBaseChords, 
  calculateKeySignature, 
  transposeChord,
  chordTypes 
};