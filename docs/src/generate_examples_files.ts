import * as fs from 'fs';
import { join } from 'path';
import { docsRoot, testDir } from "../../tools/hangar/src/paths";

/**
 * TODO: Support the following types of examples:
 *  - Examples that require importing other examples
 *  - Examples that require `wing.toml`
 *  - TypeScript examples
 */
export interface ExampleMetadata {
  /** @default true */
  valid: boolean;
  name?: string; // We might be able to use this for matching dependant examples on each other
}

export interface Example {
  code: string;
  filePath: string;
  exampleNumber: number;
  metadata: ExampleMetadata;
}

const docExamplesDir = join(testDir, 'doc_examples');

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
      const metaDataMatch = block.match(/```.*? example(\{[^}]+\})/);
      let metadata: ExampleMetadata | undefined = undefined;
      try {
        if (metaDataMatch) {
          const metaDataString = metaDataMatch[1]
            .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Enclose property names in double quotes
            .replace(/'/g, '"'); // Replace single quotes with double quotes if any
          metadata = JSON.parse(metaDataString);
        }
      } catch (e) {
        console.error(`Unable to parse metadata for example #${index + 1} in ${filePath}`, e);
      }
      const code = block.match(/```.*?\n([\s\S]*?)```/)![1];
      console.log(`Metadata: ${metadata}`);
      examples.push({
        code,
        filePath,
        exampleNumber: index + 1,
        metadata: {
          valid: true,
          ...metadata
        }
      });
    });
  }
  return examples;
}

function generateTestsFromDocExamples(): void {

  const examples = searchDirectoryForWingExamples(docsRoot);
  examples.forEach((example) => {
    const testName = `${example.filePath.split('/').pop()}_example_${example.exampleNumber}`;

    // For debug sake we add metadata as a comment to the code
    example.code = `// Example metadata: ${JSON.stringify(example.metadata)}\n${example.code}`;

    example.code = `// This file was auto generated from an example found in: ${testName}\n${example.code}`
    const outDir = join(docExamplesDir, example.metadata?.valid ? 'valid' : 'invalid', testName);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(join(outDir, 'main.w'), example.code);
  });
}

fs.rmSync(docExamplesDir, { recursive: true, force: true });
generateTestsFromDocExamples();