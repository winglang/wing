import { describe, test, expect } from "vitest";
import { Resource } from "../../src/std";
import { SimApp } from "../sim-app";

describe("resource _addOnLift", () => {
  const inflightOps = ["op1", "op2"];
  class Example extends Resource {
    _getInflightOps() {
      return inflightOps;
    }
    _toInflight() {
      return "inflight";
    }
  }
  test("adding supported ops to host should succeed", () => {
    const app = new SimApp();
    const example = new Example(app, "example");
    expect(
      // @ts-expect-error - accessing private method
      example._addOnLift(new Example(app, "host"), ["op1"])
    ).toBeUndefined();
  });

  test("adding non supported op to host should cause an error", () => {
    const app = new SimApp();
    const example = new Example(app, "example");

    expect(() =>
      // @ts-expect-error - accessing private method
      example._addOnLift(new Example(app, "host"), ["nonExistentOp"])
    ).toThrow(
      `Resource root/example does not support inflight operation nonExistentOp (requested by root/host).\nIt might not be implemented yet.`
    );
  });

  test("adding non implemented op to host should cause an error", () => {
    class Client {
      public op1() {
        return "op1";
      }
    }

    class ExampleImplementation extends Example {
      protected _clientClass? = Client;
    }

    const app = new SimApp();
    const example = new ExampleImplementation(app, "example");

    expect(() =>
      // @ts-expect-error - accessing private method
      example._addOnLift(new Example(app, "host"), ["op2"])
    ).toThrow(
      `Resource root/example does not support inflight operation op2 (requested by root/host).\nIt might not be implemented yet.`
    );
  });
});
