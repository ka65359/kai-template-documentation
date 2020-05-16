module.exports = {
  stories: [
    "../src/**/*.stories.js",
    "../src/components/**/*.stories.js",
    "../src/content/**/*.stories.js"
  ],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
            trailingComma: "none"
          }
        }
      }
    }
  ]
};
