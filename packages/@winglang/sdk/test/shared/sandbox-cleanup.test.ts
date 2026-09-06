import { writeFileSync, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { expect, test } from "vitest";
import { Sandbox } from "../../src/shared/sandbox";

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Regression for https://github.com/winglang/wing/issues/6861:
 * Detached sandbox children that ignore SIGTERM must be escalated to SIGKILL
 * so they cannot outlive the parent and burn 100% CPU.
 */
test(
  "cleanup escalates to SIGKILL when child ignores SIGTERM",
  { timeout: 15_000 },
  async () => {
    const dir = mkdtempSync(join(tmpdir(), "wing-sandbox-"));
    const entry = join(dir, "busy.cjs");
    writeFileSync(
      entry,
      `
      process.on("SIGTERM", () => {});
      setInterval(() => {}, 1000);
      `,
    );

    const sandbox = new Sandbox(entry);
    await sandbox.initialize();
    const pid = (sandbox as any).childPid as number;
    expect(pid).toBeTypeOf("number");

    // Give the child time to install its SIGTERM handler.
    await new Promise((r) => setTimeout(r, 200));
    expect(isAlive(pid)).toBe(true);

    const started = Date.now();
    await sandbox.cleanup();
    const elapsed = Date.now() - started;

    // Should have waited for the grace period before SIGKILL.
    expect(elapsed).toBeGreaterThanOrEqual(1_500);
    expect(elapsed).toBeLessThan(8_000);

    await new Promise((r) => setTimeout(r, 200));
    expect(isAlive(pid)).toBe(false);
  },
);

test(
  "cleanup reaps a normal detached child promptly",
  { timeout: 10_000 },
  async () => {
    const dir = mkdtempSync(join(tmpdir(), "wing-sandbox-"));
    const entry = join(dir, "idle.cjs");
    writeFileSync(
      entry,
      `
      setInterval(() => {}, 1000);
      `,
    );

    const sandbox = new Sandbox(entry);
    await sandbox.initialize();
    const pid = (sandbox as any).childPid as number;

    await new Promise((r) => setTimeout(r, 100));

    const started = Date.now();
    await sandbox.cleanup();
    const elapsed = Date.now() - started;

    expect(elapsed).toBeLessThan(2_000);

    await new Promise((r) => setTimeout(r, 200));
    expect(isAlive(pid)).toBe(false);
  },
);
