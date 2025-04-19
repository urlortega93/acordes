import React from 'react';
import SongForm from './SongForm';

export default {
  title: 'Components/SongForm',
  component: SongForm,
};

const Template = (args) => <SongForm {...args} />;

export const NewSong = Template.bind({});
NewSong.args = {
  onSave: (data) => console.log('Save:', data),
  onCancel: () => console.log('Cancel')
};

export const EditSong = Template.bind({});
EditSong.args = {
  song: {
    title: 'Imagine',
    artist: 'John Lennon',
    bpm: 75,
    sections: [
      { type: 'verse', content: '[C] Imagine all the [G]people' }
    ]
  },
  onSave: (data) => console.log('Save:', data),
  onCancel: () => console.log('Cancel')
};

// DONE