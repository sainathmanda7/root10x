import React, { useEffect, useRef } from 'react';

const AsciiAvatar = ({ imagePath = '/avatar.jpg' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      // 1. Set the resolution of the ASCII grid
      // 100 columns is a good baseline. Higher = more detail but smaller text.
      const cols = 100;
      const aspect = img.height / img.width;
      // Multiply by 0.5 to fix the stretching caused by font height vs width
      const rows = Math.floor(cols * aspect * 0.5); 

      // 2. Define character dimensions (Monospace is mandatory here)
      const charWidth = 6;
      const charHeight = 12;
      canvas.width = cols * charWidth;
      canvas.height = rows * charHeight;

      // 3. Create an offscreen canvas to extract raw pixel data
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      offCanvas.width = cols;
      offCanvas.height = rows;
      offCtx.drawImage(img, 0, 0, cols, rows);
      const imageData = offCtx.getImageData(0, 0, cols, rows).data;

      // 4. Configure the terminal style
      ctx.font = `${charHeight}px monospace`;
      ctx.textBaseline = 'top';
      // Classic terminal green against a dark background
      ctx.fillStyle = '#00FF41'; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 5. The Density String (Maps darkness to lightness)
      // Space is the darkest, '@' is the lightest/densest
      const density = ' _.,-=+:;cba!?0123456789$W#@Ñ';

      // 6. Map pixels to characters and draw
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = (y * cols + x) * 4;
          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          
          // Calculate average brightness
          const brightness = (r + g + b) / 3;
          
          // Map brightness (0-255) to the density string index
          const charIndex = Math.floor((brightness / 255) * (density.length - 1));
          const char = density[charIndex];

          ctx.fillText(char, x * charWidth, y * charHeight);
        }
      }
    };
  }, [imagePath]);

  // Wrappers enforce left-alignment and strip out unnecessary UI bloat
  return (
    <div className="w-full flex justify-start overflow-hidden">
      <canvas ref={canvasRef} className="bg-transparent block"></canvas>
    </div>
  );
};

export default AsciiAvatar;