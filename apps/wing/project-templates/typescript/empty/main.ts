import { cloud, inflight, lift, main } from "@wingcloud/framework";

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
      const assert = await import("node:assert");
      assert.equal(await fn.invoke(""), "hello, world");
    })
  );
});
