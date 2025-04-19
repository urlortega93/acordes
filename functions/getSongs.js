const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, '../data/songs.json');
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';

    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener canciones', error: err.message }),
    };
  }
};
