import { useEffect, useRef } from "react";
import confetti from 'canvas-confetti';
import useMediaQuery from "@/hooks/useMediaQuery";

const FallingLeaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        const baseSize = 0.8;
        const sizeVariation = 0.4;
        const particleSize = baseSize + Math.random() * sizeVariation;

        myConfetti({
          particleCount: isDesktop ? 3 : 1,
          startVelocity: 0,
          ticks: 500,
          origin: {
            x: Math.random(),
            y: -0.1
          },
          colors: [colors[Math.floor(Math.random() * colors.length)]],
          shapes: ['circle'],
          gravity: 0.15,
          scalar: particleSize,
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
    />
  );
};

export default FallingLeaves;