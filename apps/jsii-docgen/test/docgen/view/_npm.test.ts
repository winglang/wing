import { ChildProcess, spawn } from "child_process";
import { EventEmitter } from "events";
import { tmpdir } from "os";
import { Readable, Writable } from "stream";
import { vi } from "vitest";
import {
  NoSpaceLeftOnDevice,
  NpmError,
  UnInstallablePackageError,
} from "../../../src";
import { Npm } from "../../../src/docgen/view/_npm";

const TMPDIR = tmpdir();

vi.mock("child_process");
const mockSpawn = vi.mocked(spawn);

test("NoSpaceLeftOnDevice error", () => {
  // GIVEN
  const npm = new Npm(TMPDIR, () => void 0, "mock-npm");

  // WHEN
  const mockChildProcess = new MockChildProcess(228);
  mockSpawn.mockReturnValue(mockChildProcess);

  // THEN
  return expect(npm.install("foo")).rejects.toThrowError(NoSpaceLeftOnDevice);
});

test("NpmError error (with JSON error code)", async () => {
  // GIVEN
  const npm = new Npm(TMPDIR, () => void 0, "mock-npm");

  // WHEN
  const mockChildProcess = new MockChildProcess(1, {
    stdout: [
      Buffer.from("{\n"),
      Buffer.from('  "error": {\n'),
      Buffer.from('    "code": "E429",\n'),
      Buffer.from('    "summary": "Slow down!",\n'),
      Buffer.from('    "detail": "You are going too fast, slow down!"\n'),
      Buffer.from("  }\n"),
      Buffer.from("}\n"),
    ],
  });
  mockSpawn.mockReturnValue(mockChildProcess);

  // THEN
  try {
    await npm.install("foo");
    fail("Expected an NpmError!");
  } catch (err) {
    expect(err).toBeInstanceOf(NpmError);
    expect((err as NpmError).name).toBe("@winglang/jsii-docgen.NpmError.E429");
    expect((err as NpmError).npmErrorCode).toBe("E429");
  }
});

test("NpmError error (removed package)", async () => {
  // GIVEN
  const npm = new Npm(TMPDIR, () => void 0, "mock-npm");

  // WHEN
  const mockChildProcess = new MockChildProcess(1, {
    stdout: [
      Buffer.from("{\n"),
      Buffer.from('  "error": {\n'),
      Buffer.from('    "code": null,\n'),
      Buffer.from(
        '    "summary": "Cannot convert undefined or null to object",\n'
      ),
      Buffer.from('    "detail": ""\n'),
      Buffer.from("  }\n"),
      Buffer.from("}\n"),
    ],
  });
  mockSpawn.mockReturnValue(mockChildProcess);

  // THEN
  try {
    await npm.install("foo");
    fail("Expected an NpmError!");
  } catch (err) {
    expect(err).toBeInstanceOf(UnInstallablePackageError);
  }
});

test("NpmError error (invalid JSON output)", async () => {
  // GIVEN
  const npm = new Npm(TMPDIR, () => void 0, "mock-npm");

  // WHEN
  const mockChildProcess = new MockChildProcess(1, {
    stdout: [Buffer.from("Definitely not a JSON object\n")],
  });
  mockSpawn.mockReturnValue(mockChildProcess);

  // THEN
  const err = await npm.install("foo").then(
    () => Promise.reject(fail("Expected an NpmError!")),
    (e) => Promise.resolve(e)
  );
  expect(err).toBeInstanceOf(NpmError);
  expect(err.name).toBe("@winglang/jsii-docgen.NpmError");
  expect((err as NpmError).npmErrorCode).toBeUndefined();
});

class MockChildProcess extends EventEmitter implements ChildProcess {
  // We are not using this, so we make it null here.
  public readonly stdin: Writable = null as any;
  // Using an EventEmitter, as we only use `.on` with this.
  public readonly stderr: Readable = new EventEmitter() as any;
  // Using an EventEmitter, as we only use `.on` with this.
  public readonly stdout: Readable = new EventEmitter() as any;

  public readonly stdio = [
    this.stdin,
    this.stdout,
    this.stderr,
    null as any,
    null as any,
  ] as ChildProcess["stdio"];

  public constructor(
    public readonly exitCode: number | null,
    { stdout = [] }: { stdout?: readonly Buffer[] } = {}
  ) {
    super();

    setImmediate(() => {
      for (const chunk of stdout) {
        this.stdout.emit("data", chunk);
      }
      this.emit("close", this.exitCode);
    });
  }

  public addListener(): never {
    throw new UnsupportedCallError();
  }

  public get connected(): never {
    throw new UnsupportedCallError();
  }

  public disconnect(): never {
    throw new UnsupportedCallError();
  }

  public kill(): never {
    throw new UnsupportedCallError();
  }

  public get killed(): never {
    throw new UnsupportedCallError();
  }

  public get pid(): never {
    throw new UnsupportedCallError();
  }

  public ref(): never {
    throw new UnsupportedCallError();
  }

  public send(): never {
    throw new UnsupportedCallError();
  }

  public get signalCode(): never {
    throw new UnsupportedCallError();
  }

  public get spawnargs(): never {
    throw new UnsupportedCallError();
  }

  public get spawnfile(): never {
    throw new UnsupportedCallError();
  }

  public unref(): never {
    throw new UnsupportedCallError();
  }

  [Symbol.dispose](): void {}
}

export class UnsupportedCallError extends Error {
  public readonly name = "UnsupportedCallError";

  public constructor(message: string = "Unsupported call!") {
    super(message);
  }
}
