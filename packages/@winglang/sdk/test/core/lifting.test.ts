import { Construct } from "constructs";
import { describe, expect, test } from "vitest";
import { Node } from "../../src/std/node";
import {
  LiftMapNormalized,
  collectLifts,
  liftObject,
  mergeLiftDeps,
} from "../../src/core/lifting";

test("mergeLiftDeps", () => {
  // first argument empty
  expectMergeDeps(
    {},
    {
      op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    },
    {
      op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    },
  );

  // second argument empty
  expectMergeDeps(
    {
      op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    },
    {},
    {
      op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    },
  );

  // both arguments empty
  expectMergeDeps({}, {}, {});

  // merging transitive operations of an object
  expectMergeDeps(
    {
      op1: new Map([["obj1", new Set(["m1"])]]),
    },
    {
      op1: new Map([["obj1", new Set(["m2"])]]),
    },
    {
      op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    },
  );

  // merging with multiple objects
  expectMergeDeps(
    {
      op1: new Map([["obj1", new Set(["m1"])]]),
    },
    {
      op1: new Map([["obj2", new Set(["m1"])]]),
    },
    {
      op1: new Map([
        ["obj1", new Set(["m1"])],
        ["obj2", new Set(["m1"])],
      ]),
    },
  );

  // merging with multiple primary ops
  expectMergeDeps(
    {
      op1: new Map([["obj1", new Set(["m1"])]]),
    },
    {
      op2: new Map([["obj1", new Set(["m1"])]]),
    },
    {
      op1: new Map([["obj1", new Set(["m1"])]]),
      op2: new Map([["obj1", new Set(["m1"])]]),
    },
  );

  // merging with variables referring to the same object
  const obj1 = "obj";
  const obj2 = "obj";
  expectMergeDeps(
    {
      op1: new Map([[obj1, new Set(["m1"])]]),
    },
    {
      op1: new Map([[obj2, new Set(["m1"])]]),
    },
    {
      op1: new Map([["obj", new Set(["m1"])]]),
    },
  );

  // merging with variables referring to the same object
  const c1 = new Construct(undefined as any, "c1");
  const c2 = c1;
  expectMergeDeps(
    {
      op1: new Map([[c1, new Set(["m1"])]]),
    },
    {
      op1: new Map([[c2, new Set(["m1"])]]),
    },
    {
      op1: new Map([[c1, new Set(["m1"])]]),
    },
  );
});

