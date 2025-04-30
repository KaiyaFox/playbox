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
                hostname: 'scontent-lhr6-2.xx.fbcdn.net',
                pathname: '**',
            }
        ],
    },
};

export default nextConfig;
