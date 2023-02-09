import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "e2e",

  timeout: 60_000,

  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },

  use: {
    headless: true,
  },

  reporter: [["html", { open: "on-failure" }]],
};

export default config;
