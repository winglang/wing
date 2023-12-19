import { wing } from "../src";
import { cloud } from "@winglang/sdk"

main((app) => {
  new cloud.Bucket(app, "Bucket");
});
