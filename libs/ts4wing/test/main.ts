import { wing } from "../src";
import { cloud } from "@winglang/sdk"

wing((app) => {
  new cloud.Bucket(app, "Bucket");
});
