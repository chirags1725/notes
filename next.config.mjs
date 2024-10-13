import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
  // Add any other Next.js configurations here
});

export default nextConfig;
