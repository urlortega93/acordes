import React from 'react';
import { render } from '@testing-library/react';
import PlaylistPlayer from './PlaylistPlayer';

describe('PlaylistPlayer', () => {
  it('renders correctly with empty playlist', () => {
    const { getByText } = render(
      <PlaylistPlayer playlist={[]} />
    );
    
    expect(getByText('No hay canción seleccionada')).toBeInTheDocument();
    expect(getByText('No hay canciones en la lista de reproducción')).toBeInTheDocument();
  });

  it('renders correctly with playlist data', () => {
    const mockPlaylist = [
      { title: 'Song 1', artist: 'Artist 1', duration: 180 },
      { title: 'Song 2', artist: 'Artist 2', duration: 210 }
    ];
    
    const { getByText } = render(
      <PlaylistPlayer playlist={mockPlaylist} currentSongIndex={0} />
    );
    
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Artist 1')).toBeInTheDocument();
    expect(getByText('3:00')).toBeInTheDocument();
  });

  it('handles undefined props safely', () => {
    const { getByText } = render(
      <PlaylistPlayer />
    );
    
    expect(getByText('No hay canción seleccionada')).toBeInTheDocument();
    expect(getByText('No hay canciones en la lista de reproducción')).toBeInTheDocument();
  });
});

// DONE