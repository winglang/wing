import type { FileHandle } from "node:fs/promises";
import { open } from "node:fs/promises";
import assert from "node:assert/strict";

const DEFAULT_BUFFER_SIZE = 1024;
const SEPARATOR_CHARACTER = "\n";

const getFileSize = async (fileHandle: FileHandle): Promise<number> => {
  const stats = await fileHandle.stat();
  return stats.size;
};

export interface ReadLinesReverseOptions {
  fileName: string;
  bufferSize?: number;
  position?: number;
}

export interface PartialLine {
  partial: true;
  line: string;
  start: number;
  end: number;
}

export interface ReadLinesReverseResult {
  //   lines: JsonLine[];
  lines: (string | PartialLine)[];
  position: number;
}

export const readLinesReverse = async (
  options: ReadLinesReverseOptions,
): Promise<ReadLinesReverseResult> => {
  const fileHandle = await open(options.fileName, "r");

  const fileSize = await getFileSize(fileHandle);
  const position = options.position ?? fileSize;

  const bufferSize = Math.min(
    position,
    options.bufferSize ?? DEFAULT_BUFFER_SIZE,
  );
  const buffer = Buffer.alloc(bufferSize);

  const startPosition = Math.max(0, position - bufferSize);
  const { bytesRead } = await fileHandle.read(
    buffer,
    0,
    bufferSize,
    startPosition,
  );
  console.log({
    bufferSize,
    position,
    startPosition,
    bytesRead,
  });

  const chunkString = buffer.toString("utf8", 0, bytesRead);

  const separator = chunkString.indexOf(SEPARATOR_CHARACTER);
  assert(separator !== -1, "Separator not found in chunk");

  const lines = chunkString
    .slice(Math.max(0, startPosition === 0 ? 0 : separator + 1))
    .split(SEPARATOR_CHARACTER)
    .filter((line) => line.length > 0);

  const newPosition = startPosition === 0 ? 0 : startPosition + separator;
  console.log({
    chunkString,
    separator,
    lines,
    newPosition,
  });

  await fileHandle.close();

  return {
    //  lines: lines.map((line) => ({
    //    json: line,
    //    partial: false,
    //  })),
    lines,
    position: newPosition,
  };
};
