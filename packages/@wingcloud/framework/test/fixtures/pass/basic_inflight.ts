import { main, inflight } from "../../../src";

main((root) => {
  inflight(async () => {
    console.log("Hello, world!");
  });
});
