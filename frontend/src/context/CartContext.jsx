import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ➕ Add item
  const addToCart = (food) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === food._id);

      if (existing) {
        return prev.map(item =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...food, quantity: 1 }];
    });
  };

  // 🔼 Increase
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🔽 Decrease
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // ❌ Remove
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // ⭐⭐ THIS FIXES YOUR ERROR
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart   // ⭐ added
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
