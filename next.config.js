/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'cms-product-image.s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-product-image.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
