import { test, describe, expect, vi } from "vitest";
import { join } from "node:path";
import { Platform } from "../src/index.js";
import { cloud, platform } from "@winglang/sdk";
import { App as SimApp } from "@winglang/sdk/lib/target-sim/app";

import { Platform as SimPlatform } from "@winglang/sdk/lib/target-sim/platform";

describe("compatibility spy", async () => {
  let spyPlatform = new Platform();

  vi.spyOn(spyPlatform, "newInstance");

  const manager = new platform.PlatformManager({
    platformPaths: ["sim", join(__dirname, "../src")],
  });

  //@ts-expect-error- accessing private method
  vi.spyOn(manager, "loadPlatformPath").mockImplementation(
    //@ts-expect-error- accessing private method
    (platformPath: string) => {
      //@ts-expect-error- accessing private property
      manager.platformInstances.push(
        platformPath === "sim" ? new SimPlatform() : spyPlatform
      );
    }
  );

  const app = manager.createApp({
    entrypointDir: __dirname,
  }) as SimApp;

  test("app overrides and hooks set correctly", () => {
    expect(app._newInstanceOverrides.length).toBe(1);
    //@ts-expect-error - _synthHooks is protected
    expect(app._synthHooks?.preSynthesize.length).toBe(1);
  });

  const bucket = app.newAbstract(
    cloud.BUCKET_FQN,
    app,
    "bucket"
  ) as cloud.Bucket;

  bucket.addObject("a", "b");
  // @ts-expect-error- accessing private property
  bucket.public;

  test("each new instance is wrapped in a proxy", () => {
    expect(spyPlatform.newInstance).toBeCalledTimes(1);
    expect(spyPlatform._usageContext.get("Bucket")).toEqual(
      new Set(["addObject", "initialObjects", "public"])
    );
  });
});
