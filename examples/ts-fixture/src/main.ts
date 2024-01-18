import { inflight, lift, main, std } from "ts4w";
import { cloud } from "@winglang/sdk";
import * as winglib from "@winglibs/testfixture";

main((app) => {
  new cloud.Bucket(app, "Bucket");

  const store = new winglib.Store(app, "Store");

  store.onSet(
    inflight(async ({}, message) => {
      console.log("onSet", message);
    })
  );

  new std.Test(
    app,
    "Test",
    lift({ store })
      .grant({ store: ["set"] })
      .inflight(async ({ store }) => {
        await store.set("wing");
      })
  );
});