describe("collectLifts", () => {
  test("object without _liftMap", () => {
    class Foo {}
    const lifts = collectLifts(new Foo(), []);
    expect(lifts).toEqual(new Map([[expect.any(Foo), new Set([])]]));
  });

  test("object with single op, but no onLift method", () => {
    class Foo {
      public get _liftMap() {
        return {
          op1: [],
        };
      }
    }
    const lifts = collectLifts(new Foo(), ["op1"]);
    expect(lifts).toEqual(new Map([[expect.any(Foo), new Set(["op1"])]]));
  });

  test("object with single op and onLift method", () => {
    class Foo {
      public get _liftMap() {
        return {
          op1: [],
        };
      }
      public onLift() {}
    }
    const lifts = collectLifts(new Foo(), ["op1"]);
    expect(lifts).toEqual(new Map([[expect.any(Foo), new Set(["op1"])]]));
  });

  test("object lifting simple primitives", () => {
    class Foo {
      public get _liftMap() {
        return {
          op1: [
            ["hello", []],
            [123, []],
            [true, []],
          ],
        };
      }
    }
    const lifts = collectLifts(new Foo(), ["op1"]);
    expect(lifts).toEqual(
      new Map([
        [expect.any(Foo), new Set(["op1"])],
        ["hello", new Set()],
        [123, new Set()],
        [true, new Set()],
      ]),
    );
  });

  test("object lifting transitive object", () => {
    class Bucket {
      public get _liftMap() {
        return {
          list: [],
        };
      }
      public onLift() {}
    }

    class Foo {
      public get _liftMap() {
        return {
          op1: [[new Bucket(), ["list"]]],
        };
      }
      public onLift() {}
    }
    const lifts = collectLifts(new Foo(), ["op1"]);
    expect(lifts).toEqual(
      new Map([
        [expect.any(Foo), new Set(["op1"])],
        [expect.any(Bucket), new Set(["list"])],
      ]),
    );
  });

  test("object lifting shared object through two transitive objects", () => {
    class Bucket {
      public get _liftMap() {
        return {
          list: [],
        };
      }
      public onLift() {}
    }
    class MyBucket {
      private bucket: Bucket;
      constructor(bucket: Bucket) {
        this.bucket = bucket;
      }
      public get _liftMap() {
        return {
          list: [[this.bucket, ["list"]]],
        };
      }
    }

    class Foo {
      private m1: MyBucket;
      private m2: MyBucket;
      constructor() {
        const bucket = new Bucket();
        this.m1 = new MyBucket(bucket);
        this.m2 = new MyBucket(bucket);
      }
      public get _liftMap() {
        return {
          handle: [
            [this.m1, ["list"]],
            [this.m2, ["list"]],
          ],
        };
      }
    }
    const lifts = collectLifts(new Foo(), ["handle"]);
    expect(lifts).toEqual(
      new Map([
        [expect.any(Bucket), new Set(["list"])],
        [expect.any(MyBucket), new Set(["list"])],
        [expect.any(MyBucket), new Set(["list"])],
        [expect.any(Foo), new Set(["handle"])],
      ]),
    );
  });
});

function expectMergeDeps(
  deps1: LiftMapNormalized,
  deps2: LiftMapNormalized,
  expected: LiftMapNormalized,
) {
  const result = mergeLiftDeps(deps1, deps2);
  expect(result).toEqual(expected);
}

describe("liftObject", () => {
  test("serializes primitives and collections", () => {
    expect(liftObject("hi")).toBe(`"hi"`);
    expect(liftObject(42)).toBe(`42`);
    expect(liftObject(true)).toBe(`true`);
    expect(liftObject(null)).toBe(`null`);
    // JSON.stringify(undefined) returns the JS value `undefined`, not the string "null"
    expect(liftObject(undefined)).toBeUndefined();
    expect(liftObject([1, 2])).toBe(`[1,2]`);
    expect(liftObject(new Set([1]))).toBe(`new Set([1])`);
    expect(liftObject(new Map([["a", 1]]))).toBe(`new Map([["a",1]])`);
  });

  test("throws a clear error when lifting a plain object (no name)", () => {
    // A `Node` instance (e.g. from `nodeof(this)`) is the canonical case:
    // the compiler treats it as phase-independent, the lifter captures the
    // whole instance, and the runtime cannot serialize it.
    const root = new Construct(undefined as any, "TestRoot");
    const node = Node.of(root);

    let caught: Error | undefined;
    try {
      liftObject(node);
    } catch (e) {
      caught = e as Error;
    }

    expect(caught).toBeDefined();
    expect(caught!.message).toContain(`Cannot lift object of type 'Node'`);
    expect(caught!.message).toContain(
      "Workaround: lift only the specific fields you need",
    );
    expect(caught!.message).toContain(
      "https://www.winglang.io/docs/concepts/inflights#using-preflight-data-from-inflight",
    );
  });

  test("includes the variable name in the error when provided", () => {
    const root = new Construct(undefined as any, "TestRoot");
    const node = Node.of(root);

    let caught: Error | undefined;
    try {
      liftObject(node, "x");
    } catch (e) {
      caught = e as Error;
    }

    expect(caught).toBeDefined();
    // The name + the type should both appear, and the message should be
    // targeted to the specific capture site.
    expect(caught!.message).toContain(`Cannot lift 'x' of type 'Node'`);
  });
});
