import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
} satisfies StorybookConfig;
