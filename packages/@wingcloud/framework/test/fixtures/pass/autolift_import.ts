import { main, inflight } from "../../../src";
import { equal } from "node:assert";

main((root) => {
  inflight(async () => {
    equal(1, 1);
  });
});
