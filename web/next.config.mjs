/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "betabuzz-avatars.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
}

export default nextConfig
