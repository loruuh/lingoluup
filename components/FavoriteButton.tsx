"use client";

import { useState, useEffect } from "react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/local-storage";

interface FavoriteButtonProps {
  vocabId: string;
}

export default function FavoriteButton({ vocabId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(vocabId));
  }, [vocabId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(vocabId);
      setFavorite(false);
    } else {
      addFavorite(vocabId);
      setFavorite(true);
    }
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 group
        ${favorite
          ? 'bg-secondary/15 border border-secondary/40 hover:bg-secondary/25'
          : 'bg-white/5 border border-white/10 hover:bg-secondary/10 hover:border-secondary/30'
        }
        active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background
      `}
      aria-label={favorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transition-all duration-300 ${
          favorite
            ? "text-secondary fill-secondary scale-110"
            : "text-gray-400 group-hover:text-secondary group-hover:scale-110"
        }`}
        fill={favorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className={`text-sm font-medium transition-colors duration-200 ${favorite ? 'text-secondary' : 'text-gray-400 group-hover:text-secondary'}`}>
        {favorite ? 'Gespeichert' : 'Speichern'}
      </span>
    </button>
  );
}
