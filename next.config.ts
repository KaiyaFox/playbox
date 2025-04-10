import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '**',

            },
            {
                protocol: 'https',
                hostname: 'example.com',
                pathname: '**',
            }
        ],
    },
};

export default nextConfig;
