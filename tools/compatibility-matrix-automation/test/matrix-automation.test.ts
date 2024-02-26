import { test, describe, expect } from "vitest";
import {
  addToCompatibilitySet,
  updateMatrixFromFile,
  writeOpImplementationStatus,
  writeToMatrix,
} from "../src/matrix-automation";
import { TestResultsJson } from "winglang/dist/commands/test/results";

describe("addToCompatibilitySet", () => {
  test("adds an implemented method to the right set", () => {
    const compatibilitySet = new Map();
    addToCompatibilitySet(compatibilitySet, "Bucket", "get", true);
    expect(compatibilitySet.get("Bucket").supportedOps).toEqual(
      new Set(["get"])
    );
    expect(compatibilitySet.get("Bucket").unsupportedOps).toEqual(new Set());
  });
  test("adds non implemented method to the right set- if doesn't exist on the implemented set", () => {
    const compatibilitySet = new Map();
    addToCompatibilitySet(compatibilitySet, "Bucket", "get", false);
    expect(compatibilitySet.get("Bucket").unsupportedOps).toEqual(
      new Set(["get"])
    );
    expect(compatibilitySet.get("Bucket").supportedOps).toEqual(new Set());
  });
  test("adds non implemented method to the right set- if exists on the implemented set", () => {
    const compatibilitySet = new Map();
    compatibilitySet.set("Bucket", {
      supportedOps: new Set(["get"]),
      unsupportedOps: new Set(),
    });
    addToCompatibilitySet(compatibilitySet, "Bucket", "get", false);
    expect(compatibilitySet.get("Bucket").supportedOps).toEqual(
      new Set(["get"])
    );
    expect(compatibilitySet.get("Bucket").unsupportedOps).toEqual(new Set());
  });
});

// writeOpImplementationStatus
describe("writeOpImplementationStatus adds method implementation status when", () => {
  test("Bucket does't appear in matrix", () => {
    const matrix = {};
    writeOpImplementationStatus(matrix, "sim", "Bucket", "get", false);
    expect(matrix).toEqual({
      Bucket: { get: { sim: { implemented: false } } },
    });
  });
  test("method doesn't appear in matrix", () => {
    const matrix = {
      Bucket: { put: { sim: { implemented: false } } },
    };
    writeOpImplementationStatus(matrix, "sim", "Bucket", "get", true);
    expect(matrix).toEqual({
      Bucket: {
        get: { sim: { implemented: true } },
        put: { sim: { implemented: false } },
      },
    });
  });
  test("target doesn't appear in matrix", () => {
    const matrix = {
      Bucket: { get: { "tf-aws": { implemented: false } } },
    };
    writeOpImplementationStatus(matrix, "sim", "Bucket", "get", true);
    expect(matrix).toEqual({
      Bucket: {
        get: {
          "tf-aws": { implemented: false },
          sim: { implemented: true },
        },
      },
    });
  });
  test("Bucket, method and target appear in matrix", () => {
    const matrix = {
      Bucket: { get: { sim: { implemented: false } } },
    };
    writeOpImplementationStatus(matrix, "sim", "Bucket", "get", true);
    expect(matrix).toEqual({
      Bucket: {
        get: {
          sim: { implemented: true },
        },
      },
    });
  });
});

describe("writeToMatrix", () => {
  test("adds supported op set to a matrix", () => {
    const matrix = {};
    const compatibilitySets = new Map();
    compatibilitySets.set("Bucket", {
      supportedOps: new Set(["get", "put"]),
      unsupportedOps: new Set(),
    });
    writeToMatrix(compatibilitySets, matrix, "sim");
    expect(matrix).toEqual({
      Bucket: {
        get: {
          sim: { implemented: true },
        },
        put: {
          sim: { implemented: true },
        },
      },
    });
  });
  test("adds non supported op set to a matrix", () => {
    const matrix = {};
    const compatibilitySets = new Map();
    compatibilitySets.set("Bucket", {
      unsupportedOps: new Set(["put", "putJson"]),
      supportedOps: new Set(),
    });
    writeToMatrix(compatibilitySets, matrix, "sim");
    expect(matrix).toEqual({
      Bucket: {
        put: {
          sim: { implemented: false },
        },
        putJson: {
          sim: { implemented: false },
        },
      },
    });
  });
});

describe("updateMatrixFromFile", () => {
  test("reads a file and returns matrix information", () => {
    const outFile: TestResultsJson = {
      duration: 6000,
      platforms: ["sim"],
      results: {
        testFile: {
          test1: {
            path: "",
            pass: true,
            args: {
              methods: { TestRunner: ["findTests"], Bucket: ["put", "list"] },
            },
            traces: [],
          },
          test2: {
            path: "",
            pass: true,
            unsupported: true,
            unsupportedResource: "Bucket",
            unsupportedOperation: "signedUrl",
            traces: [],
          },
          test3: {
            path: "",
            pass: false,
            args: {
              methods: {
                TestRunner: ["findTests"],
                Bucket: ["putJson", "list"],
              },
            },
            traces: [],
          },
        },
      },
    };
    const matrix = updateMatrixFromFile(outFile, {});
    expect(matrix).toEqual({
      Bucket: {
        put: { sim: { implemented: true } },
        list: { sim: { implemented: true } },
        signedUrl: { sim: { implemented: false } },
        putJson: { sim: { implemented: false } },
      },
    });
  });
});
