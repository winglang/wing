import type { FileHandle } from "node:fs/promises";

const DEFAULT_BUFFER_SIZE = 1024;
const SEPARATOR_CHARACTER = "\n";

const getFileSize = async (fileHandle: FileHandle): Promise<number> => {
  const stats = await fileHandle.stat();
  return stats.size;
};

const readChunk = async (
  fileHandle: FileHandle,
  buffer: Buffer,
  position: number,
  forward: boolean,
) => {
  const length = buffer.byteLength;
  const start = forward ? position : Math.max(0, position - length);
  const { bytesRead } = await fileHandle.read(buffer, 0, length, start);
  return {
    text: buffer.toString("utf8", 0, bytesRead),
    start,
    end: start + bytesRead,
  };
};

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
        lines: [],
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
      lines: [],
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
  // const direction = options?.direction ?? "forward";
  // const forward = direction === "forward";
  const forward = options?.direction !== "backward";
  const position =
    options?.position ?? (forward ? 0 : await getFileSize(fileHandle));
  // console.log({ position });

  // const bufferSize = Math.min(
  //   position,
  //   options?.bufferSize ?? DEFAULT_BUFFER_SIZE,
  // );
  const desiredBufferSize = options?.bufferSize ?? DEFAULT_BUFFER_SIZE;
  const buffer = Buffer.alloc(
    forward ? desiredBufferSize : Math.min(position, desiredBufferSize),
  );

  const chunk = await readChunk(fileHandle, buffer, position, forward);
  const lines = extractLines(chunk.text, chunk.start, chunk.end, forward);
  // console.log({ chunk, lines });

  return lines;
  // const readStartPosition = forward
  //   ? position
  //   : Math.max(0, position - bufferSize);

  // const startPosition = forward ? position : Math.max(0, position - bufferSize);
  // const { bytesRead } = await fileHandle.read(
  //   buffer,
  //   0,
  //   bufferSize,
  //   startPosition,
  // );
  // const readEndPosition = startPosition + bytesRead;

  // const chunkString = buffer.toString("utf8", 0, bytesRead);

  // const separator = forward
  //   ? chunkString.lastIndexOf(SEPARATOR_CHARACTER)
  //   : chunkString.indexOf(SEPARATOR_CHARACTER);
  // // if (
  // //   startPosition !== 0 &&
  // //   (separator === -1 || separator === bytesRead - 1)
  // // ) {
  // //   const end = startPosition + (separator === -1 ? bytesRead : separator); // TODO: affected by direction.

  // //   // Find the start of the line that doesn't fit the buffer.
  // //   let position = Math.max(0, startPosition - bufferSize); // TODO: affected by direction.
  // //   while (true) {
  // //     const { bytesRead } = await fileHandle.read(
  // //       buffer,
  // //       0,
  // //       bufferSize,
  // //       position,
  // //     );

  // //     const chunkString = buffer.toString("utf8", 0, bytesRead);
  // //     const separator = chunkString.lastIndexOf(SEPARATOR_CHARACTER); // TODO: affected by direction.

  // //     if (separator !== -1 || position === 0) {
  // //       const start = position + separator + 1;
  // //       const { bytesRead } = await fileHandle.read(
  // //         buffer,
  // //         0,
  // //         bufferSize,
  // //         start,
  // //       );

  // //       return {
  // //         lines: [
  // //           {
  // //             partialLine: buffer.toString("utf8", 0, bytesRead),
  // //             start: position + separator + 1,
  // //             end,
  // //           },
  // //         ],
  // //         position: position + separator,
  // //       };
  // //     }

  // //     position = Math.max(0, position - bufferSize);
  // //   }
  // // }
  // assert(separator !== -1 || startPosition === 0);

  // const slicedChunk = forward
  //   ? chunkString.slice(0, separator)
  //   : chunkString.slice(startPosition === 0 ? 0 : separator + 1);
  // const lines = slicedChunk
  //   .split(SEPARATOR_CHARACTER)
  //   .filter((line) => line.length > 0);

  // const newPosition = forward
  //   ? separator
  //   : startPosition === 0
  //   ? 0
  //   : startPosition + separator;

  // return {
  //   lines,
  //   position: newPosition,
  // };
};
