/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "betabuzz-avatars.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "i.pravatar.cc",
      },
      {
        hostname: "ui-avatars.com",
      },
    ],
  },
};

module.exports = nextConfig;
