/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'i.pinimg.com',
      'shimmering-cart.com',
    ],
  },
}

module.exports = nextConfig
