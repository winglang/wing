import { inflight, lift, main, std, cloud } from "@wingcloud/framework";
import * as winglib from "@winglibs/testfixture";

main((app) => {
  const bucket = new cloud.Bucket(app, "B1");
  const f = new cloud.Function(
    app,
    "F1",
    lift({ bucket })
      .grant({ bucket: ["put"] })
      .inflight(async ({ bucket }) => {
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

  new std.Test(
    app,
    "Test",
    lift({ store, inf, f })
      .grant({ store: ["set"] })
      .inflight(async ({ store, inf, f }) => {
        console.log("hi from test");
        await inf();
        await f.invoke("me");
        await store.set("wing");
      })
  );
});
