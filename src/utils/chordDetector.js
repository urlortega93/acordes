const chordPatterns = [
  // Acordes básicos
  /([A-G])(#|b)?(maj|min|m|M|\+|-|°|dim|aug)?(\d*)/,
  // Acordes con alteraciones y extensiones
  /([A-G])(#|b)?(sus|add|alt)?(\d*)/
];

const isChord = (text) => {
  return chordPatterns.some(pattern => pattern.test(text));
};

const normalizeChord = (chord) => {
  // Simplificar acordes mayores
  chord = chord.replace(/maj7?/g, '');
  chord = chord.replace(/M7?/g, '');
  
  // Estandarizar acordes menores
  chord = chord.replace(/min/g, 'm');
  
  return chord;
};

export { isChord, normalizeChord };