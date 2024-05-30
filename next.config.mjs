/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_DEV: process.env.BASE_URL_DEV,
    BASE_URL_PROD: process.env.BASE_URL_PROD,
  },
};

export default nextConfig;
