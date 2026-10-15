import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gotravel_favorites') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('gotravel_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id && f.type === item.type);
      if (exists) return prev.filter(f => !(f.id === item.id && f.type === item.type));
      return [...prev, item];
    });
  };

  const isFavorite = (id, type) => favorites.some(f => f.id === id && f.type === type);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
};

