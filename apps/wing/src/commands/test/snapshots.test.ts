import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SnapshotMode, determineSnapshotMode } from "./snapshots";

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
