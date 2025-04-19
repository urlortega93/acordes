import React, { useState } from 'react';

const SongForm = ({ song = null, onSave, onCancel }) => {
  // Valores por defecto para nueva canción
  const defaultSong = {
    title: '',
    artist: '',
    bpm: 120,
    sections: [{ type: 'verse', content: '' }]
  };

  // Inicializar formData con la canción proporcionada o valores por defecto
  const [formData, setFormData] = useState(song || defaultSong);
  const [errors, setErrors] = useState({
    title: false,
    artist: false,
    sections: [false]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'bpm' ? Number(value) : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index][field] = value;
    setFormData({ ...formData, sections: newSections });
    
    if (errors.sections[index]) {
      const newErrors = [...errors.sections];
      newErrors[index] = false;
      setErrors({ ...errors, sections: newErrors });
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { type: 'verse', content: '' }]
    });
    setErrors({
      ...errors,
      sections: [...errors.sections, false]
    });
  };

  const removeSection = (index) => {
    if (formData.sections.length > 1) {
      const newSections = [...formData.sections];
      newSections.splice(index, 1);
      setFormData({ ...formData, sections: newSections });
      
      const newErrors = [...errors.sections];
      newErrors.splice(index, 1);
      setErrors({ ...errors, sections: newErrors });
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === '',
      artist: formData.artist.trim() === '',
      sections: formData.sections.map(section => section.content.trim() === '')
    };

    setErrors(newErrors);

    return !(newErrors.title || newErrors.artist || newErrors.sections.some(e => e));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí agregamos la lógica para guardar la canción en el backend
      try {
        const response = await fetch('/api/songs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Canción guardada con éxito');
          onSave(formData);  // Llamada para actualizar el estado o la lista de canciones
        } else {
          console.error('Error al guardar la canción');
        }
      } catch (error) {
        console.error('Error al guardar la canción:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-600">
          <h2 className="text-2xl font-bold text-white">
            {song ? 'Editar Canción' : 'Nueva Canción'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block mb-2 ${errors.title ? 'text-red-500' : 'text-gray-700'}`}>
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nombre de la canción"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
            </div>
            
            <div>
              <label className={`block mb-2 ${errors.artist ? 'text-red-500' : 'text-gray-700'}`}>
                Artista *
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${errors.artist ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nombre del artista"
              />
              {errors.artist && <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700">BPM</label>
              <input
                type="number"
                name="bpm"
                min="40"
                max="300"
                value={formData.bpm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Secciones de la canción *</h3>
            
            {formData.sections.map((section, index) => (
              <div key={index} className={`mb-4 p-4 border rounded-lg ${errors.sections[index] ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="flex justify-between items-center mb-3">
                  <select
                    value={section.type}
                    onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg"
                  >
                    <option value="verse">Estrofa</option>
                    <option value="chorus">Coro</option>
                    <option value="bridge">Puente</option>
                    <option value="intro">Intro</option>
                    <option value="outro">Outro</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
                
                <textarea
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg min-h-[100px] ${errors.sections[index] ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={`Escribe la ${section.type} (ej: [C] Hola [G]mundo)`}
                />
                {errors.sections[index] && (
                  <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
            >
              + Añadir Sección
            </button>
          </div>

          <div className="flex justify-between border-t pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colores"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colores"
            >
              Guardar Canción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;
