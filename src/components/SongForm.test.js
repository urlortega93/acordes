import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SongForm from './SongForm';

describe('SongForm', () => {
  it('handles null song prop correctly', () => {
    const { getByPlaceholderText } = render(
      <SongForm song={null} onSave={() => {}} onCancel={() => {}} />
    );
    
    expect(getByPlaceholderText('Nombre de la canción').value).toBe('');
    expect(getByPlaceholderText('Nombre del artista').value).toBe('');
  });

  it('initializes with default values when no song provided', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <SongForm onSave={() => {}} onCancel={() => {}} />
    );
    
    expect(getByPlaceholderText('Nombre de la canción').value).toBe('');
    expect(getByDisplayValue('120')).toBeInTheDocument();
  });

  it('initializes with provided song data', () => {
    const mockSong = {
      title: 'Test Song',
      artist: 'Test Artist',
      bpm: 100,
      sections: [{ type: 'chorus', content: 'Test content' }]
    };
    
    const { getByDisplayValue } = render(
      <SongForm song={mockSong} onSave={() => {}} onCancel={() => {}} />
    );
    
    expect(getByDisplayValue('Test Song')).toBeInTheDocument();
    expect(getByDisplayValue('Test Artist')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeInTheDocument();
    expect(getByDisplayValue('Test content')).toBeInTheDocument();
  });
});

// DONE