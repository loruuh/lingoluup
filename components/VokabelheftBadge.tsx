'use client';

import { useEffect, useState } from 'react';
import { getFavorites } from '@/lib/local-storage';

export default function VokabelheftBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initial count
    setCount(getFavorites().length);

    // Update when FavoriteButton dispatches the custom event
    const handleChange = () => setCount(getFavorites().length);
    window.addEventListener('favoritesChanged', handleChange);
    return () => window.removeEventListener('favoritesChanged', handleChange);
  }, []);

  if (count === 0) return null;

  return (
    <div
      className={`
        absolute -top-1.5 -right-1.5
        min-w-[18px] h-[18px]
        flex items-center justify-center
        rounded-full
        text-[10px] font-bold leading-none px-1
        pointer-events-none z-20
        ${count >= 20
          ? 'bg-lime-500 text-black animate-pulse-strong'
          : 'bg-red-500 text-white'
        }
      `}
    >
      {count}
    </div>
  );
}
