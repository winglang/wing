import { open, mkdtemp, writeFile } from "node:fs/promises";
import type { FileHandle } from "node:fs/promises";
import { tmpdir } from "node:os";

import { expect, test as vitest } from "vitest";

import { readLines } from "./read-lines.js";

const test = vitest.extend<{
  createTemporaryFile: (content: string) => Promise<FileHandle>;
}>({
  async createTemporaryFile({}, use) {
    const files = new Array<FileHandle>();
    await use(async (content: string) => {
      const directory = await mkdtemp(tmpdir());
      await writeFile(`${directory}/file.jsonl`, content);
      const handle = await open(`${directory}/file.jsonl`, "r");
      files.push(handle);
      return handle;
    });
    for (const file of files) {
      await file.close();
    }
  },
});

test("reads empty file", async ({ createTemporaryFile }) => {
  const fileHandle = await createTemporaryFile("");

  await expect(
    readLines(fileHandle, { direction: "forward" }),
  ).resolves.toEqual({
    lines: [],
    position: 0,
  });

  await expect(
    readLines(fileHandle, { direction: "backward" }),
  ).resolves.toEqual({
    lines: [],
    position: 0,
  });
});

test("reads file with many empty lines", async ({ createTemporaryFile }) => {
  const fileHandle = await createTemporaryFile("\n\n\n\n");

  await expect(
    readLines(fileHandle, {
      direction: "forward",
    }),
  ).resolves.toEqual({
    lines: [],
    position: 4,
  });

  await expect(
    readLines(fileHandle, {
      direction: "backward",
    }),
  ).resolves.toEqual({
    lines: [],
    position: 0,
  });
});

test("reads small file in a single pass", async ({ createTemporaryFile }) => {
  const fileHandle = await createTemporaryFile("1\n2\n");

  await expect(
    readLines(fileHandle, {
      direction: "forward",
    }),
  ).resolves.toEqual({
    lines: ["1", "2"],
    position: 4,
  });

  await expect(
    readLines(fileHandle, {
      direction: "backward",
    }),
  ).resolves.toEqual({
    lines: ["1", "2"],
    position: 0,
  });
});

test("reads some lines and returns the new position", async ({
  createTemporaryFile,
}) => {
  const fileHandle = await createTemporaryFile("100\n200\n300\n400\n");

  await expect(
    readLines(fileHandle, {
      direction: "forward",
      bufferSize: 11,
    }),
  ).resolves.toEqual({
    lines: ["100", "200"],
    position: 8,
  });

  await expect(
    readLines(fileHandle, {
      direction: "forward",
      bufferSize: 11,
      position: 8,
    }),
  ).resolves.toEqual({
    lines: ["300", "400"],
    position: 16,
  });

  await expect(
    readLines(fileHandle, {
      direction: "backward",
      bufferSize: 11,
    }),
  ).resolves.toEqual({
    lines: ["300", "400"],
    position: 7,
  });

  await expect(
    readLines(fileHandle, {
      direction: "backward",
      bufferSize: 11,
      position: 7,
    }),
  ).resolves.toEqual({
    lines: ["100", "200"],
    position: 0,
  });
});

test("reads partial lines if they are too big for the buffer size", async ({
  createTemporaryFile,
}) => {
  await expect(
    readLines(await createTemporaryFile("123456789\n"), {
      direction: "forward",
      bufferSize: 4,
    }),
  ).resolves.toEqual({
    lines: [{ partialLine: "1234", start: 0, end: 10 }],
    position: 10,
  });

  await expect(
    readLines(await createTemporaryFile("123456789\n"), {
      direction: "backward",
      bufferSize: 4,
    }),
  ).resolves.toEqual({
    lines: [{ partialLine: "1234", start: 0, end: 10 }],
    position: 0,
  });

  await expect(
    readLines(await createTemporaryFile("1\n23456789\n"), {
      direction: "forward",
      bufferSize: 4,
      position: 2,
    }),
  ).resolves.toEqual({
    lines: [{ partialLine: "2345", start: 2, end: 11 }],
    position: 11,
  });

  await expect(
    readLines(await createTemporaryFile("1\n23456789\n"), {
      direction: "backward",
      bufferSize: 4,
    }),
  ).resolves.toEqual({
    lines: [{ partialLine: "2345", start: 2, end: 11 }],
    position: 2,
  });
});
