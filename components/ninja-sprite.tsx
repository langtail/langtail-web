"use client"

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type NinjaState = 'idle' | 'attack' | 'run';

interface NinjaSpriteProps {
  state: NinjaState;
  className?: string;
}

export function NinjaSprite({ state, className = '' }: NinjaSpriteProps) {
  const [frame, setFrame] = useState(0);
  
  const frames = {
    idle: 4,
    attack: 3,
    run: 6
  };

  const frameSpeed = {
    idle: 300,
    attack: 150,
    run: 100
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(current => (current + 1) % frames[state]);
    }, frameSpeed[state]);

    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className={cn(
      'relative transition-transform duration-300',
      state === 'attack' && 'scale-125',
      state === 'run' && 'translate-x-4',
      className
    )}>
      <div className="relative w-32 h-32">
        <img 
          src={`/images/${state}_${frame}.png`}
          alt={`Ninja ${state} animation`}
          className={cn(
            'w-full h-full object-contain',
            'transition-all duration-200',
            state === 'attack' && 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
            state === 'run' && 'animate-bounce'
          )}
          style={{
            imageRendering: 'pixelated'
          }}
        />
        {state === 'attack' && (
          <div className="absolute inset-0 animate-pulse bg-red-500/20 rounded-full blur-xl" />
        )}
      </div>
    </div>
  );
}