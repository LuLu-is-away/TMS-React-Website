/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing 'images' configuration
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
  
  // ------------------------------------------------------------------
  // ✅ FIX: ADD THIS SECTION TO RESOLVE TURBOPACK/GAMEDIG BUILD FAILURE
  // ------------------------------------------------------------------
  experimental: {
    // This instructs Next.js to treat the 'gamedig' module as an external dependency 
    // that should NOT be bundled by Turbopack, thus resolving the dynamic import error.
    serverComponentsExternalPackages: ['gamedig'],
  },
  // ------------------------------------------------------------------
};

module.exports = nextConfig;