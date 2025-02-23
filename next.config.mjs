/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
  ignoreBuildErrors: true,
};

export default nextConfig;
