import { createContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../../model';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  removeProductFromCart: (item: Product) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []
  );

  const addToCart = (item: Product) => {
    console.log(item);
    const isItemInCart = cartItems.find((cartItem) => cartItem.productId === item.id);
    console.log(isItemInCart);
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productId === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      console.log('product for forst time', item);
      setCartItems([...cartItems, { product: { ...item }, quantity: 1, productId: item.id }]);
    }
  };

  const removeFromCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.productId === item.id);

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.productId !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productId === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  };

  const removeProductFromCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.productId === item.id);

    if (isItemInCart && isItemInCart.quantity >= 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.productId !== item.id));
    } else {
      //do nothing
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return Number(cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2));
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
