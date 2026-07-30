const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    // TODO: adicionar o hostname do bucket Hetzner Object Storage aqui assim que for provisionado.
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'd23spvk2eturf4.cloudfront.net' },
      { protocol: 'https', hostname: 'unitok.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'development-adbat.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'del3lo544i2y2.cloudfront.net' },
      { protocol: 'http', hostname: 'development-adbat.s3-website-us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'unitok-dev.s3.sa-east-1.amazonaws.com' },
    ],
    deviceSizes: [320, 640, 768, 992, 1024, 1200, 1360, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/embaixadores',
        destination: '/404',
        permanent: false,
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    // TypeScript 7 (native/Go compiler) doesn't expose the classic Program API
    // Next.js 16 uses by default; this flag makes it shell out to the `tsc` CLI instead.
    useTypeScriptCli: true
  },
  transpilePackages: ['react-donut-chart']
})
