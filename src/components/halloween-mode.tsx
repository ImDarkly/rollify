import { useEffect, useRef } from "react";
import confetti from 'canvas-confetti';

const HalloweenMode = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    containerRef.current.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const colors = ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'];

    function frame() {
      if (Math.random() < 0.01) {
        const baseSize = 0.8; // Increased base size
        const sizeVariation = 0.4; // Added size variation
        const particleSize = baseSize + Math.random() * sizeVariation;

        myConfetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 500,
          origin: {
            x: Math.random(),
            y: -0.1
          },
          colors: [colors[Math.floor(Math.random() * colors.length)]],
          shapes: ['circle'],
          gravity: 0.15,
          scalar: particleSize, // Use the randomized size
          drift: 0.2,
          zIndex: 50,
        });
      }

      requestAnimationFrame(frame);
    }

    frame();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex z-50 h-screen w-screen pointer-events-none"
    >
    </div>
  );
};

export default HalloweenMode;