/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steamcdn-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'avatars.akamai.steamstatic.com', // Common alternate Steam domain
      },
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
      },
    ],
  },
};

module.exports = nextConfig;