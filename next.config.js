/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',                 // tells Next to create /out
    images: { unoptimized: true },    // required for static export
    // Optional but removes warnings:
    // experimental: { optimizePackageImports: [] },
  };
  
  export default nextConfig;
  