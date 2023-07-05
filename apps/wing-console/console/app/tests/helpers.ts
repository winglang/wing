import { Page } from "@playwright/test";

export const getNodeLocator = (page: Page, path: string) => {
  return page.locator(
    `[data-testid=map-pane] [data-testid='map-node:${path}']`,
  );
};
