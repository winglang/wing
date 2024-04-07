import { readFile, readdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SnapshotMode, captureSnapshot, determineSnapshotMode } from "./snapshots";
import { generateTmpDir } from "src/util";

const prevCI = process.env.CI;

describe("determineSnapshotMode", () => {
  beforeEach(() => {
    delete process.env.CI;
  });

  afterEach(() => {
    process.env.CI = prevCI;
  });

  test("--snapshots=never", () => {
    expect(
      determineSnapshotMode("tf-aws", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.NEVER,
      })
    ).toBe(SnapshotMode.NEVER);
  });

  test("--snapshots=dry", () => {
    expect(
      determineSnapshotMode("tf-aws", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.UPDATE,
      })
    ).toBe(SnapshotMode.UPDATE);
  });

  test("--snapshots=deploy", () => {
    expect(
      determineSnapshotMode("tf-aws", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.DEPLOY,
      })
    ).toBe(SnapshotMode.DEPLOY);
  });

  test("target=sim always disables (even if explicitly set)", () => {
    expect(
      determineSnapshotMode("sim", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.DEPLOY,
      })
    ).toBe(SnapshotMode.NEVER);

    expect(
      determineSnapshotMode("sim", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.ASSERT,
      })
    ).toBe(SnapshotMode.NEVER);

    expect(
      determineSnapshotMode("sim", {
        clean: false,
        platform: [],
        snapshots: SnapshotMode.UPDATE,
      })
    ).toBe(SnapshotMode.NEVER);
  });

  describe("--snapshots=auto", () => {
    describe("CI=1", () => {
      beforeEach(() => {
        process.env.CI = "1";
      });

      test("sim => disabled", () => {
        expect(
          determineSnapshotMode("sim", {
            clean: false,
            platform: [],
          })
        ).toBe(SnapshotMode.NEVER);
      });

      test("non sim => assert", () => {
        expect(
          determineSnapshotMode("tf-azure", {
            clean: false,
            snapshots: SnapshotMode.AUTO,
            platform: [],
          })
        ).toBe(SnapshotMode.ASSERT);
      });
    });

    describe("not in CI", () => {
      test("sim => disabled", () => {
        expect(
          determineSnapshotMode("sim", {
            clean: false,
            platform: [],
          })
        ).toBe(SnapshotMode.NEVER);
      });
      test("non sim => deploy", () => {
        expect(
          determineSnapshotMode("tf-azure", {
            clean: false,
            platform: [],
          })
        ).toBe(SnapshotMode.DEPLOY);
      });
    });
  });
});

describe("captureSnapshot", async () => {
  async function makeEntrypoint() {
    const workdir = await generateTmpDir();
    const entrypoint = join(workdir, "main.w");

    await writeFile(
      entrypoint,
      `
      bring cloud;
      new cloud.Bucket();
    `
    );

    return entrypoint;
  }

  const expected = await readFile(join(__dirname, "fixtures", "main.w.tf-aws.snap.md"), "utf-8");

  test("skip if snapshots are disabled", async () => {
    const entrypoint = await makeEntrypoint();
    await captureSnapshot(entrypoint, "tf-aws", {
      clean: false,
      platform: ["tf-aws"],
      snapshots: SnapshotMode.NEVER,
    });

    expect(await readdir(dirname(entrypoint))).toEqual(["main.w"]);
  });

  test("snapshots are created for UPDATE", async () => {
    const entrypoint = await makeEntrypoint();
    await captureSnapshot(entrypoint, "tf-aws", {
      clean: false,
      platform: ["tf-aws"],
      snapshots: SnapshotMode.UPDATE,
    });

    const snapshot = await readFile(join(dirname(entrypoint), "main.w.tf-aws.snap.md"), "utf-8");
    expect(snapshot).toStrictEqual(expected);
  });

  test("snapshots are created for DEPLOY", async () => {
    const entrypoint = await makeEntrypoint();
    await captureSnapshot(entrypoint, "tf-aws", {
      clean: false,
      platform: ["tf-aws"],
      snapshots: SnapshotMode.DEPLOY,
    });

    const snapshot = await readFile(join(dirname(entrypoint), "main.w.tf-aws.snap.md"), "utf-8");
    expect(snapshot).toStrictEqual(expected);
  });

  test("ASSERT fails if there is no existing snapshot", async () => {
    const entrypoint = await makeEntrypoint();

    await expect(
      captureSnapshot(entrypoint, "tf-aws", {
        clean: false,
        platform: ["tf-aws"],
        snapshots: SnapshotMode.ASSERT,
      })
    ).rejects.toThrowError(/Snapshot file does not exist/);
  });

  test("ASSERT fails if snapshot does not match", async () => {
    const entrypoint = await makeEntrypoint();

    await writeFile(
      join(dirname(entrypoint), "main.w.tf-aws.snap.md"),
      expected.replace(`"force_destroy": false`, `"force_destroy": true`)
    );

    await expect(
      captureSnapshot(entrypoint, "tf-aws", {
        clean: false,
        platform: ["tf-aws"],
        snapshots: SnapshotMode.ASSERT,
      })
    ).rejects.toThrowError(/\+        "force_destroy": false/);
  });

  test("ASSERT succeeds if snapshots match", async () => {
    const entrypoint = await makeEntrypoint();

    await writeFile(join(dirname(entrypoint), "main.w.tf-aws.snap.md"), expected);

    await captureSnapshot(entrypoint, "tf-aws", {
      clean: false,
      platform: ["tf-aws"],
      snapshots: SnapshotMode.ASSERT,
    });
  });
});
