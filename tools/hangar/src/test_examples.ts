import * as fs from "fs";
import { join } from "path";

export interface Example {
  code: string;
  filePath: string;
  exampleNumber: number;
}

export function searchDirectoryForWingExamples(directory: string): Example[] {
  const items = fs.readdirSync(directory, { withFileTypes: true });
  let examples: Example[] = [];
  for (const item of items) {
    const fullPath = join(directory, item.name);
    if (item.isDirectory()) {
      examples.push(...searchDirectoryForWingExamples(fullPath)); // Recurse into subdirectories
    } else if (item.isFile() && fullPath.endsWith('.md')) {
      examples.push(...extractExamples(fullPath));
    }
  }
  return examples;
}

export function extractExamples(filePath: string): Example[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const exampleCodeBlocks = content.match(/```.*? example.*?\n([\s\S]*?)```/g);
  let examples: Example[] = [];
  if (exampleCodeBlocks) {
    exampleCodeBlocks.forEach((block, index) => {
      const code = block.match(/```.*?\n([\s\S]*?)```/)![1];
      examples.push({
        code,
        filePath,
        exampleNumber: index + 1
      });
    });
  }
  return examples;
}
