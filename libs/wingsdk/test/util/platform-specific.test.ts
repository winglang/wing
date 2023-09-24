import { Construct } from "constructs";
import { beforeEach, describe, expect, test } from "vitest";
import { getPlatformSpecificValues } from "../../src/util/platform-specific";

class MyApp extends Construct {
  constructor() {
    super(undefined as any, "root");
  }
}

class MyResource extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}

describe("getPlatformSpecificValues", () => {
  beforeEach(() => {
    delete process.env.WING_VALUES;
    delete process.env.WING_VALUES_FILE;
  });

  test("get single value form command", () => {
    // GIVEN
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    process.env.WING_VALUES = "root/my-resource.number=123";
    const result = getPlatformSpecificValues(resource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single value from yaml file", () => {
    // GIVEN
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    process.env.WING_VALUES_FILE = __dirname + "/single-number-value.yaml";
    const result = getPlatformSpecificValues(resource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single optional value from command", () => {
    // GIVEN
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    process.env.WING_VALUES = "root/my-resource.number=123";
    const numberResult = getPlatformSpecificValues(resource, "string||number");
    process.env.WING_VALUES = "root/my-resource.string=abc";
    const stringResult = getPlatformSpecificValues(resource, "string||number");
    // THEN
    expect(numberResult).toStrictEqual({ string: undefined, number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc", number: undefined });
  });

  test("get single optional value from yaml file", () => {
    // GIVEN
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    process.env.WING_VALUES_FILE = __dirname + "/single-number-value.yaml";
    const numberResult = getPlatformSpecificValues(resource, "string||number");
    process.env.WING_VALUES_FILE = __dirname + "/single-string-value.yaml";
    const stringResult = getPlatformSpecificValues(resource, "string||number");
    // THEN
    expect(numberResult).toStrictEqual({ number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc" });
  });

  test("get multiple values from command", () => {
    // GIVEN
    process.env.WING_VALUES =
      "root/my-resource.number=123,root/my-resource.string=abc";
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    const result = getPlatformSpecificValues(resource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("get multiple values from file", () => {
    // GIVEN
    process.env.WING_VALUES_FILE = __dirname + "/multiple-values.yaml";
    const app = new MyApp();
    const resource = new MyResource(app, "my-resource");
    const result = getPlatformSpecificValues(resource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("throw exception if no value is provided", () => {
    expect(() => {
      // GIVEN
      const app = new MyApp();
      const resource = new MyResource(app, "my-resource");
      getPlatformSpecificValues(resource, "number", "string||bool");
    }).toThrowError(`
  - 'number' is missing from root/my-resource
  - 'string' or 'bool' is missing from root/my-resource

These are required properties of platform-specific types. You can set these values
either through '-v | --value' switches or '--values' file.`);
  });
});
