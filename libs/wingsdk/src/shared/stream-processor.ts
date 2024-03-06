import { Readable } from "stream";
import { StringDecoder } from "string_decoder";

/**
 * Processes a stream, invoking a callback function for each line of data.
 *
 * @param stream - The readable stream to process.
 * @param callback - The function to invoke for each line of data.
 */
export function processStream(
  stream: Readable,
  callback: (message: string) => void
) {
  let remainder = "";
  // StringDecoder to handle potentially incomplete multi-byte characters
  const decoder = new StringDecoder();

  stream.on("data", (data) => {
    remainder = processStreamData(data, remainder, decoder, callback);
  });

  // Handle any remaining data when the streams are closed
  stream.on("end", () => {
    if (remainder) callback(remainder + decoder.end());
  });

  stream.on("error", (error) => {
    console.error(`Error occurred: ${error.message}`);
  });
}

function processStreamData(
  data: Buffer,
  remainder: string,
  decoder: StringDecoder,
  log: (message: string) => void
): string {
  let str = decoder.write(data);
  let lines = (remainder + str).split("\n");

  // Process all lines except the last one, which might be incomplete
  for (let i = 0; i < lines.length - 1; i++) {
    log(lines[i]);
  }

  return lines.pop() ?? ""; // Return the last (potentially incomplete) line
}
