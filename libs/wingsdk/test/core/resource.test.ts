import { Construct } from "constructs";
import { describe, test, expect } from "vitest";
import { Lifting } from "../../src/core";
import { Resource } from "../../src/std";
import { SimApp } from "../sim-app";

describe("resource onLift", () => {
  const inflightOps = ["op1", "op2"];
  class Example extends Resource {
    public _supportedOps() {
      return inflightOps;
    }
    public _toInflight() {
      return "inflight";
    }
    public addEnvironment() {
      // noop
    }
  }
  class ExampleAbstract extends Resource {
    constructor(scope: Construct, id: string) {
      if (new.target === ExampleAbstract) {
        Resource._newFromFactory("fqn", scope, id);
      }
      super(scope, id);
    }
  }
  test("adding supported ops to host should succeed", () => {
    const app = new SimApp();
    const example = new Example(app, "example");
    expect(example.onLift(new Example(app, "host"), ["op1"])).toBeUndefined();
  });

  test("adding non supported op to host should cause an error", () => {
    const app = new SimApp();
    const example = new Example(app, "example");

    expect(() =>
      Lifting.lift(example, new Example(app, "host"), ["nonExistentOp"]),
    ).toThrow(
      `Resource root/example does not support inflight operation nonExistentOp.\nIt might not be implemented yet.`,
    );
  });

  test("creating a resource outside an app should cause an error", () => {
    const notApp = new Construct(undefined as any, "notApp");

    expect(() => new ExampleAbstract(notApp, "example")).toThrow(
      `Cannot find root app`,
    );
  });
});
