import { readFileSync } from "fs";
import { resolve } from "path";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { ApiAttributes } from "../../src/target-sim/schema-resources";
import { Simulator } from "../../src/testing";
import { SimApp } from "../sim-app";

test("website is serving static pages", async () => {
  // GIVEN
  const app = new SimApp();
  const website = cloud.Website._newWebsite(app, "website", {
    path: resolve(__dirname, "website"),
  });

  // WHEN
  const s = await app.startSimulator();
  const websiteUrl = getWebsiteUrl(s, "/website");

  const indexPage = await fetch(websiteUrl);
  const aPage = await fetch(`${websiteUrl}/b.html`);
  const bPage = await fetch(`${websiteUrl}/inner-folder/a.html`);

  // THEN
  await s.stop();
  expect(await indexPage.text()).toEqual(
    readFileSync(resolve(__dirname, "website/index.html"), {
      encoding: "utf-8",
    })
  );
  expect(await aPage.text()).toEqual(
    readFileSync(resolve(__dirname, "website/b.html"), {
      encoding: "utf-8",
    })
  );
  expect(await bPage.text()).toEqual(
    readFileSync(resolve(__dirname, "website/inner-folder/a.html"), {
      encoding: "utf-8",
    })
  );
});

function getWebsiteUrl(s: Simulator, path: string): string {
  const apiAttrs = s.getResourceConfig(path).attrs as ApiAttributes;
  return apiAttrs.url;
}

test("website is serving dynamic json content", async () => {
  // GIVEN
  const jsonConfig = { version: "3.3.5" };
  const jsonPath = "config.json";
  const app = new SimApp();
  const website = cloud.Website._newWebsite(app, "website", {
    path: resolve(__dirname, "website"),
  });
  website.addJson(jsonPath, Object(jsonConfig));

  // WHEN
  const s = await app.startSimulator();
  const websiteUrl = getWebsiteUrl(s, "/website");

  const configPage = await fetch(`${websiteUrl}/${jsonPath}`);

  // THEN
  await s.stop();
  expect(await configPage.json()).toEqual(jsonConfig);
});

test("addJson throws an error for no json path", async () => {
  expect(() => {
    const jsonConfig = { version: "3.3.5" };
    const jsonPath = "not a json Path.csv";
    const app = new SimApp();
    const website = cloud.Website._newWebsite(app, "website", {
      path: resolve(__dirname, "website"),
    });
    website.addJson(jsonPath, Object(jsonConfig));
  }).toThrowError("key must have a .json suffix: csv");
});
