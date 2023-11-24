/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n,
  publicRuntimeConfig: {
    API_BASEURL: process.env.API_BASEURL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
