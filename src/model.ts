interface AuthenticationResponse {
  user: User;
  message: string;
  token: string;
  error: string;
  name: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

interface OrderResponse {
  orders: Order[];
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  rating: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface Order {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

export type {
  AuthenticationResponse,
  OrderResponse,
  User,
  Product,
  CartItem,
  Order,
};
