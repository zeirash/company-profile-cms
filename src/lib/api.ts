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
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  documentId: string;
  formats: {
    thumbnail: ProductImageFormat;
    large: ProductImageFormat;
    small: ProductImageFormat;
    medium: ProductImageFormat;
  };
}

export interface ProductImageFormat {
  name: string;
  ext: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products?populate=*`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
