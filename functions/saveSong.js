const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método no permitido' }),
    };
  }

  try {
    const newSong = JSON.parse(event.body);
    const filePath = path.join(__dirname, '../data/songs.json');

    // Leer canciones actuales
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
    const songs = JSON.parse(data);

    // Agregar nueva canción
    songs.push(newSong);

    // Guardar en archivo
    fs.writeFileSync(filePath, JSON.stringify(songs, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Canción guardada' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al guardar la canción', error: err.message }),
    };
  }
};
