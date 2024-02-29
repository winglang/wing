import { main, inflight } from "../../../src";

main((root) => {
  inflight(async () => {
    let x = 2;
    //  ^ This is unused, which the local tsconfig fails on
  });
});
