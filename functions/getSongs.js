exports.handler = async () => {
  // En un caso real, aquí irías a una base de datos. Este es un ejemplo fijo:
  const dummySongs = [
    { title: "Ejemplo 1", artist: "Artista", bpm: 120, content: "[C]Hola [G]mundo" },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(dummySongs),
  };
};
