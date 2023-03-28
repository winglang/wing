module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)", "../../design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: "@storybook/react",
};
