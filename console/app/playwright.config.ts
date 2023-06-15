import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "e2e",

  timeout: 5 * 60 * 1000,

  expect: {
    timeout: 1 * 60 * 1000,
    toMatchSnapshot: { threshold: 0.2 },
  },

  use: {
    headless: true,
  },

  reporter: [["html", { open: "on-failure" }]],
};

export default config;
