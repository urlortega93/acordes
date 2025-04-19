exports.handler = async (event) => {
  const song = JSON.parse(event.body);

  // Aquí deberías guardar en una base de datos o archivo. Este ejemplo solo regresa lo recibido.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Canción recibida", song }),
  };
};
