/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Em produção, mantenha false para detectar erros
    // Em desenvolvimento, pode ser true temporariamente
    ignoreBuildErrors: process.env.NODE_ENV === 'production' ? false : true,
  },
  images: {
    unoptimized: true,
  },
  // Adiciona headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig
