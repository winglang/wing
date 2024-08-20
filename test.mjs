import { open, stat, writeFile } from "node:fs/promises";
import { constants } from "node:buffer";

console.log("max_string_length", constants.MAX_STRING_LENGTH);

async function readLastLines(filePath, numLines) {
  try {
    const stats = await stat(filePath);
    const fileSize = stats.size;
    const bufferSize = 1024;
    const buffer = Buffer.alloc(bufferSize);
    let position = fileSize - bufferSize;
    let lines = [];

    const fileHandle = await open(filePath, "r");

    // console.log({ fileSize, lines, numLines, position });

    while (lines.length <= numLines && position >= 0) {
      const { bytesRead } = await fileHandle.read(
        buffer,
        0,
        bufferSize,
        position
      );
      const chunkString = buffer.toString("utf8", 0, bytesRead);
      console.log(`buffer string length ${chunkString.length}`);
      const chunkLines = chunkString.split("\n");
      // console.log({ chunkLines });
      lines = chunkLines.concat(lines);
      position -= bufferSize;
    }

    await fileHandle.close();

    lines = lines.slice(-numLines);
    return lines.join("\n");
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

// Example usage:
const filePath = "test.jsonl";
const numLines = 10;

readLastLines(filePath, numLines).then((data) => {
  if (data) {
    console.log("Last 10 lines:\n", data);
  }
});

// const lines = new Array();
// for (let i = 0; i < 3000; i++) {
//   lines.push(JSON.stringify({ name: `Name ${i.toString().padStart(4, "0")}` }));
// }
// await writeFile("test.jsonl", lines.join("\n") + "\n");
