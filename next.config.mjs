/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all for now, to be restricted to supabase URL later
      },
    ],
  },
};

export default nextConfig;
