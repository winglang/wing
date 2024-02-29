import type { Page } from "@playwright/test";

export const getResourceNode = (page: Page, path: string) => {
  return page.locator(
    `[data-testid=map-pane] [data-testid='map-node:${path}']`,
  );
};
