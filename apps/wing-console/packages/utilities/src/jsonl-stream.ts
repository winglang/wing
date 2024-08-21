import type { FileHandle } from "node:fs/promises";

const DEFAULT_BUFFER_SIZE = 1024;
const SEPARATOR_CHARACTER = "\n";

const getFileSize = async (fileHandle: FileHandle): Promise<number> => {
  const stats = await fileHandle.stat();
  return stats.size;
};

export interface ReadLinesReverseOptions {
  bufferSize?: number;
  position?: number;
}

export interface PartialLine {
  partialLine: string;
  start: number;
  end: number;
}

export interface ReadLinesReverseResult {
  lines: (string | PartialLine)[];
  position: number;
}

export const readLinesReverse = async (
  fileHandle: FileHandle,
  options?: ReadLinesReverseOptions,
): Promise<ReadLinesReverseResult> => {
  const fileSize = await getFileSize(fileHandle);
  if (fileSize === 0) {
    return {
      lines: [],
      position: 0,
    };
  }
  const position = options?.position ?? fileSize;

  const bufferSize = Math.min(
    position,
    options?.bufferSize ?? DEFAULT_BUFFER_SIZE,
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

  return {
    lines,
    position: newPosition,
  };
};
