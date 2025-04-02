import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from:', `${API_URL}/products`);
    const response = await axios.get(`${API_URL}/products`);
    console.log('API Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
