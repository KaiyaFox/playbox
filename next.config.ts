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
            },
            {
                protocol: 'https',
                hostname: 'en.wikipedia.org',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.thesprucepets.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                pathname: '**',
            }
        ],
    },
};

export default nextConfig;
