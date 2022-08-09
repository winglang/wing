import { mergeConfig } from "vite";
import type { StorybookViteConfig } from "@storybook/builder-vite";
import { alias } from "../vite.config";

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
const config: StorybookViteConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias,
      },
    });
  },
};

export default config;
