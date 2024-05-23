/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UNISAT_OPENAPI_KEY:
      "e34e595d5c612b2ab9f26ac24b67a7c6dece7d77e88162a8e98a2d7ad899abf8",
    FEE_ADDRESS:
      "bc1ptgflajc2z55rsqv55778spwalrx3g240vn68yp7a88elwdevt0rqlre4ra",
    FEE: "1000",
    API_ENDPOINT: "https://runesbridgealpha.vercel.app/", // in dev, endpoint should be "http://localhost:3000/"
  },
};

export default nextConfig;
