import { main, cloud, lift } from "../../../src";

main((root) => {
  let b = new cloud.Bucket(root, "Bucket");
  lift({ b }).inflight(async ({ b }) => {
    await b.put("key", "value");
  });
});
