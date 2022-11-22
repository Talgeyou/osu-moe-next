/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a.ppy.sh",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "assets.ppy.sh",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "osu.ppy.sh",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
