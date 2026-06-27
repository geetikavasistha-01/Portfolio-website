"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
}

export const SparklesCore = ({
  id = "tsparticlesfullpage",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "w-full h-full",
  particleColor = "#FFFFFF",
  speed = 1,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      speedX: number;
      fadeSpeed: number;
    }> = [];

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      // Calculate particle count based on density and area
      const count = Math.floor((width * height * particleDensity) / 600000) || 40;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random(),
          speedY: (Math.random() - 0.5) * 0.08 * speed,
          speedX: (Math.random() - 0.5) * 0.08 * speed,
          fadeSpeed: 0.003 + Math.random() * 0.007,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Determine active color
      let colorValue = particleColor;
      const isDark = document.documentElement.classList.contains("dark");
      
      // Auto-invert white color in light mode so particles stay visible
      if (!isDark && (colorValue.toUpperCase() === "#FFFFFF" || colorValue.toUpperCase() === "#FFF")) {
        colorValue = "#27272a"; // dark zinc
      }

      // Parse color to RGB values
      let rgbStr = "255, 255, 255";
      if (colorValue.startsWith("#")) {
        const hex = colorValue.replace("#", "");
        let r = 255, g = 255, b = 255;
        if (hex.length === 3) {
          r = parseInt(hex[0] + hex[0], 16);
          g = parseInt(hex[1] + hex[1], 16);
          b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }
        rgbStr = `${r}, ${g}, ${b}`;
      } else if (colorValue.startsWith("rgb")) {
        const match = colorValue.match(/\d+/g);
        if (match && match.length >= 3) {
          rgbStr = `${match[0]}, ${match[1]}, ${match[2]}`;
        }
      }

      particles.forEach((p) => {
        // Update opacity (flicker/twinkle)
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.95 || p.opacity < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Update position (drift)
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around borders
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbStr}, ${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [minSize, maxSize, particleDensity, particleColor, speed]);

  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id={id}
      ref={canvasRef}
      className={className}
      style={{
        background,
      }}
    />
  );
};
