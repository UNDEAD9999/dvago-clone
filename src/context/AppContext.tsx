'use client';

import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (item: { id: string | number; name: string; price: any; img: string }) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: { id: string | number; name: string; price: any; img: string }) => {
    setCart((prev) => {
      const existing = prev.find((i) => String(i.id) === String(item.id));
      if (existing) {
        return prev.map((i) =>
          String(i.id) === String(item.id) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, price: Number(item.price) || 0, quantity: 1 }];
    });
    alert(`"${item.name}" added to cart successfully!`);
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      searchQuery,
      setSearchQuery,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}