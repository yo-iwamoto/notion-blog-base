/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  swcMinify: true,
  pageExtensions: ['page.tsx'],
  experimental: {
    outputStandalone: true,
  },
};
