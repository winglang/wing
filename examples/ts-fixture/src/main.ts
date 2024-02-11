import { inflight, lift, main, cloud } from "@wingcloud/framework";
import * as winglib from "@winglibs/testfixture";
import assert from "node:assert";
import { deepStrictEqual } from "node:assert";
import { addOne } from "./other";

main((app, test) => {
  const bucket = new cloud.Bucket(app, "B1");
  const f = new cloud.Function(
    app,
    "F1",
    lift({ bucket })
      .grant({ bucket: ["put"] })
      .inflight(async ({ bucket }) => {
        assert.strictEqual("", "");
        await bucket.put("hi", "stuff");
        console.log("hi from function");
        return "hi";
      })
  );

  const store = new winglib.Store(app, "Store");

  let inf = inflight<() => Promise<void>>(async ({}) => {
    console.log("hi from loose inflight");
  });

  store.onSet(
    inflight(async ({}, message) => {
      console.log(`Set("${message}")`);
    })
  );

  test(
    "test",
    lift({ store, inf, f })
      .grant({ store: ["set"] })
      .inflight(async ({ store, inf, f }) => {
        deepStrictEqual(1, 1);
        assert.deepStrictEqual(1, 1);
        assert.deepStrictEqual(addOne(1), 2);

        console.log("hi from test");
        await inf();
        await f.invoke("me");
        await store.set("wing");
      })
  );
});
