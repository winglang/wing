import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { TestResultsJson } from "winglang/dist/commands/test/results";
import { MATRIX_PATH, PLATFORMS, SKIPPED_RESOURCES } from "./constants";
import { CompatibilityMatrix, CompatibilitySets } from "./types";

export function updateMatrix(outFolderPath: string, matrixPath = MATRIX_PATH) {
  const files = readdirSync(join(outFolderPath), {
    withFileTypes: true,
  }).filter((file) => file.isFile() && extname(file.name) === ".json");

  const matrix = JSON.parse(
    readFileSync(matrixPath).toString()
  ) as CompatibilityMatrix;

  for (const file of files) {
    try {
      const outFile = JSON.parse(
        readFileSync(join(file.path, file.name), "utf8")
      ) as TestResultsJson;

      updateMatrixFromFile(outFile, matrix);
      console.log(`"${file.name}" parsed successfully!`);
    } catch (error) {
      console.error(
        `an error occurred while trying to parse "${file.name}". error: ${error}`
      );
    }
  }

  writeFileSync(MATRIX_PATH, JSON.stringify(matrix, null, 2));
}

export function updateMatrixFromFile(
  outFile: TestResultsJson,
  matrix: CompatibilityMatrix
) {
  const compatibility: Map<string, CompatibilitySets> = new Map();

  const platform = outFile.platforms[0] as keyof typeof PLATFORMS;

  for (const testFile of Object.values(outFile.results)) {
    for (const testName in testFile) {
      const {
        pass,
        unsupported,
        unsupportedOperation,
        unsupportedResource,
        args = {},
      } = testFile[testName];
      if (unsupported && unsupportedOperation && unsupportedResource) {
        addToCompatibilitySet(
          compatibility,
          unsupportedResource,
          unsupportedOperation,
          false
        );
      } else {
        if (args.methods) {
          for (const resource in args.methods) {
            if (SKIPPED_RESOURCES.includes(resource)) {
              continue;
            }
            (args.methods as Record<string, string[]>)[resource].forEach((op) =>
              addToCompatibilitySet(compatibility, resource, op, pass)
            );
          }
        }
      }
    }
  }

  return writeToMatrix(compatibility, matrix, platform);
}

export function addToCompatibilitySet(
  compatibility: Map<string, CompatibilitySets>,
  resource: string,
  op: string,
  isImplemented: boolean
) {
  if (!compatibility.has(resource)) {
    compatibility.set(resource, {
      unsupportedOps: new Set(),
      supportedOps: new Set(),
    });
  }
  const sets = compatibility.get(resource);
  if (isImplemented) {
    sets?.supportedOps.add(op);
    sets?.unsupportedOps.delete(op);
  } else if (!isImplemented && !sets?.supportedOps.has(op)) {
    sets?.unsupportedOps.add(op);
  }
}

export function writeOpImplementationStatus(
  matrix: CompatibilityMatrix,
  target: keyof typeof PLATFORMS,
  resource: string,
  op: string,
  implemented: boolean
) {
	if (!matrix[resource]) {
    matrix[resource] = {};
  }
  if (!matrix[resource][op]) {
    matrix[resource][op] = {};
  }
  matrix[resource][op][target] = { implemented };
}

export function writeToMatrix(
  compatibilitySet: Map<string, CompatibilitySets>,
  matrix: CompatibilityMatrix,
  platform: keyof typeof PLATFORMS
): CompatibilityMatrix {
  for (const entry of compatibilitySet) {
    const [resource, ops] = entry;
    ops.supportedOps.forEach((op) =>
      writeOpImplementationStatus(matrix, platform, resource, op, true)
    );
    ops.unsupportedOps.forEach((op) =>
      writeOpImplementationStatus(matrix, platform, resource, op, false)
    );
  }
  return matrix;
}
