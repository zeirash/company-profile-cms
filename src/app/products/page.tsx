import { getProducts, getCategories, getProductsByCategory } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';
import { Metadata } from 'next';

// Force dynamic rendering - page will be rendered at request time
export const dynamic = 'force-dynamic';
// Disable static generation
export const revalidate = 0;

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// The generateMetadata function is a special Next.js function that is automatically used by the Next.js framework to generate metadata for the page.
// You don't need to call it explicitly - Next.js will call it automatically when the page is rendered.
export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const categoryId = searchParams.category as string;
  const categories = await getCategories();
  const selectedCategory = categories.find(cat => cat.documentId === categoryId);

  return {
    title: selectedCategory ? `Produk ${selectedCategory.name}` : 'Semua Produk',
    description: selectedCategory
      ? `Jelajahi koleksi produk ${selectedCategory.name} kami. Temukan produk berkualitas dengan harga terjangkau.`
      : 'Jelajahi koleksi lengkap produk kami. Temukan berbagai produk berkualitas di semua kategori.',
    openGraph: {
      title: selectedCategory ? `Produk ${selectedCategory.name}` : 'Semua Produk',
      description: selectedCategory
        ? `Jelajahi koleksi produk ${selectedCategory.name} kami. Temukan produk berkualitas dengan harga terjangkau.`
        : 'Jelajahi koleksi lengkap produk kami. Temukan berbagai produk berkualitas di semua kategori.',
    },
  };
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const categoryId = searchParams.category as string;

  const [products, categories] = await Promise.all([
    categoryId ? getProductsByCategory(categoryId) : getProducts(),
    getCategories()
  ]);

  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

  // Generate structured data for products
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images?.[0]?.formats?.medium?.url
          ? (isProduction ? product.images[0].formats.medium.url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.images[0].formats.medium.url}`)
          : undefined,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Produk Kami</h1>

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
            Semua
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
                    <span className="text-gray-400">Tidak ada gambar</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                {product.price && (
                  <p className="text-primary font-bold">{formatCurrency(Number(product.price))}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
