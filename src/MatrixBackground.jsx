import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 1. Make canvas fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 16;
    // Calculate how many columns we need based on screen width
    const columns = canvas.width / fontSize;

    // Array to track the Y-coordinate of each column
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // 2. The Trail Effect
      // Drawing a translucent black rectangle over the canvas creates the fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. The Binary Rain
      ctx.fillStyle = '#FFFFFF'; // Pure white binary
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random 0 or 1
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top randomly to stagger the rain
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    };

    // Run the animation loop every 50ms
    const interval = setInterval(draw, 50);

    // Prevent distortion if the user resizes the browser
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 4. The Layering Magic
  // 'fixed', 'top-0', and '-z-10' completely decouple this canvas from the document flow
  // and pin it behind everything else.
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
    ></canvas>
  );
};

export default MatrixBackground;