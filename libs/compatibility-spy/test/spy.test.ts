import { test, describe, expect, vi } from "vitest";
import { join } from "node:path";
import { Platform } from "../src";
import { cloud, platform } from "@winglang/sdk";
import { App as SimApp } from "@winglang/sdk/lib/target-sim/app";

import { Platform as SimPlatform } from "@winglang/sdk/lib/target-sim/platform";

describe("compatibility spy", async () => {
  let spyPlatform = new Platform();

  vi.spyOn(spyPlatform, "newInstance");

  const manager = new platform.PlatformManager({
    platformPaths: ["sim", join(__dirname, "../lib")],
  });

  vi.spyOn(manager, "loadPlatformPath").mockImplementation(
    (platformPath: string) => {
      manager.platformInstances.push(
        platformPath === "sim" ? new SimPlatform() : spyPlatform
      );
    }
  );

  const factory = manager.createPolyconFactory();

  const app = manager.createApp({
    entrypointDir: __dirname,
    polyconFactory: factory,
  }) as SimApp;

  test("app overrides and hooks set correctly", () => {
    expect(factory.newInstanceOverrides.length).toBe(2); // 1 from sim, 1 from spy
    expect(app._synthHooks?.preSynthesize.length).toBe(1);
  });

  const bucket = factory.new(
    cloud.BUCKET_FQN,
    undefined,
    app,
    "bucket"
  ) as cloud.Bucket;

  bucket.addObject("a", "b");
  bucket.public;

  test("each new instance is wrapped in a proxy", () => {
    expect(spyPlatform.newInstance).toBeCalledTimes(1);
    expect(spyPlatform._usageContext.get("Bucket")).toEqual(
      new Set(["addObject"])
    );
  });
});
