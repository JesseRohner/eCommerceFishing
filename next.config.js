const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  output: "standalone",

  include: path.resolve(__dirname, "public/"),

  images: {
    domains: ["media-exp1.licdn.com"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}
