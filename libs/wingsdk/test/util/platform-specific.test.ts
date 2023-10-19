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
  });

  test("get single value form command", () => {
    // GIVEN
    const app = new MyApp();
    const defaultResource = new MyResource(app, "Default");
    const resource = new MyResource(defaultResource, "my-resource");
    process.env.WING_VALUES = "root/Default/my-resource.number=123";
    const result = getPlatformSpecificValues(resource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single value form command when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES = "root/Default/my-resource.number=123";
    const result = getPlatformSpecificValues(myResource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single value from yaml file", () => {
    // GIVEN
    const app = new MyApp();
    const firstResource = new MyResource(app, "Default");
    const myResource = new MyResource(firstResource, "my-resource");
    process.env.WING_VALUES = __dirname + "/single-number-value.yaml";
    const result = getPlatformSpecificValues(myResource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single value from yaml file when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES = __dirname + "/single-number-value.yaml";
    const result = getPlatformSpecificValues(myResource, "number");
    // THEN
    expect(result).toStrictEqual({ number: "123" });
  });

  test("get single optional value from command", () => {
    // GIVEN
    const app = new MyApp();
    const firstResource = new MyResource(app, "Default");
    const myResource = new MyResource(firstResource, "my-resource");
    process.env.WING_VALUES = "root/Default/my-resource.number=123";
    const numberResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    process.env.WING_VALUES = "root/Default/my-resource.string=abc";
    const stringResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    // THEN
    expect(numberResult).toStrictEqual({ string: undefined, number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc", number: undefined });
  });

  test("get single optional value from command when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES = "root/Default/my-resource.number=123";
    const numberResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    process.env.WING_VALUES = "root/Default/my-resource.string=abc";
    const stringResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    // THEN
    expect(numberResult).toStrictEqual({ string: undefined, number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc", number: undefined });
  });

  test("get single optional value from yaml file", () => {
    // GIVEN
    const app = new MyApp();
    const firstResource = new MyResource(app, "Default");
    const myResource = new MyResource(firstResource, "my-resource");
    process.env.WING_VALUES = __dirname + "/single-number-value.yaml";
    const numberResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    process.env.WING_VALUES = __dirname + "/single-string-value.yaml";
    const stringResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    // THEN
    expect(numberResult).toStrictEqual({ number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc" });
  });

  test("get single optional value from yaml file when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES = __dirname + "/single-number-value.yaml";
    const numberResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    process.env.WING_VALUES = __dirname + "/single-string-value.yaml";
    const stringResult = getPlatformSpecificValues(
      myResource,
      "string||number"
    );
    // THEN
    expect(numberResult).toStrictEqual({ number: "123" });
    expect(stringResult).toStrictEqual({ string: "abc" });
  });

  test("get multiple values from command", () => {
    // GIVEN
    const app = new MyApp();
    const firstResource = new MyResource(app, "Default");
    const myResource = new MyResource(firstResource, "my-resource");
    process.env.WING_VALUES =
      "root/Default/my-resource.number=123,root/Default/my-resource.string=abc";
    const result = getPlatformSpecificValues(myResource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("get multiple values from command when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES =
      "root/Default/my-resource.number=123,root/Default/my-resource.string=abc";
    const result = getPlatformSpecificValues(myResource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("get multiple values from file", () => {
    // GIVEN
    process.env.WING_VALUES = __dirname + "/multiple-values.yaml";
    const app = new MyApp();
    const firstResource = new MyResource(app, "Default");
    const myResource = new MyResource(firstResource, "my-resource");
    const result = getPlatformSpecificValues(myResource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("get multiple values from file when running tests", () => {
    // GIVEN
    const app = new MyApp();
    const resourceTest = new MyResource(app, "Test.X67tGM87zf");
    const resourceEnv = new MyResource(resourceTest, "env0");
    const myResource = new MyResource(resourceEnv, "my-resource");
    process.env.WING_VALUES = __dirname + "/multiple-values.yaml";
    const result = getPlatformSpecificValues(myResource, "number", "string");
    // THEN
    expect(result).toStrictEqual({ number: "123", string: "abc" });
  });

  test("throw exception if no value is provided", () => {
    expect(() => {
      // GIVEN
      const app = new MyApp();
      const firstResource = new MyResource(app, "Default");
      const myResource = new MyResource(firstResource, "my-resource");
      getPlatformSpecificValues(myResource, "number", "string||bool");
    }).toThrowError(`
  - 'number' is missing from root/Default/my-resource
  - 'string' or 'bool' is missing from root/Default/my-resource

These are required properties of platform-specific types.
You can set these values through '--value' command.`);
  });

  test("throw exception if no value is provided when running tests", () => {
    expect(() => {
      // GIVEN
      const app = new MyApp();
      const resourceTest = new MyResource(app, "Test.X67tGM87zf");
      const resourceEnv = new MyResource(resourceTest, "env0");
      const myResource = new MyResource(resourceEnv, "my-resource");
      getPlatformSpecificValues(myResource, "number", "string||bool");
    }).toThrowError(`
  - 'number' is missing from root/Test.X67tGM87zf/env0/my-resource
  - 'string' or 'bool' is missing from root/Test.X67tGM87zf/env0/my-resource

These are required properties of platform-specific types.
You can set these values through '--value' command.`);
  });
});
