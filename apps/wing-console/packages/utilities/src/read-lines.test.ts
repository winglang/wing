import { open, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

import { expect, test, vi } from "vitest";

import { readLines } from "./read-lines.js";

const createTemporaryFile = async (content: string) => {
  const directory = await mkdtemp(tmpdir());
  await writeFile(`${directory}/file.jsonl`, content);
  return await open(`${directory}/file.jsonl`, "r");
};

test("reads empty file", async () => {
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

test("reads empty file with many newlines", async () => {
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

test("reads small file in a single pass", async () => {
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

test("reads some lines and returns the new position", async () => {
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

// test("reads partial lines if they are too big for the buffer size", async () => {
//   const fileHandle = await createTemporaryFile("1\n23456789\n");
//   const lines = await readLines(fileHandle, {
//     bufferSize: 4,
//   });
//   expect(lines).toEqual({
//     lines: [{ partialLine: "2345", start: 2, end: 10 }],
//     position: 1,
//   });
// });
