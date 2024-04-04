import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { TestResultsJson } from "winglang/dist/commands/test/results";
import { CompatibilityMatrix, CompatibilitySets } from "./types";

export const SKIPPED_RESOURCES = ["TestRunner", "State"];
export const MATRIX_PATH = join(
  __dirname,
  "../../../docs/docs/04-standard-library/compatibility/compatibility.json"
);
export const OUT_PATH = join(__dirname, "../../../out.json");

export const PLATFORMS = {
  "tf-aws": "tf-aws",
  "tf-gcp": "tf-gcp",
  "tf-azure": "tf-azure",
  awscdk: "awscdk", // in the future we plan to move awscdk to its own compatibility matrix https://github.com/winglang/wing/issues/5560
  sim: "sim",
};

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
        readFileSync(join(outFolderPath, file.name), "utf8")
      ) as TestResultsJson;

      updateMatrixFromFile(outFile, matrix);
      console.log(`"${file.name}" parsed successfully!`);
    } catch (error) {
      console.error(
        `an error occurred while trying to parse "${file.name}". error: ${error}`
      );
    }
  }

  writeFileSync(MATRIX_PATH, `${JSON.stringify(matrix, null, 2)}\n`);
}

export function updateMatrixFromFile(
  outFile: TestResultsJson,
  matrix: CompatibilityMatrix
) {
  const compatibility: Map<string, CompatibilitySets> = new Map();

  const platform = outFile.platforms[0] as keyof typeof PLATFORMS;

  for (const testFile of Object.values(outFile.results)) {
    // @ts-expect-error
    for (const testName in testFile) {
      const {
        pass,
        unsupported,
        unsupportedOperation,
        unsupportedResource,
        args = {},
        // @ts-expect-error
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
  if (!matrix[resource][op][target]) {
    matrix[resource][op][target] = { implemented };
  } else {
    matrix[resource][op][target].implemented = implemented;
  }
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
