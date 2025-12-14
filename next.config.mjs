/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Em produção, mantenha false para detectar erros
    // No Vercel, sempre false para garantir qualidade
    ignoreBuildErrors: false,
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
