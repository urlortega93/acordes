import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">ChordMaster</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>Canciones</li>
            <li>Playlists</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;