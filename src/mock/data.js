const mockSongs = [
  {
    id: '1',
    title: 'Ejemplo de Canción',
    artist: 'Artista Ejemplo',
    bpm: 120,
    sections: [
      {
        type: 'intro',
        content: '[C]Intro de la canción\n[G]Otro acorde de ejemplo'
      },
      {
        type: 'verse',
        content: '[Am]Primer verso de la canción\n[Em]Segundo verso con acordes'
      }
    ]
  }
];

const mockPlaylists = [
  {
    id: '1',
    name: 'Mi Primera Playlist',
    songs: ['1']
  }
];

export { mockSongs, mockPlaylists };