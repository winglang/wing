import * as vm from "vm";
import { describe, expect, test } from "vitest";
import { InflightClient } from "../../src/core/inflight";

// A minimal inflight class with `_toInflightType` that the compiler emits
// for every inflight class. The static method returns a `require(...)` call
// that resolves to the class itself.
//
// Init behavior is configured by setting properties on the returned class so
// the init logic can be observed from the test even when the class is later
// reconstructed inside a `vm` context.
function makeInflightClass(opts: {
  initImpl?: () => Promise<void> | void;
  readonlyName?: string;
} = {}) {
  const { initImpl, readonlyName } = opts;
  class C {
    public readonly name: string = readonlyName ?? "";
    public static _toInflightType() {
      return "module.exports";
    }
    public async $inflight_init() {
      if (initImpl) {
        await initImpl();
      }
    }
    public async operation() {
      return "ok";
    }
  }
  // `_toInflightType()` is also called statically — keep both consistent.
  (C as any)._toInflightType = function () {
    return "module.exports";
  };
  return C;
}

function runInVm(code: string, opts: { initImpl?: () => Promise<void> | void; readonlyName?: string } = {}) {
  const C = makeInflightClass(opts);
  const module = { exports: C };
  const ctx: any = {
    module,
    exports: module.exports,
  };
  // `forV2` returns an expression that is a self-contained async IIFE
  // (e.g. `(await (async () => { ... })())`). Strip the leading/trailing
  // whitespace, then evaluate it as the body of an async wrapper.
  return Promise.resolve(
    vm.runInNewContext(
      `(async () => { return ${code.trim()}; })()`,
      ctx
    )
  );
}

describe("InflightClient.forV2", () => {
  test("returns code that resolves to a callable client", async () => {
    const code = InflightClient.forV2(makeInflightClass(), {});
    const client = (await runInVm(code)) as any;
    expect(typeof client.operation).toBe("function");
    expect(await client.operation()).toBe("ok");
  });

  test("defers $inflight_init until first method call (wing#5948)", async () => {
    // The init should not have run by the time `forV2`'s IIFE has resolved.
    let initCount = 0;
    const code = InflightClient.forV2(
      makeInflightClass({ initImpl: () => { initCount++; } }),
      {},
    );
    const client = (await runInVm(code, { initImpl: () => { initCount++; } })) as any;
    expect(initCount).toBe(0);

    // First method call triggers init exactly once.
    expect(await client.operation()).toBe("ok");
    expect(initCount).toBe(1);

    // Subsequent calls do not re-init.
    expect(await client.operation()).toBe("ok");
    expect(initCount).toBe(1);
  });

  test("lets a try/catch in user code catch $inflight_init errors (wing#5948)", async () => {
    const code = InflightClient.forV2(
      makeInflightClass({
        initImpl: () => {
          throw new Error("boom from $inflight_init");
        },
      }),
      {},
    );
    const client = (await runInVm(code, {
      initImpl: () => {
        throw new Error("boom from $inflight_init");
      },
    })) as any;

    // The IIFE itself must not throw — the init is deferred.
    let caught: Error | undefined;
    try {
      await client.operation();
    } catch (e: any) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(Error);
    expect(caught!.message).toBe("boom from $inflight_init");
  });

  test("concurrent method calls share a single init promise", async () => {
    let initCount = 0;
    let resolveInit: (() => void) | undefined;
    const initImpl = () => {
      initCount++;
      return new Promise<void>((r) => {
        resolveInit = () => r();
      });
    };
    const code = InflightClient.forV2(makeInflightClass({ initImpl }), {});
    const client = (await runInVm(code, { initImpl })) as any;

    // Kick off two concurrent method calls; the second one must wait for
    // the same in-flight init rather than re-running it.
    const p1 = client.operation();
    const p2 = client.operation();
    resolveInit!();
    expect(await p1).toBe("ok");
    expect(await p2).toBe("ok");
    expect(initCount).toBe(1);
  });

  test("non-function properties pass through without triggering init", async () => {
    let initCount = 0;
    const code = InflightClient.forV2(
      makeInflightClass({ initImpl: () => { initCount++; }, readonlyName: "alpha" }),
      {},
    );
    const client = (await runInVm(code, { initImpl: () => { initCount++; }, readonlyName: "alpha" })) as any;
    expect(client.name).toBe("alpha");
    expect(initCount).toBe(0);
  });
});
