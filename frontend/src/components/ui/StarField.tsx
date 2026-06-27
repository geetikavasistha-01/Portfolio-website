import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { gsap } from 'gsap';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  phase: number;
  speed: number;
  glow: boolean;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 40;

    const colors = [
      { rgb: '124, 58, 237', hex: '#7c3aed' }, // purple
      { rgb: '37, 99, 235', hex: '#2563eb' },  // blue
      { rgb: '236, 72, 153', hex: '#ec4899' }  // pink
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const colorObj = colors[Math.floor(Math.random() * colors.length)];
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 1 + Math.random() * 1.5, // 1 to 2.5px
          color: colorObj.rgb,
          glowColor: colorObj.hex,
          phase: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.03,
          glow: Math.random() > 0.7 // 30% stars have glow
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const opacityScale = isDark ? 1.0 : 0.25;

      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.phase += star.speed;
        }

        const opacity = (0.2 + (Math.sin(star.phase) + 1) * 0.25) * opacityScale;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;

        if (star.glow && isDark) {
          ctx.shadowBlur = 4 + (Math.sin(star.phase) + 1) * 2;
          ctx.shadowColor = star.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      // We hook into GSAP's ticker or requestAnimationFrame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
