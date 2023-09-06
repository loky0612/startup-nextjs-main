/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/videos/', // You can configure the output path
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;

