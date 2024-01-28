import { inflight, lift, main, std, cloud } from "ts4w";
import * as winglib from "@winglibs/testfixture";

main((app) => {
  const bucket = new cloud.Bucket(app, "B1");
  const f = new cloud.Function(
    app,
    "F1",
    lift({ bucket })
      .grant({ bucket: ["put"] })
      .inflight(async function () {
        await this.bucket.put("hi", "stuff");
        console.log("hi from function");
        return "hi";
      })
  );

  const store = new winglib.Store(app, "Store");

  let inf = inflight<() => Promise<void>>(async () => {
    console.log("hi from loose inflight");
  });

  store.onSet(
    inflight(async (message) => {
      console.log(`Set("${message}")`);
    })
  );

  new std.Test(
    app,
    "Test",
    lift({ store, inf, f })
      .grant({ store: ["set"] })
      .inflight(async function () {
        console.log("hi from test");
        await this.inf();
        await this.f.invoke("me");
        await this.store.set("wing");
      })
  );
});
