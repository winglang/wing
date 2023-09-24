import { Construct } from "constructs";
import { beforeEach, describe, expect, test } from "vitest";
import { getPlatformSpecificValues } from "../../src/util/platform-specific";

class App extends Construct {
  constructor() {
    super(undefined as any, "root");
  }
}

describe("getPlatformSpecificValues", () => {
  beforeEach(() => {
    delete process.env.WING_VALUES;
    delete process.env.WING_VALUES_FILE;
  });

  test("get single value form command", () => {
    // GIVEN
    const app = new App();
    process.env.WING_VALUES = "root.number=123";
    const result = getPlatformSpecificValues(app, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single value from yaml file", () => {
    // GIVEN
    const app = new App();
    process.env.WING_VALUES_FILE = __dirname + "/single-number-value.yaml";
    const result = getPlatformSpecificValues(app, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single optional value from command", () => {
    // GIVEN
    const app = new App();
    process.env.WING_VALUES = "root.number=123";
    const numberResult = getPlatformSpecificValues(app, "string||number");
    process.env.WING_VALUES = "root.string=abc";
    const stringResult = getPlatformSpecificValues(app, "string||number");
    // THEN
    expect(numberResult).toStrictEqual({ string: undefined, number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc", number: undefined });
  });

  test("get single optional value from yaml file", () => {
    // GIVEN
    const app = new App();
    process.env.WING_VALUES_FILE = __dirname + "/single-number-value.yaml";
    const numberResult = getPlatformSpecificValues(app, "string||number");
    process.env.WING_VALUES_FILE = __dirname + "/single-string-value.yaml";
    const stringResult = getPlatformSpecificValues(app, "string||number");
    // THEN
    expect(numberResult).toStrictEqual({ number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc" });
  });

  test("get multiple values from command", () => {
    // GIVEN
    process.env.WING_VALUES = "root.number=123,root.string=abc";
    const app = new App();
    const result = getPlatformSpecificValues(app, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("get multiple values from file", () => {
    // GIVEN
    process.env.WING_VALUES_FILE = __dirname + "/multiple-values.yaml";
    const app = new App();
    const result = getPlatformSpecificValues(app, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("", () => {
    expect(() => {
      // GIVEN
      const app = new App();
      getPlatformSpecificValues(app, "number", "string||bool");
    }).toThrowError(`
  - 'number' is missing from root
  - 'string' or 'bool' is missing from root

These are required properties of platform-specific types. You can set these values
either through '-v | --value' switches or '--values' file.`);
  });
});
