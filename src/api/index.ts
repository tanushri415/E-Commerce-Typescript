const baseUrl: string = import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : '/api';
const userBaseUrl: string = `${baseUrl}/users`;
const productsBaseUrl: string = `${baseUrl}/products`;
const cartsBaseUrl: string = `${baseUrl}/carts`;

//userApi
const registerUser = async (
  username: string,
  password: string
): Promise<any> => {
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
  }
};

const loginUser = async (username: string, password: string): Promise<any> => {
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
  }
};

//productApi
const getAllProducts = async (): Promise<any[]> => {
  try {
    var products: any[] = [];
    await fetch(productsBaseUrl)
      .then((res) => res.json())
      .then((data) => (products = data));
    return products;
  } catch (error) {
    console.error('something went wrong while getting all products!', error);
  }
};

const getProductCategories = async (): Promise<string[]> => {
  try {
    var productCategories: string[] = [];
    await fetch(`${productsBaseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => (productCategories = data));
    return productCategories;
  } catch (error) {
    console.error(
      'something went wrong while getting all product categories!',
      error
    );
  }
};

const getProductsOfSpecificCategory = async (
  category: string
): Promise<any[]> => {
  try {
    var products: any[] = [];
    await fetch(`${productsBaseUrl}/category/${category}`)
      .then((res) => res.json())
      .then((data) => (products = data));
    return products;
  } catch (error) {
    console.error(
      'something went wrong while getting all product for category!',
      error
    );
  }
};

const getProductByid = async (productId: string): Promise<any[]> => {
  try {
    var product: any[] = [];
    await fetch(`${productsBaseUrl}/${productId}`)
      .then((res) => res.json())
      .then((data) => (product = data));
    return product;
  } catch (error) {
    console.error(
      `something went wrong while getting product with id ${productId}!`,
      error
    );
  }
};

//cartApi
const getUserCarts = async (userId: string): Promise<any[]> => {
  try {
    var carts: any[] = [];
    await fetch(`${cartsBaseUrl}/user/${userId}`)
      .then((res) => res.json())
      .then((data) => (carts = data));
    return carts;
  } catch (error) {
    console.error(
      `something went wrong while getting carts for user with id ${userId}!`,
      error
    );
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
