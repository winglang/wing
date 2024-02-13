import { cloud, inflight, lift, main } from "@wingcloud/framework";
import assert from "node:assert";

main((root, test) => {
  const fn = new cloud.Function(
    root,
    "Function",
    inflight(async () => {
      return "hello, world";
    })
  );

  test(
    "fn returns hello",
    lift({ fn }).inflight(async ({ fn }) => {
      assert.equal(await fn.invoke(""), "hello, world");
    })
  );
});
