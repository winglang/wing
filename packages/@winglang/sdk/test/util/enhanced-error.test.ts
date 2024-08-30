import { describe, expect, test } from "vitest";
import { prettyPrintError, dedent } from "../../src/util/enhanced-error";

describe("prettyPrintError", () => {
  test("message", async () => {
    const result = await prettyPrintError("message");

    // no stack trace available
    expect(result).toMatchInlineSnapshot('"Error: message"');
  });
  test("empty message", async () => {
    const result = await prettyPrintError("");

    expect(result).toBe("");
  });
  test("error object", async () => {
    const result = await prettyPrintError(new Error("message"));

    const resultLines = result.split("\n");
    const interestingPart = resultLines.slice(0, 7).join("\n");
    expect(resultLines[8]).toMatch(/^at /);
    expect(interestingPart).toMatchInlineSnapshot(`
      "Error: message
      at  file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:135:14
      at  file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:60:26
      at runTest file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:781:17
      at runSuite → runSuite file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:909:15
      at runFiles file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:958:5
      at startTests file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:967:3"
    `);
  });
  test("stack", async () => {
    const result = await prettyPrintError(
      new Error("message\nwith extra line").stack!
    );

    const interestingPart = result.split("\n").slice(0, 8).join("\n");
    expect(interestingPart).toMatchInlineSnapshot(`
      "Error: message
      with extra line
      at  file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:135:14
      at  file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:60:26
      at runTest file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:781:17
      at runSuite → runSuite file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:909:15
      at runFiles file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:958:5
      at startTests file:///Users/chrisr/dev/wing3/node_modules/.pnpm/@vitest+runner@1.6.0/node_modules/@vitest/runner/dist/index.js:967:3"
    `);
  });
});

describe("dedent", () => {
  test("simple string", async () => {
    const result = dedent(["hello"]).join("\n");

    expect(result).toBe("hello");
  });
  test("multiline string", async () => {
    const s = `\
hello
  world`;
    const result = dedent(s.split("\n")).join("\n");

    expect(result).toBe("hello\n  world");
  });
  test("multiline string with empty line", async () => {
    const s = `\
    hello
   
  world`;
    const result = dedent(s.split("\n")).join("\n");

    expect(result).toBe("  hello\n \nworld");
  });
  test("multiline string with empty line and trailing newline", async () => {
    const s = `\
hello
 
  world
 `;
    const result = dedent(s.split("\n")).join("\n");

    expect(result).toBe(s);
  });
});
