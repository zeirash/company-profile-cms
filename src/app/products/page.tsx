import { getProducts, getCategories, getProductsByCategory } from '@/lib/api';
// import Image from 'next/image';
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';

// Force dynamic rendering - page will be rendered at request time
export const dynamic = 'force-dynamic';
// Disable static generation
export const revalidate = 0;

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const categoryId = searchParams.category as string;

  const [products, categories] = await Promise.all([
    categoryId ? getProductsByCategory(categoryId) : getProducts(),
    getCategories()
  ]);

  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          href="/products"
          className={`px-6 py-2 rounded-full transition-colors ${
            !categoryId
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.documentId}`}
            className={`px-6 py-2 rounded-full transition-colors ${
              categoryId === category.documentId
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow max-w-[240px] mx-auto w-full"
          >
            <div className="relative w-full h-[180px]">
              {product.images && product.images.length > 0 ? (
                <ImageSlider
                  images={product.images.map((image) => ({
                    src: isProduction ? image.formats.medium.url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.formats.medium.url}`,
                    alt: product.name,
                  }))}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <p className="text-primary font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
