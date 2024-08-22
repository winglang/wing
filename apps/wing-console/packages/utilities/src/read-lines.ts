import type { FileHandle } from "node:fs/promises";

/**
 * The minimum buffer size that can be used.
 *
 * This is used to ensure that the buffer is large enough to read at least one character and the newline.
 */
const MIN_BUFFER_SIZE = 2;

/**
 * The default buffer size to use when reading from the file.
 */
const DEFAULT_BUFFER_SIZE = 1024;

/**
 * The character that separates lines in the file.
 */
const SEPARATOR_CHARACTER = "\n";

/**
 * Get the size of a file in bytes.
 */
const getFileSize = async (fileHandle: FileHandle) => {
  const stats = await fileHandle.stat();
  return stats.size;
};

/**
 * Reads a chunk of data from the file handle into a buffer.
 *
 * The chunk is read starting at the given position, in the direction specified by the `forward` parameter.
 */
const readChunk = async (
  fileHandle: FileHandle,
  buffer: Buffer,
  position: number,
  forward: boolean,
) => {
  const start = forward
    ? position
    : Math.max(0, position - buffer.byteLength - 1);
  const length = forward
    ? buffer.byteLength
    : Math.min(position, buffer.byteLength);
  const { bytesRead } = await fileHandle.read(buffer, 0, length, start);
  return {
    text: buffer.toString("utf8", 0, bytesRead),
    start,
    end: start + bytesRead,
  };
};

/**
 * Attempts to extract lines from a chunk of text.
 *
 * If the chunk does not contain a separator character, the function will return `undefined` instead of an array of lines.
 */
const extractLines = (
  text: string,
  start: number,
  end: number,
  forward: boolean,
) => {
  if (forward) {
    const separator = text.lastIndexOf(SEPARATOR_CHARACTER);

    if (separator === -1) {
      return {
        lines: undefined,
        position: end,
      };
    }

    return {
      lines: text
        .slice(0, separator)
        .split(SEPARATOR_CHARACTER)
        .filter((line) => line.length > 0),
      position: start + separator + 1,
    };
  }

  const separator = start === 0 ? 0 : text.indexOf(SEPARATOR_CHARACTER);
  // console.log({ text, separator });

  if (separator === -1) {
    return {
      lines: undefined,
      position: Math.max(0, start - 1),
    };
  }

  return {
    lines: text
      .slice(separator)
      .split(SEPARATOR_CHARACTER)
      .filter((line) => line.length > 0),
    // position: Math.max(0, start + separator - 1),
    position: Math.max(0, start + separator),
  };
};

/**
 * Find the position of the next end of line character in the file.
 */
const findNextEndOfLinePosition = async (
  fileHandle: FileHandle,
  buffer: Buffer,
  position: number,
  forward: boolean,
) => {
  while (true) {
    const start = forward
      ? position
      : Math.max(0, position - buffer.byteLength - 1);
    const length = forward
      ? buffer.byteLength
      : Math.min(position, buffer.byteLength);
    const { bytesRead } = await fileHandle.read(buffer, 0, length, start);

    if (!forward && position === 0) {
      return 0;
    }

    if (bytesRead === 0) {
      return position;
    }

    const text = buffer.toString("utf8", 0, bytesRead);
    const separator = forward
      ? text.indexOf(SEPARATOR_CHARACTER)
      : text.lastIndexOf(SEPARATOR_CHARACTER);
    if (separator !== -1) {
      return start + separator + (forward ? 0 : 1);
    }
    position = forward ? start + bytesRead : start;
  }
};

const readPartialChunk = async (
  fileHandle: FileHandle,
  buffer: Buffer,
  position: number,
  forward: boolean,
  chunk: { start: number; end: number },
) => {
  const newPosition = await findNextEndOfLinePosition(
    fileHandle,
    buffer,
    position,
    forward,
  );
  const newStart = forward ? chunk.start : newPosition;
  const newEnd = forward ? newPosition : chunk.end;
  const newChunk = await readChunk(fileHandle, buffer, newStart, true);
  return {
    lines: [
      {
        partialLine: newChunk.text,
        start: newStart,
        end: newEnd,
      },
    ],
    position: newPosition,
  };
};

export interface ReadLinesOptions {
  bufferSize?: number;
  position?: number;
  direction?: "forward" | "backward";
}

export interface PartialLine {
  partialLine: string;
  start: number;
  end: number;
}

export interface ReadLinesResult {
  lines: (string | PartialLine)[];
  position: number;
}

/**
 * Read lines from a file starting at a given position.
 *
 * The default buffer size is {@link DEFAULT_BUFFER_SIZE}.
 */
export const readLines = async (
  fileHandle: FileHandle,
  options?: ReadLinesOptions,
): Promise<ReadLinesResult> => {
  const forward = options?.direction !== "backward";
  const position =
    options?.position ?? (forward ? 0 : await getFileSize(fileHandle));

  const buffer = Buffer.alloc(
    Math.max(MIN_BUFFER_SIZE, options?.bufferSize ?? DEFAULT_BUFFER_SIZE),
  );

  const chunk = await readChunk(fileHandle, buffer, position, forward);
  if (chunk.text.length === 0) {
    return {
      lines: [],
      position: 0,
    };
  }

  const lines = extractLines(chunk.text, chunk.start, chunk.end, forward);

  if (lines.lines === undefined) {
    return await readPartialChunk(fileHandle, buffer, position, forward, chunk);
  }

  return lines;
};
