import axios from 'axios';

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
    // Debug logs
    console.log('Environment Variables:', {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
      // Log all NEXT_PUBLIC_ variables
      ...Object.fromEntries(
        Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      )
    });

    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      console.warn('NEXT_PUBLIC_STRAPI_API_URL is not set, using fallback URL');
      // Fallback URL for safety
      const fallbackUrl = 'https://company-profile-cms-backend.onrender.com';
      const response = await axios.get(`${fallbackUrl}/api/products?populate=*`);
      return response.data.data;
    }

    const response = await axios.get('https://company-profile-cms-backend.onrender.com/api/products?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        }
      });
    }
    return [];
  }
};
