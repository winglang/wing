import { main } from "ts4w";
import { cloud } from "@winglang/sdk";

main((app) => {
  new cloud.Bucket(app, "Bucket");
});
