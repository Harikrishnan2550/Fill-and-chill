/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },

      // local dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },

      // ✅ production backend (Render)
      {
        protocol: "https",
        hostname: "fill-and-chill.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;