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
         --> test/util/enhanced-error.test.ts:17:43
         |   expect(result).toBe("");
         | });
         | test("error object", async () => {
      17 |   const result = await prettyPrintError(new Error("message"));
         |                                         ^"
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
         --> test/util/enhanced-error.test.ts:34:7
         | });
         | test("stack", async () => {
         |   const result = await prettyPrintError(
      34 |     new Error("message\\nwith extra line").stack!
         |     ^"
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
