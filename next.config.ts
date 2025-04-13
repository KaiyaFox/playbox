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
                hostname: 'dummyimage.com',
                pathname: '**',
            }
        ],
    },
};

export default nextConfig;
