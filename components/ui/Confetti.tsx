'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

export function Confetti({ duration = 2000 }: { duration?: number }) {
  const [particles, setParticles] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981'];
    const newParticles: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.3,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: '-10%',
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '110%',
            rotate: particle.rotation * 3,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: duration / 1000,
            delay: particle.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
