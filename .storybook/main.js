const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  staticDirs: ["../public"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-contexts/register",
    "storybook-addon-next",
    "storybook-react-intl",
  ],

  framework: "@storybook/react",

  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },

  webpackFinal: async (config) => {
    const svgRule = config.module.rules.find((rule) => rule.test.test(".svg"))

    svgRule.exclude = /.\.svg$/

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ]

    return config
  },
}
