/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use alternate build output directory to bypass locked .next on Windows share
  distDir: '.next_build',
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
