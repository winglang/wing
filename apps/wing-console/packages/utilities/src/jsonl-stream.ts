import type { FileHandle } from "node:fs/promises";
import { open } from "node:fs/promises";
import assert from "node:assert/strict";

const DEFAULT_BUFFER_SIZE = 1024;
const SEPARATOR_CHARACTER = "\n";

const getFileSize = async (fileHandle: FileHandle): Promise<number> => {
  const stats = await fileHandle.stat();
  return stats.size;
};

// const findPartialLineReverse = async (
//    fileHandle: FileHandle,
//    buffer: Buffer,
//    bufferSize: number,
//    position: number,
// ) => {
//   const startPosition = Math.max(0, position - bufferSize);
//   const { bytesRead } = await fileHandle.read(
//       buffer,
//       0,
//       bufferSize,
//       startPosition,
//     );
// }

export interface ReadLinesReverseOptions {
  fileName: string;
  bufferSize?: number;
  position?: number;
}

export interface PartialLine {
  //   partial: true;
  //   line: string;
  partialLine: string;
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
  if (fileSize === 0) {
    await fileHandle.close();
    return {
      lines: [],
      position: 0,
    };
  }
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

  const chunkString = buffer.toString("utf8", 0, bytesRead);

  const separator = chunkString.indexOf(SEPARATOR_CHARACTER);
  if (
    startPosition !== 0 &&
    (separator === -1 || separator === bytesRead - 1)
  ) {
    const end = startPosition + (separator === -1 ? bytesRead : separator);

    // Find the start of the line that doesn't fit the buffer.
    let position = Math.max(0, startPosition - bufferSize);
    while (true) {
      const { bytesRead } = await fileHandle.read(
        buffer,
        0,
        bufferSize,
        position,
      );

      const chunkString = buffer.toString("utf8", 0, bytesRead);
      const separator = chunkString.lastIndexOf(SEPARATOR_CHARACTER);

      if (separator !== -1 || position === 0) {
        const start = position + separator + 1;
        const { bytesRead } = await fileHandle.read(
          buffer,
          0,
          bufferSize,
          start,
        );

        return {
          lines: [
            {
              partialLine: buffer.toString("utf8", 0, bytesRead),
              start: position + separator + 1,
              end,
            },
          ],
          position: position + separator,
        };
      }

      position = Math.max(0, position - bufferSize);
    }
  }

  const lines = chunkString
    .slice(Math.max(0, startPosition === 0 ? 0 : separator + 1))
    .split(SEPARATOR_CHARACTER)
    .filter((line) => line.length > 0);

  const newPosition = startPosition === 0 ? 0 : startPosition + separator;

  await fileHandle.close();

  return {
    lines,
    position: newPosition,
  };
};
