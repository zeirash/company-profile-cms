import axios from 'axios';

// Cache for product images
const productImageCache = new Map<string, ProductImage[]>();

export interface Category {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: Product[]; // this field won't be populated if the call was from Products API
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: ProductImage[];
  category: Category;
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

// Helper function to update image cache
const updateImageCache = (products: Product[]) => {
  products.forEach(product => {
    if (product.images) {
      productImageCache.set(product.documentId, product.images);
    }
  });
};

// Helper function to get images from cache
const getImagesFromCache = (productId: string): ProductImage[] | undefined => {
  return productImageCache.get(productId);
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`);
    const products = response.data.data;
    updateImageCache(products);
    return products;
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

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories/${categoryId}?populate=*`);
    const products = response.data.data.products;

    // Update products with cached images if available
    const productsWithCachedImages = products.map((product: Product) => {
      const cachedImages = getImagesFromCache(product.documentId);
      if (cachedImages) {
        return { ...product, images: cachedImages };
      }
      return product;
    });

    return productsWithCachedImages;
  } catch (error) {
    console.error('Error fetching products by category:', error);
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
