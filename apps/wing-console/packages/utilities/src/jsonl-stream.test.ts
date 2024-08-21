import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

import { expect, test, vi } from "vitest";

import { readLinesReverse } from "./jsonl-stream.js";

const createTemporaryFile = async (content: string) => {
  const directory = await mkdtemp(tmpdir());
  await writeFile(`${directory}/file.jsonl`, content);
  return `${directory}/file.jsonl`;
};

test("reads empty file", async () => {
  const fileName = await createTemporaryFile("");
  const lines = await readLinesReverse({
    fileName,
  });
  expect(lines).toEqual({
    lines: [],
    position: 0,
  });
});

test("reads small file in a single read", async () => {
  const fileName = await createTemporaryFile("1\n2\n");
  const lines = await readLinesReverse({
    fileName,
  });
  expect(lines).toEqual({
    lines: ["1", "2"],
    position: 0,
  });
});

test("reads some lines and returns the new position", async () => {
  const fileName = await createTemporaryFile("100\n200\n300\n400\n");
  expect(
    await readLinesReverse({
      fileName,
      bufferSize: 11,
    }),
  ).toEqual({
    lines: ["300", "400"],
    position: 7,
  });

  expect(
    await readLinesReverse({ fileName, bufferSize: 11, position: 7 }),
  ).toEqual({
    lines: ["100", "200"],
    position: 0,
  });
});

test("handles missing newline character at the end of the file", async () => {
  const fileName = await createTemporaryFile("1\n2");
  const lines = await readLinesReverse({
    fileName,
  });
  expect(lines).toEqual({
    lines: ["1", "2"],
    position: 0,
  });
});

test.only("reads partial lines if they are too big for the buffer size", async () => {
  const fileName = await createTemporaryFile("1\n23456789\n");
  const lines = await readLinesReverse({
    fileName,
    bufferSize: 4,
  });
  expect(lines).toEqual({
    lines: [{ line: "2345", partial: true }],
    position: 2,
  });
});
