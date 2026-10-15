import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gotravel_cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('gotravel_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.type === item.type);
      if (exists) {
        return prev.map(i => i.id === item.id && i.type === item.type
          ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItem = (id, type) => setItems(prev => prev.filter(i => !(i.id === id && i.type === type)));

  const updateQuantity = (id, type, quantity) => {
    if (quantity <= 0) { removeItem(id, type); return; }
    setItems(prev => prev.map(i => (i.id === id && i.type === type) ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};

