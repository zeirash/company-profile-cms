import { getProducts } from '@/lib/api';
import Image from 'next/image';

export default async function Products() {
  console.log('Products page rendering...');
  const products = await getProducts();
  console.log('Products fetched:', products);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-[300px]">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.images[0].formats.medium.url}`}
                    alt={product.images[0].formats.medium.name || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-primary font-bold">{product.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
