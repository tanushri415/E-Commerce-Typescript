import { AuthenticationResponse, Order, Product } from '../model';

const baseUrl: string = import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE : '/api';
const userBaseUrl: string = `${baseUrl}/users`;
const productsBaseUrl: string = `${baseUrl}/products`;
const cartsBaseUrl: string = `${baseUrl}/carts`;

//userApi
const registerUser = async (username: string, password: string): Promise<AuthenticationResponse> => {
  try {
    const resp = await fetch(`${userBaseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await resp.json();
    console.log(`api------>register user result:`, result);
    return result;
  } catch (error) {
    console.error('something went wrong while registering user!', error);
    throw error;
  }
};

const loginUser = async (username: string, password: string): Promise<AuthenticationResponse> => {
  try {
    const resp = await fetch(`${userBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await resp.json();
    console.log(`api------>Login user result:`, result);
    return result;
  } catch (error) {
    console.error('something went wrong while logging user!', error);
    throw error;
  }
};

//productApi
const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${productsBaseUrl}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('something went wrong while getting all products!', error);
    throw error;
  }
};

const getProductCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${productsBaseUrl}/categories`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('something went wrong while getting all product categories!', error);
    throw error;
  }
};

const getProductsOfSpecificCategory = async (category: string): Promise<Product[]> => {
  try {
    let products: Product[] = [];
    await fetch(`${productsBaseUrl}/category/${category}`)
      .then((res) => res.json())
      .then((data) => (products = data));
    return products;
  } catch (error) {
    console.error('something went wrong while getting all product for category!', error);
    throw error;
  }
};

const getProductByid = async (productId: number): Promise<Product> => {
  try {
    const response = await fetch(`${productsBaseUrl}/${productId}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`something went wrong while getting product with id ${productId}!`, error);
    throw error;
  }
};

//cartApi
const getUserCarts = async (userId: string): Promise<Order[]> => {
  try {
    let carts: Order[] = [];
    await fetch(`${cartsBaseUrl}/user/${userId}`)
      .then((res) => res.json())
      .then((data) => (carts = data));
    return carts;
  } catch (error) {
    console.error(`something went wrong while getting carts for user with id ${userId}!`, error);
    throw error;
  }
};

//constants for export
const userApi = { loginUser, registerUser };
const productApi = {
  getAllProducts,
  getProductCategories,
  getProductsOfSpecificCategory,
  getProductByid,
};
const cartApi = { getUserCarts };

export { userApi, productApi, cartApi };
