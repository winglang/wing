import { main, inflight } from "../../../src";

main((root) => {
  let x = 2;

  inflight(async () => {
    console.log(x);
  });
});
