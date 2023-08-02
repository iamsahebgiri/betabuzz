/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "wsrv.nl",
      },
      {
        hostname: "betabuzz-avatars.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "ui-avatars.com",
      },
      {
        hostname: "icons.bitwarden.net",
      },
    ],
  },
};

module.exports = nextConfig;
