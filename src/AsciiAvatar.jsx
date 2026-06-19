import React from 'react';

const AsciiAvatar = ({ imagePath = '/avatar.png' }) => {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <img src={imagePath} alt="Avatar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
    </div>
  );
};

export default AsciiAvatar;